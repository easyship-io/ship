import React from 'react';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        secondary: purple,
    },
    typography: {
        useNextVariants: true,
    }
});

const ThemeProvider = (
    {
        children
    }) => (
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
);

export default ThemeProvider;
