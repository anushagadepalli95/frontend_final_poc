import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SessiontokenService } from '../sessiontoken.service';
import { NavigationService } from '../navigation.service';
import * as CryptoJS from 'crypto-js';
import {Routes} from '@angular/router';
import { SearchPipe } from '../search.pipe';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  encryptedEmail:string="";
  empEmail:string="";
  empId:number=0;
  projects:any;
  employeeDetails:any;
  selectYear:number=2018;
  searchText='';
  messageText:any;
  message:boolean;
  constructor(private _billing:ServicesService,private session:SessiontokenService,private navigate:NavigationService) { }

  ngOnInit() {
    if(this.session.isLoggednIn)
    {
      this.encryptedEmail = this.session.getToken();
      console.log(this.session.getToken());
    }
    else
    {
      this.navigate.login();
    }
    this.empEmail = CryptoJS.AES.decrypt(this.encryptedEmail,'leap2018').toString(CryptoJS.enc.Utf8);
    console.log(this.empEmail);
   this._billing.getEmployeeId(this.empEmail).subscribe(data=>{
    this.empId=data['empId'];
    console.log(this.empId);
   })
   setTimeout(()=>{
     this._billing.getEmployeeDetails(this.empId).subscribe(data=>{
        console.log(data);
        this.displayEmployeesDetails(data);
     })
   },2000)
   setTimeout(() => {
    this._billing.getProjectDetails(this.empId,this.selectYear).subscribe(data1=>{
      console.log(this.empId);
      console.log(data1);
    this.projects=data1;   
    })
  },2500);
}

//Employee Details
displayEmployeesDetails(data){
  this.employeeDetails = data;

}
selectedProjectData(){
  this._billing.getProjectDetails(this.empId,this.selectYear).subscribe(data1=>{
    console.log(this.empId);
    console.log(data1);
  this.projects=data1;  
  if(this.projects.length>0){
    this.projects=data1;
  } 
  else{
    this.message=true;
    this.messageText="No projects available for the selected year";
  }
  })

}
Milestone(id:string){
  console.log(id)
  this.navigate.milestone(id);
}


}
