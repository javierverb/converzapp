import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from '@app/core/chats/chats.component';

const routes: Routes = [
  {path: 'group/:id', component: ChatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
