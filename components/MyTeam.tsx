// This component shows a table of all the patients in the system
// Leads to a patient's "Journal" component if clicked on a patient

import './AllPatients.css';
import { FC, useState, useEffect, Fragment } from 'react';
import { Skeleton } from '@mui/material';

// Icons
// import internal from "stream";

// Type to be used by the map function
type Personnel = {
  id: number;
  name: string;
  role: string;
  shiftStart: string;
  shiftEnd: string;
  team: number;
};

const week = [
  'måndag',
  'tisdag',
  'onsdag',
  'torsdag',
  'fredag',
  'lördag',
  'söndag'
];

const currentDate: Date = new Date();
const today: string = `${
  week[currentDate.getDay() - 1]
} ${currentDate.getDate()}/${currentDate.getMonth() + 1}`;

const MyTeam: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState({
    myteam: []
  });

  // eslint-disable-next-line no-unused-vars
  const rows = [1, 2, 3, 4];

  useEffect(() => {
    fetch('/api/getpersonnel')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Add user and user team from localstorage if we want to have it dynamic
        // let user = JSON.parse(localStorage.getItem('user'));
        const myteam = data.personnel.filter(
          (personnel: { team: number }) => personnel.team === 1
        );
        setTeams({ myteam });
        setIsLoading(false);
      });
  }, []);

  return !isLoading ? (
    <>
      <table className="patients-team-container">
        <thead>
          <tr>
            <th>Mitt team</th>
          </tr>
          <tr>
            <th>Schemat för {today}</th>
          </tr>
          <tr>
            <th>Namn</th>
            <th>Roll</th>
            <th>Skift</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.myteam.map((personnel: Personnel) => (
            <tr key={personnel.id}>
              {/* Not necessary to link Personel yet, might be useful if we will have more info later */}
              {/* <td className="staff-name">
                <Link
                  to={`/Patient/${personnel.id}/Journal`}
                   className="table-link-name"
                > */}
              {/* Show a test result symbol next to name if it exists */}
              {/* </Link> */}
              <td className="table-link-name">{personnel.name} </td>
              <td>{personnel.role}</td>
              <td>
                {personnel.shiftStart} - {personnel.shiftEnd}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>
      <div className="skeleton">
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={300}
          className="single-skeleton"
        />
      </div>
    </>
  );
};

export default MyTeam;
