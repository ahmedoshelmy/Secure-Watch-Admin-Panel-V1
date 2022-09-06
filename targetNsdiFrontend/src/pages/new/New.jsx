import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {add_user} from "../../Apis/Apis"
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({
  getInputdata,
  title,
  userinfo,
  logout,
  getData,
  table,
  route,
}) => {
  // const [file, setFile] = useState("");
  const [userdata, setuserdata] = useState({});

  const handleChange = (e) => {
    console.log(e.target.checked);
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      setuserdata((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (e.target.type === "date") {
      const { name, value } = e.target;
      setuserdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { name, value } = e.target;
      setuserdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const inputs = getInputdata(route);
  async function usersubmitNewForm(e) {
    e.preventDefault();
    console.log(userdata);
    const data = await add_user(userdata)
    console.log(data)
    // data.then((e: any) => {});
    if (table === "users") {
      if (data.data.addUser.user_id === -1) {
        alert(data.data.addUser.user_name);
      }
      if (
        data.data.addUser.user_id !== -1 &&
        data.data.addUser.user_id !== -1
      ) {
        alert("user created successfully");
      }
    } else if (table === "news") {
      if (data.data.addnews.seq !== null) {
        alert(data.data.addnews.seq);
      }
    }
    // console.log(data.data.addUser);
    return data;
  }
  return (
    <div className="new">
      <Sidebar
        user_name={userinfo.user_name}
        getData={getData}
        logout={logout}
      />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form method="post" onSubmit={usersubmitNewForm}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={userdata[input.value]}
                    name={input.value}
                    className={input.class}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
