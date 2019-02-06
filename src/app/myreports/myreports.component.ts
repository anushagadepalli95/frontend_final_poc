import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SessiontokenService } from '../sessiontoken.service';
import { NavigationService } from '../navigation.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-myreports',
  templateUrl: './myreports.component.html',
  styleUrls: ['./myreports.component.css']
})
export class MyreportsComponent implements OnInit {
  isFM:boolean=false;
  encryptedEmail:string="";
  empEmail:string="";
  empId:number=0;

  projects:any;
  selectProject1:string;
  selectProject12:string;
  httpdata1:any;
  pieChartOptions3:any;pieChartData3: any;pieChartOptions2:any;
  //color codes
  colorCode1: number = 0;
  colorCode2: number = 0;
  colorCode3: number = 0;
  ColorCodeString: string;
  colorCode: any = [];colorcode1:any[];
  pieChartLabels1=[];
  pieChartLabels3=[];
  pieChartLabels2=[];
  //chart color
  pieChartColor3: any;pieChartData2:any;pieChartColor2:any;pieChartData1:any;
  pieChartColor1:any;pieChartOptions1:any;
  valuedata3: any = [];
  valuedata2:any=[];
  valuedata12:any=[];
  valuedata13:any=[];
  valuedata1:any=[];
  chart1:boolean=false;chart2:boolean=false;chart3:boolean=false;
  colorCoden: any = [];
  httpdata2:any;httpdata3:any;
  chart1Message:string="";
  chart1Msg:boolean;chart3Msg:any;
  chart2Message:string="";chart3Message:string="";
  chart2Msg:boolean;
  selectYear:number=2018;
  projectdata:boolean=false;

  constructor(private _report:ServicesService,private session:SessiontokenService,private navigate:NavigationService) { }

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
    this.projectdata=false;
    this.empEmail = CryptoJS.AES.decrypt(this.encryptedEmail,'leap2018').toString(CryptoJS.enc.Utf8);
    console.log(this.empEmail);
   this._report.getEmployeeId(this.empEmail).subscribe(data=>{
    this.empId=data['empId'];
    console.log(this.empId);
    this._report.getFM(this.empId).subscribe(data=>{
      console.log(data);
         if(data[0]['empDesignation']==='Financial Manager')
    {
      console.log("Hello");
      this.isFM=true;
      console.log("IsFM"+this.isFM);
      
    }
    this._report.getProjectsforDashboard(this.empId).subscribe(data=>{
      console.log(this.empId);
     console.log(data);
     this.projects=data;
     this.projectdata=true;
     
   })
  })
   })
 

this.selectProject1='ATIC001';
this._report.getReports(this.selectProject1).subscribe(data=>{
  console.log(this.selectProject1);
  console.log(data);
  this.httpdata1 = data;
  console.log(this.httpdata1.length);
  if(this.httpdata1.length>0){
    console.log("length");
  for (let i = 0; i < this.httpdata1.length; i++) {
    console.log("HEllo");
    this.pieChartLabels3.push(this.httpdata1[i].milestone_id);
    this.valuedata3.push(this.httpdata1[i].amount.split("$")[1]);
    console.log(this.valuedata3);
      }
      this.chart1=true;
    }
    else{
      this.chart1=true; this.chart1Msg=true;
      this.chart1Message="Data unavailable for the project";
    }
    })
  
  
    this.pieChartData3 = [
      {
        data: this.valuedata3
        
      }

    ];
     console.log( this.pieChartData3);
    this.pieChartColor3 = [
      {
        backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(83,81,84)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]
    console.log( this.pieChartColor3);
    
    this.pieChartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    
    this.selectProject12='ATIC001';
    this._report.getProfit(this.selectProject12).subscribe(data=>{
      console.log(data);
      this.httpdata2=data;
      if(this.httpdata2.length>0){
      for(let i=0;i<this.httpdata2.length;i++){
        this.pieChartLabels2.push(this.httpdata2[i].milestone_id);
        this.valuedata2.push(this.httpdata2[i].amount_generated.split("$")[1]);
        this.valuedata12.push(this.httpdata2[i].amount_invested);
        this.valuedata13.push((this.httpdata2[i].amount_generated.split("$")[1])-(this.httpdata2[i].amount_invested));

      }
      this.chart2=true;
    }
    else{
      this.chart2=true; this.chart2Msg=true;
      this.chart2Message="Data unavailable for the project";
    }

    })
    this.pieChartData2=[
      {
        label:"Amount Generated",
        backgroundColor: 'rgba(77,83,96,0.2)',
        data:this.valuedata2
      },
      {
        label:"Amount Invested",
        backgroundColor: 'rgba(30, 169, 224, 0.8)',
        data:this.valuedata12
      },
      {
        label:"Profit",
        backgroundColor: 'rgba(0,128,0,0.8)',
        data:this.valuedata13
      }
    ];
    this.pieChartColor2=[
      {
        backgroundColor:this.colorcode1
      }
    ]
    this.pieChartOptions2 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    

      this._report.getRevenuedetails(this.selectYear).subscribe(data=>{
        console.log(data);
        this.httpdata3=data;
        if(this.httpdata3.length>0){
          for(let i=0;i<this.httpdata3.length;i++){
            this.pieChartLabels1.push(this.httpdata3[i].project_id);
            this.valuedata1.push(this.httpdata3[i].amount_generated.split("$")[1]);
        
         }
         this.chart3=true;
        }
        else{
          this.chart3=true; this.chart3Msg=true;
          this.chart3Message="Data unavailable for the project";
        }
      })
      this.pieChartData1 = [
        {
          label:"Revenue",
          data: this.valuedata1
          
        }
  
      ];
     
      this.pieChartColor1 = [
        {
          backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(83,81,84)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
        }
      ]

      
      this.pieChartOptions1 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
  
  
      setTimeout(()=> {this.chart3=true;
      }, 600);

      
 

  }
  //charts 1
  selectProject(){
    this.chart1=false;
    this.chart1Msg=false;
  
    this.pieChartData3 = []; this.pieChartColor3 = []; this.pieChartLabels3 = []; this.valuedata3 = []; this.colorCode = [];
    this._report.getReports(this.selectProject1).subscribe(data=>{
      console.log(data);
      this.httpdata1 = data;
      if(this.httpdata1.length>0){
      for (let i = 0; i < this.httpdata1.length; i++) {
        console.log("HEllo");
        this.pieChartLabels3.push(this.httpdata1[i].milestone_id);
        this.valuedata3.push(this.httpdata1[i].amount.split("$")[1]);

 



      }
      this.chart1 = true;
    }
    else {
      this.chart1 = true; this.chart1Msg=true;
      this.chart1Message ="Data unavailable for the project."
    }
    })
  
  
    this.pieChartData3 = [
      {
        data: this.valuedata3
        
      }

    ];
   
    this.pieChartColor3 = [
      {
        backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(83,81,84)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]
   
    
    this.pieChartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }


    setTimeout(()=> {this.chart1=true;
    }, 600);
    
  }

  //chart 2
  selectProject2(){
    this.chart2=false;
    this.chart2Msg=false;
   this.pieChartData2=[];
   this.pieChartColor2=[];
    this.pieChartLabels2=[];
    this.valuedata2=[];
    this.valuedata12=[];this.valuedata13=[];
    this.colorcode1=[];
   
    this._report.getProfit(this.selectProject12).subscribe(data=>{
      console.log(data);
      this.httpdata2=data;
      if(this.httpdata2.length>0){
            for(let i=0;i<this.httpdata2.length;i++){
        this.pieChartLabels2.push(this.httpdata2[i].milestone_id);
        this.valuedata2.push(this.httpdata2[i].amount_generated.split("$")[1]);
        this.valuedata12.push(this.httpdata2[i].amount_invested);
        this.valuedata13.push((this.httpdata2[i].amount_generated.split("$")[1])-(this.httpdata2[i].amount_invested));

      }
    
      this.chart2=true;
    }
    else{
      this.chart2=true; this.chart2Msg=true;
      this.chart2Message="Data unavailable for the project";
    }
    })
    this.pieChartData2=[
      {
        label:"Amount Generated",
        backgroundColor: 'rgba(62,150,81,0.2)',
        data:this.valuedata2
      },
      {
        label:"Amount Invested",
        backgroundColor: 'rgba(30, 169, 224, 0.8)',
        data:this.valuedata12
      },
      {
        label:"Profit",
        backgroundColor: 'rgba(0,128,0,0.8)',
        data:this.valuedata13
      }
    ];
    this.pieChartColor2=[
      {
        backgroundColor:this.colorcode1
      }
    ]
    this.pieChartOptions2 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    setTimeout(()=> {this.chart2=true;
    }, 600);

  }

  //chart 3
  selectedRevenueData(){
    this.chart3=false;
    this.chart3Msg=false;
    this.pieChartData1=[];
    this.pieChartColor1=[];
     this.pieChartLabels1=[];
     this.valuedata1=[];
   
     this.colorcode1=[];

    this._report.getRevenuedetails(this.selectYear).subscribe(data=>{
      console.log(data);
      this.httpdata3=data;
      if(this.httpdata3.length>0){
        for(let i=0;i<this.httpdata3.length;i++){
          this.pieChartLabels1.push(this.httpdata3[i].project_id);
          this.valuedata1.push(this.httpdata3[i].amount_generated.split("$")[1]);  
       }
       this.chart3=true;
      }
      else{
        this.chart3=true; this.chart3Msg=true;
        this.chart3Message="Data unavailable for the project";
      }
    })
    this.pieChartData1 = [
      {
        label:"Revenue",
        data: this.valuedata1
        
      }

    ];
   
    this.pieChartColor1 = [
      {
        backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(83,81,84)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]

    
    this.pieChartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }


    setTimeout(()=> {this.chart3=true;
    }, 600);


  }
}
