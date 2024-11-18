cmake_minimum_required(VERSION 3.15)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

project (libpositron)

# -Dnapi_build_version=8
add_definitions(-DNAPI_VERSION=8)

message(STATUS "CMake.js Includes: ${CMAKE_JS_INC}")

if(WIN32)
    set(OPENSSL_MSVC_STATIC_RT TRUE)
    set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()


add_subdirectory("sandbox-rustpp/")
add_subdirectory("native")