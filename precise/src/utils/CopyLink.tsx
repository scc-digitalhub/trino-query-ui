import React, { useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import { useTrinoTokens } from '../theme/useTrinoTokens'

interface CopyLinkProps {
    copy: () => void
}

const CopyLink: React.FC<CopyLinkProps> = ({ copy }) => {
    const tokens = useTrinoTokens()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        copy()
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <Tooltip title="Copy to clipboard">
            <Button
                variant={copied ? 'contained' : 'outlined'}
                color={copied ? 'success' : 'primary'}
                size="small"
                sx={{ fontSize: tokens.fontSizeActionButton }}
                startIcon={
                    copied ? (
                        <DoneOutlinedIcon sx={{ fontSize: tokens.fontSizeActionButton }} />
                    ) : (
                        <CopyAllOutlinedIcon sx={{ fontSize: tokens.fontSizeActionButton }} />
                    )
                }
                onClick={handleCopy}
            >
                {copied ? 'Copied!' : 'Copy'}
            </Button>
        </Tooltip>
    )
}

export default CopyLink
