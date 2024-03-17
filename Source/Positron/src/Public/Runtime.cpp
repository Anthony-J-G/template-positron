#include "API.h"


#include <memory>

#include "Context.h"



static std::shared_ptr<positron::Context> gContextPtr = nullptr;



bool StartContext() {
    if (gContextPtr == nullptr) {
        gContextPtr = positron::Context::CreateInstance(
            APP_CONTEXT_NAME, APP_CONTEXT_SHORT_NAME, APP_CONFIG_FILEPATH
        );
        return true;
    }
    return false;
}


napi_value GetContextName(napi_env env, napi_callback_info info) {
    StartContext();

    napi_get_cb_info(env, info, NULL, NULL, nullptr, nullptr);

    napi_value resultValue;
    napi_create_string_utf8(env, gContextPtr->GetName().c_str(), NAPI_AUTO_LENGTH, &resultValue);

    return resultValue;
}

