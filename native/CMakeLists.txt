add_library(${PROJECT_NAME} SHARED)
set_property(TARGET libpositron PROPERTY CXX_STANDARD 20)

include_directories(${CMAKE_JS_INC})

#=================== Source Discovery ===================

file(GLOB_RECURSE Source_Files__TopLevel RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} "src/*.c" "src/*.cpp")
file(GLOB_RECURSE Header_Files__TopLevel RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} "src/*.h" "src/*.hpp")

source_group("Source Files" FILES  ${Source_Files__TopLevel})
target_sources(libpositron PRIVATE ${Source_Files__TopLevel})

source_group("CMake.js Source" FILES ${CMAKE_JS_SRC})
target_sources(libpositron PRIVATE   ${CMAKE_JS_SRC})

source_group("Header Files" FILES  ${Header_Files__TopLevel})
target_sources(libpositron PRIVATE ${Header_Files__TopLevel})

#=================== Packages & Includes ===================
target_include_directories(libpositron
    PRIVATE
        ${CMAKE_JS_INC}
    PUBLIC
        ${CMAKE_JS_INC}
)

#========================= Linking =========================
# find_package(nlohmann_json REQUIRED)
# target_link_libraries(librustpp         PUBLIC nlohmann_json::nlohmann_json)
# target_link_libraries(librustpp_shared  PUBLIC nlohmann_json::nlohmann_json)

# find_package(rsrustpp)
# target_link_libraries(libpositron         PUBLIC rsrustpp)

target_link_libraries(${PROJECT_NAME} PUBLIC librustpp)

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} PRIVATE ${CMAKE_JS_LIB})

if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
  # Generate node.lib
  execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()