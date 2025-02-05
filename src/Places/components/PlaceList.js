import { useParams } from "react-router";
import PlaceItem from "./PlaceItem";

const PlaceList = ({ lists }) => {
  const { userId } = useParams();
  const filterPlaces = lists.filter((place) => place.creator === userId);

  if (filterPlaces.length === 0) {
    return <p className="text-center">No places found</p>;
  }
  return filterPlaces.map((place) => <PlaceItem key={place.id} {...place} />);
};

export default PlaceList;
