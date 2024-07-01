// logger.go
package logger

import (
	"fmt"
	"log"
	"time"
)

type logWriter struct {
}

var isInit bool = false

func (writer logWriter) Write(bytes []byte) (int, error) {
	return fmt.Print(time.Now().UTC().Format("[2006-01-02 15:04:05.999]") + string(bytes))
}

func InitLog() {
	log.SetFlags(0)
	log.SetOutput(new(logWriter))
	isInit = true
}

type Level int8

const (
	LvlInfo Level = iota
	LvlDebug
	LvlWarn
	LvlError
	LvlFatal
)

func LogLvl(message string, priority Level) {
	if !isInit {
		log.Panicln("Logger Uninitialized!")
		return
	}
	switch priority {
	case LvlInfo:
		log.Println(" [info]", message)
	case LvlDebug:
		log.Println(" [debug]", message)
	case LvlWarn:
		log.Println(" [warn]", message)
	case LvlError:
		log.Println(" [error]", message)
	case LvlFatal:
		log.Panicln(" [fatal]", message)
	default:
		log.Println(" []", message)
	}

}
