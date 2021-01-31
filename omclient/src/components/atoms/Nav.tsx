import Link from "next/link";
import router from "next/router";

interface Props {
    title?: string
    linkUrl?: string
    colorCode?: string
    font?: string
    fontSize?: string
    icon?: string
    handler?: () => void
    height?: string
}

const Nav = ({ icon, title, linkUrl, colorCode, font, fontSize, handler, height }: Props) => {
    return (
        <>
            {
                icon
                ?
                    <img
                        src={icon}
                        alt={title}
                        className="icon"
                        onClick={() => {
                            handler ? handler() : (linkUrl ? router.push(linkUrl) : "")
                        }}
                    />
                :
                    <p
                        className="title"
                        onClick={() => {
                            handler ? handler() : (linkUrl ? router.push(linkUrl) : "")
                        }}
                    >{title}</p>
            }
            <style jsx>{`
                .title {
                    cursor: pointer;
                    color: ${colorCode ? colorCode : "black"} !important;
                    ${font ? `font-family: ${font};` : ""}
                    font-weight: bold;
                    text-align: center;
                    ${height ? `height: ${height};line-height: ${height};` : ""}
                    ${fontSize ? `font-size: ${fontSize};` : ""} 
                }
                .icon {
                    cursor: pointer;
                    border-radius: 100%;
                    border: solid 2px gray;
                    background-color: white;
                    display: block;
                    margin: auto 0;
                    ${height ? `height: calc(${height} - 10px);width: calc(${height} - 10px);` : ""}
                }
            `}</style>
        </>

    )
}

export default Nav