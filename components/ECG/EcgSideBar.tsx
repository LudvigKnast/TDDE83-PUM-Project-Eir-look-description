import './EcgSideBar.css';
import { FC } from 'react';

interface IProps {
  chart: string;
  ecgList: any;
  timeList: any;
  length: number;
  updateID: any;
}

const EcgSideBar: FC<IProps> = ({
  chart,
  ecgList,
  timeList,
  length,
  updateID
}) => {
  // const [timeList, setTimeList] = useState([]);
  /*  useEffect(() => {
   fetch(`/api/gettimelist/${ecgList}`)
       .then((res) => {
       return res.json();
     })
     .then((data) => {
        console.log(data);
       setTimeList(data.timeList);
     });
  }, [ecgList]); */
  const n = length - 1;
  console.log(n);
  const index: number[] = [0];
  /*  for(let i=1;i<=5;i++){
    console.log(i);
} */
  for (let i = 1; i <= n; i++) {
    index.push(i);
  }

  return timeList !== undefined &&
    timeList !== undefined &&
    length !== undefined ? (
    <div>
      {index.map(function (i: any) {
        return (
          <div className="ecgsidebar-container" key={updateID}>
            <button
              className="ecg-button"
              onClick={() => {
                updateID(chart, i + 1);
              }}
            >
              {' '}
              {timeList[i].date} {timeList[i].time}
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    <div>placeholder</div>
  );
};

export default EcgSideBar;
