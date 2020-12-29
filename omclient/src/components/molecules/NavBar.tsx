import Nav from "../atoms/Nav";
import {ColorMap} from "../../models/resource";

interface Props {

}

const NavBar = ({}: Props) => {
    return (
        <>
            <div className="flex mx-auto px-10 rounded-full w-10/12 h-16 bg-white justify-between">
                {/*<Nav*/}
                {/*    title="TOP"*/}
                {/*    linkUrl="/"*/}
                {/*    colorCode={ColorMap.textMain}*/}
                {/*    url="/static/brst.svg"*/}
                {/*    width={60}*/}
                {/*    height={60}*/}
                {/*/>*/}
                {/*<Nav*/}
                {/*    title="NEXT"*/}
                {/*    linkUrl="/NEXT"*/}
                {/*    colorCode={ColorMap.textSub}*/}
                {/*    url="/static/brstm.svg"*/}
                {/*    width={60}*/}
                {/*    height={60}*/}
                {/*/>*/}
            </div>
        </>
    )
}

export default NavBar