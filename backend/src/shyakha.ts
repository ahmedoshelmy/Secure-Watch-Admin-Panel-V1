import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getshykh = async () => {
  const result: any =
    await prisma.$queryRaw`select id_0,id,gov_name,gov_code,qesm_name,sec_code,shykh_name,ssec_code,code2006,globalid,objectid,shape_leng,shape_area,x,y,cityid,subcityid,villid,population,poverity,stage,vill_type,stagemain,stagesec,stagearr1,numberofunits,poverity_19_20,families_19_20,numberofbelonging,kidsrate,seniorsrate,youthrate,sustenancerate,maincrops,maincrafts,capmussec,stgeom,project_count,cost,pay,achieve_perc from  shy_info2 `;
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
    geometry = item.stgeom;
    //console.log(geometry)
    delete item.stgeom;

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
export const getshyakhat = async () => {
  // const shy = await prisma.project.groupBy({
  //   by: ["shy_code"],
  //   where: {
  //     shy_code: { not: null },
  //     mo2asher: { notIn: [1] },
  //     deactivate: { not: null, notIn: ["غيرمفعل"] },
  //   },
  //   orderBy: { shy_code: "asc" },
  // });

  // let distinctshycode = getFields(shy, "shy_code");

  const result = await prisma.shyakha.findMany({
    // include: {},
    // skip: 0,
    // take: 5,
    where: { code2006: { not: "999999" } },
    orderBy: {
      id: "asc",
    },
  });
  let obj, i;

  obj = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < result.length; i++) {
    let item, feature: any, geometry;
    item = result[i];
    //console.log(item)
    geometry = item.stgeom;
    //console.log(geometry)
    delete item.stgeom;

    feature = {
      type: "Feature",
      properties: item,
      geometry: geometry,
    };
    obj.features.push(feature);
  }
  // console.log(obj.features[1].geometry.coordinates);
  // console.log("done:", obj.features[1]);
  return obj;
};
