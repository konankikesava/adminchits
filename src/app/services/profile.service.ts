import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

  constructor() { }
 private username:String;

 UserProfileSet(data:String){
   this.username=data;
   console.log(this.username+"inside profile service");
 }

 UserProfileGet(){
  let temp = this.username;
  this.clearData();
  return temp;
 }
 clearData(){
  this.username = undefined;
}
}
