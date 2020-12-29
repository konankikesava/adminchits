import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UserInformationComponent } from "./Update-user/user-information.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditPlanComponent } from "./edit-plan/edit-plan.component";
import { AddPlanComponent } from "./add-plan/add-plan.component";
import { CustomersComponent } from "./customers/customers.component";
import { EditCustomerComponent } from "./edit-customer/edit-customer.component";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";

const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'Home',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'userInformation/:id',component:UserInformationComponent},
    {path:'planInformation/:id',component:EditPlanComponent},
    {path:'customerInformation/:id',component:EditCustomerComponent},
    {path:'EmployeeInformation/:id',component:EditEmployeeComponent},
    {path:'AddUserInfo',component:AddUserComponent},
    {path:'AddPlanInfo',component:AddPlanComponent},
    {path:'AddCustomer',component:AddCustomerComponent},
    {path:'AddEmployee',component:AddEmployeeComponent},
   
    {path:'login',component:LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  