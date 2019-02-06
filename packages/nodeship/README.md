# nodeship

Tool for easy shipping node apps.

## Prerequisites

 - Follow [easyship installation instructions](https://github.com/easyship-io/ship-cli/blob/master/docs/installation.md).

## Usage

Before running any command, navigate to application root directory (`cd <app-path-root>`).

### Commands

```
# Create new application
TODO

# Test
TODO

# Run development with nodemon
reactship dev

# Build for production
nodeship build
```
#### Create

TODO

#### Testing

TODO

#### Development

Command: `reactship dev`

Command will build application into `build` directory and run it via nodemon. Any change inside `src` directory will result in application rebuild. This command should be used during the development.

#### Build

Command: `nodeship build`

Command will build application for production. Output will be saved in to `build` directory.
