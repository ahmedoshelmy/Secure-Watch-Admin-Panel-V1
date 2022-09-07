import React from "react";

export async function add_user(user_data) {
  const query = `
    mutation addUser($user_name: String!, $user_password: String!, $user_admin: Boolean!, $user_activated: Boolean!)
      {
        addUser(user_name: $user_name, user_password: $user_password, user_admin: $user_admin, user_activated: $user_activated)
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
    mutation edit_user($user_id:Int, $user_name: String!, $user_password: String!, $user_admin: Boolean!)
      {
        edit_user(user_id: $user_id,user_name: $user_name, user_password: $user_password, user_admin: $user_admin)
        {
          user_id
          user_name
        }
      }
        `;
  return execute_query(query, user_data);
}
export async function check_accessability(user_data) {
  const query = `
    query check_accessability($id:Int)
      {
        check_accessability(id: $id)
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
