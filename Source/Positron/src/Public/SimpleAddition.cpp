#include "API.h"



napi_value AddNumbers(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  double num1, num2;
  napi_get_value_double(env, args[0], &num1);
  napi_get_value_double(env, args[1], &num2);

  double result = num1 + num2;

  napi_value resultValue;
  napi_create_double(env, result, &resultValue);

  return resultValue;
}
