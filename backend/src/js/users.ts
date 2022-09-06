import { PrismaClient } from "@prisma/client";
import { delete_user_access } from "./user_access";
const prisma = new PrismaClient();
var sha1 = require("sha1");
const AesEncryption = require("aes-encryption");

const aes = new AesEncryption();
aes.setSecretKey(
  "11f1272f33484c586d67d788d22a4a45d5e5e5e5f5a5a5b5231231321313aaaff"
);
// Note: secretKey must be 64 length of only valid HEX characters, 0-9, A, B, C, D, E and F

export const authenticate = async (args: any) => {
  // console.log(aes.encrypt(sha1(args.user_password)))
  const result = await prisma.users.findMany({
    where: {
      user_name: { equals: args.user_name },
      user_password: { equals: aes.encrypt(sha1(args.user_password)) },
    },
    orderBy: {
      user_id: "asc",
    },
  });
  // console.log(args.user_name);
  // console.log(result[0].user_isadmin);
  // console.log(args.user_password);
  // console.log(aes.encrypt(sha1(args.user_password)));
  // console.log(obj.features[1].geometry.coordinates);
  //   console.log("done:", sha1(args.user_password));
  console.log(result[0].user_id)
  return result;
};
export const authenticate2 = async (args: any) => {
  const result = await prisma.users.findMany({
    where: {
      user_name: { equals: args.user_name },
      user_password: { equals: aes.encrypt(sha1(args.user_password)) },
    },
    orderBy: {
      user_id: "asc",
    },
  });
  return result[0].user_id
  
};
export const get_user_by_username = async (args: any) => {
  const result = await prisma.users.findUnique({
    where: {
      user_name :args.user_name ,
    },
  });
  return result;
};

export const getallusers = async () => {
  const result = await prisma.users.findMany({
    orderBy: {
      user_id: "asc",
    },
  });
  console.log(result);
  return result;
};

//TODO: Edit delete_users
export const permanently_delete_users = async (args: any) => {
  const result1 = await prisma.userr_access.delete({
    where: { user_id: args.user_id },
  });
  console.log("delete", result1);
  // delete_user_access({id:args.id})
  const result = await prisma.users.delete({
    where: { user_id: args.user_id },
  });
  console.log("delete", result);
  return result;
};
//TODO: Edit these 
export const edit_user = async (args: any) => {
  const result = await prisma.users.update({
    where: { user_id: args.user_id },
    data: {
      user_name: args.user_name,
      user_password: sha1(args.user_password),
      user_admin: args.user_admin,
    },
  });
  return result;
};
//TODO: Add add user_access 
export const addUser = async (args: any) => {
  const getuserNames = await prisma.users.findMany({
    where: { user_name: { equals: args.user_name } },
  });
  if (getuserNames.length > 0) {
    return {
      user_id: "-1",
      user_name: "can't insert duplicate username is not allowed",
    };
  } else {
    const result = await prisma.users.create({
      data: {
        user_name: args.user_name,
        user_password: aes.encrypt(sha1(args.user_password)),
        user_admin: args.user_admin,
        user_activated:args.user_activated
      },
    });
    return result;
  }
};
//TODO: Make it findUnique
export const getsuser = async (args:any) => { 
  const user = await prisma.users.findMany({
    where:{user_id:{equals:args.user_id}},
  });
  return user[0] ; 
}
export const toggle_activation = async (args:any) => { 
  const user = await prisma.users.findUnique({
    where:{
      user_id:args.user_id
    }
  });
  if(user){
      const updated_user = await prisma.users.update({
        where:{
          user_id:args.user_id
        }, 
        data:{
          user_activated: !user.user_activated
        }
      })
      return updated_user;
  }else{
    console.log(undefined);
    return user;
  } 
}
export const deactivate = async (args: any) => {
  const user = await prisma.users.findUnique({
    where:{
      user_id:args.user_id
    }
  });
  if(user){
    const updated_user = await prisma.users.update({
      where:{
        user_id:args.user_id
      }, 
      data:{
        user_activated: false
      }
    })
    return updated_user;
}else{
  console.log(undefined);
  return user;
} 

};
//TODO: checkAccessibilty 



// export const checkaccessability = async (args: any) => {
//   const result = await prisma.usertable.findMany({
//     where: {
//       user_name: { equals: args.user_name },
//       user_password: { equals: sha1(args.user_password) },
//     },
//     orderBy: {
//       user_id: "asc",
//     },
//   });
//   console.log(result[0].user_id);
//   let currentdate = new Date();
//   const now =
//     currentdate.getDate() +
//     "-" +
//     (currentdate.getMonth() + 1) +
//     "- " +
//     currentdate.getFullYear();
//   //+
//   // " @ " +
//   // currentdate.getHours() +
//   // ":" +
//   // currentdate.getMinutes() +
//   // ":" +
//   // currentdate.getSeconds();
//   console.log(now);

//   const hasaccess = await prisma.secureaccess.findMany({
//     where: {
//       secureaccess_start_date: { gte: `${now}` },
//       secureaccess_end_date: { lte: `${now}` },
//       user_id: { equals: result[0].user_id },
//     },
//     orderBy: {
//       user_id: "asc",
//     },
//   });
//   return result;
// };
