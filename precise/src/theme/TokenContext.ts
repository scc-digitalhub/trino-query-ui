import { createContext } from 'react'
import { defaultTokens, TrinoStyleTokens } from './tokens'
/**
 * React context that carries the active `TrinoStyleTokens`.
 * All Trino Query UI components read from this context.
 * Falls back to `defaultTokens` when no provider is present.
 */
export const TokensContext = createContext<TrinoStyleTokens>(defaultTokens)
