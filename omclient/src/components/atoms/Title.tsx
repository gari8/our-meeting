interface Props {
    title: string
}

const Title = ({ title }: Props) => {
    return (
        <>
            <p className="font-extrabold text-xl">{title}</p>
        </>
    )
}

export default Title;