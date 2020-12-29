import Link from "next/link";

interface Props {
    title?: string
    linkUrl?: string
    colorCode?: string
    url?: string
    width?: number
    height?: number
}

const Nav = ({ title, linkUrl, colorCode, url, width, height }: Props) => {
    return (
        <Link href={linkUrl} >
            <div className="flex">
                {url ? <img src={url} alt={title} width={width} height={height} /> : <></>}
                <p>{title}</p>
                <style jsx>{`
                    p {
                      color: ${colorCode != "" ? colorCode : "black"};
                    }
                `}</style>
            </div>
        </Link>
    )
}

export default Nav