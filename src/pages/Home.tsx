// import Characters from "../component/Characters"
import { useEffect, useState } from "react";
import Hero from "../component/Hero";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCharacters, setEpisodes, setLocations } from "../feature/dataSlice";
import CharacterCard from "../component/CharacterCard";
import SelectForm from "../component/SelectOpt";
import EpisodeCard from "../component/EpisodeCard";
import LocationCard from "../component/LocationCard";
import Pagination from "../component/Pagination";

const Home = () => {
  // const [selectedItem, setSelectedItem] = useState<string>("Characters");
  
  const selectedItem = useSelector((state : RootState) => state.dataSet.selectedType)
  const characters = useSelector(
    (state: RootState) => state.dataSet.characters
  );
  const episodes = useSelector((state: RootState) => state.dataSet.episodes);
  const locations = useSelector((state: RootState) => state.dataSet.locations);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    // if (episodes.length > 0) return;
    // console.log(selectedItem);
    // console.log("kitne baar chla");
    console.log(currentPage);

    const datafetching: () => any = async () => {
      if(selectedItem === 'Locations'){
        const d1 = await fetchItem(`https://rickandmortyapi.com/api/location/?page=${currentPage}`);
        if(d1) console.log(d1);
        if(d1) dispatch(setLocations(d1.results));
        else dispatch(setLocations([]))
      }
      else if(selectedItem === 'Episodes'){
        const d2 = await fetchItem(`https://rickandmortyapi.com/api/episode/?page=${currentPage}`);
        if(d2) console.log(d2);
        if(d2) dispatch(setEpisodes(d2.results));
        else dispatch(setEpisodes([]));
      }
      else if(selectedItem === 'Characters'){
        const d3 = await fetchItem(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        if(d3) console.log(d3);
        if(d3) dispatch(setCharacters(d3.results));
      }
    };
    datafetching();
  }, [selectedItem,currentPage]);
  useEffect(()=>{
    setCurrentPage(1);
  },[selectedItem])

  const DisplayContent: (item : string) => any = (item: string) => {
    switch (item) {
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
  return (
    <div className="home_page ">
      <Hero />
      <div className="100vw bg-slate-800">
        <div className="flex justify-between text-xl items-center px-20">
          <div className="text-center pt-10 text-white">
            {/* <SelectForm setSelectedItem={setSelectedItem} /> */}
            <SelectForm />
          </div>
          <div>
            <h2 className="text-center pt-10 text-white text-4xl">
              {selectedItem}
            </h2>
          </div>
          <div className="text-center pt-10 text-xl">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={5}
            />
          </div>
        </div>
        <section className="py-20 px-14 home_section_page1_char  text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* {characters.map((character,index) => (index < 6 ? (<Characters {...character} />) : null))} */}
          {DisplayContent(selectedItem) }
        </section>
      </div>
      
    </div>
  );
};
const fetchItem: (url: string) => any = async (url) => {
  try {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default Home;
