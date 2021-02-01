import {AccordionLinks, ColorMap} from "../../models/resource";
import Accordion from "./Accordion";
import Link from "next/link";
import AccordionContents from "../molecules/AccordionContents";

const SideBar = () => {
    return (
        <>
            <div className="side-bar w-1/5 min-h-full">
                <Accordion label="Links" open={true} >
                    <AccordionContents items={AccordionLinks}  isOpen/>
                </Accordion>
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

