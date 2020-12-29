import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Employee } from '../Employee';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataEmployee:Array<Employee>
  constructor(private userServices:UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userServices.getEmployee().subscribe(data=>{
      
      this.dataEmployee=data;
      console.log(this.dataEmployee);
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
      this.userServices.deleteEmployee(num).toPromise().then(()=>
      this.userServices.getEmployee().subscribe(data=>{
        console.log(data[0].id)
        this.dataEmployee=data;
        console.log(this.dataEmployee);
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
