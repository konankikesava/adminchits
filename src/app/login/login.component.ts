import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  MinLengthValidator
} from "@angular/forms";
import { User } from "../user";
import { Router } from "@angular/router";
import { MIN_LENGTH_VALIDATOR } from "@angular/forms/src/directives/validators";
import { UserService } from "../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProfileService } from "../services/profile.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  user: User;
  userArray: Array<User>;
  databaseUser: User;
  public flag: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private route: Router,
    private userServices: UserService,
    private snackbar: MatSnackBar,
    private profileServices: ProfileService
  ) {
    this.loginform = formBuilder.group({
      emailId: ["", [Validators.required,Validators.pattern(/[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}|((\\+91-?)|0)?[0-9]{10}$/)]],
      password: ["", [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]]
    });
  }

  ngOnInit() {}

  loginUser() {
    this.user = this.loginform.value;
    this.userServices.authUser().subscribe(user => {
      console.log(this.user.emailId, this.user.password);
      this.userArray = user;
      this.userArray.forEach(element => {
        if (
          element.emailId == this.user.emailId &&
          element.password == this.user.password
        ) {
          this.flag = true;
          this.user.userName = element.userName;
        }
      });
      if (this.flag) {
        console.log(this.user.userName + "inside login");
        this.profileServices.UserProfileSet(this.user.userName);
        this.route.navigate(["/Home"]);
      } else {
        this.snackbar.open("Incorrect username and password", "", {
          duration: 1000
        });
      }
    });
  }
}
