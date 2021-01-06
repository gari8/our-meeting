import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import SideBar from "../organisms/SideBar";
import {ColorMap} from "../../models/resource";
import {FC} from "react";


interface Props {
    children?: any
    withoutSideBar?: boolean
}

const Layout: FC<Props> = ({ children, withoutSideBar= false }) => {
    return (
        <>
            <div className="relative w-full min-h-screen pb-40 pt-10">
                <Header />
                <div className="flex justify-between my-20 mx-10">
                    <div className="w-3/4">
                        {children}
                    </div>
                    {withoutSideBar ? <></> : <SideBar />}
                </div>
                <Footer />
            </div>
            <style jsx global>{`
                body {
                    background-color: ${ColorMap.bgMain};
                }
            `}</style>
        </>
    )
}

export default Layout