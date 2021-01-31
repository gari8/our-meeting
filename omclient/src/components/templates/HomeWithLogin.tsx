import {FC} from "react";
import firebase from "firebase";
import Link from "next/link";

interface Props {
    currentUser: firebase.User
}

const HomeWithLogin: FC<Props> = ({ currentUser }) => {
    return (
        <>
            <Link href="/brain-storming">BrainStorming</Link>
        </>
    )
}

export default HomeWithLogin;