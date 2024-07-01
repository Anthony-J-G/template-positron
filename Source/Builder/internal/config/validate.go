// config.go
package config

import (
	"fmt"
	"os/exec"
)

func ValidateCmake() bool {
	cmd := exec.Command("cmake", "--version")
	output, err := cmd.Output()
	if err != nil {
		fmt.Println("CMake is not installed:", err)
		return false
	}
	fmt.Println("CMake is installed:", string(output))
	return true
}

func ValidateNodeJs() {

}

func ValidateNodeGyp() {

}
