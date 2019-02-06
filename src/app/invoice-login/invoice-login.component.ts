import { Component, OnInit } from '@angular/core';
//Using FormControls
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import {ServicesService} from '../services.service';
import {NavigationService} from '../navigation.service';
// Routers 
import {Router,ActivatedRoute} from '@angular/router';
// Password Encryption Method
import * as CryptoJS from 'crypto-js';
import { SessiontokenService } from '../sessiontoken.service';
// import {Employee} from '../employee.model';

@Component({
  selector: 'app-invoice-login',
  templateUrl: './invoice-login.component.html',
  styleUrls: ['./invoice-login.component.css']
})
export class InvoiceLoginComponent implements OnInit {

  message:string="";
  btnStatus:boolean=false;
  empId:number;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    pwd:new FormControl()

  })

  constructor(private _login:ServicesService,public router: Router,private navigate:NavigationService,
  private sessionToken:SessiontokenService) { }

  ngOnInit() {
    this.sessionToken.logout();
  }

  get f() { return this.loginForm.controls; }
  // Login Validations and Encrytion in the front end
  login(){
    if(!this.loginForm.valid)
    {
      if(this.loginForm.value.email == "" && this.loginForm.value.pwd!= "")
      {
        this.message = "Please enter email id";
      }
      else if(this.loginForm.value.email != "" && this.loginForm.value.pwd == "")
      {
        this.message = "Please enter password";
      }
      else
      {
        this.message = "Please enter valid email id.";
      } 
      this.btnStatus=true;
      return;
    }
    console.log(this.loginForm.value.email);
    this._login.getLoginDetails(this.loginForm.value.email,this.loginForm.value.pwd).subscribe(data=>{
      console.log(data);
      console.log(data[0].length);
      console.log(data[0][0].value);
      if(data[0].length>0){
        if(data[0][0].value>100)
        {
      // if((data[0]['pass'])===this.loginForm.value.pwd)
      // {
        
      //   this.sessionToken.sendToken(CryptoJS.AES.encrypt(this.loginForm.value.email, 'leap2018').toString());
      //    this.navigate.home();
      //  }
      //  else{
      //    this.btnStatus=true;
      //    this.message="Incorrect email and Password.Please try again";
      //   this.loginForm.value.email='';
      //   this.loginForm.value.pwd='';
      //   this.navigate.login();

      //  }
      this.sessionToken.sendToken(CryptoJS.AES.encrypt(this.loginForm.value.email, 'leap2018').toString());
      this.navigate.home();
        }
        else if(data[0][0].value<100){
          this.message="Not Financial Manager or Project Manager";
        }
        else{
          this.btnStatus=true;
          this.message="Incorrect Email or Password";
          this.loginForm.value.email='';
          this.loginForm.value.pwd='';
          this.navigate.login();
        }
      }
       
   })
  
   this.btnStatus=true;
 
 

  }
  forgotPass(){
    this.navigate.forgotPass();
  }

}
