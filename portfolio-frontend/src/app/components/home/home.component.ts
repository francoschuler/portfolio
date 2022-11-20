import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller,
              private router: Router) { }

  ngOnInit(): void {


    const typeOptions = {
      strings: ['Junior Web Developer', 'Computer Science Engineer', 'Private Teacher'],
      startDelay: 500,
      typeSpeed: 100,
      backSpeed: 25,
      showCursor: true,
      backDelay: 1000,
      loop: true,
    };

    const typed = new Typed('.subtitle', typeOptions);
  }



  onClickScroll( id:string ) {

    if (id) {
      document.querySelector('#' + id)?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      window.history.replaceState({}, '',`/${id}`);
      console.log(this.router.url);
    }
  }

}
