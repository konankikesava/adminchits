import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../user";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  user: User;
  private userArray: Array<User>;
  private flag: boolean;

 // private patternEmail:string = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}";

  constructor(
    public formBuilder: FormBuilder,
    private route: Router,
    private userServices: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.registerform = formBuilder.group({
      userName: ["", Validators.required],
      emailId: ["", [Validators.required,Validators.pattern(/[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}|((\\+91-?)|0)?[0-9]{10}$/)/*,Validators.pattern(/((\\+91-?)|0)?[0-9]{10}$/),Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)*/]],
      password: ["",[ Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]]
    });
  }

  ngOnInit() {}

  RegisterUser() {

    
    console.log(this.flag + "inside function");
    this.user = this.registerform.value;
    console.log(this.user.userName);
    if(this.user.emailId!=""&&this.user.userName!=""&&this.user.password!=""){
    this.userServices.authUser().subscribe(data => {
      this.userArray = data;
      this.userArray.forEach(element => {
        if (
          element.emailId == this.user.emailId ||
          element.userName == this.user.userName
        ) {
          this.flag = true;
          console.log(this.flag + "inside first loop");
          // console.log(element.emailId+" email Id "+this.user.emailId);
          // console.log(element.userName+" username "+this.user.userName);
        }
      });

      console.log(this.flag + "outside loop");
      if (this.flag) {
        this.snackbar.open("User Already exist please Login", "", {
          duration: 1000
        });
        this.flag = false;
      } else {
        console.log(this.flag + "inside else statement");
        this.userServices.addUser(this.user).subscribe(data => {
          if (data != null) {
            this.snackbar.open("User Added successfully", "", {
              duration: 1000
            });
            this.router.navigate(["/login"]);
          }
        });
      }
    });
  }else{
    this.snackbar.open("All the fields are compulsory", "", {
      duration: 1000
    });
  }
  }
}
