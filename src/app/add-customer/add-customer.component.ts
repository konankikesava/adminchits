import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../Customer';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addform: FormGroup;
  customer:Customer;
  id:number;
  constructor(public formBuilder: FormBuilder,
    private userServices:UserService,private router:Router) { 
    this.addform=this.formBuilder.group({
      customer:["", Validators.required],
      address:["",Validators.required],
      phone:["",Validators.required],
      email:["",Validators.required],
      pan:["",Validators.required]
    })
  }

  ngOnInit() {
  }

  addCustomer(){
    console.log("Am in");
    this.customer=this.addform.value;
    console.log(this.customer);
    this.userServices.addCustomerInformation(this.customer).subscribe(()=>{
      console.log("am inside");
      this.router.navigate(["/Home"]);
    })
  }

}
