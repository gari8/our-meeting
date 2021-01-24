import gql from "graphql-tag";

export const GET_ROOMS = gql`
    query {
        rooms {
            room_name
            disabled
            description
            ulid
            own_messages {
                __typename
            }
        }
    }
`

export const GET_MESSAGES = gql`
    query($room_id: String!) {
        messages(room_id: $room_id) {
            id
            text
            room_id
        }
    }
`

export const POST_MESSAGE = gql`
    mutation($room_id: ID!, $text: String!) {
        postMessage(room_id: $room_id, text: $text) {
            id
            text
            room_id
        }
    }
`

export const CREATE_ROOM = gql`
    mutation($room_name: String!, $description: String) {
        createRoom(room_name: $room_name, description: $description) {
            room_name
            disabled
            description
            ulid
        }
    }
`

export const ACCEPT_MESSAGES = gql`
    subscription($room_id: ID!) {
        messagePosted(room_id: $room_id) {
            room_id
            text
            id
        }
    }
`