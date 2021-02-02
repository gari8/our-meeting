import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import SideBar from "../organisms/SideBar";
import {ColorMap} from "../../models/resource";
import React, {FC} from "react";
import {firebase} from "../../lib/firebase";


interface Props {
    children?: any
    withoutSideBar?: boolean
    currentUser?: firebase.User
}

const Layout: FC<Props> = ({ children, withoutSideBar= false, currentUser }) => {
    const headerHeight = "60px"
    const footerHeight = "200px"
    return (
        <>
            <div className="layout relative w-full min-h-screen">
                <Header currentUser={currentUser} headerHeight={headerHeight} />
                <div className="field flex justify-between">
                    {withoutSideBar ? <></> : <SideBar />}
                    <div className="w-full">
                        {children}
                    </div>
                </div>
                <Footer footerHeight={footerHeight}/>
            </div>
            <style jsx global>{`
                body {
                    background-color: ${ColorMap.bgBase};
                }
                .layout {
                    padding-bottom: ${footerHeight};
                }
                .field {
                    min-height: calc(100vh - (${headerHeight} + ${footerHeight}));
                }
            `}</style>
        </>
    )
}

export default Layout