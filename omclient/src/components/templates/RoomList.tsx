import {Room} from "../../generated/graphql";
import PropertyCard from "../organisms/PropertyCard";

interface Props {
    rooms: Room[]
}

const RoomList = ({ rooms }: Props) => {
    return (
        <div className="flex flex-wrap justify-between py-6">
            {rooms.map((r: Room) => {
                return (
                    <PropertyCard property={r} key={r.ulid} />
                )
            })}
        </div>
    )
}

export default RoomList;