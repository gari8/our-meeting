import {FC, useContext} from "react";
import HeadInfo from "../components/atoms/HeadInfo";
import Layout from "../components/templates/Layout";
import HomeWithLogin from "../components/templates/HomeWithLogin";
import HomeWithoutLogin from "../components/templates/HomeWithoutLogin";
import withAuth from "../lib/withAuth";
import {AuthContext} from "../lib/auth";

const Dashboard: FC = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <HeadInfo
                title={"TOP PAGE"}
                description={"TOP"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout currentUser={currentUser} >
                <HomeWithLogin currentUser={currentUser} />
            </Layout>
        </>
    )
}

export default withAuth(Dashboard);