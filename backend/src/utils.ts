// npx prisma db pull
// npm i --save-dev prisma@latest
// npm i @prisma/client@latest
// import { users, projects, assignments } from "../data/seed";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getFields(input: any[], field: string) {
  var output = [];
  for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  return output;
}

export const gettamwel_typs = async () => {
  const result = await prisma.tamwel_typ.findMany();
  return result;
};

export const shyaggregations = async () => {
  const shy = await prisma.project.groupBy({
    by: ["shy_code"],
    where: {
      shy_code: { not: null },
      mo2asher: { notIn: [1] },
      deactivate: { not: null, notIn: ["غيرمفعل"] },
    },
    orderBy: { shy_code: "asc" },
  });

  let distinctshycode = getFields(shy, "shy_code");
  // const result = await prisma.shyakha.findMany({
  //   where: {
  //     code2006: { in: distinctshycode, notIn: ["999999"] },
  //   },
  // where:{project:}
  // });
  const result2 = await prisma.shyakha.aggregate({
    _sum: {
      population: true,
    },
    _avg: {
      poverity: true,
      poverity_19_20: true,
    },
    _count: {
      // gov_name: true,
      shykh_name: true,
    },
    where: {
      code2006: { in: distinctshycode, notIn: ["999999"] },
    },
    // where:{project:}
  });
  const seccount = await prisma.shyakha.findMany({
    distinct: ["qesm_name"],
    select: {
      qesm_name: true,
      gov_code: true,
      sec_code: true,
    },
    where: {
      code2006: { in: distinctshycode, notIn: ["999999"] },
    },
    // where:{project:}
  });
  console.log(seccount.length);

  result2._count.qesm_name = seccount.length;

  const govcount = await prisma.shyakha.findMany({
    distinct: ["gov_name"],
    select: {
      gov_name: true,
      gov_code: true,
    },
    where: {
      code2006: { in: distinctshycode, notIn: ["999999"] },
    },
    // where:{project:}
  });
  console.log(govcount.length);
  result2._count.gov_name = govcount.length;
  console.log(result2);
  const projcount = await prisma.project.count({
    _count: {
      id: true,
    },
    where: {
      mo2asher: { equals: 0 },
      deactivate: { not: null, notIn: ["غيرمفعل"] },
    },
    // where:{project:}
  });
  console.log(projcount);
  result2._count.projcount = projcount;

  return result2;
};

export const allshykh = async () => {
  const result = await prisma.shyakha.aggregate({
    _avg: {
      poverity: true,
      poverity_19_20: true,
    },
  });
};

export const getShykhInfo = async () => {
  const result = await prisma.project.findMany({
    include: {
      shyakha: true,
      esnad: true,
      sarf_component: true,
      dash_outer: {
        include: {
          qta3_secondary: { include: { qta3: { include: { ma7wer: true } } } },
        },
      },
    },
    // skip: 0,
    // take: 4,
    orderBy: {
      id: "asc",
    },
  });
  return result;
};

export const getprojects = async () => {
  const shy = await prisma.project.groupBy({
    by: ["shy_code"],
    where: {
      shy_code: { not: null },
      mo2asher: { notIn: [1] },
      deactivate: { not: null, notIn: ["غيرمفعل"] },
    },
    orderBy: { shy_code: "asc" },
  });

  let distinctshycode = getFields(shy, "shy_code");

  const result = await prisma.project.findMany({
    include: {
      shyakha: true,
      esnad: true,
      sarf_component: true,
      dash_outer: {
        include: {
          qta3_secondary: { include: { qta3: { include: { ma7wer: true } } } },
        },
      },
    },
    skip: 0,
    take: 100,
    orderBy: {
      id: "asc",
    },
  });
  // projectsss();
  return result;
};

export const getgov = async (args: any) => {
  const result: any =
    await prisma.$queryRaw`SELECT gov_name,gov_code,tot_pop,poverity,total_cost,money_perc,project_num,shy_num,(ST_AsGeoJSON(geom))::varchar as geo from gov_infooo2`;
  // console.log(result);
  let obj, i;

  obj = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < result.length; i++) {
    let item, feature: any, geometry;
    item = result[i];
    //console.log(item)
    geometry = item.geo;
    //console.log(geometry)
    delete item.geo;

    feature = {
      type: "Feature",
      properties: item,
      geometry: geometry,
    };
    obj.features.push(feature);
  }
  // console.log(obj.features[1].geometry.coordinates);
  // console.log("done:", args);
  // console.log("done:", obj.features[1]);
  return obj;
};
// };
// import { pool } from "../database/db";
// import { v4 as uuidv4 } from 'uuid';

// interface User {
//     id: string
//     name: string
//     email: string
//     password: string
// }

// export const readQuery = async (query: string) => {

//     try {
//         const res = await pool.query(query);
//         return res.rows;
//     } catch (err) {
//         console.error(err);
//     }
// }

// export const getUsersFromUsersTable = async () => {
//     const query = `
//     SELECT * FROM users;
//     `;

//     return readQuery(query);

// }

// export const getAssignments = async () => {
//     const query = `
//     SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status
//     FROM ((users
//     INNER JOIN assignments
//     ON users.id = assignments.user_id)
//     INNER JOIN projects
//     ON assignments.project_id = projects.id);
//     `;

//     return readQuery(query);
// }

// export const findUserByEmail = async (email: string) => {
//     const query = {
//         text: 'SELECT * FROM users WHERE email = $1',
//         values: [email]
//     }

//     try {
//         const res = await pool.query(query);
//         return res.rows;
//     } catch (err) {
//         console.error(err);
//     }
//     return [{
//         id: '0',
//         name: "J Doe",
//         email: 'jdoe@zcorp.com',
//         password: 'passwordz'
//     }]
// }

// export const addUser = async (name: string, email: string, password: string) => {

//     const query = {
//         text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
//         values: [uuidv4(), name, email, password],
//     }

//     const userQuery = await findUserByEmail(email);
//     if (userQuery?.length === 0) {
//         try {
//             const res = await pool.query(query);
//             console.log("User added.");
//         } catch (err) {
//             console.error(err);
//         }
//     } else {
//         console.log("Unable to add user. Check your email address");
//     }
// }

// export const addProject = async (title: string, status: string) => {
//     const query = {
//         text: 'INSERT INTO projects(title, status) VALUES($1, $2)',
//         values: [title, status],
//     }

//     try {
//         const res = await pool.query(query);
//         console.log("Project added.");
//     } catch (err) {
//         console.error(err);
//     }
// }

// export const addAssignment = async (user_email: string, project_id: number, user_name: string) => {
//     let user_id: string = '';
//     const user = await findUserByEmail(user_email);
//     if (user?.length === 0) {
//         console.log("User with that email not found.")
//     } else {
//       user_id = user[0].id;
//     }

//     const query = {
//         text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
//         values: [project_id, user_id, user_name],
//     }

//     try {
//         const res = await pool.query(query);
//         console.log('Assignment created.');
//     } catch (err) {
//         console.error(err);
//     }
// }

// export const getUsers = async () => {
//     const usersFromUsersTable = await getUsersFromUsersTable();
//     const assignments = await getAssignments();
//     const users = await usersFromUsersTable?.map(async (user) => {
//         let projects: object [] = [];
//         await assignments?.forEach(assignment => {
//             if (user.id === assignment.user_id) {
//                 projects.push({
//                    id: assignment.project_id,
//                    title: assignment.title,
//                    status: assignment.status
//                 });
//             }
//         })
//         return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             projects: projects,
//         }
//     })
//     return users;
// }

// export const createUserTable = async () => {

//     const query = `
//     CREATE TABLE users (
//         id varchar primary key,
//         name varchar,
//         email varchar,
//         password varchar
//     )
//     `;

//     return readQuery(query);
// }

// export const createProjectTable = async () => {

//     const query = `
//     CREATE TABLE projects (
//         id serial primary key,
//         title varchar,
//         status varchar
//     )
//     `;

//     return readQuery(query) ? "Table created." : "Unable to create table.";
// }

// export const createAssignmentTable = async () => {

//     const query = `
//     CREATE TABLE assignments (
//         id serial,
//         project_id int references projects (id),
//         user_id varchar references users (id),
//         primary key (project_id, user_id),
//         user_name varchar
//     )
//     `;

//     return readQuery(query) ? "Table created" : "Unable to create table.";
// }

// export const listTables = async () => {
//     const query = `
//     SELECT table_name
//     FROM information_schema.tables
//     WHERE table_schema = 'public'
//     ORDER BY table_name;
//     `
//     try {
//         const res = await pool.query(query);
//         console.log(res.rows)
//     } catch (err) {
//         console.error(err)
//     }
// }
