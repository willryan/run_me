# `run_me`
A command line program to dispatch intelligently on what to do for a given file and line number.

## Usage

`$> run_me <config> <file> <line#> `

* config - a JSON configuration file that tells `run_me` what to do for a given file name and line number
* file - the file name for which to look for commands in the JSON config
* line# - the line number of the file to send to commands in the JSON config

## Description
`run_me` can be used to dispatch a shell command based on the file name (and line number) passed in. For example, if you are building a web app with a front end in Javascript and a back end in Ruby, you can configure `run_me` so that if you pass in a Ruby file it will run rspec, but if you pass in a Javascript file it will run mocha (or your preferred testing framework). Similarly, if your command to execute unit tests is different than your command to execute system tests (e.g. `cucumber`), you can use `run_me` to abstract around the different commands merely based on which file you want to test. A major goal for `run_me` is to be able to bind one command into your editor and have the tooling just know what to do.

## Getting Started

### Create Config File

`run_me`'s behavior is driven by a JSON config file, which is the first argument passed to it. This is where you'll need to set up your intended behavior. 

The JSON config file specifies an array of `runners` which are checked in turn. Each runner has a `regex` and a `cmd`.
The regex will be checked against the file name passed in as the second argument. If `regex` matches, then `cmd` will be evaluated and run. 

#### Example
```javascript
{
  "runners": [
    {
      "regex": "spec\\.ts$", // file.match(/spec\.ts$/)
      "cmd": "yarn test ${file}"
    },
    {
      "regex": "features", // file.match(/features/)
      "cmd": "bundle exec cucumber ${fileLine(':')}"
    } 
  ]
}
```

#### Available Functions
The following variables and functions are accessible to `cmd`:

* `file` - the 2nd argument to `run_me`
* `line` - the 3rd argument to `run_me`
* `match` - the RegExp match object
* `fileLine(join: string) : string` - a function which will join `file` and `line` with a given string, e.g. ':'

In the above example, any file passed in matching "*spec.ts" will cause run_me to execute `yarn test filename`.

#### Reference
Technically, the JSON config file should match the type of `RunMeConfig` as seen below:
```typescript
export class RunMeMatch {
  regex: string
  cmd: string
}

export class RunMeConfig {
  runners: RunMeMatch[]
}
```

### Using `run_me`

With your JSON config in place, you can invoke `run_me`, typically from your project root.

Examples:
* `run_me tests.json spec/services/service_unit_spec.rb:23`
* `run_me build.json src/components/widget.tsx`
* `run_me tests.json features/cuke.feature:42`

Additionally, you can bind `run_me` into shortcut commands in your favorite editor. I developed `run_me` specifically with VS Code in mind, but it should work with any editor that supports integration with command line tasks. 

#### Logging the command

If env var `LOG_RUN_ME_COMMAND` is truthy, `run_me` will send the command to the console before running it.



