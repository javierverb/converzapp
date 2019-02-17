import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('drawer') drawerLeft: MatSidenav;
  @ViewChild('drawerRight') drawerRight: MatSidenav;
  constructor() { }

  _resizeHeader() {
    var sidenavHeader = <HTMLElement>document.querySelector('.sidenav-header');
    var sidenavContent = <HTMLElement>document.querySelector('.sidenav-content');
    var parentWidth = `${sidenavContent.offsetWidth}px`;
    sidenavHeader.style.width = parentWidth;
  }

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this._resizeHeader();
    });
    this.drawerLeft.openedChange.subscribe(() => this._resizeHeader());
    this.drawerRight.openedChange.subscribe(() => this._resizeHeader());
    window.onresize = this._resizeHeader;
  }

}
