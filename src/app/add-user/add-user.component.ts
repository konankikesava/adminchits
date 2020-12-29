import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addform: FormGroup;
  user:Element;
  id:number;
  constructor(public formBuilder: FormBuilder,
    private userServices:UserService,private router:Router) { 
    this.addform=this.formBuilder.group({
      name:["", Validators.required],
      plan:["",Validators.required],
      amount:["",Validators.required],
      dueAmount:["",Validators.required]
    })
  }

  ngOnInit() {
    
  }

  addUser(){
    console.log("Am in");
    this.user=this.addform.value;
    console.log(this.user);
    this.userServices.addUserInformation(this.user).subscribe(()=>{
      console.log("am inside");
      this.router.navigate(["/Home"]);
    })
  }

}
