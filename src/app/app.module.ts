import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
} from '@angular/material';

import { environment } from '../environments/environment';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { AddListDialogComponent } from './home/add-list-dialog/add-list-dialog.component';
import { AddItemDialogComponent } from './list/add-item-dialog/add-item-dialog.component';
import { SwipeDragDirective } from './directives/swipe-drag.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import { AuthGuard, AlreadySignedInGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    AddListDialogComponent,
    AddItemDialogComponent,
    SwipeDragDirective,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard, AlreadySignedInGuard, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [AddListDialogComponent, AddItemDialogComponent],
})
export class AppModule { }
