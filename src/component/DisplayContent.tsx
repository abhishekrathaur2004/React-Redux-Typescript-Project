import LocationCard from "./LocationCard";
import CharacterCard from "./CharacterCard"; 
import EpisodeCard from "./EpisodeCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DisplayContent: () => any = () => {
    const selectedItem = useSelector((state : RootState) => state.dataSet.selectedType)
    const characters = useSelector((state: RootState) => state.dataSet.characters);
    const episodes = useSelector((state: RootState) => state.dataSet.episodes);
    const locations = useSelector((state: RootState) => state.dataSet.locations);
    switch (selectedItem) {
      case "Characters":
        return characters.map((character) => <CharacterCard {...character} />);
      case "Locations":
        return locations.map((location) => <LocationCard {...location} />);
      case "Episodes":
        return episodes.length > 0 ? (
          episodes.map((episode) => <EpisodeCard {...episode} />)
        ) : (
          null
        );
      default:
        return;
    }
  };
export default DisplayContent
