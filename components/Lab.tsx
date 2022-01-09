// This component is the lab page where the lab table is displayed
import { FC } from 'react';
import LabTable from './LabTable';
import './Lab.css';

const Lab: FC = ({ match }: any) => {
  const patientID: number = match.params.id;

  return (
    <div className="lab-container">
      <LabTable patientID={patientID}></LabTable>
    </div>
  );
};

export default Lab;
