import type { CSSProperties } from 'react'

/**
 * Style tokens for the Trino Query UI component library.
 *
 * Pass a partial override object via the `tokens` prop on `QueryEditor` to
 * customise the appearance without forking component code.  Unspecified tokens
 * fall back to `defaultTokens`, which reproduces the original appearance.
 *
 * @example
 * ```tsx
 * <QueryEditor
 *   tokens={{ drawerWidth: 300, fontFamilyMono: '"Fira Code", monospace' }}
 *   ...
 * />
 * ```
 */
export interface TrinoStyleTokens {
    // ── Layout ────────────────────────────────────────────────────────────────

    /** Width of the catalog browser drawer in pixels. Default: `260` */
    drawerWidth: number

    /** Height of the query-cell toolbar in pixels. Default: `64` */
    toolbarHeight: number

    /** Height of the tabs bar in pixels. Default: `64` */
    tabsHeight: number

    /** Height of the result-set status bar in pixels. Default: `42` */
    resultBarHeight: number

    /** Minimum height of a single tab chip in pixels. Default: `36` */
    tabMinHeight: number

    /** Minimum height of a tree item row in the catalog browser in pixels. Default: `24` */
    treeItemMinHeight: number

    /** Maximum height of the tabs overflow popover list in pixels. Default: `300` */
    tabsEllipsisMenuMaxHeight: number

    // ── Colors ───────────────────────────────────────────────────────────────

    /** Light theme primary color. Default: `'#0b1367'` */
    lightThemePrimaryMain: string

    /** Light theme secondary color. Default: `'#f50057'` */
    lightThemeSecondaryMain: string

    /** Light theme link color. Default: `'#f50057'` */
    lightThemeLinkColor: string

    /** Dark theme primary color. Default: `'#90caf9'` */
    darkThemePrimaryMain: string

    /** Dark theme secondary color. Default: `'#f48fb1'` */
    darkThemeSecondaryMain: string

    /** Dark theme link color. Default: `'#dd33fa'` */
    darkThemeLinkColor: string

    // ── Typography ────────────────────────────────────────────────────────────

    /** Font family used for monospace contexts (catalog/schema names, SQL inputs). Default: `'monospace'` */
    fontFamilyMono: NonNullable<CSSProperties['fontFamily']>

    /** Font weight for label text and table / data-grid headers. Default: `600` */
    fontWeightLabel: NonNullable<CSSProperties['fontWeight']>

    // ── Font sizes ────────────────────────────────────────────────────────────

    /** Font size for compact toolbar action icons (format, maximize…). Default: `'1.2rem'` */
    fontSizeToolbarIcon: string

    /**
     * Font size for small action buttons (Clear results, Copy, Download CSV).
     * Also used for the catalog-browser "Search columns" label.
     * Default: `'0.5rem'`
     */
    fontSizeActionButton: string

    /** Font size for the catalog browser filter input and its labels. Default: `'0.6rem'` */
    fontSizeCatalogFilter: string

    /** Font size for the result-set status bar row. Default: `'0.8rem'` */
    fontSizeResultBar: string

    /** Font size (px) for icon buttons inside the catalog browser tree nodes. Default: `14` */
    fontSizeCatalogTreeIcon: number

    /** Font size (px) for the clear icon inside query-parameter text fields. Default: `16` */
    fontSizeClearIcon: number
}

/** Default token values */
export const defaultTokens: TrinoStyleTokens = {
    drawerWidth: 260,
    toolbarHeight: 64,
    tabsHeight: 64,
    resultBarHeight: 42,
    tabMinHeight: 36,
    treeItemMinHeight: 24,
    tabsEllipsisMenuMaxHeight: 300,
    lightThemePrimaryMain: '#0b1367',
    lightThemeSecondaryMain: '#f50057',
    lightThemeLinkColor: '#f50057',
    darkThemePrimaryMain: '#90caf9',
    darkThemeSecondaryMain: '#f48fb1',
    darkThemeLinkColor: '#dd33fa',
    fontFamilyMono: 'monospace',
    fontWeightLabel: 600,
    fontSizeToolbarIcon: '1.2rem',
    fontSizeActionButton: '0.5rem',
    fontSizeCatalogFilter: '0.6rem',
    fontSizeResultBar: '0.8rem',
    fontSizeCatalogTreeIcon: 14,
    fontSizeClearIcon: 16,
}
