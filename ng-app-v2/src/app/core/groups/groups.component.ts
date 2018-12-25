import { Component, OnInit } from '@angular/core';
declare var md5;

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor() { }

  groups = [
    {
      'title': '#Argentina',
      'id': md5('#Argentina'),
      'description': ' **´¯`*.¸¸.*´¯`*(¡¡Bienvenidos!!! Esperando pasen una excelente estadía!!! Les desea la Familia de #Lc-de_30_a_40. /nuestra radio oficial ¦€¦  Radio-¡BooM!  ¦€¦)*´¯`*.¸¸.*´'
    },
    {
      'title': '#Argentina',
      'id': md5('#Argentina'),
      'description': ' **´¯`*.¸¸.*´¯`*(¡¡Bienvenidos!!! Esperando pasen una excelente estadía!!! Les desea la Familia de #Lc-de_30_a_40. /nuestra radio oficial ¦€¦  Radio-¡BooM!  ¦€¦)*´¯`*.¸¸.*´'
    },
    {
      'title': '#Argentina',
      'id': md5('#Argentina'),
      'description': ' **´¯`*.¸¸.*´¯`*(¡¡Bienvenidos!!! Esperando pasen una excelente estadía!!! Les desea la Familia de #Lc-de_30_a_40. /nuestra radio oficial ¦€¦  Radio-¡BooM!  ¦€¦)*´¯`*.¸¸.*´'
    },
    {
      'title': '#Argentina',
      'id': md5('#Argentina'),
      'description': ' **´¯`*.¸¸.*´¯`*(¡¡Bienvenidos!!! Esperando pasen una excelente estadía!!! Les desea la Familia de #Lc-de_30_a_40. /nuestra radio oficial ¦€¦  Radio-¡BooM!  ¦€¦)*´¯`*.¸¸.*´'
    },
    {
      'title': '#Argentina',
      'id': md5('#Argentina'),
      'description': ' **´¯`*.¸¸.*´¯`*(¡¡Bienvenidos!!! Esperando pasen una excelente estadía!!! Les desea la Familia de #Lc-de_30_a_40. /nuestra radio oficial ¦€¦  Radio-¡BooM!  ¦€¦)*´¯`*.¸¸.*´'
    },
  ];

  ngOnInit() {
  }

}
