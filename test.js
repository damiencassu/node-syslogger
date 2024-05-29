//Test file for syslogger module

//Module loading
const SYS_LOGGER = require("./index");
const PATH = require("node:path");
const CPR = require("node:child_process");
const PR = require('node:process');

//Constants
const LOG_FILE_SYS = "server.log";
const SETTER_GETTER_ERROR = 1;
const LOG_WRITE_ERROR = 2;

//Variables
var errorCode = 0;

//Creation of a new syslogger instance
var sysLogger = new SYS_LOGGER("info", PATH.join(__dirname, LOG_FILE_SYS));

//Setter test
sysLogger.logLevel = "warn";

//Getter test
if (sysLogger.logLevel != "warn"){

	errorCode = SETTER_GETTER_ERROR;
}

//Log test
sysLogger.warn("TEST", "Warn log test message - should be logged");
sysLogger.error("TEST", "Error log test message - should be logged");
sysLogger.info("TEST", "Info log test message - should NOT be logged");

CPR.exec("grep \"should NOT be logged\" " + LOG_FILE_SYS + " | wc -l", function(error, stdout, stderr){

	if(stdout != 0){
		errorCode = LOG_WRITE_ERROR;
	}
	console.log("Exit code: " + errorCode);
	PR.exit(errorCode);
});

