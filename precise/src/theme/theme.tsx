import { createTheme } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'
import { defaultTokens, type TrinoStyleTokens } from './tokens'

export const createLightTheme = (tokens: TrinoStyleTokens = defaultTokens) =>
    createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: tokens.lightThemePrimaryMain,
            },
            secondary: {
                main: tokens.lightThemeSecondaryMain,
            },
        },
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: tokens.lightThemeLinkColor,
                        textDecoration: 'none',
                    },
                },
            },
        },
    })

export const createDarkTheme = (tokens: TrinoStyleTokens = defaultTokens) =>
    createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: tokens.darkThemePrimaryMain,
            },
            secondary: {
                main: tokens.darkThemeSecondaryMain,
            },
        },
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: tokens.darkThemeLinkColor,
                        textDecoration: 'none',
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: darkScrollbar(),
                },
            },
        },
    })

export const lightTheme = createLightTheme()

export const darkTheme = createDarkTheme()
