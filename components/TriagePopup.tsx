/* eslint-disable dot-notation */
import Popup from 'reactjs-popup';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TriagePopupProps {
  id: number;
}

const TriagePopup: FC<TriagePopupProps> = (patient) => {
  const triageGreen: string = '#00cc00';
  const triageYellow: string = '#eeee00';
  const triageOrange: string = '#FF7426';
  const triageRed: string = '#F10000';

  const [essCause, setESS] = useState<string>();
  const [vitalsCause, setVitals] = useState<string>();
  const [Temp, setTemp] = useState<number>();
  const [BloodSys, setSys] = useState<number>();
  const [BloodDia, setDia] = useState<number>();
  const [BreathingFreq, setBreathingFreq] = useState<number>();
  const [Saturation, setSaturation] = useState<number>();
  const [Pulse, setPulse] = useState<number>();
  const [RLS, setRLS] = useState<number>();
  const [Cause, setCause] = useState<number>();

  const [ESSColor, setESSColor] = useState<string>(triageGreen);
  const [vitalsColor, setVitalsColor] = useState<string>(triageGreen);

  useEffect(() => {
    if (!Number.isNaN(patient.id)) {
      fetch(`/api/getonepatient/${patient.id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCause(data.patient['cause']);

          // let temp;
          // let bloodSys;
          // let bloodDia;
          // let breathingFreq;
          // let saturation;
          // let pulse;
          // let rls;

          /* ----------------- ESS CHECK --------------------- */

          if (
            data.patient['cause'] === 'Buksmärta' ||
            data.patient['cause'] === 'Flanksmärta'
          ) {
            if (data.patient['immunosuppressed']) {
              setESSColor(triageOrange);

              setESS('Buksmärta:  Immunosupprimerad patient');
            }
          }
          /* ----------------- VITALS CHECK ------------------ */
          const temp =
            data.patient['temp'][data.patient['temp'].length - 1]['temp'];
          const bloodSys =
            data.patient['pbs']['bloodSys'][
              data.patient['pbs']['bloodSys'].length - 1
            ]['value'];
          const bloodDia =
            data.patient['pbs']['bloodDia'][
              data.patient['pbs']['bloodDia'].length - 1
            ]['value'];
          const saturation =
            data.patient['pbs']['saturation'][
              data.patient['pbs']['saturation'].length - 1
            ]['value'];
          const pulse =
            data.patient['pbs']['pulse'][
              data.patient['pbs']['pulse'].length - 1
            ]['value'];
          const breathingFreq =
            data.patient['breathing_frequence'][
              data.patient['breathing_frequence'].length - 1
            ]['AF'];
          const rls =
            data.patient['assessment']['rls'][
              data.patient['assessment']['rls'].length - 1
            ]['value'];

          setTemp(temp);
          setSys(bloodSys);
          setDia(bloodDia);
          setSaturation(saturation);
          setPulse(pulse);
          setBreathingFreq(breathingFreq);
          setRLS(rls);
          /* -----Check for RED first */
          if (rls >= 4) {
            setVitalsColor(triageRed);
            setVitals('RLS');
          } else if (breathingFreq > 30 || breathingFreq <= 7) {
            setVitalsColor(triageRed);
            setVitals('breathingFreq');
          } else if (pulse <= 29) {
            setVitalsColor(triageRed);
            setVitals('pulse');
          } else if (breathingFreq >= 26 && breathingFreq <= 30) {
            /*    Orange  */
            setVitalsColor(triageOrange);
            setVitals('breathingFreq');
          } else if (pulse >= 30 && pulse <= 39) {
            setVitalsColor(triageOrange);
            setVitals('pulse');
          } else if (rls >= 2 && rls <= 3) {
            setVitalsColor(triageOrange);
            setVitals('RLS');
          } else if (temp < 35 || temp > 41) {
            setVitalsColor(triageOrange);
            setVitals('temp');
          } else if (
            /*    Yellow  */
            (pulse >= 111 && pulse <= 120) ||
            (pulse >= 40 && pulse <= 49)
          ) {
            setVitalsColor(triageYellow);
            setVitals('pulse');
          } else if (temp >= 38.6 && temp <= 41) {
            setVitalsColor(triageYellow);
            setVitals('temp');
          }
        });
    }
  }, [patient.id]);

  return (
    <Popup
      trigger={
        <div>
          <svg height="40" width="20" viewBox="-50 -50 50 100">
            <circle cx="0" cy="0" r="50" fill={ESSColor} />
          </svg>
          <svg height="40" width="20" viewBox="0 -50 50 100">
            <circle cx="0" cy="0" r="50" fill={vitalsColor} />
          </svg>
        </div>
      }
    >
      <div>
        <div className="header">Triage</div>
        <div>
          <Link
            style={essCause ? { color: ESSColor } : {}}
            to={`/Patient/${patient.id}/Journal`}
          >
            {' '}
            ESS
          </Link>
        </div>
        <div style={essCause ? { color: ESSColor } : {}}>
          {/* eslint-disable-next-line no-unneeded-ternary */}
          {essCause ? essCause : Cause}
        </div>
        <div>
          <Link
            style={vitalsCause ? { color: vitalsColor } : {}}
            to={`/Patient/${patient.id}/Vitals`}
          >
            {' '}
            Vitalparametrar
          </Link>
        </div>
        <div style={vitalsCause === 'pulse' ? { color: vitalsColor } : {}}>
          Puls: {Pulse}
        </div>
        <div>
          Blodtryck: {BloodSys}/ {BloodDia}
        </div>
        <div
          style={vitalsCause === 'breathingFreq' ? { color: vitalsColor } : {}}
        >
          Andningsfrekvens: {BreathingFreq}
        </div>
        <div>Saturation: {Saturation}</div>
        <div style={vitalsCause === 'temp' ? { color: vitalsColor } : {}}>
          Kroppstemperatur: {Temp}
        </div>
        <div style={vitalsCause === 'RLS' ? { color: vitalsColor } : {}}>
          RLS: {RLS}
        </div>
      </div>
    </Popup>
  );
};
export default TriagePopup;
