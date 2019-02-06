import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router:Router) { }  

  login(){
    this.router.navigate(['login']);
  }
  home(){
    this.router.navigate(['home']);
  }
  milestone(id:string){
    this.router.navigate(['home/milestone',id]);
  }
  forgotPass(){
    this.router.navigate(['forgotPass']);
  }
}
