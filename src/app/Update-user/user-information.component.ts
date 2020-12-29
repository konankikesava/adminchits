import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Element } from '../home/home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  updateform: FormGroup;
  user:Element;
  initial_user:Element;
  id:number;
  public isUpdated:boolean=false;
  constructor(public formBuilder: FormBuilder,private routeId:ActivatedRoute,
    private userServices:UserService,private router:Router,
    private httpRequest:HttpClient) { 
    this.updateform=this.formBuilder.group({
      name:["", Validators.required],
      plan:["",Validators.required],
      amount:["",Validators.required],
      dueAmount:["",Validators.required]
    })
  }

  ngOnInit() {
    this.routeId.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.userServices.getFixedUserInforvalue(this.id).subscribe(data=>{
      this.user=data;
     this.isUpdated=true;
    })
    
   
  }

  UpdateUser(){
    console.log("Am in");
    this.user=this.updateform.value;
    console.log(this.updateform.value);
    console.log(this.user.name);
    swal.fire({
      title:"Are you sure?",
      text:"Person Details is going to be changed",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true  

    }).then((willDelete) => {
      if (willDelete.value) {
        this.userServices.updateUser(this.user,this.id).subscribe(()=>{
          console.log("am coming here");
          this.router.navigate(["/Home"]);
      })
        swal.fire("Poof! Your imaginary file has been Changed!", {
          icon: "success",
        });
      } else {
        swal.fire("Your imaginary file is safe!");
      }
    });


  





  }

}
