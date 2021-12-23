import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { AuthorsComponent } from './authors/authors.component';
import { HomeComponent } from './home/home.component';
import { AuthorsService } from './services/authors.service';
import { BoxesService } from './services/boxes.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalForAddAndUpdateComponent } from './boxes/modal-for-add-and-update/modal-for-add-and-update.component';
// import {FormBuilder, FormGroup} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgMultiSelectDropDownModule, } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { BoxDetailsComponent } from './box-details/box-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    AuthorsComponent,
    HomeComponent,
    ModalForAddAndUpdateComponent,
    BoxDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [
    AuthorsService,
    BoxesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
