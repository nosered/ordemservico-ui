import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { ToastOptions } from 'ng2-toastr';
import { ToastrCustomOptions } from './shared/config/toastr-custom-options';
import { AppRoutingModule } from './app.routing.module';

// IMPORT DE TESTE
import { LayoutModule } from './shared/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: ToastOptions, useClass: ToastrCustomOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
