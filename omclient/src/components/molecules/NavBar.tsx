import Nav from "../atoms/Nav";
import {ColorMap} from "../../models/resource";
import router from "next/router";
import {useContext} from "react";
import {AuthContext} from "../../lib/auth";

interface Props {
    signOut: () => void
    logIn: () => void
}

const NavBar = ({ signOut, logIn }: Props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="navbar flex mx-auto px-10 rounded-full w-10/12 h-16 justify-between">
                <Nav
                    title="TOP"
                    linkUrl="/"
                    colorCode={ColorMap.textMain}
                    url="/static/brst.svg"
                    width={60}
                    height={60}
                />
                <Nav
                    title="NEXT"
                    linkUrl="/NEXT"
                    colorCode={ColorMap.textSub}
                    url="/static/brstm.svg"
                    width={60}
                    height={60}
                />
                {currentUser ? <p onClick={() => signOut()}>signOut</p> : <p onClick={() => logIn()}>login</p>}
            </div>
            <style jsx>{`
                .navbar {
                    background-color: ${ColorMap.myWhite};
                }
            `}</style>
        </>
    )
}

export default NavBar;