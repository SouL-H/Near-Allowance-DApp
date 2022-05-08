import { PersistentUnorderedMap, PersistentVector, context } from "near-sdk-as";
export const payStatus = new PersistentUnorderedMap<string, Payment>("pay");
export let studentInfo = new PersistentVector<Student>("info");
export const day30= 2592000000000000
@nearBindgen
export class Student {
 
  _name: string;
  _wallet:string;
  _mount: i32;
  _count: u32;
  _payCheck: Map<String, Payment[]>;

  constructor(
    name: string,
    wallet:string,
    mount: i32,
    count:u32,
    payCheck: Map<String, Payment[]>,

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
  constructor(
    status: bool,
    payMount:u64

  ) {
    this._status = status;
    this._payMount=payMount;
  }

}