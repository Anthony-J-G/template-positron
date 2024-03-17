#include "API.h"



napi_value Init(napi_env env, napi_value exports) {
  // Console Variable IO
  napi_property_descriptor desc1 = {"getContextName", 0, GetContextName, 0, 0, 0, napi_default, 0};
  napi_define_properties(env, exports, 1, &desc1);

  napi_property_descriptor desc3 = {"addNumbers", 0, AddNumbers, 0, 0, 0, napi_default, 0};
  napi_define_properties(env, exports, 1, &desc3);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)