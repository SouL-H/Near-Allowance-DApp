import { storage, Context, context, logging } from "near-sdk-as"
import { Student, studentInfo } from "./model";


// return the string 'hello world'
export function helloWorld(): string {
  return 'hello Near'
        }

        export function addStudent(
          name:string,
          mount:u32,
          count:u32,
          
          ): void{
            studentInfo.push(new Student(name,mount,context.sender,count,context.blockTimestamp))
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
