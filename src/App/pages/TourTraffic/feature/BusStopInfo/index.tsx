import { BusStopActivityType, BusStopInfoType } from "../../slice/type";

interface Props {
  busStopList: BusStopInfoType[];
  bustActivity: BusStopActivityType[];
  isBusWayStart: boolean;
}

export function BusStopInfo(props: Props) {
  const {
    busStopList,
    bustActivity,
    isBusWayStart,
  } = props;

  const formatBusActivity = bustActivity.length > 0
    ? bustActivity.filter(stopInfo => isBusWayStart ? stopInfo.Direction === 1  : stopInfo.Direction === 0)
    : bustActivity;

  const inStopInfo: string[] = formatBusActivity.length > 0 
  ? formatBusActivity
    .filter(stopInfo => stopInfo.A2EventType === 1)
    .map(stopInfo => stopInfo.StopName.Zh_tw)
  : [''];

  const outStopInfo: string[]= formatBusActivity.length > 0 
  ? formatBusActivity
    .filter(stopInfo => stopInfo.A2EventType === 0)
    .map(stopInfo => stopInfo.StopName.Zh_tw)
  : [''];

  const getTime: (sec: number | undefined, tripName: string) => string = (sec, tripName) => {
    const emptvalue = '未發車';
    const inStopvalue = '進站中';
    const outStopvalue = '離站中';
    let time: string;
    const isInStop: boolean = inStopInfo.includes(tripName);
    const isOutStop: boolean = outStopInfo.includes(tripName);
    if (isInStop || isOutStop) {
      time = isInStop ? inStopvalue : outStopvalue;
    } else {
      if (sec) {
        const currentDate = new Date().getTime();
        const formatDate = new Date(currentDate - (sec * 1000));
        const hour = formatDate.getHours();
        const min = formatDate.getMinutes();
        time = `${hour < 10 ? `0${hour}` : hour} : ${min < 10 ? `0${min}` : min}`;
      } else {
        time = emptvalue;
      }
    }
    return time;
  }

  const formatBusStopList = busStopList
  .filter(stopInfo => isBusWayStart ? stopInfo.Direction === 1  : stopInfo.Direction === 0);

  return (
    <div className="bus-stop-info">
      <p className="info-hint" >*每隔 15 秒自動更新</p>
      {formatBusStopList.length > 0 ? (isBusWayStart ? formatBusStopList : formatBusStopList.reverse())
        .map((stopInfo, index) => (
          <div key={index} className="stop-item">
            <p 
              className={`stop-time ${!stopInfo.EstimateTime && 'no-time'} ${inStopInfo.length > 0 && inStopInfo.includes(stopInfo.StopName.Zh_tw) && 'in-stop'} ${outStopInfo.length > 0 && outStopInfo.includes(stopInfo.StopName.Zh_tw) && 'out-stop'}`}
            >{getTime(stopInfo.EstimateTime, stopInfo.StopName.Zh_tw)}</p>
            <p>{stopInfo.StopName.Zh_tw}</p>
          </div>
      )) : <p className="no-data">請選擇公車路線</p>}
    </div>
  );
}