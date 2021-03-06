import {FC, useContext} from 'react'
import HeadInfo from "../../components/atoms/HeadInfo";
import Layout from "../../components/templates/Layout";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {Room} from "../../generated/graphql";
import CreateRoom from "../../components/templates/CreateRoom";
import {GET_ROOMS} from "../../models/gqls";
import RoomList from "../../components/templates/RoomList";
import withAuth from "../../lib/withAuth";
import Loading from "../../components/templates/Loading";
import {AuthContext} from "../../lib/auth";


const BrainStorming: FC = () => {
    const { loading, error, data } = useQuery(GET_ROOMS);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p> Error... </p>
    }

    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <HeadInfo
                title={"BRAIN STORMING"}
                description={"BRAIN STORMING"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout currentUser={currentUser}>
                <CreateRoom />
                {
                    !loading && (
                        data ? <RoomList rooms={data.rooms} /> : <></>
                    )
                }
            </Layout>
        </>
    )
}

export default withAuth(BrainStorming)