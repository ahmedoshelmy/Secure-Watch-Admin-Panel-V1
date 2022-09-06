import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha1 = require("sha1");

export const getallvideos = async () => {
  const result = await prisma.videos.findMany({
    orderBy: {
      seq: "asc",
    },
  });
  return result;
};

export const addvideos = async (args: any) => {
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
        user_password: sha1(args.user_password),
        user_isadmin: args.user_isadmin,
      },
    });
    return result;
  }
};

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
