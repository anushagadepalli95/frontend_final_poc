import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NavigationService } from '../navigation.service';
import {NgForm} from '@angular/forms';
import { ServicesService } from '../services.service';
import { Http } from '@angular/http';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private navigate: NavigationService,private _forgot:ServicesService,private http:Http) { }
  empEmail:string="";
  empPassword:string="";
  message:string="";
  btnStatus:boolean=false;
  sessionEmail:string="";
  sendOTP:boolean=true;
  resetPassword:boolean=false;
  checkOTP:boolean=false;

  ngOnInit() {
    this.sendOTP=true;
    this.resetPassword=false;
    this.checkOTP=false;
  }

  onForgotEmp(form : NgForm){
    this.btnStatus = false;
    if(form.invalid) 
    { 
      if(form.value.empEmail == "" )
      {
        this.message = "Please enter registered email id";
      }
      this.btnStatus = true;
      return; 

    }
    this.empEmail=form.value.empEmail;
    var employee : Employee = {emailId:form.value.empEmail, password:'', empId: 0, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ValidateEmployeeCredentials/LoginCheck', employee).subscribe(result => {console.log(result);
    if(result['_body'] != 'No such employee exist')
    {
    var employee1 : Employee = {emailId:employee.emailId, password:'', empId: 0, empName:'http://localhost:4200/resetPassword',IsRM:0};
    console.log(employee1.emailId);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/sendForgotPass/ForgotPassword',employee1).subscribe(result => {console.log(result);
    this.sendOTP=false;
    this.resetPassword=false;
    this.checkOTP=true;
    this.btnStatus = true;
      this.message = "OTP has been send to your registered email id.";
    });
    }
    else{
      this.btnStatus = true;
        this.message = "Please enter registered email id.";
    }
    });
    
  }


  onValidateOTP(form : NgForm){
    if(form.invalid) 
    { 
      if(form.value.empEmail == "" )
      {
        this.message = "Please enter OTP";
      }
      this.btnStatus = true;
      return; 

    }
    var employee : Employee = {emailId:this.empEmail, password:form.value.empEmail, empId: 0, empName: "",IsRM:0};

   this.http.post('http://apimicro.trasers.com/TestAPI/api/validateOTP/checkOTP', employee).subscribe(result => { console.log(result);

    this.resetPassword = true;
    if(result['_body'] != "")
    {
        this.btnStatus = true;
        this.message = "Please reset your password.";
        this.sendOTP=false;
        this.resetPassword=true;
        this.checkOTP=false;
    }
    else
    {
      this.btnStatus = true;this.sendOTP=false;
      this.resetPassword=false;
      this.checkOTP=true;
      this.message = "You can't reset your password. Please try again.";
  }
});
    
  }


  empPassword2:string; empPassword1:string;  encryptPassword:string;
  onResetPassword(form : NgForm){
    if(form.invalid) 
    { 
      return; 
    }
    else if(form.value.empPassword1 !=  form.value.empPassword2)
      {
        this.message = "Entered password are not matching. Please confirm password";
        this.empPassword2 = '';
        return; 
      }
      else if(form.value.empPassword1.length<4)
      {
        this.message = "Entered password should have length greater than 6.";
        this.empPassword1 = '';
        this.empPassword2 = '';
        return; 
      }
    else
    {
      this.encryptPassword = CryptoJS.AES.encrypt(form.value.empPassword1.trim(),'leap2018').toString();
      var employee : Employee = {emailId:this.empEmail, password:this.encryptPassword, empId: 0, empName:form.value.empPassword1.trim(),IsRM:0};
      this.http.post('http://apimicro.trasers.com/TestAPI/api/resetPassword/password', employee).subscribe(result => { console.log(result);
      this.message=result['_body'];});
      setTimeout(()=> {
        this.navigate.login();
      }, 300);
    }
  }
}
