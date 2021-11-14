import { RootState } from "../../../../store";

const selectBusStop = ({ tourTraffic }: RootState) => tourTraffic.busStops;
const selectCurrentBusActivity = ({ tourTraffic }: RootState) => tourTraffic.currentBusActivity;
const selectCurrentTripStopInfo = ({ tourTraffic }: RootState) => tourTraffic.currentTripStopInfo;
const selectIsFetching = ({ tourTraffic }: RootState) => tourTraffic.isFetching;
const selectError = ({ tourTraffic }: RootState) => tourTraffic.error;

export {
  selectBusStop,
  selectCurrentBusActivity,
  selectCurrentTripStopInfo,
  selectIsFetching,
  selectError,
}
