import React, { useState } from "react";
import { Character } from "./Schema";
import CharacterCard from "./CharacterCard";

interface FormState {
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
}

const MyForm: React.FC = () => {
  let fetchUrl: string = "https://rickandmortyapi.com/api/character/?";
  const [formData, setFormData] = useState<FormState>({
    name: "",
    gender: "",
    type: "",
    species: "",
    status: "",
  });

  // loader

  const [loading, setLoading] = useState<boolean>(false);
  // for storing search query

  const [searchedItem, setSearchedItem] = useState<Character[] | null>(null);

  // for handling change in search Query
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const actualValue: string = value.trim();
    if ((name === "gender" || name === "status") && actualValue === "none") {
      setFormData({
        ...formData,

        [name]: "",
      });
      return;
    }
    setFormData({
      ...formData,

      [name]: actualValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (formData.name) fetchUrl += `name=${formData.name}&`;
    if (formData.gender && formData.gender !== "none")
      fetchUrl += `gender=${formData.gender}&`;
    if (formData.species) fetchUrl += `species=${formData.species}&`;
    if (formData.status && formData.status !== "none")
      fetchUrl += `status=${formData.status}&`;
    if (formData.type) fetchUrl += `type=${formData.type}&`;

    // if the user haven't put any query

    console.log("here", fetchUrl);
    if (fetchUrl.endsWith("?")) {
      return;
    }
    if (fetchUrl.charAt(fetchUrl.length - 1) === "&") {
      fetchUrl = fetchUrl.slice(0, -1);
    }

    try {
      console.log(fetchUrl);
      if (fetchUrl[-1] === "?") {
        console.log("yes");
        return;
      }
      setLoading(true);
      setSearchedItem([]);
      const fetchItem = async () => {
        const res = await fetch(fetchUrl);
        console.log(res.status);
        if(res.status !== 200){
          setLoading(false);
          return ;
        }
        const data = await res.json();
        const dataArray = data.results;

        console.log(dataArray);
        const characterArray: Character[] = dataArray;
        console.log(characterArray.length);
        setSearchedItem(characterArray);
        setLoading(false);
      };
      fetchItem();
      setTimeout(() => {
        setFormData({
          name: "",
          gender: "",
          type: "",
          species: "",
          status: "",
        });
      }, 1200);
    } catch (error) {
      setLoading(false);
      console.log();
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center flex flex-col justify-center items-center bg-slate-600 py-10"
    >
      <h4 className="py-6 text-2xl text-white">
        Search your favorite character
      </h4>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
        />
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Species"
        />
      </div>
      <div className="mb-6 flex justify-between text-gray-50 bg-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5">
        <label className="text-left flex-1" htmlFor="gender">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-transparent flex-1"
        >
          <option value="none">None</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="mb-6 flex justify-between text-gray-50 bg-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5">
        <label className="text-left flex-1" htmlFor="status">
          Status:
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="bg-transparent flex-1"
        >
          <option value="none">None</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type"
        />
      </div>
      <div>
        <button
          className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </div>

      {loading ? (
        <> loading</>
      ) : (
        <section className="py-20 px-14 home_section_page1_char   text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* {characters.map((character,index) => (index < 6 ? (<Characters {...character} />) : null))} */}
          {searchedItem ? (
            searchedItem.length > 0 ? (
              searchedItem.map((character1: Character) => (
                <CharacterCard {...character1} />
              ))
            ) : (
              <h2 className="text-center">No Character Found</h2>
            )
          ) : null}
        </section>
      )}
    </form>
  );
};

export default MyForm;
