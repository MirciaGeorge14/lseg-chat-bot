import { Box, List } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createSx } from "../utils";
import { CHAT_HEADER_HEIGHT } from "./ChatHeader";
import { stockExchanges } from '../../data/data';
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";
import { Message } from "../types";

const style = createSx({
    root: {
        height: `calc(100% - ${CHAT_HEADER_HEIGHT})`,
        width: '100%',
        overflow: 'auto',
        scrollBehavior: 'smooth'
    }
})

export default function ChatBody() {
    const chatBodyRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (stockExchanges && stockExchanges.length > 0) {
            setMessages([
                {
                    isBot: true,
                    text: 'Hello! Welcome to LSEG. I\'m here to help you.'
                },
                {
                    isBot: true,
                    text: 'Please select a Stock Exchange.',
                    data: stockExchanges
                }
            ])
        } else {
            setMessages([{
                isBot: true,
                text: 'Sorry, something went wrong! Please try again later!'
            }])
        }
    }, [])

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [messages])

    return (
        <Box ref={chatBodyRef} sx={style.root}>
            <List>
                {messages && messages.map((message, index) => (
                    <>
                        {message.isBot ?
                            <BotMessage
                                message={message}
                                disabled={index !== messages.length - 1}
                                setMessages={setMessages} />
                            :
                            <UserMessage text={message.text} />
                        }
                    </>
                ))}
            </List>
        </Box>
    )
}