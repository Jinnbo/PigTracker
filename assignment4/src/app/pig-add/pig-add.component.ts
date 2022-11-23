import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent{
  closeResult = '';

	constructor(private modalService: NgbModal) {}
  
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
	}


}
