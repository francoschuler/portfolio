import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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

  constructor(private media: MediaMatcher,
              public router: Router,
              public authService: AuthService, 
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { 
    
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
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: {type: 'logout'}
    });
    
    dialogRef.afterClosed().subscribe( (result) => {
      if (result == 1) {
        this.openSnackBar("Session closed correctly.", "Ok");
      }else if (result == 2) {
        this.openSnackBar("Error. There was an error trying to close the session.", "Ok");
      }
    });
  }

  isLogged() {
    return this.authService.isLogged();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    })
  }



}
