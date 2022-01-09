// This component is one item in the timeline. It consists of a dash to the left,
// an icon with a time and event in the middle, and a dash to the right.
import { FC, useState } from 'react';
import { BsDashLg } from 'react-icons/bs';
import {
  RiHospitalLine,
  RiStethoscopeFill,
  RiTestTubeFill
} from 'react-icons/ri';
import { BiLocationPlus, BiTestTube } from 'react-icons/bi';
import { GiMedicines } from 'react-icons/gi';
import { FaXRay, FaUserNurse } from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './TimelineItem.css';

interface IProps {
  icon: string;
  event: string;
  time: string;
  info: string;
  type: string;
  patientID: number;
}

const TimelineItem: FC<IProps> = ({
  icon,
  event,
  time,
  info,
  patientID,
  type
}) => {
  const [hover, setHover] = useState(false);
  // If an event has extra info, then this will be displayed when the icon of the item is hovered on
  const onHover = () => {
    if (info === '') {
      setHover(false);
    } else {
      setHover(true);
    }
  };
  const onLeave = () => {
    setHover(false);
  };

  // This function is used to decide which icon should be displayed.
  // onHover is called when the icon is hovered on, and onLeave is called when the mouse leaves the icon.
  function setIcon() {
    if (icon === 'hospital') {
      return (
        <RiHospitalLine
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></RiHospitalLine>
      );
    } else if (icon === 'location') {
      return (
        <BiLocationPlus
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></BiLocationPlus>
      );
    } else if (icon === 'vital_check') {
      return (
        <RiStethoscopeFill
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></RiStethoscopeFill>
      );
    } else if (icon === 'medication') {
      return (
        <GiMedicines
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></GiMedicines>
      );
    } else if (icon === 'x-ray') {
      return (
        <FaXRay
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></FaXRay>
      );
    } else if (icon === 'check_up') {
      return (
        <FaUserNurse
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></FaUserNurse>
      );
    } else if (icon === 'test_taken') {
      return (
        <BiTestTube
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></BiTestTube>
      );
    } else if (icon === 'test_result_green') {
      return (
        <RiTestTubeFill
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          color={'rgb(25, 255, 25)'}
        ></RiTestTubeFill>
      );
    } else if (icon === 'ecg') {
      return (
        <IoMdPulse
          className="icon-dot"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        ></IoMdPulse>
      );
    }
  }

  // This function checks the type of the timeline item. For some types only the event is returned.
  // For some types the event is clickable and linked to a corresponding page of the application.
  function setTimelineEvent() {
    if (type === 'vital_check') {
      return <Link to={`/Patient/${patientID}/Vitals`}>{event}</Link>;
    } else if (type === 'medication') {
      return <Link to={`/Patient/${patientID}/Medicine`}>{event}</Link>;
    } else if (type === 'ecg') {
      return <Link to={`/Patient/${patientID}/ECG`}>{event}</Link>;
    } else if (type === 'test_taken' || type === 'test_result_green') {
      return <Link to={`/Patient/${patientID}/lab`}>{event}</Link>;
    } else {
      return event;
    }
  }

  return (
    <div className="timeline-item-container">
      <div className="timeline-event-hover-container">
        <div className="timeline-item-event">{setTimelineEvent()}</div>
        {/* Displays the extra info if the item is hovered on */}
        {hover && <div className="timeline-hover">{info}</div>}
      </div>
      <div className="line-dot-line">
        <BsDashLg className="timeline-item-line" />
        {setIcon()}
        <BsDashLg className="timeline-item-line" />
      </div>
      <div className="timeline-item-time">{time}</div>
    </div>
  );
};

export default TimelineItem;
