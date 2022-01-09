// This component is used to display the vital charts in the overview

import './OverviewCharts.css';
import './Overview.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AFChart from '../Vitals/AFChart';
import PBSchart from '../Vitals/PBSchart';
import AssessmentChart from '../Vitals/AssessmentChart';
import TemperatureChart from '../Vitals/TemperatureChart';
import Button from '../Button';

function OverviewCharts(props: any) {
  // The three chart components we want to switch between in the overview
  const charts = [
    <PBSchart
      patientID={props.patientID}
      overview={true}
      key={props.patientID}
    />,
    <AFChart
      patientID={props.patientID}
      overview={true}
      key={props.patientID}
    />,
    <AssessmentChart
      patientID={props.patientID}
      overview={true}
      key={props.patientID}
    />,
    <TemperatureChart
      patientID={props.patientID}
      overview={true}
      key={props.patientID}
    />
  ];

  // Set state for selected chart at the moment, start with PBS
  const [selectedCharts, setSelectedCharts] = useState(0);

  // Function to set state to chart
  function chartsSelect(chart: number) {
    setSelectedCharts(chart);
  }

  // Return has two fragments, one for doctor with three graphs and one for nurse with two
  return !props.isDoctor ? (
    <>
      {/* Nurse view, renders the selected chart */}
      <div className="chart-overview-wrapper">
        {selectedCharts === 0 ? (
          <Link to={'./Vitals'} className="overview-chart-div overview-link">
            {charts[0]}
          </Link>
        ) : (
          <Link to={'./Vitals'} className="overview-chart-div overview-link">
            {charts[1]}
          </Link>
        )}
      </div>
      {/* Nurse view, renders two buttons with on click to select the chart */}
      <div className="chart-button-wrapper">
        <div
          onClick={() => {
            chartsSelect(0);
          }}
          className="chart-button-div-nurse"
        >
          <Button text="Puls och blodtryck" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            chartsSelect(1);
          }}
          className="chart-button-div-nurse"
        >
          <Button text="Andningsfrekvens" color="primary"></Button>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Dcotor view, renders the selected chart, double fragment to get 3 conditions */}
      <div className="chart-overview-wrapper">
        {selectedCharts === 0 ? (
          <Link to={'./Vitals'} className="overview-chart-div overview-link">
            {charts[0]}
          </Link>
        ) : (
          <>
            {selectedCharts === 1 ? (
              <Link
                to={'./Vitals'}
                className="overview-chart-div overview-link"
              >
                {charts[1]}
              </Link>
            ) : (
              <>
                {selectedCharts === 2 ? (
                  <Link
                    to={'./Vitals'}
                    className="overview-chart-div overview-link"
                  >
                    {charts[2]}
                  </Link>
                ) : (
                  <Link
                    to={'./Vitals'}
                    className="overview-chart-div overview-link"
                  >
                    {charts[3]}
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
      {/* Doctor view, renders three buttons with on click to select the chart */}
      <div className="chart-button-wrapper">
        <div
          onClick={() => {
            chartsSelect(0);
          }}
          className="chart-button-div-doctor"
        >
          <Button text="Puls och blodtryck" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            chartsSelect(1);
          }}
          className="chart-button-div-doctor"
        >
          <Button text="Andningsfrekvens" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            chartsSelect(2);
          }}
          className="chart-button-div-doctor"
        >
          <Button text="RLS, GCS, NRS" color="primary"></Button>
        </div>
        <div
          onClick={() => {
            chartsSelect(3);
          }}
          className="chart-button-div-doctor"
        >
          <Button text="Temperatur" color="primary"></Button>
        </div>
      </div>
    </>
  );
}

export default OverviewCharts;
