import {Dispatch, SetStateAction} from "react";
// import {RoomActionType} from "../templates/CreateRoom";

interface Props {
    input: string
    setFunction: Dispatch<any>
    actionType: string
}

const TextInput = ({ setFunction, actionType, input }: Props) => {
    return (
        <>
            <input
                className="rounded block my-4 w-full h-10 p-2"
                type="text"
                value={input}
                onChange={e => {
                    setFunction({ type: actionType, payload: e.target.value });
                }}
            />
        </>
    )
}

export default TextInput;