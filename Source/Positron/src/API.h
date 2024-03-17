#pragma once

#include <node_api.h>


#define APP_CONTEXT_NAME "Astronomy"
#define APP_CONTEXT_SHORT_NAME "Astronomy"
#define APP_CONFIG_FILEPATH "config.txt"


/**
 *   Positron Runtime Context API
**/
napi_value GetContextName(napi_env env, napi_callback_info info);


/**
 *  Sample function to give an example of a function that
 *  can be called from TypeScript.
**/
napi_value AddNumbers(napi_env env, napi_callback_info info);