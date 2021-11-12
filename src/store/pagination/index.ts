import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationStore {
  totalPage: number;
  currentPage: number;
}

const initialState: PaginationStore = {
  totalPage: 1,
  currentPage: 1,
};

export const paginationStore = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changeTotalPage(state, action: PayloadAction<{totalPage: number}>) {
      const { totalPage } = action.payload;
      state.totalPage = totalPage;
    },
    nextPage(state){
      state.currentPage += 1;
    },
    prePage(state){
      state.currentPage -= 1;
    },
    resetPage(state){
      state.currentPage = 1;
      state.totalPage = 1;
    },
  }
});

export const {
  changeTotalPage,
  prePage,
  nextPage,
  resetPage,
} = paginationStore.actions;

export default paginationStore.reducer;