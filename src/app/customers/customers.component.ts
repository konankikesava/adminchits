import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Customer } from '../Customer';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  dataCustomer:Array<Customer>
  constructor(private userServices:UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userServices.getCustomer().subscribe(data=>{
      
      this.dataCustomer=data;
      console.log(this.dataCustomer);
    })
}

deleteInformation(num:number){
  Swal.fire({
    title:"Are you sure?",
    text:"Person Details is going to be changed",
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true  

  }).then((willDelete) => {
    if (willDelete.value) {
      this.userServices.deleteCustomer(num).toPromise().then(()=>
      this.userServices.getCustomer().subscribe(data=>{
        console.log(data[0].id)
        this.dataCustomer=data;
        console.log(this.dataCustomer);
      })
  
      )
     
      Swal.fire("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      Swal.fire("Your imaginary file is safe!");
    }
  });
 
 }

}
