import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule}  from "@angular/material/input";
import { MatPaginatorModule}  from "@angular/material/paginator";
import { MatProgressSpinnerModule}  from "@angular/material/progress-spinner";
import { MatSortModule}  from "@angular/material/sort";
import { MatTableModule}  from "@angular/material/table";
import { MatButtonModule}  from "@angular/material/button";
import { MatCheckboxModule}  from "@angular/material/checkbox";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LabourStatsService } from './shared/services/labourStats.service'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    LabourStatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
