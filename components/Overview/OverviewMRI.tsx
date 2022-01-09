import rontgen from '../../images/rontgen.png';
import './Overview.css';

function OverviewMRI(props: any) {
  return (
    <div className="rontgen-picture">
      <img src={rontgen} alt="rontgen" />
    </div>
  );
}

export default OverviewMRI;
