/* eslint-disable dot-notation */
// This component is used to display information about the current subject
// Doctor/Staff/Patient
// List items will dynamically change and are uninteractable

import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import TriagePopup from './TriagePopup';
import CausePopup from './CausePopup';
import NamePopup from './NamePopup';
import './TopBar.css';
import './Popup.css';

import Ums, { UmsProps } from './Ums';
import { Patient } from './AllPatients';

// Icons
import { FaBell, FaHome } from 'react-icons/fa';

// function TopBar() {
const TopBar: FC = () => {
  const location = useLocation();

  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(true);
  const [ums, setUms] = useState<UmsProps>();

  const [time, setTime] = useState<string>(
    new Date().toTimeString().substr(0, 5)
  );

  // Determine which patient's data to fetch based on the pathname
  const currentPatientID: number =
    parseInt(location.pathname.substring(9, 12)) ??
    parseInt(location.pathname.substring(9, 11)) ??
    parseInt(location.pathname.substring(9, 10));
  const [patientID, setPatientID] = useState(currentPatientID);

  useEffect(() => {
    setPatientID(currentPatientID);
    if (!Number.isNaN(patientID)) {
      fetch(`/api/getonepatient/${patientID}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPatient(data.patient);
          setLoading(false);
        });
    }
  }, [currentPatientID, patientID]);

  useEffect(() => {
    if (!Number.isNaN(patientID)) {
      fetch(`/api/getums/${patientID}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUms(data.ums);
        });
    }
  }, [currentPatientID, patientID]);

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

  return !loading ? (
    <div
      className="topbar-container"
      style={{ fontSize: '25px', color: 'white' }}
    >
      <ul className="topbar-list">
        {/* Determine if patient specific or general information should be shown */}
        {location.pathname.startsWith('/Patient/') ? (
          <>
            {/* The following will be displayed if a specific patient i */}
            <li>{time}</li>
            <li className="topbar-item">
              <FaBell />
              {'  ' + patient?.time} min
            </li>
            <li style={{ cursor: 'pointer' }}>
              <TriagePopup id={patientID} />
            </li>

            <li>{patient?.room}</li>

            <li className="topbar-item" style={{ cursor: 'pointer' }}>
              {ums ? (
                <Ums
                  {...ums}
                  style={{
                    height: '50px'
                  }}
                />
              ) : (
                ''
              )}
            </li>

            <li className="topbar-item" style={{ cursor: 'pointer' }}>
              <NamePopup patientData={patient} />
            </li>
            <li style={{ cursor: 'pointer' }}>
              <CausePopup id={patientID}></CausePopup>
            </li>
            <li>
              <Link to={'/Patients'}>
                <FaHome style={{ color: 'white' }} />
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* The following will be displayed when no patient is selected */}
            <li>{time}</li>
          </>
        )}
      </ul>
    </div>
  ) : (
    <div
      className="topbar-container"
      style={{ fontSize: '25px', color: 'white' }}
    >
      <ul className="topbar-list">
        <li>{time}</li>
      </ul>
    </div>
  );
};

export default TopBar;
