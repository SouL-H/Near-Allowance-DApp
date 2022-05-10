import { storage, Context, context, logging,math, u128, ContractPromise, ContractPromiseBatch } from "near-sdk-as"
import { toYocto } from "../../utils";
import { day30, Payment, Student, studentInfo} from "./model";



//Allowance student add
 export function addStudent(
      name:string,
      wallet:string,
      mount:i32,
      count:u32, 
      ):void{
        assert(context.accountBalance >= toYocto(count), "Not enough balance");
        assert(context.attachedDeposit >= toYocto(count), "You have no balance.");
        assert(mount>0, "Mount not negative");

        const time = context.blockTimestamp //Nanoseconds since 1970 
        const stArray = new Array<Payment>(mount);//Create array of Payment

        const pay = count/mount;

        for(let i=0;i<mount;i++){
          if(i==0){
            stArray[i] = new Payment(false,time,toYocto(pay));//First payment free
            continue;
          }
          stArray[i] = new Payment(false,time+day30*(i+1),toYocto(pay));//A new array is created for each month.
        }
        studentInfo.set(wallet,new Student(name,wallet,mount,count,stArray)); //The created payment sequence and account information are added to the Student Info map.
        logging.log(name + " successfully saved."); //Log record for information.

}
//Defined wallet information
export function getInfo(wallet:string):Student{
  let arrStudent = new Student("","",0,0,[]);

  let st = studentInfo.getSome(wallet);
  if(st!=null){
    arrStudent = st;
  }

  return arrStudent;
}
//Delete Student
export function deleteStudent(wallet:string):void{
  studentInfo.delete(wallet);
  logging.log(wallet +" successfully saved.");
}

export function getPay(wallet:string):void{ 
  let walletInfo =studentInfo.getSome(wallet);//get defined wallet information
  let balance =walletInfo!._wallet;//get defined wallet balance
  assert((context.sender==balance),"Wallet wrong");
  if(walletInfo!=null){
    walletInfo._payCheck.forEach((element) => {//A loop for wage payments
      if(context.blockTimestamp>=element._payMount){//Time control
      if(!element._status){//Payments are defined first false. Status becomes true when payment is made.
      
        let payAccount = ContractPromiseBatch.create(context.sender);
        payAccount.transfer(element._count);//The current payment is transferred to the account.
        element._status=true//Status changes
     
      }
    }
   
    });
    
    studentInfo.set(wallet,walletInfo)//The information is saved in studentInfo.
  }
  
}

