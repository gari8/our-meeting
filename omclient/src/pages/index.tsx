import {FC, useContext, useEffect} from 'react'
import HeadInfo from "../components/atoms/HeadInfo";
import Layout from "../components/templates/Layout";
import Link from "next/link";
import {ColorMap} from "../models/resource";
import router from "next/router";
import {AuthContext} from "../lib/auth";
import {firebase} from "../lib/firebase";
import HomeWithoutLogin from "../components/templates/HomeWithoutLogin";

const Home: FC = () =>  {
    const { currentUser } = useContext(AuthContext);
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
            .then(() => router.push("/dashboard"))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        currentUser ? router.push("/dashboard") : ""
    }, [])

    return (
        <>
            <HeadInfo
                title={"TOP PAGE"}
                description={"TOP"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout withoutSideBar={true} >
                <HomeWithoutLogin handleSignIn={handleSignIn} />
            </Layout>
        </>
    )
}

export default Home;
