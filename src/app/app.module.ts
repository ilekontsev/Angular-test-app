import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './components/chat/chat.component';
import { TabsBarComponent } from './components/tabs-bar/tabs-bar.component';
import { MaterialModule } from './modules/material.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    ChatComponent,
    TabsBarComponent,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
