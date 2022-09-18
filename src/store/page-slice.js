import { createSlice } from '@reduxjs/toolkit';

const initialPageState = {
  commentPerPage: 4,
  currentPage: 1,
  totalPageNumber: 0,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    setTotalPageNumber(state, action) {
      state.totalPageNumber = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setTotalPageNumber, setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;
