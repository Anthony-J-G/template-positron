#pragma once

#include <string>
#include <memory>
#include <unordered_set>
#include <map>
#include <vector>

#include "Interfaces/ConfigManager.h"
#include "Interfaces/Console.h"
#include "Interfaces/ResourceManager.h"
#include "Interfaces/CrashHandler.h"



namespace positron {

class Context {
  public:
    static std::shared_ptr<Context> GetInstance();
    static std::shared_ptr<Context> CreateInstance(const std::string name, const std::string shortName,
                                                   const std::string configFilePath,
                                                   uint32_t reservedThreadCount = 1);
    static std::shared_ptr<Context> CreateUninitializedInstance(const std::string name, const std::string shortName,
                                                                const std::string configFilePath);
    static std::string GetAppBundlePath();
    static std::string GetAppDirectoryPath(std::string appName = "");
    static std::string GetPathRelativeToAppDirectory(const std::string path, std::string appName = "");
    static std::string GetPathRelativeToAppBundle(const std::string path);
    static std::string LocateFileAcrossAppDirs(const std::string path, std::string appName = "");

    Context(std::string name, std::string shortName, std::string configFilePath);
    ~Context();

    void Init(uint32_t reservedThreadCount);

    std::shared_ptr<ConfigManager> GetConfigManager();
    std::shared_ptr<ResourceManager> GetResourceManager();
    std::shared_ptr<CrashHandler> GetCrashHandler();
    std::shared_ptr<Console> GetConsole();

    std::string GetConfigFilePath();
    std::string GetName();
    std::string GetShortName();    

    bool InitConfigManager();
    bool InitResourceManager(uint32_t reservedThreadCount = 1);
    bool InitCrashHandler();
    bool InitConsole();

  protected:
    Context() = default;

  private:
    static std::weak_ptr<Context> mContext;

    std::shared_ptr<ConfigManager> mConfigManager;
    std::shared_ptr<ResourceManager> mResourceManager;
    std::shared_ptr<CrashHandler> mCrashHandler;
    std::shared_ptr<Console> mConsole;

    std::string mConfigFilePath;
    std::string mMainPath;
    std::string mPatchesPath;

    std::string mName;
    std::string mShortName;

    // std::map<std::string, > mConsoleVariables;
};

}