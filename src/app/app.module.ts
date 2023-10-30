import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InterviewService } from './interview.service';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    InterviewService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
