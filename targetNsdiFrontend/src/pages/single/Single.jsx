import {  useParams } from "react-router-dom";

import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Single = (props) => {

  
  const { user_id } = useParams();
  console.log(user_id);
  const cur_user = props.datatable_data.find(x => x.user_id == user_id)
  console.log(cur_user)
  const cur_user_name = cur_user.user_name
  return (
    <div className="single">
      <Sidebar
        table={props.table}
        getData={props.getData}
        user_name={props.userinfo.user_name}
        logout={props.logout}
      />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={props.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{cur_user_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">User ID:</span>
                  <span className="itemValue">{user_id}</span>
                </div>
                
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Single;
