// This component is the timeline chart. The actual timeline put together by timeline items
import './TimelineChart.css';
import './TimelineItem.css';
import { FC, useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { AiOutlineClockCircle } from 'react-icons/ai';
import TimelineItem from './TimelineItem';
import { BsDashLg } from 'react-icons/bs';

interface IProps {
  patientID: number;
}

// interface ObjectProps {
//   currentTime: string;
// }

type timeline = {
  id: number;
  time: string;
  event: string;
  byWho: string;
  type: string;
  info: string;
};

const TimelineChart: FC<IProps> = ({ patientID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  const [time, setTime] = useState<string>(
    new Date().toTimeString().substr(0, 5)
  );
  let hasSetCurrentTime = false;

  // This creates the object for the current time (the red clock icon with a dashed line)
  const TimeLineObject: FC = () => {
    return (
      <div className="timeline-item-container">
        <div className="timeline-item-event event-time">- - - -</div>
        <div className="line-dot-line">
          <BsDashLg className="timeline-item-line" />
          <AiOutlineClockCircle className="icon-dot icon-time"></AiOutlineClockCircle>
          <BsDashLg className="timeline-item-line" />
        </div>
        <div className="timeline-item-time time-time">{time}</div>
      </div>
    );
  };

  // Creates the current-time object at the end of the timeline if it has not already been created
  const CurrentTimeItemLast = () => {
    if (!hasSetCurrentTime) {
      hasSetCurrentTime = true;
      return <TimeLineObject />;
    }
    return <a></a>;
  };

  // Checks if the next timeline item is after the current time.
  // If so then the current-time object is returned so that it is displayed before the next item
  const CurrentTimeItem = (pastItem: timeline) => {
    if (!hasSetCurrentTime) {
      const pastTime = pastItem.time.split(':');
      const reference = new Date();
      const currentTime = new Date();
      const hours: number = +pastTime[0];
      const minutes: number = +pastTime[1];
      reference.setHours(hours);
      reference.setMinutes(minutes);
      reference.setSeconds(0);

      if (currentTime < reference) {
        hasSetCurrentTime = true;
        return <TimeLineObject />;
      }
    }
    return <a></a>;
  };

  useEffect(() => {
    // Update the time state in intervals of 1 second to always have accurate time
    const timer = setInterval(() => {
      const currentTime: string = new Date().toTimeString().substr(0, 5);
      setTime(currentTime);
    }, 1000);

    // Clean up when this component unmounts so we don't keep calling the interval
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetch(`/api/gettimeline/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // The data is fetched and stored in a state variable
        const tLine = data.timeline;
        setTimeline(tLine);

        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="scroll-x">
      {/* Maps through the timeline items and adds them to the timeline */}
      {timeline.map((tLine: timeline, i: number) => (
        <div key={i} className="two-items-container">
          {CurrentTimeItem(tLine)}
          <TimelineItem
            icon={tLine.type}
            event={tLine.event}
            time={tLine.time}
            info={tLine.info}
            type={tLine.type}
            patientID={patientID}
          ></TimelineItem>
        </div>
      ))}
      {CurrentTimeItemLast()}
    </div>
  ) : (
    // Loading animation while the data is fetched
    <div className="timeline-table-skeleton">
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={'360px'}
        width={'100%'}
      />
    </div>
  );
};

export default TimelineChart;
