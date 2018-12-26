import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


import { CoreRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { ChatsComponent } from './chats/chats.component';
import { GroupsComponent } from './groups/groups.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { GlobalsService } from '@app/services/globals.service';


@NgModule({
  declarations: [
    SidenavComponent,
    BaseComponent,
    ChatsComponent,
    GroupsComponent,
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
  providers: [GlobalsService],
  bootstrap: [BaseComponent]
})
export class AppModule { }
