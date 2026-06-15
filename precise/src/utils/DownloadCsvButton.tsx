import React from 'react'
import { Button, Tooltip } from '@mui/material'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import { useTrinoTokens } from '../theme/useTrinoTokens'

interface DownloadCsvButtonProps {
    download: () => void
}

const DownloadCsvButton: React.FC<DownloadCsvButtonProps> = ({ download }) => {
    const tokens = useTrinoTokens()
    return (
        <Tooltip title="Download as CSV">
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ fontSize: tokens.fontSizeActionButton }}
                startIcon={<DownloadOutlinedIcon sx={{ fontSize: tokens.fontSizeActionButton }} />}
                onClick={download}
            >
                CSV
            </Button>
        </Tooltip>
    )
}

export default DownloadCsvButton
