import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Plan } from '../plan';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  addform: FormGroup;
  plan:Plan;
  id:number;
  constructor(public formBuilder: FormBuilder,
    private userServices:UserService,private router:Router) { 
    this.addform=this.formBuilder.group({
      planName:["", Validators.required],
      amountPayable:["",Validators.required],
      totalAmount:["",Validators.required],
      Duration:["",Validators.required]
    })
  }

  ngOnInit() {
  }

  addPlan(){
    console.log("Am in");
    this.plan=this.addform.value;
    console.log(this.plan);
    this.userServices.addPlanInformation(this.plan).subscribe(()=>{
      console.log("am inside");
      this.router.navigate(["/Home"]);
    })
  }

}
