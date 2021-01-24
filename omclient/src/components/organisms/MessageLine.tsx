import {useEffect} from "react";
import {Message} from "../../generated/graphql";

interface Props {
    messageList: Message[]
    subscribeMessage: () => void
}

const MessageLine = ({ messageList ,subscribeMessage }: Props) => {
    useEffect(() => {
        subscribeMessage()
    })
    return (
        <>
            {messageList ? messageList.map((m) => {
                return <p className="text-white" key={m.id}>{m.text}</p>
            }): <></> }
        </>
    )
}

export default MessageLine;