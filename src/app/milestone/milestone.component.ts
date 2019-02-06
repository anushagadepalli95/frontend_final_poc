import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SessiontokenService } from '../sessiontoken.service';
import { NavigationService } from '../navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { Http } from '@angular/http';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  encryptedEmail:string="";
  empEmail:string="";
  milestones:any;
  message:boolean;
  messageTxt:any;
  // Invoice information
  invoiceDetails:any;
  invoicedate:any;
  invoice_id:any;
  generated:any;
  hours:any;
  commondetails:any;
  project_id:any;
  mail_generated:any;
  mail_content:any;
  invoice_date:string;
  // invoice_date1:Date;


  // Pdf Format
  public downloadPDF()  
{   
   var data = document.getElementById('contentToConvert');  
  html2canvas(data).then(canvas => {  
    // Few necessary setting options 
    
    var imgWidth = 200; 
    var pageHeight = 250;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('MYPdf.pdf'); // Generated PDF   
  });  
} 

  constructor(private _milestone:ServicesService,private http:Http,private session:SessiontokenService,private route: ActivatedRoute,private navigate:NavigationService,private modalService: NgbModal) { }

  ngOnInit() {
    if(this.session.isLoggednIn)
    {
      this.encryptedEmail = this.session.getToken();
      
    }
    else
    {
      this.navigate.login();
    }
    this.project_id=this.route.snapshot.params['id'];
    console.log(this.project_id);
    this._milestone.getCommondetails(this.route.snapshot.params['id']).subscribe(data=>{
      console.log(data);
      this.commondetails=data;
    })
    this.displaydata();
  
   
 } 
 
displaydata(){
  this._milestone.getMilestone(this.route.snapshot.params['id']).subscribe(data=>{
    console.log(data);
    this.milestones=data;
    this.invoicetrue=true;
    if(this.milestones.length>0){
      this.milestones=data;
    }
    else{
      this.message=true;
      this.messageTxt='No milestones available for the project;'
    }
  

})
}
// get Invoice Details
sow_value:any;

bill_rate:any;
clientcontactname:any;
clientcontactEmail:any;
clientcontactaddress:any;
invoicetrue:boolean=false;

getInvoice1(id:string,id1:string,id2:string){
  console.log(id2);
  this._milestone.getInvoiceDetails(id,id1).subscribe(data=>{
    console.log("---",id,id1);
    
    this.invoiceDetails=data;
    console.log(this.invoiceDetails);
    this.sow_value=data['sow_value'];
    console.log(this.bill_rate=data['Bill_rate']);
    console.log(this.clientcontactname=data['ClientContactName']);
    console.log(this.clientcontactEmail=data['ClientContactEmail']);
    this.clientcontactaddress=data['clientcontact_address1']
    console.log(this.sow_value);
    console.log(this.bill_rate);
    
  }) 
// to get the automatic generated invoice id

this._milestone.getInvoicedate(id1).subscribe(data1=>{
  this.invoicedate=data1;
  console.log(this.invoicedate);
  this.invoice_id=data1[0][0]['invoice_id']
  this.mail_generated=data1[0][0]['mail_generated']
  if(data1[0][0]['generated']===1){
    this.generated=true;
  }
  else{
    this.generated=false;
  }
  if(data1[0][0]['mail_generated']===1){
    this.mail_generated=true;
  }
  else{
    this.mail_generated=false;
  }
  console.log(this.mail_generated);

})
// to get the start date
let endDate=new Date(id2).toISOString().split('T')[0];

 this._milestone.getInvoicestartdate(endDate,id).subscribe(data=>{
  console.log(endDate+'hello'+id);
  console.log(data[0][0]['date1']);

// to get the number of hours
let startdate=new Date(data[0][0]['date1']).toISOString().split('T')[0];
 this._milestone.gethours(id,startdate,endDate).subscribe(data1=>{
console.log(data[0][0]['date1']);
console.log(startdate);
console.log(endDate);
  console.log(data1);
  this.hours=data1[0][0]['d14'];
  console.log(this.hours);
 })  
})
this.invoice_date=endDate;
console.log(this.invoice_date);
}

// to insert the amount and set the generated value
insertinvoicedetails(){
  

  this._milestone.insertInvoiceDetails(this.invoice_id,this.sow_value,this.project_id,this.invoice_date).subscribe(data=>{
    console.log(this.project_id);
    console.log(data);
  this.invoicetrue=false;
  this.displaydata();
   this._milestone.getMilestone(this.route.snapshot.params['id']).subscribe(data1=>{
       console.log(data1);
      console.log("hello");
    
      setTimeout(()=>{
        this.invoicetrue = true;
      },800);
    })
    
  1 })
    
 
}
mailsend(){
  
  this._milestone.mailsend(this.invoice_id).subscribe(data=>{
    console.log(data);
    
  })
  
}
mailsend1(){
  
  this.http.get('http://localhost:3000').subscribe(data=>{
    console.log(data);this.mail_content=data['_body'];
  })
  
}
openLg(content) {
  this.modalService.open(content, { size: 'lg' });
}

}
