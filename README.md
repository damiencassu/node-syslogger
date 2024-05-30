# node-syslogger
The node-syslogger module offers a simple and clean way to write messages to a log file regarding their severity and the configured log level output.

## Usage

### Import package

In your node code:

```node
const SYS_LOGGER = require('@damiencassu/node-syslogger');
````

Do not forget to update your package.json dependencies accordingly

```json
"dependencies": {
	"@damiencassu/node-syslogger": "latest"
}
```

You might also need to configure npm to look for this package in Github Packages instead of npmjs.com by adding this line to your .npmrc configuration file

```ini
@damiencassu:registry=https://npm.pkg.github.com
```

### Create a logger object

```node
var sysLogger = new SYS_LOGGER("info", "./my_log_file.log");
```

Valid log levels are the following ones: fatal, error, warn, info, debug
* If an invalid log level is given to the constructor, the info level will be used by default.
* If info level is used, only info, warn, error and fatal tagged messages will be written to file, debug ones will be skipped 

### Configure the wanted log level

You can change the configured log level anytime in your code
```node
sysLogger.logLevel = "warn";
```

You can also read the current configured log level
```node
console.log(sysLogger.logLevel);
```

### Log messages

To write messages with the fatal level
```node
sysLogger.fatal("TEST", "Everything is gonna blow, run !");
```

To write messages with the warn level
```node
sysLogger.warn("TEST", "The situation is strange but we can continue");
```

To write messages with the debug level
```node
sysLogger.debug("TEST", "Everything is fine, I just like talkling ;) ");
```

Replace the "TEST" first argument by a name which helps to identify which part of your code wrote the log (a function, a module...)

### See results

Considering previous examples, the following lines are going to be written in `./my_log_file.log"`

```
Wed, 29 May 2024 20:53:32 GMT - FATAL - TEST - Everything is gonna blow, run !
Wed, 29 May 2024 20:53:35 GMT - WARN - TEST - The situation is strange but we can continue
```

And the debug tagged message is not written as our syslogger has been configured to only write warn and above logs.
