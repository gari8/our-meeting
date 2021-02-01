import {AccordionItem, ColorMap} from "../../models/resource";
import Link from "next/link";
import {useState} from "react";

interface Props {
    label: string
    items?: AccordionItem[]
    open?: boolean
}

const Accordion = ({ label, items, open = false }: Props) => {
    const [isOpen, setStatus] = useState(open);
    return (
        <>
            <div className="a-box w-full">
                <div
                    className="flex justify-start cursor-pointer"
                    onClick={() => {
                        setStatus(!isOpen)
                    }}
                >
                    <p className={isOpen ? "transform rotate-180 label transition" : "transform rotate-90 label transition"} >{"▲"}</p>
                    <p className="label"> {label}</p>
                </div>
                <div className="a-lists">
                    {items.map((item, i) => {
                        return <p className={isOpen ?  "a-item" : "a-item-none" }><Link href={item.linkUrl}>{isOpen ? item.label : ""}</Link></p>
                    })}
                </div>
            </div>
            <style jsx>{`
                .a-lists {
                    background-color: ${ColorMap.bgGray};
                    height: auto;
                }
                .a-box:hover {
                    box-shadow: 0 0 5px ${ColorMap.bgMain};
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
                .label {
                    height: 60px;
                    line-height: 60px;
                    color: #FFF;
                    font-weight: bold;
                    padding: 0 10px;
                }
            `}</style>
        </>
    )
}

export default Accordion;