import { useEffect, useState } from "react";
import Hero from "../component/Hero";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setCharacters,
  setCount,
  setEpisodes,
  setLocations,
  setDataSetLoading
} from "../feature/dataSlice";
import SelectForm from "../component/SelectOpt";
import Pagination from "../component/Pagination";
import DisplayContent from "../component/DisplayContent";
import { Loader2 } from "../component/Loader";


const Home = () => {

  // selector 
  const selectedItem = useSelector((state: RootState) => state.dataSet.selectedType);
  const count = useSelector((state: RootState) => state.dataSet.count);
  const isDataSetLoading = useSelector((state : RootState) => state.dataSet.isDataSetLoading)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const storedPage = window.localStorage.getItem("currentPage");
    return storedPage !== null ? parseInt(storedPage, 10) : 1;
  });

  const handlePageChange = (page: number) => {
    window.localStorage.setItem("currentPage", page.toString());
    setCurrentPage(page);
  };
  const datafetching: () => any = async () => {
    
    if (selectedItem === "Locations") {
      const d1 = await fetchItem(
        `https://rickandmortyapi.com/api/location/?page=${currentPage}`
      );

      if (d1) {
        dispatch(setLocations(d1.results));

        dispatch(setCount(d1.results.length));
      } else {
        dispatch(setLocations([]));
        dispatch(setCount(0));
      }
    } else if (selectedItem === "Episodes") {
      const d2 = await fetchItem(
        `https://rickandmortyapi.com/api/episode/?page=${currentPage}`
      );

      if (d2) {
        dispatch(setEpisodes(d2.results));
        dispatch(setCount(d2.results.length));
      } else {
        dispatch(setEpisodes([]));
        dispatch(setCount(0));
      }
    } else if (selectedItem === "Characters") {
      const d3 = await fetchItem(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}`
      );
      if (d3) {
        dispatch(setCharacters(d3.results));
        dispatch(setCount(d3.results.length));
      } else {
        dispatch(setCharacters([]));
        dispatch(setCount(0));
      }
    }
      
  };
  useEffect(() => {

    datafetching();
    dispatch(setDataSetLoading(false))
    
  }, [selectedItem, currentPage]);
  useEffect(() => {
    const storedPage = window.localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
    

  }, [selectedItem]);

  return (
    <div className="home_page ">
      <Hero />
      <div className="100vw bg-slate-800">
        <div className="flex pt-6 justify-between  lg:text-[20px] xl:flex-row lg:flex-col lg:gap-4 items-center px-20">
          <div className="text-center text-white lg:text-[25px] xl: text-[30px] ">
            {/* <SelectForm setSelectedItem={setSelectedItem} /> */}
            <SelectForm />
          </div>
          <div>
            <h2 className="text-center text-white lg:text-[35px] xl: text-[45px] ">
              {selectedItem} - {count}
            </h2>
          </div>
          <div className="text-center lg:text-[35px] ">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={5}
            />
          </div>
        </div>
        {
          isDataSetLoading ?<Loader2/> : (
            <section className="py-20 px-14 home_section_page1_char  text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-6 2xl:grid-cols-3 gap-4">
          {DisplayContent()}
        </section>
          )
        }
        
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
