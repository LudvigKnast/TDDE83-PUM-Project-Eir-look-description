// This component is a popup box that is displayed when the patient name is clicked
// in the topbar.
import Popup from 'reactjs-popup';
import { FC } from 'react';
import { FaVenus, FaMars } from 'react-icons/fa';

const contentStyle = { width: '300px' };

// Calculate the age depending on the ssn and todays date
function CalculateAge(ssn: any) {
  const today = new Date();
  const birthDate = new Date(
    '19' +
      ssn?.substring(0, 2) +
      '-' +
      ssn?.substring(2, 4) +
      '-' +
      ssn?.substring(4, 6)
  );
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

interface NamePopupProps {
  patientData: any;
}

const NamePopup: FC<NamePopupProps> = ({ patientData }) => {
  return (
    <Popup
      trigger={
        <div className="topbar-item">
          <div className="topbar-item" style={{ fontSize: '50px' }}>
            {patientData.gender === 'Female' ? (
              <FaVenus />
            ) : patientData.gender === 'Male' ? (
              <FaMars />
            ) : (
              ''
            )}
          </div>
          <div>
            <div>
              {patientData.firstName} {patientData.lastName}
            </div>
            <div>
              {patientData.ssn} ({CalculateAge(patientData.ssn)})
            </div>
          </div>
        </div>
      }
      {...{ contentStyle }}
    >
      <div>
        <p>
          <b>E-post:</b> {patientData.email}
        </p>
        <p>
          <b>Telefonnummer:</b> {patientData.phoneNumber}
        </p>
      </div>
    </Popup>
  );
};

export default NamePopup;
