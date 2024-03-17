#include "ConfigManager.h"

#include <iostream>
#include <filesystem>
#include <iostream>
#include <fstream>
#include <string>
#include <memory>
#include <unordered_set>
#include <map>
#include <vector>



namespace positron {

ConfigManager::ConfigManager(/* args */)
{
}

ConfigManager::ConfigManager(std::string path)
{
    using namespace std;
    cout << "Attempting to verify ProtoBuf Version...";
    GOOGLE_PROTOBUF_VERIFY_VERSION;
    cout << " Status OK.\n";
    
    std::shared_ptr<Config> target_config = nullptr;

    // Attempt to Open Config from File, but on failure create default Config ProtoBuf
    fstream input{path, ios::in | ios::binary};
    if (!input.is_open()) {
        cout << "'" << path << "' Not Found, creating file instead.\n";

    }  else if (!target_config->ParseFromIstream(&input)) {
        cout << "Failed to parse Config Protocol Buffer.";
    }
    
    mConfig = make_shared<Config>(target_config);
}


ConfigManager::~ConfigManager()
{
}


} // namespace positron