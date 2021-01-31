import LinkImage from "../atoms/LinkImage";
import NavBar from "../molecules/NavBar";
import {auth, firebase} from "../../lib/firebase";
import {FC} from "react";

interface Props {
    currentUser?: firebase.User
    headerHeight: string
}

const Header: FC<Props> = ({ currentUser, headerHeight }) => {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {})
            .catch(function(err) {
                console.error(err);
            });
    };
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(provider).then(r => console.log(r));
    }
    return (
        <div className="flex justify-between">
            <NavBar currentUser={currentUser} signOut={handleSignOut} logIn={handleSignIn} height={headerHeight} />
        </div>
    )
}

export default Header