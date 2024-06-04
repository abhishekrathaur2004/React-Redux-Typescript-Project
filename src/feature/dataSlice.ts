//imports

import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character,Location, Dataset, Episode} from '../interface/schema'


// Define the initial state using that type


const initialState: Dataset  = {
  characters : [],
  episodes : [],
  locations : [],
  selectedType : 'Characters'
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
    }
        
  },
});

export const { setCharacters, setEpisodes, setLocations , setSelectedType} = datasetSlice.actions;

export default datasetSlice.reducer;
