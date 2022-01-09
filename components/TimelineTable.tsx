// This component displays the timeline in a table format
import './TimelineTable.css';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

interface IProps {
  patientID: number;
}

type timeline = {
  id: number;
  time: string;
  event: string;
  byWho: string;
  type: string;
};

const TimelineTable: FC<IProps> = ({ patientID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  // This function checks the type of the timeline item. For some types only the event is returned.
  // For some types the event is clickable and linked to a corresponding page of the application.
  function setTimelineEvent(tLine: timeline) {
    if (tLine.type === 'vital_check') {
      return <Link to={`/Patient/${patientID}/Vitals`}>{tLine.event}</Link>;
    } else if (tLine.type === 'medication') {
      return <Link to={`/Patient/${patientID}/Medicine`}>{tLine.event}</Link>;
    } else if (tLine.type === 'ecg') {
      return <Link to={`/Patient/${patientID}/ECG`}>{tLine.event}</Link>;
    } else if (
      tLine.type === 'test_taken' ||
      tLine.type === 'test_result_green'
    ) {
      return <Link to={`/Patient/${patientID}/lab`}>{tLine.event}</Link>;
    } else {
      return tLine.event;
    }
  }

  useEffect(() => {
    fetch(`/api/gettimeline/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // The data is fetched and reversed before being stored in a state variable.
        // The reason is that the most recent event should be displayed at the top of the table
        const tLine = data.timeline;
        setTimeline(tLine.reverse());

        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="timeline-table-container">
      <table className="timeline-table">
        <thead>
          <tr>
            <th className="timeline-time">Tid</th>
            <th className="timeline-event">Händelse</th>
            <th className="timeline-by-who">Av vem</th>
          </tr>
        </thead>
        <tbody>
          {/* The timeline items are mapped through and added to the table */}
          {timeline.map((tLine: timeline) => (
            <tr key={tLine.id}>
              <td>{tLine.time}</td>
              <td className="timeline-table-link">{setTimelineEvent(tLine)}</td>
              <td>{tLine.byWho}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    // Loading animation while the data is fetched
    <div className="timeline-table-skeleton">
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={'460px'}
        width={'100%'}
      />
    </div>
  );
};

export default TimelineTable;
