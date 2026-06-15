import React from 'react'
import { defaultTokens, TrinoStyleTokens } from './tokens'
import { TokensContext } from './TokenContext'

interface TrinoTokensProviderProps {
    tokens?: Partial<TrinoStyleTokens>
    children: React.ReactNode
}

/**
 * Provides resolved style tokens to the Trino Query UI component tree.
 * Wrap `QueryEditor` with this provider (or use the `tokens` prop on
 * `QueryEditor` which wraps it automatically).
 */
export const TrinoTokensProvider: React.FC<TrinoTokensProviderProps> = ({ tokens, children }) => (
    <TokensContext.Provider value={tokens ? { ...defaultTokens, ...tokens } : defaultTokens}>
        {children}
    </TokensContext.Provider>
)
