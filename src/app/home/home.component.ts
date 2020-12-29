import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../services/user.service';

import Swal from 'sweetalert2';
import { Plan } from '../plan';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['id', 'name', 'plan', 'amount','dueAmount'];
  dataSource:Array<Element>
  dataPlan:Array<Plan>
  //dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

/*
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }*/
  
  constructor(private profileServices:ProfileService,private userServices:UserService) { }





  ngOnInit() {
    this.userServices.getInformation().subscribe(data=>{
      console.log(data[0].id)
      this.dataSource=data;
      console.log(this.dataSource);
    })

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
        this.userServices.deleteUser(num).toPromise().then(()=>
        this.userServices.getInformation().subscribe(data=>{
          console.log(data[0].id)
          this.dataSource=data;
          console.log(this.dataSource);
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

 


export interface Element {
  name: string;
  position: number;
  plan:string;
  amount: number;
  dueAmount: number;
}
/*const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Deepak',plan: 'Savings Account', amount: 22000, dueAmount: 4000},
  {position: 2, name: 'Arun',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 3, name: 'Sunil',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 4, name: 'Ananda',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 5, name: 'Kiran',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 6, name: 'Afheem',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 7, name: 'Raji', plan: 'Savings Account',amount: 22000,  dueAmount: 4000},
  {position: 8, name: 'Chaiti',plan: 'Savings Account', amount: 22000,  dueAmount: 4000},
  {position: 9, name: 'Mithayi',plan: 'Savings Account', amount: 22000,  dueAmount: 4000}
  

];*/
