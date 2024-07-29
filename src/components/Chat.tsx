import { Box } from "@mui/material"
import { createSx } from "../utils"
import ChatHeader from "./ChatHeader"
import { useState } from "react"
import { colorPalette } from "../ColorPalette"
import ChatBody from "./ChatBody"

const CHAT_OPENED_WIDTH = 800
const CHAT_CLOSED_WIDTH = 200
const CHAT_OPENED_HEIGHT = 700
const CHAT_CLOSED_HEIGHT = 40

const style = createSx({
    root: (open: boolean) => ({
        display: 'flex',
        flexDirection: 'column',
        width: open ? CHAT_OPENED_WIDTH : CHAT_CLOSED_WIDTH,
        height: open ? CHAT_OPENED_HEIGHT : CHAT_CLOSED_HEIGHT,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colorPalette.common.white,
        overflow: 'hidden',
        borderRadius: '7px 7px 0px 0px',
        transition: 'width 0.2s linear, height 0.2s linear'
    })
})

export default function Chat() {
    const [open, setOpen] = useState(true)

    return (
        <Box sx={style.root(open)} >
            <ChatHeader setOpen={setOpen} />
            <ChatBody />
        </Box>
    )
}
