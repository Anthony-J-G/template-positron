#include "Entry.h"

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <cstdio>

#ifdef WIN32
    #include <Windows.h>
#endif

#include "functions.h"


HelloAddon::HelloAddon(Napi::Env env, Napi::Object exports) {
    DefineAddon(
        exports,
        {InstanceMethod("hello", &HelloAddon::Hello, napi_enumerable)}
    );

#if defined(WIN32)
    AttachConsole(ATTACH_PARENT_PROCESS);

    FILE *placeholder;
    freopen_s(&placeholder, "CON", "w", stdout);
    freopen_s(&placeholder, "CON", "w", stderr);
    freopen_s(&placeholder, "CON", "r", stdin);

    std::ios::sync_with_stdio();
#endif
}


Napi::Value HelloAddon::Hello(const Napi::CallbackInfo& info) {
    run();
    return Napi::String::New(info.Env(), "world");
}