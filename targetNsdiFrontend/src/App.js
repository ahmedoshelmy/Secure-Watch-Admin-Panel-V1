import { useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { userInputs, newsInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import React from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from "./pages/Edit/Edit";
export const User_ID_Context = React.createContext();
let this_user_id;
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [userinfo, setuserinfo] = useState({
    user_name: "",
    user_isadmin: "",
  });
  const [user, setUser] = useState([]);
  function logout() {
    setuserinfo({ user_name: "", user_isadmin: "" });
  }
  const [datatable_data, setdatatable_data] = useState([]);
  const [table, settable] = useState("users");
  async function getData(selecttable) {
    settable(selecttable);
    let query = ``;
    console.log(user);
    if (selecttable === "users") {
      query = `query {
        users{
      user_id
      user_name
      user_password
        }
      }`;
    } else if (selecttable === "user_access") {
      query = `
     query get_all_user_access($user_id:Int)
      {
        get_all_user_access(user_id: $user_id)
        {
          user_id
          start_date
          end_date
        }
      }
      `;
    }

    let body = JSON.stringify({
      query: `
        ${query}
          `,
      variables: user,
    });
    setdatatable_data({});

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    console.log(data);
    if (selecttable === "users") {
      setdatatable_data(data.data.users);
    } else if (selecttable === "user_access") {
      setdatatable_data(data.data.user_access);
    } // console.log(data);
  }
  async function authenticate(user, pass) {
    let body = JSON.stringify({
      query: `
        query authenticate($user_name: String!, $user_password: String!)
        {
          authenticate(user_name: $user_name, user_password: $user_password)
          {
            user_name
            
            __typename  
          }
        }
          `,
      variables: {
        user_name: user,
        user_password: pass,
      },
    });
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    console.log(data);
    // data.then((e: any) => {});
    console.log(data.data);
    if (data.data.authenticate.length >= 1) {
      setuserinfo({
        user_name: data.data.authenticate[0].user_name,
      });
      console.log(data.data.authenticate[0]);
      setUser(data.data.authenticate[0]);
      // getData("users");
    }

    return data;
  }

  async function authenticate2(user, pass) {
    let body = JSON.stringify({
      query: `
        query authenticate2($user_name: String!, $user_password: String!)
        {
          authenticate2(user_name: $user_name, user_password: $user_password)
          
        }
          `,
      variables: {
        user_name: user,
        user_password: pass,
      },
    });
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    console.log(data);
    // data.then((e: any) => {});
    this_user_id = data.data.authenticate2;
    console.log(this_user_id);
    if (this_user_id !== -1) {
      setuserinfo({
        user_name: user,
      });
    }
    return data;
  }

  function getInputdata(route) {
    if (route === "users") {
      return userInputs;
    } else if (route === "user_access") {
      return newsInputs;
    }
  }
  if (userinfo.user_name !== "") {
    return (
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <User_ID_Context.Provider value={this_user_id}>
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <Home
                      table={table}
                      datatable_data={datatable_data}
                      getData={getData}
                      user_name={userinfo.user_name}
                      logout={logout}
                    />
                  }
                />
                <Route
                  path="login"
                  element={<Login authenticate={authenticate} />}
                />

                {[
                  {
                    pathname: "/users",
                    exact: true,
                    id: "users",
                    key: 1,
                  },
                  {
                    pathname: "/user_access",
                    exact: true,
                    id: "user_access",
                    key: 2,
                  },
                ].map((route) => (
                  <Route path={route.id} key={route.key}>
                    <Route
                      index
                      element={
                        <List
                          table={table}
                          getData={getData}
                          userinfo={userinfo}
                          logout={logout}
                          datatable_data={datatable_data}
                          setdatatable_data={setdatatable_data}
                        />
                      }
                    />
                    <Route
                      path={"edit/:user_id"}
                      element={
                        <Edit
                          user_name={userinfo.user_name}
                          table={table}
                          datatable_data={datatable_data}
                          userinfo={userinfo}
                          logout={logout}
                        />
                      }
                    />
                    <Route
                      path="new"
                      element={
                        <New
                          table={table}
                          userinfo={userinfo}
                          logout={logout}
                          getInputdata={getInputdata}
                          route={route.id}
                          title={"Add New " + route.id}
                        />
                      }
                    />
                  </Route>
                ))}
              </Route>
            </Routes>
          </User_ID_Context.Provider>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div>
      <Login authenticate={authenticate2} />
    </div>
  );
}

export default App;
