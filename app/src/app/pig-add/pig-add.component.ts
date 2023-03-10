import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { PigService } from '../pig.service';
import { PigListComponent } from '../pig-list/pig-list.component';

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit{
	closeResult = '';
	form: FormGroup;
	
	constructor(private modalService: NgbModal, private ps: PigService) {
		
		let formControls = {
			name: new FormControl('',[
				Validators.required,
				this.whiteSpaceValidator
			]),
			phoneNumber: new FormControl('',[
				Validators.required,
				Validators.minLength(10)
			]),
			breed: new FormControl('',[
				Validators.required
			]),
			pigID: new FormControl('',[
				Validators.required,
				Validators.pattern("^[0-9]*$")
			]),
			location: new FormControl('',[
				Validators.required,
				this.locationValidator
			]),
			extraNote: new FormControl('',[
				Validators.required,
			])
		}

		this.form = new FormGroup(formControls);
	}

	whiteSpaceValidator(control: FormControl){

		if (control.value != null){
			if (control.value.indexOf(' ') >= 0){
				return { invalidFormat: {message: "No spaces"}};
			}
			else return null;
		}

		return null;
	}


	locationValidator(control: FormControl){

		if (control.value != null){	
			let tempLocation = control.value.split(",",3);

			var regExp = /[a-zA-Z]/g;

			if (regExp.test(tempLocation[1])){
				return { invalidFormat: {message: "No letters in Longitude"}};
			}
			if (regExp.test(tempLocation[2])){
				return { invalidFormat: {message: "No letters in Latitude"}};
			}
			if (isNaN(parseFloat(tempLocation[0])) && (!isNaN(parseFloat(tempLocation[1]))) && (!isNaN(parseFloat(tempLocation[2])))){
				return null;
			}	
		}

		return { invalidFormat: {message: "No spaces"}};
		
	}
  
	open(content: any) {
		this.form.reset();
		this.modalService.open(content, { ariaLabelledBy: 'addModal' }).result;
	}

	onSubmit(values){
		this.ps.addPigs(values);
		this.form.reset();
	}

	ngOnInit(): void {
	}
}
