import './Ecg.css';
import { FC, useState, useEffect } from 'react';
import ECGChart from './ECGChart';
import EcgSideBar from './EcgSideBar';

type ECGTime = {
  time: any;
};

const Ecg: FC = ({ match }: any) => {
  const PatientID: number = match.params.id;
  // let CurrentListID: number = 1;
  // let PreviousListID: number = 2;
  const [ecgList, setEcgList] = useState([]);
  const [timeList, setTimeList] = useState<ECGTime>();
  const [CurrentListID, updateCurrentID] = useState<number>();
  const [PreviousListID, updatePreviousID] = useState<number>();

  // this.state = {CurrentListID: 1, PreviousListID:2}
  useEffect(() => {
    fetch(`/api/getecglist/${PatientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEcgList(data.ecgList);
        // console.log(data["timeList"])
        setTimeList(data.timeList);
        // updateCurrentID(data.ecgList[0])
        // updatePreviousID(data.ecgList[1])
        updateCurrentID(1);
        updatePreviousID(2);
      });
  }, [PatientID]);

  const updateID = (chart: string, newID: number) => {
    if (chart === 'current') {
      // CurrentListID = newID;

      updateCurrentID(newID);
      // this.setState({CurrentListID: newID})
    } else if (chart === 'previous') {
      // PreviousListID = newID;
      updatePreviousID(newID);
      // this.setState({PreviousListID: newID})
    }
  };

  return ecgList !== undefined &&
    timeList !== undefined &&
    CurrentListID !== undefined &&
    PreviousListID !== undefined ? (
    <div className="ecg-container">
      <div className="current">
        <div className="chart">
          <p> EKG: {CurrentListID} </p>
          <ECGChart
            patientID={PatientID}
            ecgList={ecgList}
            listID={CurrentListID}
          />
        </div>
        <div className="selector">
          <EcgSideBar
            chart={'current'}
            ecgList={ecgList}
            timeList={timeList}
            length={ecgList.length}
            updateID={updateID}
          />
        </div>
      </div>

      <div className="previous">
        <div>
          <p> EKG: {PreviousListID}</p>
          <ECGChart
            patientID={PatientID}
            ecgList={ecgList}
            listID={PreviousListID}
          />
        </div>
        <div className="selector">
          <EcgSideBar
            chart={'previous'}
            ecgList={ecgList}
            timeList={timeList}
            length={ecgList.length}
            updateID={updateID}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Ecg;
