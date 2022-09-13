import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublicIcon from '@mui/icons-material/Public';// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
import { check_accessability } from "../../Apis/Apis";
import { useContext } from "react";
import { User_ID_Context } from "../../App";
import { useState } from "react";
const Sidebar = ({ logout, user_name, getData,this_user_id }) => {
  console.log(this_user_id);
  const data = {
    user_id:parseInt(this_user_id)
  }
  const [accessible,setaccessible] = useState(false)
  const response = check_accessability(data).then(res=>{
    console.log(res.data.check_accessability);
    setaccessible(res.data.check_accessability)
  }).catch(e=>{
    console.log(e)
  })
  console.log(accessible);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">{user_name} UserID: {this_user_id}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                getData("users");
              }}
            >
             
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                getData("users");
              }}
            >
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/user_access" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                getData("user_access");
              }}
            >
              <StoreIcon className="icon" />
              <span>User_access</span>
            </li>
          </Link>
          {accessible?<li >
            <PublicIcon className="icon" />
            <a href = "https://securewatch.maxar.com/myDigitalGlobe/login"><span>securewatch</span></a>
          </li>:""
}
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
