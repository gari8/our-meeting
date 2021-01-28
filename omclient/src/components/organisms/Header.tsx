import LinkImage from "../atoms/LinkImage";
import NavBar from "../molecules/NavBar";
import {auth, firebase} from "../../lib/firebase";

interface Props {

}

const Header = () => {
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
        <div className="flex mx-10 justify-between">
            <LinkImage
                url="/static/logo.jpg"
                linkUrl="/"
                width={60}
                height={60}
                isRounded={true}
            />
            <NavBar signOut={handleSignOut} logIn={handleSignIn}/>
        </div>
    )
}

export default Header