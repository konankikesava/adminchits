import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  updateform: FormGroup;
  customer:Customer;
  customer1:Customer;
  initial_user:Element;
  id:number;
  public isUpdated:boolean=false;
  constructor(public formBuilder: FormBuilder,private routeId:ActivatedRoute,
    private userServices:UserService,private router:Router,
    private httpRequest:HttpClient) { 

      this.updateform=this.formBuilder.group({
        
        pan:["",Validators.required],
        address:["",Validators.required],
        email:["",Validators.required],
        phone:["",Validators.required]
      })

    }

  ngOnInit() {
    this.routeId.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.userServices.getFixedCustomerInforvalue(this.id).subscribe(data=>{
      this.customer=data;
     this.isUpdated=true;
    })
  }
  UpdatePlan(){
    console.log("Am in");
    this.customer1=this.updateform.value;
    this.customer1.customer=this.customer.customer;
    console.log(this.customer);
    console.log(this.updateform.value);
    
    Swal.fire({
      title:"Are you sure?",
      text:"Person Details is going to be changed",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true  

    }).then((willDelete) => {
      if (willDelete.value) {
        this.userServices.updateCustomer(this.customer1,this.id).subscribe(()=>{
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
