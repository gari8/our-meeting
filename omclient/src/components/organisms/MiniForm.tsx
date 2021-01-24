import TextInput from "../atoms/TextInput";
import SubmitBtn from "../atoms/SubmitBtn";
import {Dispatch} from "react";
// import {RoomActionType} from "../templates/CreateRoom";


interface Props {
    state: any
    setFunction: Dispatch<any>
    submit: (event) => void
}

const MiniForm = ({ setFunction, submit, state }: Props) => {
    return (
        <>
            <form
                className="rounded px-6 py-2 bg-gray-300"
                onSubmit={(e) => {
                e.preventDefault()
            }}>
                <TextInput input={state.room_name} setFunction={setFunction} actionType="name"/>
                <TextInput input={state.description} setFunction={setFunction} actionType="description"/>
                <SubmitBtn submit={submit} state={state} />
            </form>
        </>
    )
}

export default MiniForm;