# nodeship

Tool for easy shipping node apps.

## Prerequisites

 - Follow [easyship installation instructions](https://github.com/easyship-io/ship-cli/blob/master/docs/installation.md).

## Usage

Before running any command, navigate to application root directory (`cd <app-path-root>`).

### Commands

```
# Create new application
nodeship create <template> <app-name>

# Test
TODO

# Run development with nodemon
reactship dev

# Build for production
nodeship build
```
#### Create

Command: `nodeship create <template> <app-name>`

Command will create new node project from provided template name inside provided `project-name` directory.

##### Arguments

- `template` - Template to create new project from. Allowed values: `empty`;
- `project-name` - Name of the project. Directory containing source code will be named as this argument;

#### Testing

TODO

#### Development

Command: `reactship dev`

Command will build application into `build` directory and run it via nodemon. Any change inside `src` directory will result in application rebuild. This command should be used during the development.

#### Build

Command: `nodeship build`

Command will build application for production. Output will be saved in to `build` directory.
