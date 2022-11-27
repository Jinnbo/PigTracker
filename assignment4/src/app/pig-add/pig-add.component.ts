import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
		this.ps.addPigs(values);
	}

	formReset(){
		this.form.reset();
	}

	ngOnInit(): void {
	}

}
