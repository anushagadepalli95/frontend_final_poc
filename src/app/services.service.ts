import { Injectable } from '@angular/core';
// Http Client Services
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Employee} from './employee.model';
// to pass the headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
//Backend Urls
// Login Api 
 const endpoint1 = 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/login';
 const endpoint2= 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/employeeid';
 const endpoint3= 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/employeedetails';
 const endpoint4= 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/retrieveproject';
 const endpoint5 = 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/Tasks';
 const endpoint6= 'http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/isFM';
 const endpoint7='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/invoice';
 const endpoint8='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/milestonesd';
 const endpoint9='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/updateinvoice';
 const endpoint10='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/sendmail'; 
 const endpoint11='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/prodashboard';
 const endpoint12='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/proexpenditure';
const endpoint13='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/retrievecommondetails';
 const endpoint14='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000';
 const endpoint15='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/retrieveprojectforfm';
 const endpoint16='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/employeeinfo';
 const endpoint17='http://ec2-3-87-189-147.compute-1.amazonaws.com:3000/revenuegenerate';



//  const endpoint1 = 'http://localhost:3000/login';
//  const endpoint2= 'http://localhost:3000/employeeid';
//  const endpoint3= 'http://localhost:3000/employeedetails';
//  const endpoint4= 'http://localhost:3000/retrieveproject';
//  const endpoint5 = 'http://localhost:3000/Tasks';
//  const endpoint6= 'http://localhost:3000/isFM';
//  const endpoint7='http://localhost:3000/invoice';
//  const endpoint8='http://localhost:3000/milestonesd';
//  const endpoint9='http://localhost:3000/updateinvoice';
//  const endpoint10='http://localhost:3000/sendmail'; 
//  const endpoint11='http://localhost:3000/prodashboard';
//  const endpoint12='http://localhost:3000/proexpenditure';
//  const endpoint13='http://localhost:3000/retrievecommondetails';
//  const endpoint14='http://localhost:3000';
//  const endpoint15='http://localhost:3000/retrieveprojectforfm';
//  const endpoint16='http://localhost:3000/employeeinfo';
//  const endpoint17='http://localhost:3000/revenuegenerate';


@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private http: HttpClient) { }
// Response Data
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
//Validate Login Credentials
  getLoginDetails(id,id1):Observable<any>{
    return this.http.get(endpoint1+'/'+id+'/'+id1).pipe(
      map(this.extractData));
    
  }
  getEmployeeId(id):Observable<any>{
    return this.http.get(endpoint2+'/'+id).pipe(
      map(this.extractData));
    
  }
  getEmployeeDetails(id):Observable<any>{
    return this.http.get(endpoint3+'/'+id).pipe(
      map(this.extractData));
  }
  getProjectDetails(id,id1):Observable<any>{
    return this.http.get(endpoint4+'/'+id+'/'+id1).pipe(
      map(this.extractData));
    
  }
  getMilestone(id): Observable<any> {
    return this.http.get(endpoint5+'/'+id).pipe(
      map(this.extractData));
  }
  getFM(id):Observable<any>{
    return this.http.get(endpoint6+'/'+id).pipe(
      map(this.extractData));
  }
  getInvoiceDetails(id,id1):Observable<any>{
    return this.http.get(endpoint7+'/'+id+'/'+id1).pipe(
      map(this.extractData));
    
   }
   getInvoicedate(id):Observable<any>
{
  return this.http.get(endpoint7+'/'+id).pipe(
    map(this.extractData))
  
}
getInvoicestartdate(id,id1):Observable<any>{
  
return this.http.get(endpoint8+'/'+id+'/'+id1).pipe(
  map(this.extractData));
}
gethours(id,id1,id2):Observable<any>{
  console.log(id+'hello'+id1);
  return this.http.get(endpoint8+'/'+id+'/'+id1+'/'+id2).pipe(
    map(this.extractData));
}
insertInvoiceDetails(id,id1,id2,id3):Observable<any>{
  return this.http.get(endpoint9+'/'+id+'/'+id1+'/'+id2+'/'+id3).pipe(
    map(this.extractData));  
}
mailsend(id):Observable<any>{
  return this.http.get(endpoint10+'/'+id).pipe
  (map(this.extractData));
}
// mailsend1():Observable<any>{
//   return this.http.get(endpoint14).pipe
//   (map(this.extractData));
// }
getProjectsforDashboard(id):Observable<any>{
  return this.http.get(endpoint11+'/'+id).pipe(
    map(this.extractData));
  
}
getReports(id):Observable<any>{
  return this.http.get(endpoint9+'/'+id).pipe(
    map(this.extractData)
  )
}
getProfit(id):Observable<any>{
  return this.http.get(endpoint12+'/'+id).pipe(
    map(this.extractData));
  
}
getCommondetails(id):Observable<any>{
  return this.http.get(endpoint13+'/'+id).pipe(
    map(this.extractData));
}
isRM(empId:number): Observable<Employee> 
{
  var employee : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
  return this.http.post<Employee>('http://apimicro.trasers.com/TestAPI/api/IsEmployeeRM/IsRM', employee);
}
getProjectDetailsforFM(id):Observable<any>{
  return this.http.get(endpoint15+'/'+id).pipe(
    map(this.extractData));
}
getEmployeeinfo(id):Observable<any>{
  return this.http.get(endpoint16+'/'+id).pipe(
    map(this.extractData));
  
}
getRevenuedetails(id):Observable<any>{
  return this.http.get(endpoint17+'/'+id).pipe(
    map(this.extractData));
}

}
