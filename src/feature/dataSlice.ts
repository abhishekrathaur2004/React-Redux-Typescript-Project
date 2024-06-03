//imports

import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character,Location, Dataset, Episode} from '../component/Schema';


// Define the initial state using that type


const initialState: Dataset  = {
  characters : [],
  episodes : [],
  locations : []
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
    }
        
  },
});

export const { setCharacters, setEpisodes, setLocations } = datasetSlice.actions;

export default datasetSlice.reducer;
