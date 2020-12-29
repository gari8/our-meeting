import Link from "next/link"

interface Props {
    url?: string
    alt?: string
    width?: number
    height?: number
    linkUrl?: string
    isRounded?: boolean
}

const LinkImage = ({ url , linkUrl, alt, width, height, isRounded }: Props) => {
    return (
        <>
            <Link href={linkUrl} >
                <img src={url} alt={alt} width={width} height={height} className={isRounded ? "rounded-full" : ""} />
            </Link>
        </>
    )
}

export default LinkImage