/* eslint-disable dot-notation */
import './Overview.css';
import { useEffect, useState } from 'react';

function OverviewJournal(props: any) {
  const [journal, setJournal] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/getjournal/${props.patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setJournal(data.reverse());
      });
  }, [props.patientID]);

  return (
    <div>
      <h1>Journal</h1>
      {Object.keys(journal).map((key, index) => {
        return (
          <div key={props.patientID}>
            <p>
              {journal[index]['Datum']} {journal[index]['Avdelning']} Linköpings
              Universitetssjukhus
            </p>

            <p>{journal[index]['Signerat']}:</p>
            <p>{journal[index]['Bedömning']}</p>
          </div>
        );
      })}
    </div>
  );
}

export default OverviewJournal;
