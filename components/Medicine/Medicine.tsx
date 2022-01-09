// This component is used to display personal details of a single patient

import './Medicine.css';
import { FC } from 'react';
import MedicineTable from './MedicineTable';
import Ordinations from './Ordinations';

const Medicine: FC = ({ match }: any) => {
  const patientID: number = match.params.id;

  // Returns the ordinations and medicinetable components to be rendered
  return (
    <div className="table-div">
      <Ordinations patientID={patientID}></Ordinations>
      <MedicineTable patientID={patientID}></MedicineTable>
    </div>
  );
};

export default Medicine;
