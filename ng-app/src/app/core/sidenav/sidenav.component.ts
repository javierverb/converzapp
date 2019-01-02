import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  private _resizeHeader() {
    var sidenavHeader = <HTMLElement>document.querySelector('.sidenav-header');
    var sidenavContent = <HTMLElement>document.querySelector('.sidenav-content');
    var parentWidth = `${sidenavContent.offsetWidth}px`;
    sidenavHeader.style.width = parentWidth;
  }

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this._resizeHeader();
    });
    window.onresize = this._resizeHeader;
  }

}
