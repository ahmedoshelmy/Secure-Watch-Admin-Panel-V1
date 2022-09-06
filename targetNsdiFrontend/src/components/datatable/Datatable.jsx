import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, user_access_Column } from "../../datatablesource";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

const Datatable = ({ datatable_data, setdatatable_data, table, getData }) => {
  async function deleteElement(e, tabledata) {
    let query = ``;
    let variables = {};
    if (tabledata === "users") {
      variables = {
        user_id: e,
      };
      query = `
      mutation deleteusers($user_id: Int!)
      {
        permanently_delete_users(user_id: $user_id)
        {
          user_id
        }
      }
        `;
    } else if (tabledata === "user_access") {
      console.log(e);
      variables = {
        id: e,
      };
      query = `
    mutation delete_user_access($id: Int!)
    {
      delete_user_access(id: $id)
      {
        user_id 
        start_date
        end_date
      }
    }
      `;
    }
    let body = JSON.stringify({
      query: query,
      variables: variables,
    });
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    await response.json();
    // data.then((e: any) => {});
    getData(tabledata);
  }
  console.log(table);
  if (table === "users") {
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/users/edit/${params.row.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => deleteElement(params.row.user_id, "users")}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Add New User
          <Link to="/users/new" className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={datatable_data}
          getRowId={(row) => row.user_id}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    );
  }
  if (table === "user_access") {
    const actionColumnNews = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/user_access/edit/${params.row.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => deleteElement(params.row.user_id, "user_access")}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Add New User
          <Link to="/user_access/new" className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={datatable_data}
          getRowId={(row) => row.user_id}
          columns={user_access_Column.concat(actionColumnNews)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    );
  }
};

export default Datatable;
