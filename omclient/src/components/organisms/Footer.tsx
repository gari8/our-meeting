import {ColorMap} from "../../models/resource";

interface Props {
    footerHeight: string;
}

const Footer = ({ footerHeight }: Props) => {
    return (
        <>
            <div className="footer w-full"></div>
            <style jsx>{`
                .footer {
                    height: ${footerHeight};
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: ${ColorMap.bgMain};
                }
            `}</style>
        </>
    )
}

export default Footer