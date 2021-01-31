import {ColorMap} from "../../models/resource";
import {FC} from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
    color?: string
}


const Loading: FC<Props> = ({ color = ColorMap.textMain }: Props) => {
    return (
        <>
            <div className="w-screen h-screen relative bg-mine">
                <div className="absolute inset-1/2 transform -translate-y-2/4 -translate-x-2/4 w-min h-56">
                    <ClipLoader color={color} size={150} />
                </div>
            </div>
            <style jsx>{`
                .bg-mine {
                    background-color: ${ColorMap.bgMain};
                }
            `}</style>
        </>
    )
}

export default Loading;