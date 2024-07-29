import { Box } from "@mui/material"
import { createSx } from "../utils"
import { colorPalette } from "../ColorPalette"
import { SmartToy } from "@mui/icons-material"

export const CHAT_HEADER_HEIGHT = 50

const style = createSx({
    root: {
        display: 'flex',
        width: '100%',
        height: CHAT_HEADER_HEIGHT,
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: colorPalette.blue[500],
        color: colorPalette.common.white,
        cursor: 'pointer'
    }
})

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatHeader({ setOpen }: Props) {

    function handleClick() {
        setOpen(prev => !prev)
    }

    return (
        <Box sx={style.root} onClick={handleClick}>
            <SmartToy />
            LSEG ChatBot
        </Box>
    )
}
