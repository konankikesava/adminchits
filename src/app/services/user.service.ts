import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { $ } from 'protractor';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private httprequest:HttpClient) { }
//Add new registerer in registering page
  addUser(register:User){
    console.log(register);
   return  this.httprequest.post("http://localhost:3000/user",register);

  }
  //login valid user
  authUser(): Observable<any>{
    return this.httprequest.get("http://localhost:3000/user");
  }

  //getting Myplans
  getInformation():Observable<any>{
    return this.httprequest.get("http://localhost:3000/Information");
  }

  getCustomer():Observable<any>{
    return this.httprequest.get("http://localhost:3000/Customer");
  }

  getEmployee():Observable<any>{
    return this.httprequest.get("http://localhost:3000/Employee");
  }

  //deleting a user information in my_plan page
  deleteUser(num:number):Observable<any>{
    console.log(num);
    console.log(`"http://localhost:3000/Information/"+${num}`);
    return this.httprequest.delete(`http://localhost:3000/Information/${num}`)
  }

  deletePlan(num:number):Observable<any>{
    console.log(num);
    console.log(`"http://localhost:3000/Plans/"+${num}`);
    return this.httprequest.delete(`http://localhost:3000/Plans/${num}`)
  }

  deleteCustomer(num:number):Observable<any>{
    return this.httprequest.delete(`http://localhost:3000/Customer/${num}`);
  }

  deleteEmployee(num:number):Observable<any>{
    return this.httprequest.delete(`http://localhost:3000/Employee/${num}`);
  }

  //updateing user information in my_Plan page
  updateUser(user:any,num1:number):Observable<any>{
    console.log(user);
    return this.httprequest.put(`http://localhost:3000/Information/${num1}`,user);
  }

  updatePlan(plan:any,num1:number):Observable<any>{
    console.log(plan);
    return this.httprequest.put(`http://localhost:3000/Plans/${num1}`,plan);
  }
  updateCustomer(Customer:any,num1:number):Observable<any>{
    console.log(Customer);
    return this.httprequest.put(`http://localhost:3000/customer/${num1}`,Customer);
  }

  updateEmployee(employee:any,num1:number):Observable<any>{
    console.log(employee);
    return this.httprequest.put(`http://localhost:3000/Employee/${num1}`,employee);
  }
  
  //Add new user with plan in my_plan page
  addUserInformation(user:any):Observable<any>{
    return this.httprequest.post("http://localhost:3000/Information",user);
  }

  addPlanInformation(plan:any):Observable<any>{
    return this.httprequest.post("http://localhost:3000/Plans",plan);
  }

  addCustomerInformation(customer:any):Observable<any>{
    return this.httprequest.post("http://localhost:3000/customer",customer);
  }

  addEmployeeInformation(employee:any):Observable<any>{
    return this.httprequest.post("http://localhost:3000/Employee",employee);
  }

  //showing predefined information on update page
  getFixedUserInforvalue(Id:number):Observable<any>{
    return this.httprequest.get(`http://localhost:3000/Information/${Id}`)
  }

  getFixedPlanInforvalue(Id:number):Observable<any>{
    return this.httprequest.get(`http://localhost:3000/Plans/${Id}`)
  }
  getFixedCustomerInforvalue(Id:number):Observable<any>{
    return this.httprequest.get(`http://localhost:3000/customer/${Id}`)
  }
  getFixedEmployeeInforvalue(Id:number):Observable<any>{
    return this.httprequest.get(`http://localhost:3000/Employee/${Id}`)
  }

  //getting plan 
  getPlan():Observable<any>{
    return this.httprequest.get("http://localhost:3000/Plans")
  }


}
