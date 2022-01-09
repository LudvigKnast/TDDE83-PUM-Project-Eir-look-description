/* eslint-disable no-useless-return */
/* eslint-disable array-callback-return */
/* eslint-disable dot-notation */
// This component is used to display personal details of a single patient

import './Journal.css';
import { FC, useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

const Journal: FC = ({ match }: any) => {
  const patientID: number = match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [journal, setJournal] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`/api/getjournal/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setJournal(data.reverse());
        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="journal-container">
      <div className="journal">
        <h1>Journal</h1>
        <div className="journal-search">
          <input
            type="text"
            className="journal-search-input"
            placeholder="Sök i journal..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {Object.keys(journal).map((key, index) => {
            return (
              <div className="journal-box" key={patientID}>
                <div className="journal-title">
                  <h2>Datum: {journal[index]['Datum']}</h2>
                  <h2>Signerat: {journal[index]['Signerat']}</h2>
                  <h2>Avdelning: {journal[index]['Avdelning']}</h2>
                </div>
                {Object.keys(journal[index])
                  .filter((val) => {
                    if (
                      val === 'id' ||
                      val === 'Datum' ||
                      val === 'Signerat' ||
                      val === 'Aktuellt hälsoproblem' ||
                      val === 'Avdelning'
                    ) {
                      return;
                    } else if (searchTerm === '') {
                      return val;
                    } else if (
                      val
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase()) ||
                      journal[index][val]
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map(function (keyName) {
                    return (
                      <div className="journal-text" key={patientID}>
                        <div className="journal-text-title">
                          <h4>{keyName}: </h4>
                        </div>
                        <div className="journal-text-info">
                          <h3>{journal[index][keyName]}</h3>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="journal-health-problem">
        <div>
          <h1> Aktuellt hälsoproblem </h1>
          <p>{journal[0]['Aktuellt hälsoproblem']}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="journal-skeleton">
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={'460px'}
        width={'100%'}
      />
    </div>
  );
};

export default Journal;
