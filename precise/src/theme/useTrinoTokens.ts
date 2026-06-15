import { useContext } from 'react'
import { TokensContext } from './TokenContext'

/** Hook for functional components — returns the active `TrinoStyleTokens`. */

export const useTrinoTokens = () => useContext(TokensContext)
