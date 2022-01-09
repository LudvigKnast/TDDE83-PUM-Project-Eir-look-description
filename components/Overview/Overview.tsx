// This component is used to display personal details of a single patient

import './Overview.css';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OverviewCharts from './OverviewCharts';
import TimelineChart from '../TimelineChart';
import OverviewSwitcher from './OverviewSwitcher';
import OverviewJournal from './OverviewJournal';

// Type used for maping over ordinations
type Ordination = {
  id: number;
  medicine: string;
  instant: boolean;
  dripInfo: string;
  intake: string;
  dosage: string;
  amount: string;
  startTime: string;
  endTime: string;
};

// Get the current time
const currentTime: string = new Date().toTimeString().substr(0, 5);

const Overview: FC = ({ match }: any) => {
  // Get the current patient's id from the match object
  const patientID: number = match.params.id;

  const [ordinations, setOrdination] = useState([]);
  const [cause, setCause] = useState();
  const [sickness, setSickness] = useState();
  const [healthprob, setHealthprob] = useState();
  const [needs, setNeeds] = useState();
  const [temp, setTemp] = useState();
  const [nrs, setRNS] = useState();
  const [acvpu, setACVPU] = useState();

  // Gets the the ordinations for the patient from the backend and sets it to ordinations
  useEffect(() => {
    fetch(`/api/getordination/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Only take the three latest ordinations
        const size = data.ordinations.length;
        setOrdination(data.ordinations.slice(size - 3, size));
      });
  }, [patientID]);

  useEffect(() => {
    fetch(`/api/getonepatientoverview/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Only take the three latest ordinations
        console.log(data);
        setCause(data.patient[0].cause);
        setSickness(data.patient[0].sickness);
        setHealthprob(data.patient[0].healthProblem);
        setNeeds(data.patient[0].patientNeeds);
        setTemp(data.patient[0].temp);
        setRNS(data.patient[0].nrs);
        setACVPU(data.patient[0].ACVPU);
      });
  }, [patientID]);

  // A boolean that differentiates if you're a doctor. USed for conditional rendering.
  const isDoctor: boolean = localStorage.getItem('role') === 'Läkare';

  return !isDoctor ? (
    <>
      {/* First fragment, renders nurse view */}
      <div className="overview-wrapper-nurse">
        {/* Patient info box */}
        <div className="overview-container overview-box">
          <div>
            <h1>Information om patient</h1>
            <p>
              Sökorsak: <b>{cause}</b>
            </p>
            <p>
              Sjukdom: <b>{sickness}</b>
            </p>
            <p>
              Aktuellt hälsoproblem: <b>{healthprob}</b>
            </p>
            <p>
              Omvårdnadsbehov: <b>{needs}</b>
            </p>
          </div>
        </div>
        {/* The three vital parameters that is shown as single values instead of graphs */}
        <Link to={'./Vitals'} className="overview-link measurement-container">
          <div className="measurement-boxes">
            <h3 className="top first">TEMP</h3>
            {/* Replace with a indicator that turns the text red when temp is to high, goes for all values */}
            <span className="temp-span">{temp}</span>
            <h3 className="bottom last">{currentTime}</h3>
          </div>
          <div className="measurement-boxes">
            {' '}
            <h3 className="top middle">NRS</h3>
            <span>{nrs}</span>
            <h3 className="bottom last">{currentTime}</h3>
          </div>
          <div className="measurement-boxes">
            {' '}
            <h3 className="top last">ACVPU</h3>
            <span>{acvpu}</span>
            <h3 className="bottom last">{currentTime}</h3>
          </div>
        </Link>
        {/* Journal components with placeholder */}
        <Link
          to={'./Journal'}
          className="overview-box journal-overview-container overview-link"
        >
          <OverviewJournal patientID={patientID} />
        </Link>

        <div className="ordination-container">
          {/* Box for ordinations, renders the last three */}
          <Link
            to={'./Medicine'}
            className="overview-box ordinations-box overview-link"
          >
            <h1>Ordinationer på akuten</h1>
            <table>
              {/* Fragment as to conditionally render the time if the ordination has been given out already */}
              {ordinations.map((ordination: Ordination, i) =>
                parseInt(ordination.startTime.substr(11, 2)) ===
                parseInt(currentTime.substr(0, 2)) ? (
                  <tr key={ordination.id}>
                    <td>{ordination.medicine}</td>
                    <td>
                      {ordination.dosage} x {ordination.amount}
                    </td>
                    {/* Checks if the time in the mock-data is before current time for the case that it's the same hour */}
                    {parseInt(ordination.startTime.substr(14, 2)) <
                    parseInt(currentTime.substr(3, 2)) ? (
                      <td>{`${ordination.startTime.substr(
                        11,
                        2
                      )}:${ordination.startTime.substr(14, 2)}`}</td>
                    ) : (
                      <td>{'   '}</td>
                    )}
                  </tr>
                ) : (
                  <tr key={ordination.id}>
                    <td>{ordination.medicine}</td>
                    <td>
                      {ordination.dosage} x {ordination.amount}
                    </td>
                    {/* Checks if the time in the mock-data is before current time for the case that isn't the same hour */}
                    {parseInt(ordination.startTime.substr(11, 2)) <
                    parseInt(currentTime.substr(0, 2)) ? (
                      <td>{`${ordination.startTime.substr(
                        11,
                        2
                      )}:${ordination.startTime.substr(14, 2)}`}</td>
                    ) : (
                      <td>{'   '}</td>
                    )}
                  </tr>
                )
              )}
            </table>
          </Link>
          {/* Infarter/utfarter box with placeholder value */}
          <div className="overview-box ordinations-box">
            <h1>Infarter/Utfarter</h1>
            <table>
              <tr>
                <td>PVK</td>
                <td>0,9</td>
                <td>Höger armveck</td>
              </tr>
              <tr>
                <td>PVK</td>
                <td>1,3</td>
                <td>Vänster underarm</td>
              </tr>
            </table>
          </div>
        </div>
        {/* lab box with placeholder value */}
        <Link
          to={'./Lab'}
          className="lab-overview-container overview-box overview-link"
        >
          <h1>Senaste labbresultat</h1>
          <table>
            <tr>
              <td>S-Kolestrol</td>
              <td>187 mg/dL</td>
              <td>13:22</td>
            </tr>
            <tr>
              <td>B-Blodstatus</td>
              <td>144 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>P-Natrium</td>
              <td>140 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>P-Kalium</td>
              <td>3,7 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>Erc(B)-MCH</td>
              <td>30 mg/dL</td>
              <td>13:00</td>
            </tr>
          </table>
        </Link>
        {/* container for rendering vital parameter graphs, see component */}
        <div className="chart-container">
          <OverviewCharts patientID={patientID}></OverviewCharts>
        </div>
        {/* container for rendering timeline, see component */}
        <Link
          to={'./Timeline'}
          className="overview-timeline-container overview-link"
        >
          <TimelineChart patientID={patientID} />
        </Link>
      </div>
    </>
  ) : (
    <>
      {/* Doctor view */}
      <div className="overview-wrapper-doctor">
        {/* Patient info box */}
        <div className="overview-container overview-box">
          <div>
            <h1>Information om patient</h1>
            <p>
              Sökorsak: <b>{cause}</b>
            </p>
            <p>
              Sjukdom: <b>{sickness}</b>
            </p>
            <p>
              Aktuellt hälsoproblem: <b>{healthprob}</b>
            </p>
            <p>
              Omvårdnadsbehov: <b>{needs}</b>
            </p>
          </div>
        </div>
        <div className="ordination-container">
          {/* Infarter/utfarter box with placeholder value */}
          <div className="overview-box ordinations-box">
            <h1>Infarter/Utfarter</h1>
            <table>
              <tr>
                <td>PVK</td>
                <td>0,9</td>
                <td>Höger armveck</td>
              </tr>
              <tr>
                <td>PVK</td>
                <td>1,3</td>
                <td>Vänster underarm</td>
              </tr>
            </table>
          </div>
          {/* Box for ordinations, renders the last three */}
          <Link
            to={'./Medicine'}
            className="overview-box ordinations-box overview-link"
          >
            <h1>Ordinationer på akuten</h1>
            <table>
              {/* Fragment as to conditionally render the time if the ordination has been given out already */}
              {ordinations.map((ordination: Ordination, i) =>
                parseInt(ordination.startTime.substr(11, 2)) ===
                parseInt(currentTime.substr(0, 2)) ? (
                  <tr key={ordination.id}>
                    <td>{ordination.medicine}</td>
                    <td>
                      {ordination.dosage} x {ordination.amount}
                    </td>
                    {/* Checks if the time in the mock-data is before current time for the case that it's the same hour */}
                    {parseInt(ordination.startTime.substr(14, 2)) <
                    parseInt(currentTime.substr(3, 2)) ? (
                      <td>{`${ordination.startTime.substr(
                        11,
                        2
                      )}:${ordination.startTime.substr(14, 2)}`}</td>
                    ) : (
                      <td>{'   '}</td>
                    )}
                  </tr>
                ) : (
                  <tr key={ordination.id}>
                    <td>{ordination.medicine}</td>
                    <td>
                      {ordination.dosage} x {ordination.amount}
                    </td>
                    {/* Checks if the time in the mock-data is before current time for the case that isn't the same hour */}
                    {parseInt(ordination.startTime.substr(11, 2)) <
                    parseInt(currentTime.substr(0, 2)) ? (
                      <td>{`${ordination.startTime.substr(
                        11,
                        2
                      )}:${ordination.startTime.substr(14, 2)}`}</td>
                    ) : (
                      <td>{'   '}</td>
                    )}
                  </tr>
                )
              )}
            </table>
          </Link>
        </div>
        {/* lab box with placeholder value */}
        <Link
          to={'./Lab'}
          className="lab-overview-container overview-box overview-link"
        >
          <h1>Senaste labbresultat</h1>
          <table>
            <tr>
              <td>S-Kolestrol</td>
              <td>187 mg/dL</td>
              <td>13:22</td>
            </tr>
            <tr>
              <td>B-Blodstatus</td>
              <td>144 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>P-Natrium</td>
              <td>140 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>P-Kalium</td>
              <td>3,7 mg/dL</td>
              <td>13:13</td>
            </tr>
            <tr>
              <td>Erc(B)-MCH</td>
              <td>30 mg/dL</td>
              <td>13:00</td>
            </tr>
          </table>
        </Link>
        {/* container for rendering vital parameter graphs, see component */}
        <div className="chart-container">
          <OverviewCharts
            patientID={patientID}
            isDoctor={isDoctor}
          ></OverviewCharts>
        </div>
        {/* container for rendering timeline, see component */}
        <Link
          to={'./Timeline'}
          className="overview-timeline-container overview-link"
        >
          <TimelineChart patientID={patientID} />
        </Link>
        {/* container for rendering EKG, MRI and Journal as well as switching between them, see component */}
        <div className="ekg-overview-container overview-box doctor-overview">
          <OverviewSwitcher patientID={patientID} />
        </div>
      </div>
    </>
  );
};

export default Overview;
