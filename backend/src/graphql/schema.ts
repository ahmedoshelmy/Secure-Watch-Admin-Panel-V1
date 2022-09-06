const { gql } = require("apollo-server");

export const typeDefs = gql`
  scalar Date

  # //----------------------------------------
  type users {
    user_id:     Int           
    user_name:      String        
    user_password:  String         
    user_activated: Boolean
    user_admin:     Boolean
    user_email:     String        
    userr_access:   [userr_access]
  }
  type userr_access {
    id:             Int     
    user_id:        Int
    start_date:     Date
    end_date:       Date
    admin_approval: Boolean
    users:          [users]
  }
  


  type Query {
    users: [users]
    get_all_user_access(user_id:Int):[userr_access]
    getspecificuser(user_id: Int!):users
    get_specific_user_access(id:Int):userr_access
    authenticate(user_name: String!, user_password: String!): [users]
    authenticate2(user_name: String!, user_password: String!): Int
    check_accessability(id:Int):Boolean
  }
  type Mutation {
    addUser(
      user_name: String!
      user_password: String!
      user_isadmin: Boolean!
    ): users
    permanently_delete_users(user_id: Int!): users
    delete_user_access(id:Int):userr_access
    toggle_activation(user_id: Int) :users
    toggle_admin_approval(id:Int):userr_access
    edit_user_access( id:Int ,user_id:Int, start_date:String , end_date:String):userr_access
    edit_user(user_id:Int,user_name:String , user_password:String,user_isadmin:Boolean):users
    add_user_access( user_id:Int, start_date:String , end_date:String):userr_access
  }
`;
