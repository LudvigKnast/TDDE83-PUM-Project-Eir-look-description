import './MedicineTable.css';
import { useEffect, useState } from 'react';

// Type to be used by the map function
type Medicine = {
  id: number;
  medicine: string;
  intake: string;
  dosage: string;
  interval: string;
  startDate: string;
  endDate: string;
};

function MedicineTable(props: any) {
  // Usestate for medicines
  const [medicines, setMedicine] = useState([]);

  // Sets the medicine to the ones the patient has from the backend
  useEffect(() => {
    fetch(`/api/getmedicine/${props.patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMedicine(data.medicines);
      });
  }, [props.patientID]);

  // Array with months for showing in the timetable
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'DEC'
  ];

  // The current month
  const currentMonth = new Date().getMonth();

  return (
    <div className="medicine-table-container">
      <h1>Läkemedelslista</h1>
      {/* Table used for both the info and the timeline */}
      <table>
        <thead>
          <tr>
            <th>Läkemedel</th>
            <th>Mängd</th>
            {months.map((items, i) => {
              // Compares the current month with the month array
              if (i === currentMonth) {
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
          {/* Go through the medicine list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more */}
          {medicines.map((medicine: Medicine, i) => (
            <tr key={medicine.id}>
              <td key={i}>
                {' '}
                {medicine.medicine} <br /> {medicine.intake}{' '}
              </td>
              <td key={i + 1}>
                {' '}
                {medicine.dosage} {medicine.interval}{' '}
              </td>
              {months.map((items, i) => {
                // Get the start and end month
                const medicineStartMonth = parseInt(
                  medicine.startDate.substring(5, 7)
                );
                const medicineEndMonth = parseInt(
                  medicine.endDate.substring(5, 7)
                );
                // Paints the td blue from the startmonth to the end month
                if (medicineStartMonth === i + 1) {
                  return <td key={i} className="blue"></td>;
                } else if (
                  medicineStartMonth < i + 1 &&
                  medicineEndMonth > i + 1
                ) {
                  return <td key={i} className="blue"></td>;
                } else if (medicineEndMonth === i + 1) {
                  return <td key={i} className="blue"></td>;
                } else {
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

export default MedicineTable;
