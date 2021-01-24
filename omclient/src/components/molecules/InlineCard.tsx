import {Room} from "../../generated/graphql";
import Title from "../atoms/Title";
import Description from "../atoms/Description";

interface Props {
    property: Room
}

const InlineCard = ({ property }: Props) => {
    return (
        <>
            <div className="border-green-600 border-r-4 w-4/5 ml-4">
                <Title title={property.room_name} />
                <Description description={property.description} />
            </div>
        </>
    )
}

export default InlineCard;