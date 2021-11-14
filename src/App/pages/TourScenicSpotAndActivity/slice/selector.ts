import { RootState } from '../../../../store';

export const selectTourScenicSpots = ({ tourPlace }: RootState) => tourPlace.tourScenicSpots;
export const selectTourActivities = ({ tourPlace }: RootState) => tourPlace.tourActivities;
export const selectIsFetching = ({ tourPlace }: RootState) => tourPlace.isFetching;
export const selectError = ({ tourPlace }: RootState) => tourPlace.error;
