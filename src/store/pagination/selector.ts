import { RootState } from '../index';

export const selectTotalPage = ({ pagination }: RootState) => pagination.totalPage;
export const selectCurrentPage = ({ pagination }: RootState) => pagination.currentPage;
