import { Component, OnInit } from '@angular/core';
import { Constants } from '../Constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selecedTime:string
  timeSlot = ['9 AM','10 AM','11 AM','12 AM','1 PM','2 PM','3 PM','4 PM','5 PM']
  constructor(public router:Router) {
    this.selecedTime = localStorage.getItem(Constants.SELECTED_TIME_SLOT)
   }

  ngOnInit() {
  }
  onSelectTimeClick(value){
    // localStorage.setItem(Constants.SELECTED_TIME_SLOT,value)
    this.router.navigate(['/details'],{state:{time:value}})
  }
}
