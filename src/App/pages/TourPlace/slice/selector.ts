import { RootState } from '../../../../store';

export const selectTourScenicSpots = (state: RootState) => state.tourPlace.tourScenicSpots;
export const selectTourActivities = (state: RootState) => state.tourPlace.tourActivities;
export const selectIsFetching = (state: RootState) => state.tourPlace.isFetching;
export const selectError = (state: RootState) => state.tourPlace.error;
