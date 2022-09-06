// import { gettamwel_typs, getgov, getprojects, shyaggregations } from "../utils";
// import { getshykh } from "../shyakha";
import {
  authenticate,
  getallusers,
  addUser,
  permanently_delete_users,
  edit_user,
  getsuser,
  toggle_activation,
  authenticate2,
} from "../js/users";
import {
  check_accessability, 
  toggle_admin_approval,
  get_all_user_access,
  get_specific_user_access,
  delete_user_access,
  edit_user_access,
  add_user_access
} from "../js/user_access";


export const resolvers = {
  Query: {
    users: async () => getallusers(),
    getspecificuser:async(parent: any, args: any, context: any, info: any)=>
    getsuser(args), 
    get_specific_user_access:async(parent: any, args: any, context: any, info: any)=>
    get_specific_user_access(args), 
    authenticate: async (parent: any, args: any, context: any, info: any) =>
      authenticate(args),
    check_accessability:async (parent: any, args: any, context: any, info: any) =>
    check_accessability(args),
    get_all_user_access: async (parent: any, args: any, context: any, info: any) =>
    get_all_user_access(args),
  },
  Mutation: {
    addUser: async (parent: any, args: any, context: any, info: any) =>
      addUser(args),
      delete_user_access: async (parent: any, args: any, context: any, info: any) =>
      delete_user_access(args),
    permanently_delete_users: async (parent: any, args: any, context: any, info: any) =>
    permanently_delete_users(args),
    toggle_activation:async (parent: any, args: any, context: any, info: any) =>
    toggle_activation(args),
    toggle_admin_approval:async (parent: any, args: any, context: any, info: any) =>
    toggle_admin_approval(args),
    edit_user:async (parent: any, args: any, context: any, info: any) =>
    edit_user(args),
    edit_user_access:async (parent: any, args: any, context: any, info: any) =>
    edit_user_access(args),
    add_user_access:async (parent: any, args: any, context: any, info: any) =>
    add_user_access(args),

  },
};
