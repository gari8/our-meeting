import {Room} from "../../generated/graphql";

interface Props {
    description: string
}

const Description = ({ description }: Props) => {
    return (
        <>
            <p className="break-words font-light text-sm">{description}</p>
        </>
    )
}

export default Description;