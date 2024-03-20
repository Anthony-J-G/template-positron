{
  "targets": [
    {
      "target_name": "Positron",
      "includes": [
        "Source/Positron/config.gypi",
        "Libraries/protobuf/config.gypi"
      ],
      "include_dirs": [
      ],
      "library_dirs": [
        "<(module_root_dir)/Libraries/protobuf/build/lib/",
      ],
      "libraries": [
        "-llibprotobuf.lib",
      ],
      "dependencies": [ 
      ]
    },
  ]
}
