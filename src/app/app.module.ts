import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
// Client Module
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';



// Component
import { AppComponent } from './app.component';
import { InvoiceLoginComponent } from './invoice-login/invoice-login.component';
import { InvoiceSidemenuComponent } from './invoice-sidemenu/invoice-sidemenu.component';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';
import { MatFormFieldModule, MatInputModule , MatSelectModule, MatOptionModule} from '@angular/material';
import * as jspdf from 'jspdf';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Forms Module
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { MyreportsComponent } from './myreports/myreports.component';
import { BillingComponent } from './billing/billing.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import {HttpModule} from '@angular/http';
import { SearchPipe } from './search.pipe';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceLoginComponent,
    InvoiceSidemenuComponent,
    MyreportsComponent,
    BillingComponent,
    MilestoneComponent,
    ForgotPassComponent,
    SearchPipe,
    ViewProjectsComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,MatButtonModule,MatCheckboxModule,FormsModule,ReactiveFormsModule,
    HttpClientModule,MatIconModule, MatSidenavModule,MatFormFieldModule, 
    MatInputModule , MatSelectModule, MatOptionModule,
    MatListModule, MatToolbarModule,NgbModule,ChartsModule,HttpModule,NgxPasswordToggleModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
