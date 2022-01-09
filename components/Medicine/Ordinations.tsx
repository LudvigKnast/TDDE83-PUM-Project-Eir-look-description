import './MedicineTable.css';
import { FaSyringe, FaPills } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Type to be used by the map function
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

function Ordinations(props: any) {
  // Usestate for oridnations
  const [ordinations, setOrdination] = useState([]);

  // Sets the ordinations to the ones the patient has from the backend
  useEffect(() => {
    fetch(`/api/getordination/${props.patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrdination(data.ordinations);
      });
  }, [props.patientID]);

  // Gets the halfhour increments for the table head
  const hours = Array.from(
    {
      length: 48
    },
    (_, hour) =>
      moment({
        hour: Math.floor(hour / 2),
        minutes: hour % 2 === 0 ? 0 : 30
      }).format('HH:mm')
  );

  // Get's the current time and declares the rounded time
  const current = new Date().toLocaleTimeString('it-IT');
  const currentHour = parseInt(current.substring(0, 2));
  const currentMin = parseInt(current.substring(3, 5));
  let currentRoundedTime = '';

  // For rounding off the CURRENT time
  if (currentMin >= 30) {
    if (currentHour === 23) {
      currentRoundedTime = '00:00';
    } else {
      currentRoundedTime = `${currentHour}:30`;
      if (currentHour < 10) {
        currentRoundedTime = `0${currentHour}:30`;
      }
    }
  } else if (currentMin < 30 && currentMin >= 0) {
    currentRoundedTime = `${currentHour}:00`;
    if (currentHour < 10) {
      currentRoundedTime = `0${currentHour}:00`;
    }
  } else {
    currentRoundedTime = `${currentHour}:30`;
    if (currentHour < 10) {
      currentRoundedTime = `0${currentHour}:30`;
    }
  }

  return (
    <div className="medicine-table-container">
      <h1>Ordinationer på akuten</h1>
      <table>
        <thead>
          <tr>
            <th>Läkemedel</th>
            <th>Mängd</th>
            {hours.map((items, i) => {
              // Sets the current (rounded) time to red
              if (items === currentRoundedTime) {
                return (
                  <th style={{ backgroundColor: 'red' }} key={i}>
                    {items}
                  </th>
                );
              } else {
                return <th key={i}>{items}</th>;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {/* Go through the ordinations list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more */}
          {ordinations.map((ordination: Ordination, i) => (
            <tr key={ordination.id}>
              <td key={i}>
                {' '}
                {ordination.medicine}
                {ordination.dripInfo} <br />
                {ordination.intake}{' '}
              </td>
              <td key={i + 1}>
                {' '}
                {ordination.dosage} {'x'} {ordination.amount}{' '}
              </td>
              {hours.map((items, i) => {
                // Declare start and end times in hours and minutes
                const ordinationHourStart = parseInt(
                  ordination.startTime.substring(11, 13)
                );
                const ordinationMinStart = parseInt(
                  ordination.startTime.substring(14, 16)
                );
                const ordinationHourEnd = parseInt(
                  ordination.endTime.substring(11, 13)
                );
                const ordinationMinEnd = parseInt(
                  ordination.endTime.substring(14, 16)
                );
                let ordinationStartTime = '';
                let ordinationEndTime = '';

                // For rounding off the START time
                if (ordinationMinStart >= 45) {
                  if (ordinationHourStart === 23) {
                    ordinationStartTime = '00:00';
                  } else {
                    ordinationStartTime = `${ordinationHourStart + 1}:00`;
                  }
                } else if (
                  ordinationMinStart < 45 &&
                  ordinationMinStart >= 15
                ) {
                  ordinationStartTime = `${ordinationHourStart}:30`;
                } else {
                  ordinationStartTime = `${ordinationHourStart}:00`;
                }
                // For rounding off the END time
                if (ordinationMinEnd >= 45) {
                  if (ordinationHourEnd === 23) {
                    ordinationEndTime = '00:00';
                  } else {
                    ordinationEndTime = `${ordinationHourEnd + 1}:00`;
                  }
                } else if (ordinationMinEnd < 45 && ordinationMinEnd >= 15) {
                  ordinationEndTime = `${ordinationHourEnd}:30`;
                } else {
                  ordinationEndTime = `${ordinationHourEnd}:00`;
                }

                // Adds an appropriate icon at the right time
                if (
                  ordination.instant === true &&
                  ordinationStartTime === items &&
                  ordination.intake === 'intramuskulärt'
                ) {
                  return (
                    <td key={i}>
                      {' '}
                      <abbr
                        title={
                          'Intag startat klockan ' +
                          ordination.startTime.substring(11, 19)
                        }
                      >
                        <FaSyringe />
                      </abbr>
                    </td>
                  );
                } else if (
                  ordination.instant === false &&
                  parseInt(items) <= parseInt(ordinationEndTime) &&
                  ordination.intake === 'intramuskulärt'
                ) {
                  // return <td className="blue"></td>;
                  if (ordinationStartTime === items) {
                    return <td key={i} className="blue"></td>;
                  } else if (parseInt(items) >= parseInt(ordinationStartTime)) {
                    return <td key={i} className="blue"></td>;
                  } else {
                    return <td key={i} />;
                  }
                } else if (
                  ordinationStartTime === items &&
                  ordination.intake === 'oralt tablett'
                ) {
                  return (
                    <td key={i}>
                      {' '}
                      <abbr
                        title={
                          'Intag startat klockan ' +
                          ordination.startTime.substring(11, 19)
                        }
                      >
                        <FaPills />
                      </abbr>
                    </td>
                  );
                } else {
                  // Fill the empty parts of the table
                  return <td key={i} />;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordinations;
