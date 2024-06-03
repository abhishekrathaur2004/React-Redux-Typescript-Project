import { useEffect, useState } from "react";
import { Character, Episode } from "../component/Schema";
import { useParams } from "react-router-dom";
import Loader1 from "../component/Loader";
import CharacterCard from "../component/CharacterCard";
import EpisodeCard from "../component/EpisodeCard";

const SingleCharacter = () => {
  // const { characterid } = useParams();
  // const [characterObj, setCharacterObj] = useState<Character | null>(null);
  // const [episodelist, setEpisodeList] = useState<Episode[] | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const character_url: string = `https://rickandmortyapi.com/api/character/${characterid}`;
  // console.log(character_url);
  // useEffect(() => {

  //   const fetchItem: () => any = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res: any = await fetch(character_url);

  //       if (!res.ok) {
  //         setIsLoading(false);
  //         return ;
  //       }
  //       const data = await res.json();
  //       setCharacterObj(data);

  //       const episodes = data.episode;
  //       console.log(episodes);

  //       const ids: string[] = episodes.map((url: string) => {
  //         const splits = url.split("/");
  //         return splits[splits.length - 1];
  //       });
  //       // console.log(ids);
  //       const episodesUrlPromises = ids.map((id) => {
  //         fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  //       });
  //       const episodesResponses = await Promise.all(episodesUrlPromises);
  //       // const episodesData = await episodesResponses.map((res:any) => res.json());
  //       console.log(episodesResponses);

  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 2000);
  //       fetchItem();

  //     } catch (error) {
  //       setIsLoading(false);
  //       console.log(error);
  //     }
  //   };
  // }, [character_url]);
  // console.log(characterObj);
  // if (isLoading) {
  //   return (
  //     <>
  //       <Loader1 />
  //     </>
  //   );
  // }
  // if(!characterObj){
  //   return(
  //     <h3>
  //       No character found .. !!!
  //     </h3>
  //   )
  // }
  const { characterid } = useParams<{ characterid: string }>();
  const [characterObj, setCharacterObj] = useState<Character | null>(null);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const character_url: string = `https://rickandmortyapi.com/api/character/${characterid}`;

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(character_url);

        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const data: Character = await res.json();
        setCharacterObj(data);

        const episodeUrls = data.episode;
        const episodePromises = episodeUrls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const episodeData = await Promise.all(episodePromises);
        console.log(episodeData);
        setEpisodeList(episodeData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchItem();
  }, [character_url]);

  if (isLoading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (!characterObj) {
    return <div>No character found</div>;
  }
  return (
    <div className="singlecharactercontainer flex py-8 px-4 bg-gray-100 flex-wrap">
      <div className="characterdetail w-full">
        <h4 className="text-center pb-4 text-3xl">Character Info ....</h4>
        {characterObj && <CharacterCard bgColor="bg-gray-200" {...characterObj} />}
      </div>
      <div className="episodes px-2 pt-14 bg-gray-100 w-full ">
        <h4 className="text-center text-3xl">List of episodes ....</h4>
        <section >
          {/* {characters.map((character,index) => (index < 6 ? (<Characters {...character} />) : null))} */}
          {episodeList.length > 0 ? (
            <ul className="py-2 px-4 h-[35vh] overflow-x-scroll overflow-y-hidden home_section_page1_char  text-white flex gap-4">
              {episodeList.map((episodeinfo) => (
                
                <EpisodeCard {...episodeinfo}/>
              ))}
            </ul>
          ) : (
            <p>No episodes found</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SingleCharacter;
