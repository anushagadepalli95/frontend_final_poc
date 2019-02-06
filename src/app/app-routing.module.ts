import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceLoginComponent } from './invoice-login/invoice-login.component';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceSidemenuComponent } from './invoice-sidemenu/invoice-sidemenu.component';
import { MyreportsComponent } from './myreports/myreports.component';
import { BillingComponent } from './billing/billing.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

const routes:Routes=[
  {
  path:'login',
  component:InvoiceLoginComponent
},
{path: '', component:InvoiceLoginComponent},
{
  path: 'forgotPass', component: ForgotPassComponent
},
{ path: 'home', component:InvoiceSidemenuComponent,
children: [
  { path: '', redirectTo: 'myReports', pathMatch: 'full'},
  { path: 'myReports', component: MyreportsComponent},
  { path: 'billing',component:BillingComponent},
  { path: 'milestone/:id',component:MilestoneComponent},
  {path :'projects',component:ViewProjectsComponent}
]
}
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes) 
  ],
  declarations: []
})
export class AppRoutingModule { }
