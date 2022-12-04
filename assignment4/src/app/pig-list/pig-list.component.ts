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
  public pigInfoExtraNotes: string;
  public pigInfoDate: string;
  public pigInfoStatus: string;
  public pigInfoID: string;
  public pigInfoBreed: String;

  // Password Variables
  password: boolean = false;
  incorrectPassword = '';

  // Sorting variables
  locationSort = `<i class="bi bi-sort-alpha-up"></i>`;
  locationFlag = true;
  nameSort = `<i class="bi bi-sort-alpha-up"></i>`;
  nameFlag = true;
  timeSort = `<i class="bi bi-sort-numeric-up"></i>`;
  timeFlag = true;
  statusSort = `<i class="bi bi-sort-alpha-up"></i>`;
  statusFlag = true;

  constructor(private ps: PigService,private modalService: NgbModal,private http: HttpClient){
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
    this.pigInfoLocation = values.location;
    this.pigInfoExtraNotes = values.extraNote;
    this.pigInfoDate = values.timeReported;
    this.pigInfoStatus = values.status;
    this.pigInfoID = values.id;
    this.pigInfoBreed = values.breed;
    this.pigInfoLatitude = parseFloat(values.latitude).toFixed(10);
    this.pigInfoLongitude = parseFloat(values.longitude).toFixed(10);
  }
  
  // Change status
  onSubmitStatus(form){
    
    // Get user Input
    let userInput = form.value;
    let pass = "84892b91ef3bf9d216bbc6e88d74a77c";

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value='+userInput)
    .subscribe((data: any)=>{

      let hashedPassword = data.Digest;

      if (pass === hashedPassword){
        this.modalService.dismissAll();
        this.ps.changeStatus(this.tempObj,this.pigInfoDate,this.pigInfoID);
      }
      else{
        this.incorrectPassword = '<div class="text-danger">Incorrect Password</div>';
      }
    })
  }

  // Delete pig
  onSubmitDelete(form){

    // Get user Input
    let userInput = form.value;
    let pass = "84892b91ef3bf9d216bbc6e88d74a77c";    

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value='+userInput)
    .subscribe((data: any)=>{

      let hashedPassword = data.Digest;

      if (pass === hashedPassword){
        this.modalService.dismissAll();
        this.ps.deletePig(this.tempObj.name);
      }
      else{
        this.incorrectPassword = '<div class="text-danger">Incorrect Password</div>';
      }
    })
  }


  // Reset Form
  formReset(){
		this.form.reset();
	}

  sortbyLocation(){
    if (this.locationFlag){
      this.locationSort = '<i class="bi bi-sort-alpha-down"></i>';
      this.locationFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].location.toLowerCase() < pig2.data[0].location.toLowerCase()) return 1;
        if (pig1.data[0].location.toLowerCase() > pig2.data[0].location.toLowerCase()) return -1;
        return 0;
      })
    }
    else{
      this.locationSort = `<i class="bi bi-sort-alpha-up"></i>`;
      this.locationFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].location.toLowerCase() > pig2.data[0].location.toLowerCase()) return 1;
        if (pig1.data[0].location.toLowerCase() < pig2.data[0].location.toLowerCase()) return -1;
        return 0;
      })
    }
  }

  sortbyName(){
    if (this.nameFlag){
      this.nameSort = '<i class="bi bi-sort-alpha-down"></i>';
      this.nameFlag = false;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].name.toLowerCase() < pig2.data[0].name.toLowerCase()) return 1;
        if (pig1.data[0].name.toLowerCase() > pig2.data[0].name.toLowerCase()) return -1;
        return 0;
      })

    }
    else{
      this.nameSort = `<i class="bi bi-sort-alpha-up"></i>`;
      this.nameFlag = true;
      this.pigs.sort((pig1,pig2) =>{
        if (pig1.data[0].name.toLowerCase() > pig2.data[0].name.toLowerCase()) return 1;
        if (pig1.data[0].name.toLowerCase() < pig2.data[0].name.toLowerCase()) return -1;
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