//imports

import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character,Location, Dataset, Episode} from '../interface/schema'


const initialState: Dataset  = {
  characters : [],
  episodes : [],
  locations : [],
  selectedType : 'Characters',
  count : 0,
  isDataSetLoading : false

};


export const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
        state.characters = action.payload;
      },
    setEpisodes(state, action: PayloadAction<Episode[]>) {
    state.episodes = action.payload;
    },
    setLocations(state, action: PayloadAction<Location[]>) {
    state.locations = action.payload;
    },
    setSelectedType(state , action : PayloadAction<string>){
      state.selectedType = action.payload
    },
    setCount(state, action:PayloadAction<number>) {
      state.count = action.payload;
    },
    setDataSetLoading(state, action:PayloadAction<boolean>){
      state.isDataSetLoading = action.payload;
    }
    
  },
});

export const { setCharacters, setEpisodes, setLocations , setSelectedType,setCount,setDataSetLoading} = datasetSlice.actions;

export default datasetSlice.reducer;
