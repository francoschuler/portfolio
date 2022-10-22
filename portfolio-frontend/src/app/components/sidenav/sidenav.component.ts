import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  isLogin: boolean = false;

  constructor(private media: MediaMatcher, public router: Router, public authService: AuthService) { 
    
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)'); 
    
  }

  ngOnInit(): void {
    this.mobileQuery.addEventListener('change', this.watchQuery);
    
    // this.isLogin = this.router.url === '/login' ? true : false;
  }

  onClickScroll( id:string ) {

    if (id) {
      document.querySelector('#' + id)?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      console.log(this.router.url);
    }
  }

  watchQuery(){
    console.log('query change');
    
  }

  logout() {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.isLogged();
  }



}
