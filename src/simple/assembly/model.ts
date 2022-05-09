import { PersistentUnorderedMap, PersistentVector, context, u128 } from "near-sdk-as";
export let studentInfo = new PersistentUnorderedMap<string,Student>("info");
export const day30= 1//2592000000000000 //nanosecond (30 days)
@nearBindgen
export class Student {
 
  _name: string;
  _wallet:string;
  _mount: i32;
  _count: u32;
  _payCheck: Payment[];

  constructor(
    name: string,
    wallet:string,
    mount: i32,
    count:u32,
    payCheck: Payment[],

  ) {
    this._name = name;
    this._wallet = wallet;
    this._mount = mount;
    this._count=count;
    this._payCheck=payCheck;
  }


}
@nearBindgen
export class Payment {
 
  _status: bool;
  _payMount: u64;
  _count: u128;
  constructor(
    status: bool,
    payMount:u64,
    count:u128,

  ) {
    this._status = status;
    this._payMount=payMount;
    this._count=count;
  }

  

}