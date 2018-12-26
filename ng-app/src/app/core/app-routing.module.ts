import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from '@app/core/chats/chats.component';
import { ContactsComponent } from '@app/core/contacts/contacts.component';

const routes: Routes = [
  {path: 'chat/:id', component: ChatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
