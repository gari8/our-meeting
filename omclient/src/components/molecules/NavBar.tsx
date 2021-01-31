import Nav from "../atoms/Nav";
import {ColorMap, Fonts, Texts} from "../../models/resource";
import router from "next/router";
import {firebase} from "../../lib/firebase";

interface Props {
    signOut: () => void
    logIn: () => void
    currentUser?: firebase.User
    height: string
}

const NavBar = ({ signOut, logIn, currentUser, height }: Props) => {
    return (
        <>
            <div className="navbar flex px-10 w-full justify-between">
                <Nav
                    title={Texts.title}
                    font={Fonts.title}
                    height={height}
                    linkUrl={currentUser ? "/dashboard" : "/"}
                    colorCode={ColorMap.title}
                />
                {
                    currentUser
                    ?
                        <Nav
                            title={Texts.logout}
                            font={Fonts.title}
                            height={height}
                            handler={signOut}
                            colorCode={ColorMap.textAc}
                        />
                    :
                        <Nav
                            title={Texts.login}
                            font={Fonts.title}
                            height={height}
                            handler={logIn}
                            colorCode={ColorMap.textAc}
                        />
                }
            </div>
            <style jsx>{`
                .navbar {
                    height: ${height};
                    background-color: ${ColorMap.bgMain};
                }
            `}</style>
        </>
    )
}

export default NavBar;