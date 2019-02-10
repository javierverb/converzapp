import { Component, OnInit, OnDestroy, ViewContainerRef,
         ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { GlobalsService } from '@app/services/globals.service';
import { ChatFragmentComponent } from '@app/core/chat-fragment/chat-fragment.component';
import { ChannelList } from '@app/utils/irc/channel-list';

declare var md5;

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  private groups = [];
  private componentRef: ComponentRef<ChatFragmentComponent>;

  @ViewChild('componentHolder', { read: ViewContainerRef }) componentHolder: ViewContainerRef;
  constructor(private globals: GlobalsService,
              private resolver: ComponentFactoryResolver) {
  }

  public createComponent(contactData: any) {
    const componentFactory = this.resolver.resolveComponentFactory(ChatFragmentComponent);
    this.componentRef = this.componentHolder.createComponent(componentFactory);
    this.componentRef.instance.name = contactData.name;
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  ngOnInit() {
    this.groups = this.globals.groups;
    this.globals.bsChatFragments.subscribe((contactData) => {
      if (contactData) {
        this.createComponent(contactData);
      }
    });
  }

}
