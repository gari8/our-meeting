import {FC, useEffect, useState} from 'react'
import HeadInfo from "../../components/atoms/HeadInfo";
import Layout from "../../components/templates/Layout";
import {useMutation, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import {ACCEPT_MESSAGES, GET_MESSAGES, POST_MESSAGE} from "../../models/gqls";
import MessageLine from "../../components/organisms/MessageLine";
import withAuth from "../../lib/withAuth.";


const BrainStormingRoomID: FC = () => {
    const { room_id } = useRouter().query;
    const [text, inputText] = useState("");
    const [validate, checkValidate] = useState(true);
    const [postMessage] = useMutation(POST_MESSAGE);
    const {subscribeToMore, data, loading, error } = useQuery(
        GET_MESSAGES,
        {
            variables: { room_id: room_id},
        }
    );

    if (loading) {
        return <p> Loading... </p>
    }

    if (error) {
        return <p> Error... </p>
    }

    return (
        <>
            <HeadInfo
                title={"BRAIN STORMING"}
                description={"BRAIN STORMING"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout>
                <p className="text-white">{room_id}</p>
                <MessageLine messageList={data.messages} subscribeMessage={() => {
                    subscribeToMore({
                        document: ACCEPT_MESSAGES,
                        variables : {room_id: room_id},
                        updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData) return prev;
                            const newPosted = subscriptionData.data.messagePosted
                            const newList = prev.messages
                            return {
                                messages: newList.concat(newPosted)
                            }
                        }
                    })
                }} />

                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            const val = e.target.value;
                            inputText(val);
                            (val !== "" && val.length < 200) ? checkValidate(false) : checkValidate(true);
                        }}
                    />

                    <input type="submit" disabled={validate} onClick={(event) => {
                        let p = postMessage({variables: { room_id: room_id, text: text}});
                        p.then(() => inputText("")).catch(err => console.error(err))
                    }}/>
                </form>
            </Layout>
        </>
    )
}

export default withAuth(BrainStormingRoomID);