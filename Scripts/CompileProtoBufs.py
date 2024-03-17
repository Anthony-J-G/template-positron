import os


SRC_DIR = "Source/Positron/buffers"
DST_DIR = "Source/Positron/src/Buffers"

FILES = os.listdir(SRC_DIR)

for file in FILES:
    os.system(f".\\Libraries\\protobuf\\build\\tools\\protobuf\\protoc -I={SRC_DIR} --cpp_out={DST_DIR} {os.path.join(SRC_DIR, file)}")