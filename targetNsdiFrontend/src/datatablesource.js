export const user_access_Column = [
  { field: "id", headerName: "ID", width: 114 },

  {
    field: "user_id",
    headerName: "user_id",
    width: 114,
  },
  {
    field: "start_date",
    headerName: "start_date",
    width: 114,
  },
  { field: "end_date", headerName: "end_date", width: 114 },
  { field: "admin_approval", headerName: "admin_approval", width: 114 },
];

export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "user_id", headerName: "ID", width: 70 },

  {
    field: "user_name",
    headerName: "User",
    width: 230,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.user_name}
    //     </div>
    //   );
    // },
  },
  {
    field: "is_admin",
    headerName: "admin",
    width: 230,
  },
  // {
  //   field: "email",
  //   headerName: "Email",
  //   width: 230,
  // },

  // {
  //   field: "age",
  //   headerName: "Age",
  //   width: 100,
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
