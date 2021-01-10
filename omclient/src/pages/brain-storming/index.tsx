import {FC} from 'react'
import HeadInfo from "../../components/atoms/HeadInfo";
import Layout from "../../components/templates/Layout";
import Link from "next/link";
import {ColorMap} from "../../models/resource";
import {addApolloState, initializeApollo} from "../../lib/applicationClient";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import {Room} from "../../generated/graphql";

export const GET_ROOMS = gql`
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

const BrainStorming: FC = () => {
    const { loading, error, data } = useQuery(GET_ROOMS);
    console.log(loading, data, error)
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
                <p className="text-white">brainstorming</p>
                {
                    !loading && (
                        <ul>
                            {data.rooms.map((r: Room) => {
                                return <li key={r.ulid} className="text-white">{r.room_name} : {r.disabled? "x" : "o"} : {r.own_messages.length}</li>
                            })}
                        </ul>
                    )
                }
            </Layout>
        </>
    )
}

// export async function getStaticProps() {
//     const apolloClient = initializeApollo()
//
//     await apolloClient.query({
//         query: GET_ROOMS,
//     })
//
//     return addApolloState(apolloClient, {
//         props: {
//             initialApolloState: apolloClient.cache.extract(),
//         },
//     })
// }

export default BrainStorming