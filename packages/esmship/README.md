# esmship

Tool for easy shipping es modules.

## Prerequisites

 - Follow [easyship installation instructions](https://github.com/easyship-io/ship-cli/blob/master/docs/installation.md).

## Usage

Before running any command, navigate to module root directory (`cd <module-path-root>`).

### Commands

```
# Create new module
esmship create <module-name>

# Test
TODO

# Build for production
esmship build
```
#### Create

Command: `esmship create <module-name>`

Command will create new es module inside provided `module-name` directory.

##### Arguments

- `module-name` - Name of the module. Directory containing source code will be named as this argument;

#### Testing

TODO

#### Build

Command: `esmship build`

Command will build module for production. Output will be saved in to `build` directory.
