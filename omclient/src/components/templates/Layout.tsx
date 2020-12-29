import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import SideBar from "../organisms/SideBar";
import {ColorMap} from "../../models/resource";

interface Props {

}

const Layout = ({ children }) => {
    return (
        <>
            <div className="relative w-full min-h-screen pb-40 pt-10">
                <Header />
                <div className="flex justify-between my-20 mx-10">
                    <div className="w-3/4">
                        {children}
                    </div>
                    <SideBar />
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