import './Timeline.css';
// Component for the timeline page where the timeline chart and timeline table is displayed
import { FC } from 'react';
import TimelineTable from './TimelineTable';
import TimelineChart from './TimelineChart';

const Timeline: FC = ({ match }: any) => {
  const patientID: number = match.params.id;

  return (
    <div className="timeline-container">
      <div className="timeline-chart">
        <TimelineChart patientID={patientID} />
      </div>
      <TimelineTable patientID={patientID} />
    </div>
  );
};

export default Timeline;
