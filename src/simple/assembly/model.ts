import { PersistentUnorderedMap, PersistentVector, context } from "near-sdk-as";

export const students = new PersistentUnorderedMap<u32, Student>("s");
export const payStatus = new PersistentUnorderedMap<string, Payment>("pay");
export let studentInfo = new PersistentVector<Student>("info");
export const day30= 2592000000000000
@nearBindgen
export class Student {
 
  _name: string;
  _mount: i32;

  _count: u32;
  _time:u64;

  constructor(
    name: string,
    mount: i32,
    count:u32,
    time:u64,

  ) {
    this._name = name;
    this._mount = mount;
    this._count=count;
    this._time = time;
  }

}
@nearBindgen
export class Payment {
 
  _status: bool;
  _mount: i32;

  _count: u32;
  _time:u64;

  constructor(
    status: bool,

  ) {
    this._status = status;
    this._mount = mount;
    this._count=count;
    this._time = time;
  }

}