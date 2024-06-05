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
        return characters.map((character, index) => <CharacterCard {...character} key={index} />);
      case "Locations":
        return locations.map((location, index) => <LocationCard {...location} key={index} />);
      case "Episodes":
        return episodes.length > 0 ? (
          episodes.map((episode, index) => <EpisodeCard {...episode} key={index} />)
        ) : (
          null
        );
      default:
        return;
    }
  };
export default DisplayContent
