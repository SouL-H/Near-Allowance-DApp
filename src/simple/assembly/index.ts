import { storage, Context, context, logging,math, u128, ContractPromise, ContractPromiseBatch } from "near-sdk-as"
import { toYocto } from "../../utils";
import { day30, Payment, Student, studentInfo} from "./model";


 export function addStudent(
      name:string,
      wallet:string,
      mount:i32,
      count:u32, 
      )
      
      
      :void{
        assert(context.accountBalance >= toYocto(count), "Not enough balance");
        assert(context.attachedDeposit >= toYocto(count), "You have no balance.");
        assert(mount>0, "Mount not negative");

        const time = context.blockTimestamp
        const stArray = new Array<Payment>(mount);

        const pay = count/mount;//Şimdilik sadece tam bölünebilen sayılar.

        for(let i=0;i<mount;i++){
          stArray[i] = new Payment(false,time+day30*(i+1),toYocto(pay));
        }
        studentInfo.set(wallet,new Student(name,wallet,mount,count,stArray));
        logging.log("Isim "+name + " basariyla eklendi.");

}

export function getInfo(wallet:string):Student{
  let arrStudent = new Student("","",0,0,[]);

  let st = studentInfo.get(wallet);
  if(st!=null){
    arrStudent = st;
  }

  return arrStudent;
}


// export function setStudent(std:Student):bool{
//   if(Student.length!=0){
//     studentInfo.set(std._wallet,std);
//     return true
//   }
//   return false
// }
export function getPay(wallet:string):void{ 
  let walletInfo =studentInfo.get(wallet);
  logging.log("Önce")
  logging.log(walletInfo)
  let balance =walletInfo!._wallet;
  assert((context.sender==balance),"Wallet wrong");
  if(walletInfo!=null){
    walletInfo._payCheck.forEach((element) => {
    if(assert(context.blockTimestamp>=element._payMount,"Vakit gelmemiş.")){
      if(!element._status){
      
        let payAccount = ContractPromiseBatch.create(context.sender);
        payAccount.transfer(element._count);
        element._status=true
     
      }
    }
    });
    logging.log("Sonra")
    logging.log(walletInfo)
    
    studentInfo.set(wallet,walletInfo)
  }
  
}

// read the given key from account (contract) storage
export function read(key: string): string {
  if (storage.hasKey(key)) {
    return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
  } else {
    return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
  }
}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
  storage.set(key, value)
  return `✅ Data saved. ( ${storageReport()} )`
}

// private helper method used by read() and write() above
function storageReport(): string {
  return `storage [ ${Context.storageUsage} bytes ]`
}
