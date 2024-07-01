// main.go
package main

import (
	"Builder/internal/logger"
	"Builder/internal/tools"
	"flag"
	"fmt"
	"os"

	"github.com/pelletier/go-toml/v2"
)

type S struct {
	Key1 string
	Key3 string
}
type MyConfig struct {
	Version int
	Name    string
	Tags    []string
}

type Config struct {
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	logger.InitLog()

	// electron=make, electron=package, elctron=start
	var shouldStartElectron *bool = flag.Bool("electron:start", false, "Compile and start the Electron Executable")

	flag.Parse()

	// Check to see if positron.toml exists
	dat, err := os.ReadFile("positron.toml")
	check(err)
	var cfg map[string]interface{}
	err = toml.Unmarshal([]byte(dat), &cfg)
	check(err)

	data, ok := cfg["rust"]
	if !ok {
		logger.LogLvl("No Rust Library Config Found", logger.LvlInfo)
	} else {
		fmt.Println(data)
	}

	data, ok = cfg["c"]
	if !ok {
		logger.LogLvl("No C++ Library Configs Found", logger.LvlInfo)
	} else {
		fmt.Println(data)
	}

	data, ok = cfg["cpp"]
	if !ok {
		logger.LogLvl("No C++ Library Configs Found", logger.LvlInfo)
	} else {
		fmt.Println(data)
	}

	logger.LogLvl(fmt.Sprintf("Should Electron Start? %d", *shouldStartElectron), logger.LvlInfo)

	if *shouldStartElectron {
		tools.NodeJS()
	}

}
