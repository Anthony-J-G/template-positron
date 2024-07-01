package tools

import (
	"Builder/internal/logger"
	"bufio"
	"fmt"
	"os/exec"
)

func NodeJS() bool {
	cmd := exec.Command("npm", "run", "compile")
	output, err := cmd.Output()
	if err != nil {
		fmt.Println("Error while compiling npm:", err)
		fmt.Printf("%s\n", output)

		return false
	}
	logger.LogLvl("Frontend compiled", logger.LvlInfo)

	cmd = exec.Command("npm", "run", "start")
	stderr, _ := cmd.StdoutPipe()
	cmd.Start()

	logger.LogLvl("Starting App", logger.LvlInfo)
	scanner := bufio.NewScanner(stderr)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		m := scanner.Text()

		// Skip Empty Lines
		if m == "" {
			continue
		}
		logger.LogLvl(m, logger.LvlInfo)
	}
	cmd.Wait()

	return true
}
