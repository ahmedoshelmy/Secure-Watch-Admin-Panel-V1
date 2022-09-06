import "./Edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { userInputs } from "../../formSource";
import { useState } from "react";
import {edit_user }from "../../Apis/Apis"
import { useParams } from "react-router-dom";
import {User_ID_Context} from "../../App"
import { useContext } from "react";

const Edit = ({
    title,
    userinfo,
    logout,
    getData,
    table,
    route,
  }) => {
    const this_user_id = useContext(User_ID_Context)
    console.log(this_user_id);
    const { user_id } = useParams();
    const inputs = userInputs 
    const [userdata, setuserdata] = useState({});
    const handleChange = (e) => {
        setuserdata((prevState) => ({
            ...prevState,
            user_id: parseInt(user_id),
          }))
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
  async function usersubmitNewForm(e) {
    e.preventDefault();
    const data = await edit_user(userdata)
    console.log(data)
    // data.then((e: any) => {});
    // if (table === "users") {
    //   if (data.data.addUser.user_id === -1) {
    //     alert(data.data.addUser.user_name);
    //   }
    //   if (
    //     data.data.addUser.user_id !== -1 &&
    //     data.data.addUser.user_id !== -1
    //   ) {
    //     alert("user created successfully");
    //   }
    // }
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
              <form method="post"onSubmit ={usersubmitNewForm}>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id} >
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
  
  export default Edit;
  