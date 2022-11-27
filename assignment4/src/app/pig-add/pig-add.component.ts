import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit{
	closeResult = '';
	form: FormGroup;
	
	constructor(private modalService: NgbModal) {

		let formControls = {
			name: new FormControl('',[
				Validators.required,
			]),
			phoneNumber: new FormControl('',[
				Validators.required
			]),
			pigInfo: new FormControl('',[
				Validators.required,
			]),
			location: new FormControl('',[
				Validators.required,
			]),
			extraNote: new FormControl('',[
				Validators.required,
			])
		}

		this.form = new FormGroup(formControls);
	}
  
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
	}

	onSubmit(values){
		console.log(values)
	}

	formReset(){
		this.form.reset();
	}

	ngOnInit(): void {
	}

}
