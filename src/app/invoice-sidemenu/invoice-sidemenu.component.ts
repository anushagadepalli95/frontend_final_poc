import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { SessiontokenService } from '../sessiontoken.service';
import { ServicesService } from '../services.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-invoice-sidemenu',
  templateUrl: './invoice-sidemenu.component.html',
  styleUrls: ['./invoice-sidemenu.component.css']
})
export class InvoiceSidemenuComponent implements OnInit {
  encryptedEmail:string="";
  empEmail:string="";
  FM:string="";
  isFM:boolean=false;
  empId:number=0;
  message:boolean=true;
  sideNavLoad:boolean=false;
  
  constructor(private navigate:NavigationService,private session:SessiontokenService,private _sidemenu:ServicesService) { }

  side:boolean;
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
    this._sidemenu.getEmployeeId(this.empEmail).subscribe(data=>{
     this.empId=data['empId'];
     console.log(this.empId);
     this._sidemenu.getFM(this.empId).subscribe(data=>{
      console.log(data);
         if(data[0]['empDesignation']==='Financial Manager')
    {
      console.log("Hello");
      this.isFM=true;
      console.log("IsFM"+this.isFM+this.sideNavLoad);
      
    }
    setTimeout(()=>{this.sideNavLoad=true;},600);
    })
      this._sidemenu.getEmployeeDetails(this.empId).subscribe(data=>{
        console.log(this.empId)
        console.log(data);
        this.displayEmployeeDetails(data);
      })
      

    })
  }

  employeeName:string;
  displayEmployeeDetails(data){
    this.employeeName=data[0]['empfirstname'];
  }

  displayFM(data){
    this.FM=data[0]['empDesignation'];
    console.log(this.FM);
    if(data[0]['empDesignation']==='Financial Manager')
    {
      console.log("Hello");
     this.isFM=true;
    }
   }

  logout(){
    this.session.logout();
    this.navigate.login();
  }

}
