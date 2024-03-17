import os
import re
import shutil


config = {
    "all": {
        "copy": [
        ]
    },
    "debug": {
        "copy": [
            "Libraries/protobuf/build/debug/bin/libprotobufd.dll",
            "Libraries/protobuf/build/debug/bin/libprotocd.dll",
        ]
    },
    "release": {
        "copy": [
                
        ]
    }    
}


def BuildRegExPattern(file_extensions: list[str]) -> str:
    """
        Takes input file extensions and builds a RegEx search pattern
        for them.
    """
    pattern = ""
    for ext in file_extensions:
        pattern = pattern + f"(^[\\w\\d]+\\{ext}$)|"
    pattern = pattern[:-1]

    return pattern


def CopyByFileList(files: list[str], destination: str) -> None:
    """
        Copies files to the target directory based on a list input
    """
    for file in files:
        shutil.copy2(file, destination)


def CopyByExtensions(search_dir: str, destination_dir: str, file_extensions: list[str]) -> None:
    """
        Copies files from a source tree to destination tree if they have
        the correct file extensions.
    """
    search_pattern = BuildRegExPattern(file_extensions)

    # Make Destination Directory if it isn't already a directory and doesn't exist
    if not os.path.isdir(destination_dir) and not os.path.exists(destination_dir):
        os.mkdir(destination_dir)

    for root, dirs, files in os.walk(search_dir):
        for file_name in files:
            if re.match(search_pattern, file_name):

                source_file = os.path.join(root, file_name)
                target_file = os.path.join(root[:-len(search_dir)], file_name)
                destination_file = os.path.join(destination_dir, target_file)
                shutil.copy2(source_file, destination_file)


def PreBuildEvents(config):
    # Add Command to Copy any necessary Header Files to their Proper Locations
    header_extensions = [
        ".h",
        ".hpp"
    ]
    source_extensions = [
        ".c",
        ".cpp",
        ".cc"
    ]

    # Copy 'Astronomy' Headers
    src_dir = "Source/Astronomy/src"
    include_dir = "Source/Astronomy/include"
    CopyByExtensions(src_dir, include_dir, header_extensions)


def PostBuildEvents(config):
    # Add Command that copies DLLs to same directory as '.node' binary

    # Copy 'protobuf' DLLs
    dlls = [
        "Libraries/protobuf/build/tools/protobuf/zlib1.dll",
        "Libraries/protobuf/build/tools/protobuf/libprotobuf.dll",
        "Libraries/protobuf/build/tools/protobuf/libprotoc.dll",
    ]
    dest_dir = "build/Release"
    CopyByFileList(dlls, dest_dir)


def RunNodeGyp(command, config, options):
    if config == "debug":
        options.append("debug")
    if config == "release":
        options.append("--release")

    cmdline = f"node-gyp {command}"

    # PreBuildEvents(config)

    # Run Build Command Here
    os.system(cmdline)
    
    PostBuildEvents(config)



RunNodeGyp("build", "release", [])