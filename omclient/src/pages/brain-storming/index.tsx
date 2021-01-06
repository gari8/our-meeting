import {FC} from 'react'
import HeadInfo from "../../components/atoms/HeadInfo";
import Layout from "../../components/templates/Layout";
import Link from "next/link";
import {ColorMap} from "../../models/resource";

const BrainStorming = ({}) => {
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
                brain-storming
            </Layout>
        </>
    )
}

export default BrainStorming