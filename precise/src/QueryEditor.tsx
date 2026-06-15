import React, { useEffect, useMemo, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { ThemeProvider } from '@mui/material/styles'
import QueryCell from './QueryCell'
import { createDarkTheme, createLightTheme } from './theme/theme'
import Queries from './schema/Queries'
import QueryInfo from './schema/QueryInfo'
import CatalogViewer from './controls/catalog_viewer/CatalogViewer'
import SchemaProvider from './sql/SchemaProvider'
import { ResultSetStore } from './utils/resultSetStore'
import { defaultTokens, type TrinoStyleTokens } from './theme/tokens'
import { TrinoTokensProvider } from './theme/TrinoTokensProvider'

interface IQueryEditor {
    height: number
    theme?: 'dark' | 'light'
    enableCatalogSearchColumns?: boolean
    requestHeaders?: Record<string, string>
    resultSetStore?: ResultSetStore
    tokens?: Partial<TrinoStyleTokens>
}

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{
    open?: boolean
    drawerWidth?: number
}>(({ theme, open, drawerWidth = defaultTokens.drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
    drawerWidth?: number
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth = defaultTokens.drawerWidth }) => ({
    position: 'absolute',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export const QueryEditor = ({
    height,
    theme,
    enableCatalogSearchColumns,
    requestHeaders,
    resultSetStore,
    tokens: styleTokens,
}: IQueryEditor) => {
    const resolvedTokens = useMemo(
        () => (styleTokens ? { ...defaultTokens, ...styleTokens } : defaultTokens),
        [styleTokens]
    )
    const drawerWidth = resolvedTokens.drawerWidth
    const [queries, setQueries] = useState<Queries>(() => new Queries())
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
    const [queryRunning, setQueryRunning] = useState<boolean>(false)
    const [currentQuery, setCurrentQuery] = useState<QueryInfo>(queries.getCurrentQuery())
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const containerRef = useRef(null)

    // Propagate request headers to SchemaProvider so catalog browsing is authenticated
    useEffect(() => {
        SchemaProvider.setRequestHeaders(requestHeaders ?? {})
    }, [requestHeaders])

    const muiThemeToUse = useMemo(() => {
        if (theme === 'dark') {
            return createDarkTheme(resolvedTokens)
        } else if (theme === 'light') {
            return createLightTheme(resolvedTokens)
        } else if (prefersDarkMode) {
            return createDarkTheme(resolvedTokens)
        } else {
            return createLightTheme(resolvedTokens)
        }
    }, [prefersDarkMode, resolvedTokens, theme])

    const applyQueryUpdates = (updates: Partial<QueryInfo>) => {
        const activeQuery = queries.getCurrentQuery()

        if (!activeQuery) {
            return
        }

        queries.updateQuery(activeQuery.id, updates)
        setCurrentQuery((prev) => ({ ...prev, ...updates }))
    }

    const setQueryContent = (query: string, catalog?: string, schema?: string) => {
        const updates: Partial<QueryInfo> = {}

        if (query) {
            updates.query = query
        }

        if (catalog) {
            updates.catalog = catalog
        }

        if (schema) {
            updates.schema = schema
        }

        applyQueryUpdates(updates)
    }

    const appendQueryContent = (query: string, catalog?: string, schema?: string) => {
        const activeQuery = queries.getCurrentQuery()
        const updates: Partial<QueryInfo> = {}

        if (query !== undefined) {
            const existingQuery = activeQuery.query || ''
            const separator = existingQuery.trim() === '' || query.trim() === '' ? '' : '\n\n'
            updates.query = existingQuery + separator + query
        }

        if (catalog !== undefined) {
            updates.catalog = catalog
        }

        if (schema !== undefined) {
            updates.schema = schema
        }

        applyQueryUpdates(updates)
    }

    return (
        <TrinoTokensProvider tokens={resolvedTokens}>
            <ThemeProvider theme={muiThemeToUse}>
                <CssBaseline />
                <Box
                    ref={containerRef}
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        position: 'relative',
                        overflow: 'hidden',
                        height: height,
                    }}
                >
                    <AppBar color="transparent" open={drawerOpen} drawerWidth={drawerWidth} />

                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={drawerOpen}
                        ModalProps={{
                            container: containerRef.current,
                            disablePortal: true,
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    position: 'absolute',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                },
                            },
                        }}
                    >
                        <CatalogViewer
                            onGenerateQuery={setQueryContent}
                            onAppendQuery={appendQueryContent}
                            onDrawerToggle={() => setDrawerOpen(false)}
                            enableSearchColumns={enableCatalogSearchColumns}
                            requestHeaders={requestHeaders}
                        />
                    </Drawer>

                    <Main open={drawerOpen} drawerWidth={drawerWidth} sx={{ p: 0 }}>
                        <QueryCell
                            queries={queries}
                            drawerOpen={drawerOpen}
                            height={height}
                            onDrawerToggle={() => setDrawerOpen(true)}
                            theme={theme}
                            requestHeaders={requestHeaders}
                            resultSetStore={resultSetStore}
                        />
                    </Main>
                </Box>
            </ThemeProvider>
        </TrinoTokensProvider>
    )
}

export default QueryEditor
