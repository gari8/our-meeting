import {FC} from 'react'
import HeadInfo from "../../components/atoms/HeadInfo";
import Layout from "../../components/templates/Layout";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import {useRouter} from "next/router";

export const GET_MESSAGES = gql`
    query {
        rooms {
            room_name
            disabled
            ulid
            own_messages {
                __typename
            }
        }
    }
`

const BrainStormingRoomID: FC = () => {
    const router = useRouter();
    const { room_id } = router.query;
    const { loading, error, data } = useQuery(GET_MESSAGES);
    return (
        <>
            <HeadInfo
                title={"BRAIN STORMING"}
                description={"BRAIN STORMING"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout withoutSideBar={true}>
                {room_id}
            </Layout>
        </>
    )
}

export default BrainStormingRoomID