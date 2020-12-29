import LinkImage from "../atoms/LinkImage";
import NavBar from "../molecules/NavBar";

interface Props {

}

const Header = () => {
    return (
        <div className="flex mx-10 justify-between">
            <LinkImage
                url="/static/logo.jpg"
                linkUrl=""
                width={60}
                height={60}
                isRounded={true}
            />
            <NavBar />
        </div>
    )
}

export default Header