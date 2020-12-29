import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Plan } from '../plan';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  updateform: FormGroup;
  plan:Plan;
  plan1:Plan;
  initial_user:Element;
  id:number;
  public isUpdated:boolean=false;
  constructor(public formBuilder: FormBuilder,private routeId:ActivatedRoute,
    private userServices:UserService,private router:Router,
    private httpRequest:HttpClient) { 

      this.updateform=this.formBuilder.group({
        
        amountPayable:["",Validators.required],
        totalAmount:["",Validators.required],
        Duration:["",Validators.required]
      })

    }

  ngOnInit() {
    this.routeId.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.userServices.getFixedPlanInforvalue(this.id).subscribe(data=>{
      this.plan=data;
     this.isUpdated=true;
    })
  }
  UpdatePlan(){
    console.log("Am in");
    this.plan1=this.updateform.value;
    this.plan1.planName=this.plan.planName;
    console.log(this.plan);
    console.log(this.updateform.value);
    
    Swal.fire({
      title:"Are you sure?",
      text:"Person Details is going to be changed",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true  

    }).then((willDelete) => {
      if (willDelete.value) {
        this.userServices.updatePlan(this.plan1,this.id).subscribe(()=>{
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
