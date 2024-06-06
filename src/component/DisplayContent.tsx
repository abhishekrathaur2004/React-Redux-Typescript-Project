import LocationCard from "./LocationCard";
import CharacterCard from "./CharacterCard"; 
import EpisodeCard from "./EpisodeCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// for displaying content on home page 

const DisplayContent: () => any = () => {

    // using useSelector we got data from store 

    const selectedItem = useSelector((state : RootState) => state.dataSet.selectedType)
    const characters = useSelector((state: RootState) => state.dataSet.characters);
    const episodes = useSelector((state: RootState) => state.dataSet.episodes);
    const locations = useSelector((state: RootState) => state.dataSet.locations);
    
    // conditional returning based on type of selected requested

    switch (selectedItem) {
      case "Characters":
        return characters.length > 0 ? characters.map((character, index) => <CharacterCard {...character} key={index} />) : null

      case "Locations":
        return locations.length > 0  ? locations.map((location, index) => <LocationCard {...location} key={index} />) : 0

      case "Episodes":
        return episodes.length > 0 ? (episodes.map((episode, index) => <EpisodeCard {...episode} key={index} />)) : null

      default:
        return null ;
    }
  };
export default DisplayContent
