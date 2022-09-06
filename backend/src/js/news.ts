import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha1 = require("sha1");

export const getallnews = async () => {
  const result = await prisma.news.findMany({
    orderBy: {
      seq: "asc",
    },
  });
  console.log(result);
  return result;
};

export const getspecificnews = async (args: any) => {
  const result = await prisma.news.findMany({
    orderBy: {
      seq: "asc",
    },
    where: { seq: { equals: args.seq } },
  });
  console.log(result);
  return result;
};

export const addnews = async (args: any) => {
  const result = await prisma.news.create({
    data: {
      tilte: args.tilte,
      subTitle: args.subTitle,
      date: new Date(args.date + "T00:00:00.000Z"),
      auth: args.auth,
      address: args.address,
      url: args.url,
      status: args.status,
    },
  });
  return result;
};

export const editnews = async (args: any) => {
  const result = await prisma.news.update({
    where: { seq: args.seq },
    data: {
      tilte: args.tilte,
      subTitle: args.subTitle,
      date: new Date(args.date + "T00:00:00.000Z"),
      auth: args.auth,
      address: args.address,
      url: args.url,
      status: args.status,
    },
  });
  return result;
};

export const deletenews = async (args: any) => {
  const result = await prisma.news.delete({
    where: { seq: args.seq },
  });
  console.log("delete", result);

  return result;
};
