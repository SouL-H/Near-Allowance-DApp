import { storage, Context, context, logging,math, u128 } from "near-sdk-as"
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
        const stMap = new Map<string, Payment[]>();
        const pay = count/mount;

        var testpay = u128.div(u128.fromU32(count), u128.fromU32(mount));
        for(let i=0;i<mount;i++){
          stArray[i] = new Payment(false,time+day30*(i+1),pay);
        }
        stMap.set(wallet, stArray);
        studentInfo.push(new Student(name,wallet,mount,count,stMap));
        logging.log("Isim "+name + " basariyla eklendi.");
        logging.log("Bi bölme yaptık sonuç-->> "+ testpay);
}

export function getInfo():Array<Student>{
  const result = new Array<Student>(studentInfo.length)
  for (let i = 0; i < studentInfo.length; i++) {
    result[i] = studentInfo[i];
  }
  return result;
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
