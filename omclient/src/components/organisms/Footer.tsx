import {ColorMap} from "../../models/resource";

const Footer = ({}) => {
    return (
        <>
            <div className="footer h-40 w-full bg-gray-50"></div>
            <style jsx>{`
                .footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: ${ColorMap.bgSub};
                }
            `}</style>
        </>
    )
}

export default Footer