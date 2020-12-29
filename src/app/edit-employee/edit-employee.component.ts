import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  updateform: FormGroup;
  employee:Employee;
  employee1:Employee;
  initial_user:Element;
  id:number;
  public isUpdated:boolean=false;
  constructor(public formBuilder: FormBuilder,private routeId:ActivatedRoute,
    private userServices:UserService,private router:Router,
    private httpRequest:HttpClient) { 

      this.updateform=this.formBuilder.group({
        
        design:["",Validators.required],
        age:["",Validators.required],
        email:["",Validators.required],
        phone:["",Validators.required]
      })

    }

  ngOnInit() {
    this.routeId.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.userServices.getFixedEmployeeInforvalue(this.id).subscribe(data=>{
      this.employee=data;
     this.isUpdated=true;
    })
  }
  UpdateEmployee(){
    console.log("Am in");
    this.employee1=this.updateform.value;
    this.employee1.name=this.employee.name;
    console.log(this.employee);
    console.log(this.updateform.value);
    
    Swal.fire({
      title:"Are you sure?",
      text:"Person Details is going to be changed",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true  

    }).then((willDelete) => {
      if (willDelete.value) {
        this.userServices.updateEmployee(this.employee1,this.id).subscribe(()=>{
          console.log("am coming here");
          this.router.navigate(["/Home"]);
      })
        Swal.fire("Poof! Your imaginary file has been Changed!", {
          icon: "success",
        });
      } else {
        Swal.fire("Your imaginary file is safe!");
      }
    });


}

}
