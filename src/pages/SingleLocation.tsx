import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Location, Character } from '../interface/schema'
// import CharacterCard from "../component/CharacterCard";
import { NavLink } from "react-router-dom";
import Loader1 from "../component/Loader";


const SingleLocation: React.FC = () => {
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
        setTimeout(() => {
          setIsCharactersLoading(false);
        }, 1200);
      } catch (error) {
        setIsLocationLoading(false);
        setIsCharactersLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [location_url]);
  console.log(locationObj);
  if (isLocationLoading) {
    return <Loader1/>
  }
  if (!locationObj) {
    return <div>No Location found</div>;
  }
  
  return (
    <div className="singlecharactercontainer text-black py-8 px-4 bg-gray-100 ">
      <div className="singleepisodecontainer py-8 px-4 bg-gray-100">
        
        <div className="w-full pt-6 text-center gap-3 flex justify-center items-center flex-col  flex-wrap">
          <h4 className="text-xl ">Location info  </h4>
          <div className="flex-1">
            <h4 className="text-3xl font-bold">{locationObj.name}</h4>
            <div className="mb-2 ">
              <span className="mr-2">Type :</span>
              <span>{locationObj.type}</span>
            </div>
            <div className="mb-2">
              <span className="mr-2">Dimension :</span>
              <span className="font-bold">{locationObj.dimension}</span>
            </div>
            <div>
              <NavLink
                className="pl-12 underline"
                to={`https://rickandmortyapi.com/api/episode/${locationObj.id}`}
              >
                Know more
              </NavLink>
            </div>
          </div>
        </div>
        <div className="episodes px-2 bg-gray-100 pt-14 w-full">
          <p className="text text-center">List of characters</p>
          {isCharactersLoading ? <Loader1/> : 
          
            <section>
            
            {characterList.length > 0 ? (
              <ul className="py-2 h-[40vh] overflow-x-scroll home_section_page1_char text-white flex gap-4">
                {characterList.map((characterinfo, index) => (
                  <li key={index}>
                    <TempCharacterCard {...characterinfo} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Character found</p>
            )}
          </section>
          }

        </div>
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
          <img src={props.image} alt={props.name} className="rounded" />
          <p className="text-center absolute z-10 bg-slate-400 w-full bottom-0 left-1/2 -translate-x-1/2">
            {props.name}
          </p>
        </NavLink>
      </div>
    </article>
  );
};
export default SingleLocation;
