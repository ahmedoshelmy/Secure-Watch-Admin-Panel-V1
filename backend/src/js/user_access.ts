// TODO: 
// 1 - getall 
/* 2- addnew 
    3-getspecific 
    4-edit 
    5-delete 
    6 - toggle_approval  
    7-Check Accessiblity
*/
import { PrismaClient } from "@prisma/client";
import { getsuser } from "./users";
const prisma = new PrismaClient();

// 1
export const get_all_user_access = async (args:any) => {
  const user = await prisma.users.findUnique({
    where:{
      user_id:args.user_id
    }
  });
  let result ;console.log(user)
  if(user?.user_admin){
     result = await prisma.userr_access.findMany({
      orderBy: {
        user_id: "asc",
      },
    })
  }else{
    result = await prisma.userr_access.findMany({
      where:{
        user_id:args.user_id
      }
    });
  }
    console.log(result);
    return result;
  };
// 2 
export const add_user_access = async (args: any) => {
    
      const result = await prisma.userr_access.create({
        data: {
            user_id:args.user_id, 
            start_date:new Date(args.start_date), 
            end_date:new Date(args.end_date), 
        },
      });
      return result;
  };
  // 3 
  export const get_specific_user_access = async (args:any) => { 
    const user = await prisma.userr_access.findUnique({
        where:{
            id:args.id
        }
    });
    return user ; 
  }
  // 4 
  export const edit_user_access = async (args: any) => {
    const result = await prisma.userr_access.update({
      where: { id: args.id },
      data: {
        start_date:new Date(args.start_date), 
        end_date:new Date(args.end_date) , 
        user_id:args.user_id
      },
    });
    return result;
  };
  //5
  export const delete_user_access = async (args: any) => {
    const result = await prisma.userr_access.delete({
      where: { id: args.id },
    });
    console.log("delete", result);
    return result;
  };
  //6 
  export const toggle_admin_approval = async (args:any) => { 
    const user = await prisma.userr_access.findUnique({
      where:{
        id:args.id
      }
    });
    if(user){
        const updated_user = await prisma.userr_access.update({
          where:{
            id:args.id
          }, 
          data:{
            admin_approval: !user.admin_approval
          }
        })
        return updated_user;
    }else{
      console.log(undefined);
      return user;
    } 
  }
  //7 

  export const check_accessability = async (args: any) => {
  const result1 = await prisma.userr_access.findMany({
    where: {
        user_id:args.user_id
    },
  });
  const result = result1[0]
  console.log(result?.id);
  let current_date = new Date();
  const current_day = current_date.getDate() 
  const current_month = current_date.getMonth()-1
  const current_year = current_date.getFullYear()   
  
  const current_date_string = `${current_year}-${current_month+1}-${current_day}`
  console.log(current_date_string)

  const user_date = result?.end_date 
  const user_day = user_date?.getDate() 
  const user_month = user_date?.getMonth() 
  const user_year = user_date?.getFullYear()   
  
  if(user_month){
  const user_date_string = `${user_year}-${user_month+1}-${user_day}`
  console.log(user_date_string);
  if(user_date_string<=current_date_string){
    console.log("Expired");
    return false;
  }else{
    console.log("Not Expired yet!");
    return true; 
  }  
  }
  else{
        console.log(undefined);
        
  }
  
  return true;
};

