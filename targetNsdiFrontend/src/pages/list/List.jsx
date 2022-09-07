import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = (props) => {
  console.log(props);
  return (
    <div className="list">
      <Sidebar
        getData={props.getData}
        user_name={props.userinfo.user_name}
        logout={props.logout}
        this_user_id={props.this_user_id}
      />
      <div className="listContainer">
        <Navbar />
        {props.datatable_data.length > 0 ? (
          <Datatable
            getData={props.getData}
            table={props.table}
            setdatatable_data={props.setdatatable_data}
            datatable_data={props.datatable_data}
          />
        ) : (
          <div>please choose a list</div>
        )}
      </div>
    </div>
  );
};

export default List;
