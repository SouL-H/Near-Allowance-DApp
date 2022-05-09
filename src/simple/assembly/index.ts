import { storage, Context, context, logging,math, u128 } from "near-sdk-as"
import { toYocto } from "../../utils";
import { day30, Payment, payStatus, Student, studentInfo} from "./model";


// return the string 'hello world'
export function helloWorld(): string {
  return 'hello Near'
        }

 export function addStudent(
      name:string,
      wallet:string,
      mount:i32,
      count:u32, 
      ):void{
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
