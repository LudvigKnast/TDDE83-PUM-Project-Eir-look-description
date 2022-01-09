// This component is a table which displays lab results
import { Skeleton, Collapse, IconButton, Checkbox } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import Popup from 'reactjs-popup';
import rontgen from './../images/rontgen.png';

import './LabTable.css';
import './Popup.css';

interface IProps {
  patientID: number;
}

interface lab {
  id: number;
  name: string;
  value: string;
}

const LabTable: FC<IProps> = ({ patientID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kliniskKemi, setKliniskKemi] = useState([]);
  const [radiologi, setRadiologi] = useState([]);
  const [openKKem, setOpenKKem] = useState(true);
  const [openRad, setOpenRad] = useState(true);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);

  /* This page was not of high priority and we did not get any intervals in which
    different results were bad. The data is therefor static and choosen from a picture
    where the bad values were red and follow by a *. The process to decide if a value should
    be red is therefor simply to check if the value ends with a * in this case.
  */
  function setValue(val: string) {
    if (val.slice(-1) === '*') {
      return <td className="lab-value red-val">{val}</td>;
    } else {
      return <td className="lab-value">{val}</td>;
    }
  }

  useEffect(() => {
    fetch(`/api/getlab/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // The data is fetched and stored in state variables
        const kKemi = data.lab.klinisk_kemi;
        setKliniskKemi(kKemi);
        const rad = data.lab.radiologi;
        setRadiologi(rad);

        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="lab-table-container">
      {/* This is a modal which displays an x-ray image */}
      <Popup
        contentStyle={{ width: 'auto', height: 'auto' }}
        overlayStyle={{ backdropFilter: 'blur(4px)' }}
        open={modal}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal">
          <img src={rontgen} className="lab-image"></img>
        </div>
      </Popup>

      <table className="lab-table">
        <thead>
          <tr>
            <th className="empty-th lab-name"></th>
            <th className="lab-date-header lab-value">
              2021-11-25 <br />
              14:41
            </th>
            <th className="lab-date-header lab-right">
              2021-11-25 <br />
              16:13
            </th>
          </tr>
          <tr>
            <th className="lab-name lab-table-header">
              {/* A checkbox which toggles collapse of the rows of "Klinisk kemi" */}
              <IconButton onClick={() => setOpenKKem(!openKKem)}>
                {<Checkbox defaultChecked color="default" />}
              </IconButton>
              Klinisk kemi
            </th>
            <th className="lab-value lab-table-header">Besvarad</th>
            <th className="lab-right lab-table-header"></th>
          </tr>
        </thead>
      </table>

      {/* kliniskKemi is mapped through to create the rows.
      These rows are collapsible. */}
      <Collapse in={openKKem} timeout="auto">
        <table className="lab-table">
          {kliniskKemi.map((lab: lab) => (
            <tr key={lab.id}>
              <td className="lab-name">{lab.name}</td>
              {/* Returns the values with or without the "red-val class" */}
              {setValue(lab.value)}
              <td className="lab-right"></td>
            </tr>
          ))}
        </table>
      </Collapse>

      <table className="lab-table">
        <thead>
          <tr>
            <th className="lab-name lab-table-header">
              {/* A checkbox which toggles collapse of the rows of "Radiologi" */}
              <IconButton onClick={() => setOpenRad(!openRad)}>
                {<Checkbox defaultChecked color="default" />}
              </IconButton>
              Radiologi
            </th>
            <th className="lab-value lab-table-header"></th>
            <th className="lab-right lab-table-header">Besvarad</th>
          </tr>
        </thead>
      </table>

      {/* radiologi is mapped through to create the rows.
      These rows are collapsible. */}
      <Collapse in={openRad} timeout="auto">
        <table className="lab-table">
          {radiologi.map((lab: lab) => (
            <tr key={lab.id}>
              <td className="lab-name">{lab.name}</td>
              <td className="lab-value"></td>
              <td
                className="lab-right lab-hover"
                // Triggers the modal
                onClick={() => setModal(true)}
              >
                {lab.value}
              </td>
            </tr>
          ))}
        </table>
      </Collapse>
    </div>
  ) : (
    // Loading animation while the data is fetched
    <div className="lab-table-skeleton">
      <Skeleton animation="wave" variant="rectangular" height={'460px'} />
    </div>
  );
};

export default LabTable;
