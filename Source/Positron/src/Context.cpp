#include "Context.h"

#include <iostream>
#include <filesystem>



namespace positron {

std::weak_ptr<Context> Context::mContext;

std::shared_ptr<Context> Context::GetInstance() {
    return mContext.lock();
}

Context::~Context() {
    // Explicitly destructing everything so that logging is done last.
    mConsole = nullptr;
    mCrashHandler = nullptr;
    mResourceManager = nullptr;
    GetConfigManager()->Save();
    mConfigManager = nullptr;

    // Explicitly delete all global objects allocated by libprotobuf. 
    // Ensure this is done last to prevent bad references.
    google::protobuf::ShutdownProtobufLibrary();
}

std::shared_ptr<Context> Context::CreateInstance(const std::string name, const std::string shortName,
                                                 const std::string configFilePath,
                                                 uint32_t reservedThreadCount) {
    if (mContext.expired()) {
        auto shared = std::make_shared<Context>(name, shortName, configFilePath);
        mContext = shared;
        shared->Init(reservedThreadCount);
        return shared;
    }

    return GetInstance();
}

std::shared_ptr<Context> Context::CreateUninitializedInstance(const std::string name, const std::string shortName,
                                                              const std::string configFilePath) {
    if (mContext.expired()) {
        auto shared = std::make_shared<Context>(name, shortName, configFilePath);
        mContext = shared;
        return shared;
    }

    return GetInstance();
}

Context::Context(std::string name, std::string shortName, std::string configFilePath)
    : mName(std::move(name)), mShortName(std::move(shortName)), mConfigFilePath(std::move(configFilePath)) {
}

void Context::Init(uint32_t reservedThreadCount) {
    InitConfigManager();
    InitResourceManager(reservedThreadCount);
    InitCrashHandler();
    InitConsole();
}

bool Context::InitConfigManager() {
    if (GetConfigManager() != nullptr) {
        return false;
    }

    mConfigManager = std::make_shared<ConfigManager>(GetPathRelativeToAppDirectory(GetConfigFilePath()));
    return true;
}

bool Context::InitResourceManager(uint32_t reservedThreadCount) {
    if (GetResourceManager() != nullptr) {
        return false;
    }

    mMainPath = GetConfigManager()->GetString("Game.Main Archive", GetAppDirectoryPath());
    mPatchesPath = GetConfigManager()->GetString("Game.Patches Archive", GetAppDirectoryPath() + "/mods");

    mResourceManager = std::make_shared<ResourceManager>();
    /*
    if (otrFiles.empty()) {
        mResourceManager = std::make_shared<ResourceManager>(mMainPath, mPatchesPath, validHashes, reservedThreadCount);
    } else {
        mResourceManager = std::make_shared<ResourceManager>(otrFiles, validHashes, reservedThreadCount);
    }
    */

    if (!GetResourceManager()->DidLoadSuccessfully()) {
        return false;
    }

    return true;
}

bool Context::InitCrashHandler() {
    if (GetCrashHandler() != nullptr) {
        return false;
    }

    mCrashHandler = std::make_shared<CrashHandler>();

    return true;
}

bool Context::InitConsole() {
    if (GetConsole() != nullptr) {
        return false;
    }

    mConsole = std::make_shared<Console>();
    GetConsole()->Init();

    return true;
}

std::shared_ptr<ConfigManager> Context::GetConfigManager() {
    return mConfigManager;
}

std::shared_ptr<ResourceManager> Context::GetResourceManager() {
    return mResourceManager;
}

std::shared_ptr<CrashHandler> Context::GetCrashHandler() {
    return mCrashHandler;
}

std::shared_ptr<Console> Context::GetConsole() {
    return mConsole;
}

std::string Context::GetConfigFilePath() {
    return mConfigFilePath;
}

std::string Context::GetName() {
    return mName;
}

std::string Context::GetShortName() {
    return mShortName;
}

std::string Context::GetAppBundlePath() {
#ifdef NON_PORTABLE
    return CMAKE_INSTALL_PREFIX;
#endif

#ifdef __linux__
    std::string progpath(PATH_MAX, '\0');
    int len = readlink("/proc/self/exe", &progpath[0], progpath.size() - 1);
    if (len != -1) {
        progpath.resize(len);

        // Find the last '/' and remove everything after it
        int lastSlash = progpath.find_last_of("/");
        if (lastSlash != std::string::npos) {
            progpath.erase(lastSlash);
        }

        return progpath;
    }
#endif

    return ".";
}

std::string Context::GetAppDirectoryPath(std::string appName) {
#if defined(__ANDROID__)
    const char* externaldir = SDL_AndroidGetExternalStoragePath();
    if (externaldir != NULL) {
        return externaldir;
    }
#endif

#if defined(__linux__) || defined(__APPLE__)
    char* fpath = std::getenv("SHIP_HOME");
    if (fpath != NULL) {
        return std::string(fpath);
    }
#endif

#ifdef NON_PORTABLE
    if (appName.empty()) {
        appName = GetInstance()->mShortName;
    }
    char* prefpath = SDL_GetPrefPath(NULL, appName.c_str());
    if (prefpath != NULL) {
        std::string ret(prefpath);
        SDL_free(prefpath);
        return ret;
    }
#endif

    return ".";
}

std::string Context::GetPathRelativeToAppBundle(const std::string path) {
    return GetAppBundlePath() + "/" + path;
}

std::string Context::GetPathRelativeToAppDirectory(const std::string path, std::string appName) {
    return GetAppDirectoryPath(appName) + "/" + path;
}

std::string Context::LocateFileAcrossAppDirs(const std::string path, std::string appName) {
    std::string fpath;

    // app configuration dir
    fpath = GetPathRelativeToAppDirectory(path, appName);
    if (std::filesystem::exists(fpath)) {
        return fpath;
    }
    // app install dir
    fpath = GetPathRelativeToAppBundle(path);
    if (std::filesystem::exists(fpath)) {
        return fpath;
    }
    // current dir
    return "./" + std::string(path);
}

}