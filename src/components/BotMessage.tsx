import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { colorPalette } from "../ColorPalette";
import { createSx } from "../utils";
import { SmartToy } from "@mui/icons-material";
import { Message } from "../types";
import { stockExchanges } from "../../data/data";

enum Actions {
    GO_BACK = 'Go Back',
    MAIN_MENU = 'Main Menu'
}

const style = createSx({
    botMessageWrapper: {
        display: 'flex',
        gap: '3px',
        alignItems: 'end'
    },
    botMessage: (hasData: boolean) => ({
        ...(hasData ? { width: '500px' } : { maxWidth: '500px' }),
        padding: '10px',
        borderRadius: '5px 5px 5px 1px',
        backgroundColor: colorPalette.blue[200],
        wordBreak: 'break-all'
    }),
    botIcon: {
        fontSize: '16px',
        color: colorPalette.blue[500]
    },
    optionList: {
        backgroundColor: colorPalette.blue[200],
        padding: '10px 0px 0px'
    },
    option: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colorPalette.common.white,
        marginBottom: '2px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
})


interface BotMessageProps {
    message: Message,
    disabled: boolean
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>

}

export function BotMessage({ message: { data, text }, disabled, setMessages }: BotMessageProps) {
    function hasData(data: any) {
        if (data && Array.isArray(data) && data.length > 0) {
            return true
        }

        return false
    }

    function handleClick(data: any) {
        if ('stockExchange' in data && 'topStocks' in data) {
            if (hasData(data.topStocks)) {
                setMessages(prevMessages => [...prevMessages,
                {
                    isBot: false,
                    text: data.stockExchange
                },
                {
                    isBot: true,
                    text: 'Please select a stock.',
                    data: [...data.topStocks,
                    {
                        action: Actions.GO_BACK
                    }]
                }])

                return;
            }
        }

        if ('stockName' in data && 'price' in data) {
            setMessages(prev => [...prev,
            {
                isBot: false,
                text: data.stockName
            },
            {
                isBot: true,
                text: `Stock price of ${data.stockName} is ${data.price}. Please select an option.`,
                data: [
                    {
                        action: Actions.MAIN_MENU
                    },
                    {
                        action: Actions.GO_BACK
                    }
                ]
            }])

            return;
        }

        if ('action' in data) {
            if (data.action === Actions.MAIN_MENU) {
                setMessages(prev => [...prev,
                {
                    isBot: false,
                    text: Actions.MAIN_MENU
                },
                {
                    isBot: true,
                    text: 'Please select a Stock Exchange.',
                    data: stockExchanges
                }])
            } else {
                setMessages(prev => [...prev,
                {
                    isBot: false,
                    text: Actions.GO_BACK
                },
                prev[prev.length - 3]])
            }

            return;
        }

        setMessages([{
            isBot: true,
            text: 'Sorry, something went wrong! Please try again later!'
        }])
    }

    return (
        <ListItem style={style.botMessageWrapper}>
            <SmartToy sx={style.botIcon} />

            <Box sx={style.botMessage(hasData(data))}>
                {text}
                {data && Array.isArray(data) &&
                    <List sx={style.optionList}>
                        {data.map(option => (
                            <ListItemButton
                                sx={style.option}
                                disabled={disabled}
                                onClick={() => handleClick(option)}>
                                {option.stockExchange || option.stockName || option.action}
                            </ListItemButton>
                        ))
                        }
                    </List>
                }
            </Box>
        </ListItem>
    )
}