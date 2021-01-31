import {ColorMap} from "../../models/resource";

const SideBar = () => {
    return (
        <>
            <div className="side-bar w-1/5 h-full">
            </div>
            <style jsx>{`
                .side-bar {
                    background-color: ${ColorMap.bgSub};
                }
            `}</style>
        </>
    )
}

export default SideBar

