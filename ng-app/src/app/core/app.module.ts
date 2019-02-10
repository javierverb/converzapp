import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatToolbarModule,
         MatButtonModule, MatSidenavModule, MatIconModule,
         MatListModule, MatTabsModule, MatCardModule,
         MatFormFieldModule, MatInputModule } from '@angular/material';

import { searchPipe } from '@app/pipes/search-pipe';

import { CoreRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { ChatsComponent } from './chats/chats.component';
import { GroupsComponent } from './groups/groups.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { GlobalsService } from '@app/services/globals.service';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatFragmentComponent } from './chat-fragment/chat-fragment.component';
import { NickComponent } from './nick/nick.component';


@NgModule({
  declarations: [
    SidenavComponent,
    BaseComponent,
    ChatsComponent,
    GroupsComponent,
    ContactsComponent,
    ChatFragmentComponent,
    NickComponent,
    searchPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreRoutingModule,
    //  material modules:
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
  ],
  entryComponents: [
    ChatFragmentComponent,
  ],
  providers: [GlobalsService],
  bootstrap: [BaseComponent]
})
export class AppModule { }
