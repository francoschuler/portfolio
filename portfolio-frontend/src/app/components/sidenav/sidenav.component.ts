import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  links = [
    {name: 'Home', route: 'home', icon:'home'},
    {name: 'About me', route: 'aboutme', icon:'person_outline'},
    {name: 'Skills', route: 'skills', icon:'code'}
  ]

  constructor(private media: MediaMatcher, private router: Router) { 
    
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)'); 
  }

  ngOnInit(): void {
    this.mobileQuery.addEventListener('change', this.watchQuery);
  }

  onClickScroll( id:string ) {

    if (id) {
      document.querySelector('#' + id)?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }

  watchQuery(){
    console.log('query change');
    
  }



}
