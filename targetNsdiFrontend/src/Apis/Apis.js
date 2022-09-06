import React from "react";

export async function add_user(user_data) {
  const query = `
    mutation addUser($user_name: String!, $user_password: String!, $user_isadmin: Boolean!)
      {
        addUser(user_name: $user_name, user_password: $user_password, user_isadmin: $user_isadmin)
        {
          user_id
          user_name
            
        }
      }
        `;
  return execute_query(query, user_data);
}
export async function edit_user(user_data) {
  const query = `
    mutation edit_user($user_id:Int, $user_name: String!, $user_password: String!, $user_isadmin: Boolean!)
      {
        edit_user(user_id: $user_id,user_name: $user_name, user_password: $user_password, user_isadmin: $user_isadmin)
        {
          user_id
          user_name
        }
      }
        `;
  return execute_query(query, user_data);
}

async function execute_query(query, userdata) {
  let body = JSON.stringify({
    query: query,
    variables: userdata,
  });
  const response = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  const data = await response.json();
  return data;
}
