import './Settings.css';
import { FC } from 'react';
import DoctorIMG from '../images/doctorPNG.png';
import NurseIMG from '../images/nursePNG.png';

// class Role {
//   constructor(public name: string) {}
// }

const Settings: FC = () => {
  const setDoctor = () => {
    localStorage.setItem('role', 'Läkare');
  };

  const setNurse = () => {
    localStorage.setItem('role', 'Sjuksköterska');
  };
  // eslint-disable-next-line no-unused-vars
  const updateStorage = () => {
    const role = localStorage.getItem('role');
    if (role === 'Läkare') {
      localStorage.setItem('role', 'Sjuksköterska');
    }
  };
  return (
    <div className="settings-container">
      <div
        className="settings-button"
        onClick={() => {
          setDoctor();
        }}
      >
        <div>
          <img src={DoctorIMG} alt="Doctor" />
        </div>
        <h1>Läkare</h1>
      </div>
      <div
        className="settings-button"
        onClick={() => {
          setNurse();
        }}
      >
        <div>
          <img src={NurseIMG} alt="Nurse" />
        </div>
        <h1>Sjuksköterska</h1>
      </div>
    </div>
  );
};

export default Settings;
