// import Characters from "../component/Characters"
import { useEffect, useState } from "react";
import Hero from "../component/Hero";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCharacters, setEpisodes, setLocations } from "../feature/dataSlice";
import SelectForm from "../component/SelectOpt";
import Pagination from "../component/Pagination";
import DisplayContent from "../component/DisplayContent";
const Home = () => {
  // const [selectedItem, setSelectedItem] = useState<string>("Characters");

  const selectedItem = useSelector(
    (state: RootState) => state.dataSet.selectedType
  );

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const storedPage = window.localStorage.getItem("currentPage");
    return storedPage !== null ? parseInt(storedPage, 10) : 1;
  });

  const handlePageChange = (page: number) => {
    window.localStorage.setItem("currentPage", page.toString());
    setCurrentPage(page);
  };
  useEffect(() => {
    const datafetching: () => any = async () => {
      if (selectedItem === "Locations") {
        
        const d1 = await fetchItem(
          `https://rickandmortyapi.com/api/location/?page=${currentPage}`
        );
        // if(d1) console.log(d1);
        if (d1) dispatch(setLocations(d1.results));
        else dispatch(setLocations([]));
      } else if (selectedItem === "Episodes") {
        const d2 = await fetchItem(
          `https://rickandmortyapi.com/api/episode/?page=${currentPage}`
        );
        // if(d2) console.log(d2);
        if (d2) dispatch(setEpisodes(d2.results));
        else dispatch(setEpisodes([]));
      } else if (selectedItem === "Characters") {
        const d3 = await fetchItem(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );
        // if(d3) console.log(d3);
        if (d3) dispatch(setCharacters(d3.results));
      }
    };
    datafetching();
  }, [selectedItem, currentPage]);
  useEffect(() => {
    const storedPage = window.localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
    // return (()=> window.localStorage.setItem('currentPage', '1'));
  }, [selectedItem]);

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
          {DisplayContent()}
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
