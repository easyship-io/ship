# reactship

Tool for easy shipping react apps.

## Prerequisites

 - Follow [easyship installation instructions](https://github.com/easyship-io/ship-cli/blob/master/docs/installation.md).

## Usage

Before running any command, navigate to application root directory (`cd <app-path-root>`).

### Commands

```
# Test
reactship test

# Run development server
reactship dev

# Build for production
reactship build
```

#### Testing

Command: `reactship test`

Command will run all tests (`.spec.js` files) inside `src` directory.

#### Development

Command: `reactship dev`

Command will run webpack development server and will serve all content inside `src` directory. This command should be used during the development.

#### Build

Command: `reactship build`

Command will build application for production. Output will be saved in to `build` directory.
