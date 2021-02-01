import {AccordionLinks, ColorMap} from "../../models/resource";
import Accordion from "./Accordion";

const SideBar = () => {
    return (
        <>
            <div className="side-bar w-1/5 min-h-full">
                <Accordion label="Links" items={AccordionLinks} open={true} />
            </div>
            <style jsx>{`
                .side-bar {
                    over-flow: scroll;
                    background-color: ${ColorMap.bgSub};
                }
            `}</style>
        </>
    )
}

export default SideBar

