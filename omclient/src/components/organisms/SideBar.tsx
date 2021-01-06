import {ColorMap} from "../../models/resource";

const SideBar = () => {
    return (
        <>
            <div className="sidebar rounded-xl bg-white w-1/4 h-screen ml-10">

            </div>
            <style jsx>{`
                .sidebar {
                    background-color: ${ColorMap.bgSub};
                }
            `}</style>
        </>
    )
}

export default SideBar

