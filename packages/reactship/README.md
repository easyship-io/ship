# reactship

Tool for easy shipping react apps.

## Prerequisites

 - Follow [easyship installation instructions](https://github.com/easyship-io/ship-cli/blob/master/docs/installation.md).

## Usage

Before running any command, navigate to application root directory (`cd <app-path-root>`).

### Commands

```
# Create new application
reactship create <template> <app-name>

# Test
reactship test

# Run development server
reactship dev

# Build for production
reactship build
```
#### Create

Command: `reactship create <template> <app-name>`

Command will create new react project from provided template name inside provided `project-name` directory.

##### Arguments

- `template` - Template to create new project from. Allowed values: `redux-saga`;
- `project-name` - Name of the project. Directory containing source code will be named as this argument;

#### Testing

Command: `reactship test`

Command will run all tests (`.spec.js` files) inside `src` directory.

#### Development

Command: `reactship dev`

Command will run webpack development server and will serve all content inside `src` directory. This command should be used during the development.

#### Build

Command: `reactship build`

Command will build application for production. Output will be saved in to `build` directory.
