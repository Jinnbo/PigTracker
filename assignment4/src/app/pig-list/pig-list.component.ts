import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PigService } from '../pig.service';
import { Pig } from '../Pig';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {
  
  public pigs;
  form: FormGroup;
  
  public pigInfoName: string;
  public pigInfoLocation: string;
  public pigInfoLatitude: string;
  public pigInfoLongitude: string;
  public pigInfoPhoneNumber: string;
  public pigInfoPigInfo: string;
  public pigInfoExtraNotes: string;
  public pigInfoDate: string;
  public pigInfoStatus: string;

  // Password Variables
  password: boolean = false;
  incorrectPassword = '';

  // Sorting variables
  locationSort = `<i class="bi bi-sort-alpha-down"></i>`;
  locationFlag = true;
  nameSort = `<i class="bi bi-sort-alpha-down"></i>`;
  nameFlag = true;
  timeSort = `<i class="bi bi-sort-numeric-down"></i>`;
  timeFlag = true;
  statusSort = `<i class="bi bi-sort-alpha-down"></i>`;
  statusFlag = true;

  constructor(private ps: PigService,private modalService: NgbModal){
    this.pigs = [];    
    let formControls = {
      password: new FormControl('',[
				Validators.required
			]),
		}
		this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.ps.refreshNeeded$.subscribe(()=>{
      this.ps.getPigs().subscribe((data:any)=>{
        this.pigs = data
      })
    })
    this.ps.getPigs().subscribe((data:any)=>{
      this.pigs = data
    })
  }
  
  tempObj;
  openModal(content,values,modalType: string){
    this.form.reset();
    this.incorrectPassword = '';
    this.setValues(values);
    this.tempObj = values;
    this.modalService.open(content, {ariaLabelledBy: `${modalType}`}).result;
  }
  
  setValues(values){
    this.pigInfoName = values.name;
    this.pigInfoPhoneNumber = values.phoneNumber;
    this.pigInfoPigInfo = values.pigInfo;
    this.pigInfoLocation = values.location;
    this.pigInfoExtraNotes = values.extraNote;
    this.pigInfoDate = values.timeReported;
    this.pigInfoStatus = values.status;
    this.pigInfoLatitude = parseFloat(values.latitude).toFixed(10);
    this.pigInfoLongitude = parseFloat(values.longitude).toFixed(10);
  }
  
  // Change status
  onSubmitStatus(values){
    if (this.password){
      this.ps.changeStatus(this.tempObj,this.pigInfoDate);
    }
  }

  // Delete Pig 
  onSubmit(values){
    if (this.password){
      this.ps.deletePig(this.pigInfoName);
    }
	}

  // Reset Form
  formReset(){
		this.form.reset();
	}

  // Check if password is correct
  checkPassword(content,form){

    let actual: string = form.value;
    let expected: string = "OINK!!";

    if (actual === expected){
      this.modalService.dismissAll();   
      this.password = true;   
    }
    else{
      this.incorrectPassword = '<div class="text-danger">Incorrect Password</div>';
      this.password = false;   
    }
  }

  sortbyLocation(){
    if (this.locationFlag){
      this.locationSort = '<i class="bi bi-sort-alpha-down"></i>';
      this.locationFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].location < pig2.data[0].location) return 1;
        if (pig1.data[0].location > pig2.data[0].location) return -1;
        return 0;
      })
    }
    else{
      this.locationSort = `<i class="bi bi-sort-alpha-up"></i>`;
      this.locationFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].location > pig2.data[0].location) return 1;
        if (pig1.data[0].location < pig2.data[0].location) return -1;
        return 0;
      })
    }
  }

  sortbyName(){
    if (this.nameFlag){
      this.nameSort = '<i class="bi bi-sort-alpha-down"></i>';
      this.nameFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].name < pig2.data[0].name) return 1;
        if (pig1.data[0].name > pig2.data[0].name) return -1;
        return 0;
      })
    }
    else{
      this.nameSort = `<i class="bi bi-sort-alpha-up"></i>`;
      this.nameFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].name > pig2.data[0].name) return 1;
        if (pig1.data[0].name < pig2.data[0].name) return -1;
        return 0;
      })
    }
  }
  
  sortbyTime(){
    if (this.timeFlag){
      this.timeSort = '<i class="bi bi-sort-numeric-down"></i>';
      this.timeFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].timeReported < pig2.data[0].timeReported) return 1;
        if (pig1.data[0].timeReported > pig2.data[0].timeReported) return -1;
        return 0;
      })
    }
    else{
      this.timeSort = `<i class="bi bi-sort-numeric-up"></i>`;
      this.timeFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].timeReported > pig2.data[0].timeReported) return 1;
        if (pig1.data[0].timeReported < pig2.data[0].timeReported) return -1;
        return 0;
      })
    }
  }

  sortbyStatus(){
    if (this.statusFlag){
      this.statusSort = '<i class="bi bi-sort-alpha-down"></i>';
      this.statusFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].status < pig2.data[0].status) return 1;
        if (pig1.data[0].status > pig2.data[0].status)return -1;
        return 0;
      })
    }
    else{
      this.statusSort = `<i class="bi bi-sort-alpha-up"></i>`;
      this.statusFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].status > pig2.data[0].status) return 1;
        if (pig1.data[0].status < pig2.data[0].status) return -1;
        return 0;
      })
    }
  }
} 