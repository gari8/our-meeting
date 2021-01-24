import {useMutation} from "@apollo/client";
import {useReducer, useState} from "react";
import MiniForm from "../organisms/MiniForm";
import {CREATE_ROOM} from "../../models/gqls";
import {useRouter} from "next/router";

interface Props {

}

type EType = {
    data: {
        createRoom: {
            ulid: string
        }
    }
}

// export type RoomActionType =
//     | {
//         type: "name"
//     }
//     | {
//         type: "description"
//     };

const initialRoomState = {
    room_name: "",
    description: "",
};

const roomReducer = (state, action) => {
    switch (action.type) {
        case "name":
            return { ...state, room_name: action.payload };
        case "description":
            return { ...state, description: action.payload };
        default:
            throw new Error();
    }
}



const CreateRoom = ({  }: Props) => {
    const [mutateForm] = useMutation(CREATE_ROOM)
    const router = useRouter()
    const [roomState, dispatch] = useReducer(roomReducer, initialRoomState);

    const submit = async (event) => {
        let data = mutateForm({variables: roomState})
        data.then((e: EType) => {
            router.push("/brain-storming/" + e.data.createRoom.ulid)
        }).catch(e => console.error(e));
    }

    return (
        <>
            <MiniForm
                state={roomState}
                setFunction={dispatch}
                submit={submit}
            />
        </>
    )
}

export default CreateRoom;