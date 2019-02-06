import { Component, OnInit } from '@angular/core';
import { SessiontokenService } from '../sessiontoken.service';
import { ServicesService } from '../services.service';
import { NavigationService } from '../navigation.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {
  encryptedEmail:string="";
  empEmail:string="";
  empId:number=0;
  employeeDetails:any;
  IsManager: boolean=false;
  selectYear:number=2018;
  projects:any;
  project_id:any;
  employees:any;
  public isCollapsed = true;
  constructor(private _projects:ServicesService,private session:SessiontokenService,private navigate:NavigationService) { }

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
   this._projects.getEmployeeId(this.empEmail).subscribe(data=>{
    this.empId=data['empId'];
    console.log(this.empId);
   })
   setTimeout(()=>{
     this._projects.getEmployeeDetails(this.empId).subscribe(data=>{
        console.log(data);
        this.displayEmployeesDetails(data);
     })
    },600)
this._projects.isRM(this.empId).subscribe(data=>{
  this.displayTeamMember(data); 
})

this._projects.getProjectDetailsforFM(this.selectYear).subscribe(data=>{
   console.log(data);
   this.projects=data;
   this.project_id=data[0]['project_id'];
   console.log(this.project_id);
})
  }    
  // end of ngOninit
  displayEmployeesDetails(data){
    this.employeeDetails = data; 
  }
  displayTeamMember(data){
    if(data.length>0) {this.IsManager = true; console.log(this.IsManager);}
  }
  selectedProjectData(){
    this._projects.getProjectDetailsforFM(this.selectYear).subscribe(data1=>{
      console.log(this.empId);
      console.log(data1);
    this.projects=data1;   
    })
  }
  viewemployees(id:string){
    console.log("Hello");
    this._projects.getEmployeeinfo(id).subscribe(data=>{
      console.log(data);
      this.employees=data;
    })
    
  }
}
