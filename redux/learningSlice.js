import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedDrugs: [], // List of drug names marked as learned
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    markAsLearned: (state, action) => {
      const drugName = action.payload;
      if (!state.completedDrugs.includes(drugName)) {
        state.completedDrugs.push(drugName);
      }
    },
  },
});

export const { markAsLearned } = learningSlice.actions;
export default learningSlice.reducer;
