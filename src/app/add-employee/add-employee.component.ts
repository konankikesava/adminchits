import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../Employee';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addform: FormGroup;
  employee:Employee;
  id:number;
  constructor(public formBuilder: FormBuilder,
    private userServices:UserService,private router:Router) { 
    this.addform=this.formBuilder.group({
      employeeNo:["", Validators.required],
      name:["",Validators.required],
      phone:["",Validators.required],
      email:["",Validators.required],
      age:["",Validators.required],
      design:["",Validators.required]
    })
  }

  ngOnInit() {
  }

  addEmployee(){
    console.log("Am in");
    this.employee=this.addform.value;
    console.log(this.employee);
    this.userServices.addEmployeeInformation(this.employee).subscribe(()=>{
      console.log("am inside");
      this.router.navigate(["/Home"]);
    })
  }

}
