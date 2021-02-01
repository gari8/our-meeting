import {AccordionItem, AccordionLinks, ColorMap} from "../../models/resource";
import Link from "next/link";

interface Props {
    items: AccordionItem[]
    isOpen: boolean
}

const AccordionContents = ({ items, isOpen }: Props) => {
    return (
        <>
            {items.map((item, i) => {
                return <p className={isOpen ?  "a-item" : "a-item-none" }><Link href={item.linkUrl}>{isOpen ? item.label : ""}</Link></p>
            })}
            <style jsx>{`
                .side-bar {
                    over-flow: scroll;
                    background-color: ${ColorMap.bgSub};
                }
                .a-item {
                    height: 60px;
                    line-height: 60px;
                    width: 100%;
                    padding: 0 10px;
                    border: solid 1px ${ColorMap.bgMain};
                    border-bottom: none;
                    transition: all .15s;
                    over-flow: hidden;
                }
                .a-item:hover {
                    text-decoration: underline;
                    color: ${ColorMap.textAc};
                }
                .a-item-none {
                    height: 0;
                    line-height: 0;
                    transition: all .15s;
                    color: ${ColorMap.bgSub};
                }
            `}</style>
        </>
    )
}

export default AccordionContents;