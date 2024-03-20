import os
import re
import json
import shutil
import argparse

import pathlib
from pathlib import Path



def BuildRegExPattern(file_extensions: list[str]) -> str:
    """
        Takes input file extensions and builds a RegEx search pattern
        for them.
    """
    pattern = ""
    for ext in file_extensions:
        pattern = pattern + f"(^[\\w\\d\\.]+\\{ext}$)|"
    pattern = pattern[:-1]

    return pattern


def FindFileByExtension(search_dir: Path, file_extensions) -> list[Path]:
    """
        Given a target search directory, attempt to find all files that match
        the input file extensions.
    """
    search_pattern = BuildRegExPattern(file_extensions)

    ref = search_dir.parts

    found_files = []
    for filepath in search_dir.glob("**/*"):
        if filepath.is_dir():
            continue
        
        cleaned_path = Path(*filepath.parts[len(ref):])
        if re.match(search_pattern, cleaned_path.name):
            found_files.append(cleaned_path)
    
    return found_files


def CopyByFileList(files: list[str], destination: Path, overwrite=False) -> None:
    """
        Copies files to the target directory based on a list input. If 'overwrite'
        is true, files that already exist at the destination will be copied again,
        otherwise they will be skipped.
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

    files = FindFileByExtension(search_dir, file_extensions)
    for file in files:
        main_path = file["root"][1+len(search_dir):]
        target_path = os.path.join(destination_dir, main_path)

        # TODO: Fix error when trying to copy to a directory that doesn't exist
        # shutil.copy2(file, target_path)

    pass


def AddSourceToGYPI(search_dir: Path, gypi_file: Path, file_extensions: list[str]):
    """
        Searches a target directory for a project's source files based on input
        file extensions used as reference. Adds all found files to the target
        Node GYP include file. Note: Paths are relative to the Node GYP include
        file.
    """
    src_files = FindFileByExtension(search_dir, file_extensions)
    with open(gypi_file) as f:
        config = json.load(f)

    # Determine relationship between config and search path
    config_abspath = gypi_file.parents[0].absolute()
    search_abspath = search_dir.absolute()
    try:
        relative = config_abspath.relative_to(search_abspath)
    except ValueError as e:
        relative = search_abspath.relative_to(config_abspath)    

    # Add relateive path
    cleaned_files = []
    for file in src_files:
        clean = relative.joinpath(file)        
        cleaned_files.append(str(clean))
    config["sources"] = cleaned_files

    with open(gypi_file, 'w') as f:
        json.dump(config, f, indent=2)


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

    # Find all source files to be added to 'Positron' GYPI
    src_dir = "Source/Positron/src"
    config_file = "Source/Positron/config.gypi"
    AddSourceToGYPI(Path(src_dir), Path(config_file), header_extensions + source_extensions)

    # Find all source files to be added to 'November' GYPI
    src_dir = "Source/November/src"
    config_file = "Source/November/config.gypi"
    

    # Copy 'November' Headers
    src_dir = "Source/November/src"
    include_dir = "Source/November/include"
    # CopyByExtensions(Path(src_dir), include_dir, header_extensions)


def PostBuildEvents(config):
    # Add Command that copies DLLs to same directory as '.node' binary

    # Copy 'protobuf' DLLs
    dlls = [
        "Libraries/protobuf/build/tools/protobuf/zlib1.dll",
        "Libraries/protobuf/build/tools/protobuf/libprotobuf.dll",
        "Libraries/protobuf/build/tools/protobuf/libprotoc.dll",
    ]
    dest_dir = Path("build/Release")
    CopyByFileList(dlls, dest_dir)



if __name__ == "__main__":
    # Create the argument parser
    parser = argparse.ArgumentParser(description='Script description here')

    # Add the "cmd" argument with choices of "build" or "configure"
    commands = ['help', 'build', 'clean', 'configure', 'rebuild']
    parser.add_argument('cmd', choices=commands, help='Node GYP command to execute')
    parser.add_argument('mode', choices=['debug', 'release'], help='Execution mode')

    # Parse the command-line arguments
    args = parser.parse_args()

    # Access the value of the "cmd" argument
    cmd = args.cmd
    config = "release"
    options = []

    if config == "debug":
        options.append("debug")
    if config == "release":
        options.append("--release")

    options_string = " ".join(options)
    cmdline = f"node-gyp {cmd} {options_string}"

    PreBuildEvents(config)

    # Run Build Command Here
    os.system(cmdline)
    
    PostBuildEvents(config)
