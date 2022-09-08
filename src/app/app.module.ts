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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { DragDropFileUploadDirective } from './components/drag-drop/drag-drop.directive';
import { DialogCreateChatComponent } from './dialogs/dialog-create-chat/dialog-create-chat.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    PickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CdkVirtualScrollViewport,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    ChatComponent,
    TabsBarComponent,
    NavigationPanelComponent,
    DragDropComponent,
    DragDropFileUploadDirective,
    DialogCreateChatComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
