import { FC } from 'react';
import UmsSvg from '../images/Ums.svg';

import Popup from 'reactjs-popup';

import './Ums.css';

/* USE:
    call <Ums/>
    props are written here under UmsProps
*/

export type sensType = {
  severity: number;
  description: string;
};

// eslint-disable-next-line no-undef
export interface UmsProps extends React.SVGAttributes<SVGElement> {
  sensitivity?: sensType[];
  unstructured?: string;
  condition?: string;
  infection?: string;
  deviation?: string;
}

const Ums: FC<UmsProps> = (props: UmsProps) => {
  const getHighestSeverity = (sens: sensType[]) => {
    let highest: number = 0;
    for (const x of sens) {
      if (x.severity > highest) {
        highest = x.severity;
      }
    }
    return highest;
  };

  return (
    <Popup
      contentStyle={{ width: 'auto' }}
      trigger={
        <div>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            {...props}
          >
            <use xlinkHref={`${UmsSvg}#ums-base`} />
            {props.sensitivity ? (
              <use
                xlinkHref={`${UmsSvg}#ums-sensitivity${getHighestSeverity(
                  props.sensitivity
                )}`}
              />
            ) : (
              ''
            )}
            {props.unstructured ? (
              <use xlinkHref={`${UmsSvg}#ums-unstructured`} />
            ) : (
              ''
            )}
            {props.condition ? (
              <use xlinkHref={`${UmsSvg}#ums-condition`} />
            ) : (
              ''
            )}
            {props.infection ? (
              <use xlinkHref={`${UmsSvg}#ums-infection`} />
            ) : (
              ''
            )}
            {props.deviation ? (
              <use xlinkHref={`${UmsSvg}#ums-deviation`} />
            ) : (
              ''
            )}
          </svg>
        </div>
      }
      position="bottom center"
    >
      <div>
        {props.sensitivity
          ? props.sensitivity.map((sens: sensType, index) => (
              <div className="ums-popup-element" key={index}>
                <Ums
                  sensitivity={[sens]}
                  style={{
                    height: '50px',
                    width: '50px'
                  }}
                />
                {sens.description}
              </div>
            ))
          : ''}
        {props.unstructured ? (
          <div className="ums-popup-element">
            <Ums
              unstructured={props.unstructured}
              style={{
                height: '50px',
                width: '50px'
              }}
            />
            {props.unstructured}
          </div>
        ) : (
          ''
        )}
        {props.condition ? (
          <div className="ums-popup-element">
            <Ums
              condition={props.condition}
              style={{
                height: '50px',
                width: '50px'
              }}
            />
            {props.condition}
          </div>
        ) : (
          ''
        )}
        {props.infection ? (
          <div className="ums-popup-element">
            <Ums
              infection={props.infection}
              style={{
                height: '50px',
                width: '50px'
              }}
            />
            {props.infection}
          </div>
        ) : (
          ''
        )}
        {props.deviation ? (
          <div className="ums-popup-element">
            <Ums
              deviation={props.deviation}
              style={{
                height: '50px',
                width: '50px'
              }}
            />
            {props.deviation}
          </div>
        ) : (
          ''
        )}
      </div>
    </Popup>
  );
};

export default Ums;
