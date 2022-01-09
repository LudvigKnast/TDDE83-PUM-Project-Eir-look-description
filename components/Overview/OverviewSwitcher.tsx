// This component is used to display the vital charts in the overview

import './OverviewSwitcher.css';
import './Overview.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OverviewEKG from './OverviewEKG';
import MRI from './OverviewMRI';
import OverviewJournal from './OverviewJournal';
import Button from '../Button';

function OverviewSwitcher(props: any) {
  // The three components we want to switch between in the overview
  const pages = [
    <OverviewEKG patientID={props.patientID} key={props.patientID} />,
    <MRI patientID={props.patientID} key={props.patientID} />,
    <OverviewJournal patientID={props.patientID} key={props.patientID} />
  ];

  // Set state for selected page at the moment, start with EKG
  const [selectedPage, setSelectedPage] = useState(0);

  // Function to set state to page
  function pageSelect(page: number) {
    setSelectedPage(page);
  }

  return (
    <div className="switcher-overview-wrapper">
      {/* Use fragments to conditionally render the right page depending on which is selected */}
      {selectedPage === 0 ? (
        <Link to={'./ECG'} className="overview-switcher-div overview-link">
          {pages[0]}
        </Link>
      ) : (
        <>
          {selectedPage === 1 ? (
            <Link to={'./Lab'} className="overview-switcher-div overview-link">
              {pages[1]}
              {pages[1]}
              {pages[1]}
            </Link>
          ) : (
            <Link
              to={'./Journal'}
              className="overview-switcher-div overview-link"
            >
              {pages[2]}
            </Link>
          )}
        </>
      )}
      {/* Add three buttons which corresponds to the three different components, onclick for slected page function */}
      <div className="switcher-button-wrapper">
        <div
          onClick={() => {
            pageSelect(0);
          }}
          className="switcher-button-div"
        >
          <Button text="EKG" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            pageSelect(1);
          }}
          className="switcher-button-div"
        >
          <Button text="Röntgen" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            pageSelect(2);
          }}
          className="switcher-button-div"
        >
          <Button text="Journal" color="primary"></Button>
        </div>
      </div>
    </div>
  );
}

export default OverviewSwitcher;
