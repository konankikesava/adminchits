import { Component, OnInit } from '@angular/core';
import { Plan } from '../plan';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  
  dataPlan:Array<Plan>
  constructor(private userServices:UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userServices.getPlan().subscribe(data=>{
      
      this.dataPlan=data;
      console.log(this.dataPlan);
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
      this.userServices.deletePlan(num).toPromise().then(()=>
      this.userServices.getPlan().subscribe(data=>{
        console.log(data[0].id)
        this.dataPlan=data;
        console.log(this.dataPlan);
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
