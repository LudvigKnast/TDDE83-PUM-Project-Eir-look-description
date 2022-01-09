// This component is a popup box that is displayed when the cause of admittance is clicked
// in the topbar. "Aktuellt hälsoproblem" will be shown and the header links to the journal.
import Popup from 'reactjs-popup';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CausePopupProps {
  id: number;
}

const CausePopup: FC<CausePopupProps> = (patient) => {
  const [cause, setCause] = useState();
  const [info, setInfo] = useState();

  // Fetches the cause of admittance from the patient
  useEffect(() => {
    fetch(`/api/getonepatient/${patient.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCause(data.patient.cause);
      });
  }, [patient.id]);

  // Fetches "aktuellt hälsoproblem" from journal
  useEffect(() => {
    fetch(`/api/getjournal/${patient.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data[0]['Aktuellt hälsoproblem']);
      });
  }, [patient.id]);

  return (
    <Popup trigger={<div>{cause}</div>}>
      <div className="header">
        <Link to={`/Patient/${patient.id}/Journal`}>Aktuellt hälsoproblem</Link>
      </div>
      <div>{info}</div>
    </Popup>
  );
};

export default CausePopup;
