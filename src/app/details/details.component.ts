import { Component, OnInit } from '@angular/core';
import { Constants } from '../Constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  lastName:string;
  phoneNumber:number
  firstName:string
  alertMsg:string;
  object ={
    firstName:"",
    lastName:"",
    mobileNumber:"",
    selectedTimeSlot:"",
    img:""
  }
  selectedTimeSlot
  timeSlot
  userSelectedTimeSlot
  isReadOnly:boolean = false;
  timeSlots = ['9 AM','10 AM','11 AM','12 AM','1 PM','2 PM','3 PM','4 PM','5 PM']
  imagUrl
  isButtonShow:boolean = false
  constructor(public router:Router) {
    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
    this.selectedTimeSlot = localStorage.getItem(Constants.SELECTED_TIME_SLOT)
   
    this.timeSlot = this.router.getCurrentNavigation().extras.state.time

      }
      
      this.object = JSON.parse(localStorage.getItem(Constants.USER_OBJECT))
      if(this.object){
        this.userSelectedTimeSlot = this.object.selectedTimeSlot;

      }
      if(this.timeSlot == this.userSelectedTimeSlot){
        this.isButtonShow = true
        this.firstName = this.object.firstName;
        this.lastName = this.object.lastName;
        this.phoneNumber = Number(this.object.mobileNumber);
        this.imagUrl = this.object.img
      }
   }

  ngOnInit() {
  }
  validationClick(){
    if(!this.firstName){
      this.alertMsg = "Please Enter First Name"
      setTimeout(()=>{
        this.alertMsg = ""
      },2000)
      return;
    }
    if(!this.phoneNumber){
      setTimeout(()=>{
        this.alertMsg = ""
      },2000)
      this.alertMsg = "Please Enter Phone Number"
      return;
    }
    this.submitClick()
  }
  submitClick(){
    let user_object = {
      firstName:this.firstName,
      lastName:this.lastName,
      mobileNumber:this.phoneNumber,
      selectedTimeSlot:this.timeSlot,
      img:this.imagUrl
    }
    localStorage.setItem(Constants.USER_OBJECT,JSON.stringify(user_object));
    localStorage.setItem(Constants.SELECTED_TIME_SLOT,this.timeSlot);

    this.router.navigate(['/'])
  }
  cancleClick(){
    this.router.navigate(['/'])

  }
  editClick(){
    this.isReadOnly = true
  }
  imageClick(event){
    if (event && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload =  this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
  }
  handleReaderLoaded(e) {
    this.imagUrl = ('data:image/png;base64,' + btoa(e.target.result));
  }
}
