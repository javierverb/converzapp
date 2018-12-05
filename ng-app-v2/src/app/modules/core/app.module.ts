import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { CoreRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatsComponent } from './chats/chats.component';

@NgModule({
  declarations: [
    SidenavComponent,
    BaseComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    CoreRoutingModule,
    //  material modules:
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [BaseComponent]
})
export class AppModule { }
