// build.go
package build

import "Builder/internal/logger"

func ExecuteBuild() {
	logger.LogLvl("[Ready to Rumble]", logger.LvlInfo)

	// Check to see if the source repository exists

	logger.LogLvl("Registering project 'Deviation'", logger.LvlInfo)

	logger.LogLvl("Registering project 'Positron'", logger.LvlInfo)
	logger.LogLvl("Registering project 'Editor'", logger.LvlInfo)
	logger.LogLvl("Registering project 'Deviation Tests'", logger.LvlInfo)
}
