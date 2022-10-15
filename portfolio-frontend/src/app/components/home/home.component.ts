import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller,
              private router: Router) { }

  ngOnInit(): void {
  }

  onClickScroll( id:string ) {
    console.log(id);
    // document.querySelector('#' + id)?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    this.viewportScroller.scrollToAnchor(id);
    // this.router.navigate([], { fragment: id });
  }

}
