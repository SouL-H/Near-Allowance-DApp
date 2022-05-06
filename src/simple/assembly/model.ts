import { PersistentUnorderedMap, PersistentVector, context } from "near-sdk-as";

export const students = new PersistentUnorderedMap<u32, Student>("s");
export let studentInfo = new PersistentVector<Student>("info");
@nearBindgen
export class Student {
  //_id: u32;
  _name: string;
  _mount: u32;
  _wallet: string;
  _count: u32;
  _time:u64;

  constructor(
    //id: u32,
    name: string,
    mount: u32,
    wallet:string,
    count:u32,
    time:u64,

  ) {
    //this._id = id;
    this._name = name;
    this._mount = mount;
    this._wallet=wallet;
    this._count=count;
    this._time = time;
  }

}