import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    StudentListComponent,
    StudentFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 