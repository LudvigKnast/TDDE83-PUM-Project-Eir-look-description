// This component displays all the navigation links
// Links change depending on the current content

import './SideBar.css';
import { FC, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Icons
import {
  RiContactsBook2Fill,
  RiProfileFill,
  RiHeartPulseFill
} from 'react-icons/ri';
import { MdTimeline } from 'react-icons/md';
import {
  FaBriefcaseMedical,
  FaCog,
  FaUserInjured,
  FaUserNurse,
  FaUserMd
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { IoLogOut } from 'react-icons/io5';

const SideBar: FC = () => {
  // Get the relative path from the URL
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [settingsId, setSettings] = useState<number>();

  useEffect(() => {
    setSettings(1);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const updateSettingsID = (newID: number) => {
    setSettings(newID);
  };

  return (
    <ul className="sidebar-container">
      {/* Determine which navigation links to show depending on the URL */}

      {location.pathname.startsWith('/Patient/') ? (
        <>
          {/* The following will show when a single patient is selected */}
          <NavLink
            to={'./Overview'}
            className="sidebar-navitem link"
            activeClassName="selected"
          >
            <RiProfileFill /> Patientöversikt
          </NavLink>
          <NavLink
            to={'./Journal'}
            className="sidebar-navitem link"
            activeClassName="selected"
          >
            <RiContactsBook2Fill /> Journal
          </NavLink>
          <NavLink
            to={'./Vitals'}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <RiHeartPulseFill /> Vitalparametrar
          </NavLink>
          <NavLink
            to={'./Medicine'}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <GiMedicines /> Läkemedel
          </NavLink>
          <NavLink
            to="./Lab"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaBriefcaseMedical /> Labb
          </NavLink>
          <NavLink
            to={'./Timeline'}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdTimeline /> Tidslinje
          </NavLink>
          <NavLink
            to="./ECG"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdTimeline /> EKG
          </NavLink>
          {/* <NavLink
            to="/History"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdHistory /> History
          </NavLink> */}
        </>
      ) : (
        <>
          {/* The following will show when viewing patient/staff lists */}

          <NavLink
            to="/Patients"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserInjured /> Alla Patienter
          </NavLink>
          <NavLink
            to="/AllStaff"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserNurse /> All Personal
          </NavLink>
          <NavLink
            to="/MyTeam"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserMd /> Mitt Team
          </NavLink>
          <NavLink
            to="/MyPatients"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserInjured /> Mina Patienter
          </NavLink>

          {/* <li className="sidebar-navitem">
            <FaUserNurse /> All Staff
          </li>
          <li className="sidebar-navitem">
            <FaUserMd /> My Team
          </li>
          <li className="sidebar-navitem">
            <FaUserInjured /> My Patients
          </li> */}
        </>
      )}

      {/* The following will show always
      to={"/Settings/"+settingsId }
      */}

      <NavLink
        to="/Settings"
        className="sidebar-navitem"
        activeClassName="selected"
      >
        <FaCog /> Inställningar
      </NavLink>

      <NavLink to="/" className="sidebar-navitem">
        <IoLogOut /> Logga ut
      </NavLink>
    </ul>
  );
};

export default SideBar;
