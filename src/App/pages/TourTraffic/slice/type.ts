export type BuseStopType = {
  TaiwanTripName: {
    Zh_tw: string;
  };
  City: string;
  RouteID: string;
  DepartureStopNameZh: string;
  DestinationStopNameZh: string;  
}

export type BusStopInfoType = {
  StopName: {
    Zh_tw: string;
  };
  EstimateTime: number;
  Direction: number;
  StopStatus: number;
  StopID: string;
}

export type BusStopActivityType = {
  StopName: {
    Zh_tw: string;
  };
  Direction: number;
  DutyStatus: number;
  A2EventType: number;
};

export interface TourTrafficStore {
  busStops: BuseStopType[];
  currentTripStopInfo: BusStopInfoType[];
  currentBusActivity: BusStopActivityType[];
  isFetching: boolean;
  error: any;
};