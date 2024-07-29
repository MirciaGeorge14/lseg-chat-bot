import { Box, ListItem } from "@mui/material"
import { createSx } from "../utils"
import { colorPalette } from "../ColorPalette"

const style = createSx({
    userMessageWrapper: {
        display: 'flex',
        justifyContent: 'end'
    },
    userMessage: {
        maxWidth: '200px',
        padding: '10px',
        borderRadius: '5px 5px 1px 5px',
        backgroundColor: colorPalette.grey[200],
        wordBreak: 'break-all'
    },
})

interface UserMessageProps {
    text: string
}

export function UserMessage({ text }: UserMessageProps) {
    return (
        <ListItem style={style.userMessageWrapper}>
            <Box sx={style.userMessage}>
                {text}
            </Box>
        </ListItem>
    )
}