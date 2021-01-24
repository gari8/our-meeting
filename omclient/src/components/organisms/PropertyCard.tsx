import Link from "next/link";
import {Room} from "../../generated/graphql";
import Circle from "../atoms/Circle";
import InlineCard from "../molecules/InlineCard";

interface Props {
    property: Room | any
}

const PropertyCard = ({ property }: Props) => {
    return (
        <Link href={"/brain-storming/" + property.ulid} key={property.ulid}>
            <div className="w-full xl:w-72 m-2 bg-gray-300 rounded p-6 flex justify-between hover:bg-gray-400">
                <Circle />
                <InlineCard property={property} />
            </div>
        </Link>
    )
}

export default PropertyCard;