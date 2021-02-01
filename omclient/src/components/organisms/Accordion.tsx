import {ColorMap} from "../../models/resource";
import React, {useState} from "react";

interface Props {
    label: string
    open?: boolean
    children?: React.ReactElement
}

const Accordion = ({ label, open = false, children }: Props) => {
    const [isOpen, setStatus] = useState(open);
    const additionalProps = {isOpen: isOpen}
    const newChildren = React.cloneElement(children, additionalProps)
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
                    { newChildren }
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