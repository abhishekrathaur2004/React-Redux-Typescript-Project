import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character, Episode } from "../component/Schema";
import LocationCard from "../component/LocationCard";
// import CharacterCard from "../component/CharacterCard";
import { NavLink } from "react-router-dom";
import Loader1 from "../component/Loader";

const SingleLocation = () => {
  const { locationid } = useParams();
  const location_url: string = `https://rickandmortyapi.com/api/location/${locationid}`;
  const [locationObj, setLocationObj] = useState<Location | null>(null);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);
  const [isCharactersLoading, setIsCharactersLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLocationLoading(true);
        setIsCharactersLoading(true);
        const res = await fetch(location_url);
        const data: any = await res.json();
        setLocationObj(data);
        setIsLocationLoading(false);

        const characterList: any = data.residents;
        const ids = characterList.map((list: string) => {
          const index = list.split("/");
          return index[index.length - 1];
        });
        console.log(ids);
        const charactersPromises = ids.map((id: string) =>
          fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
            res.json()
          )
        );
        const charactersData: Character[] = await Promise.all(
          charactersPromises
        );
        console.log(charactersData.length);
        setCharacterList(charactersData);
        // console.log(charactersData);
        setIsCharactersLoading(false);
      } catch (error) {
        setIsLocationLoading(false);
        setIsCharactersLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [location_url]);
  // console.log(locationObj)
  if (isLocationLoading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  if (!locationObj) {
    return <div>No character found</div>;
  }
  if(isCharactersLoading){
    return <Loader1/>
  }
  return (
    <div className="singlecharactercontainer flex py-8 px-4 bg-gray-100 flex-wrap">
      <div className="characterdetail w-full">
        <h4 className="text-center pb-4 text-3xl">Location Info ....</h4>
        {locationObj && <LocationCard bgColor="bg-gray-200" {...locationObj} />}
      </div>
      <div className="episodes px-2 bg-gray-100 pt-14 w-full ">
        <h4 className="text-center text-3xl">List of characters ....</h4>
        <section>
          {/* {characters.map((character,index) => (index < 6 ? (<Characters {...character} />) : null))} */}
          {characterList.length > 0 ? (
            <ul className="py-2  h-[40vh] overflow-x-scroll home_section_page1_char  text-white flex gap-4">
              {characterList.map((characterinfo,index) => (
                <li key={index}> <TempCharacterCard {...characterinfo} /> </li>
              ))}
            </ul>
          ) : (
            <p>No Character found</p>
          )}
        </section>
      </div>
    </div>
  );
};
const TempCharacterCard: React.FC<Character> = (props: Character) => {

  return (
    <article
    key={props.id}
    className="character bg-gray-100 rounded flex min-w-56"
  >
    <div className="character-image flex-1 relative">
     <NavLink to={`/character/${props.id}`}>
      <img
          src={props.image}
          alt={props.name}
          className="rounded"
        />
        <p className="text-center absolute z-10 bg-slate-400 w-full bottom-0 left-1/2 -translate-x-1/2">{props.name}</p>
     </NavLink>
    </div>
    
  </article>
  )
};
export default SingleLocation;
