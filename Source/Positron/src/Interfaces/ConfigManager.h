#pragma once

#include <string>
#include <unordered_map>

#include "Buffers/CVar.pb.h"


namespace positron {

/**
 *  The Configuartion Manager handles any settings that are necessary for the Context to run properly.
 * 
 *  This includes handling Console Variables dynamically during runtime, as well as pointing to paths where 
 *  resources are stored.
 * 
 */

class ConfigManager
{
private:
    /* data */
public:
    ConfigManager(/* args */);
    ConfigManager(std::string path);
    ~ConfigManager();

    void Erase(const std::string& key);
    bool Contains(const std::string& key);
    void Reload();
    void Save() {}
    void ClearConsoleVariable(const char* name);
    std::string GetString(const std::string& key, const std::string& defaultValue = "") { return ""; }

protected:
    std::shared_ptr<positron::Config> mConfig;
    std::unordered_map<std::string, std::shared_ptr<ConsoleVariable>> mConsoleVariables;
};

}