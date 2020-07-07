import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentI } from '../../../shared/models/comment.interface';
import { CommentService } from './../../posts/comment.service';
import { Observable } from 'rxjs';

declare var jQuery:any;
declare var $:any;
declare var dateStr:string;

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

	@Input() postIdentifier: any = {};

	public comments$: Observable<CommentI[]>;
	constructor(private commentSvc: CommentService) { }

	  public newCommentForm = new FormGroup({
	    nombrePost: new FormControl('', Validators.required),
	    comentarioPost: new FormControl('', Validators.required),
	    datePost: new FormControl(''),
	    idPost: new FormControl(''),
	    titlePost: new FormControl(''),
	  });
	ngOnInit(): void {
		this.comments$ = this.commentSvc.getAllComments();	
	}
	dateManagement(month, day, year){
		//console.log(year+ "-" + month + "-" + day);
		if(month < 10){
			var month_fix = "0" + month;
			 month = month_fix;
			 
		}
		if(day < 10){
			var day_fix = "0" + day;
			 day = day_fix;
		}

		var dateStr_fix = year+ "-" + month + "-" + day  ;
		return(dateStr_fix);

	}
	addNewComment(data: CommentI) {
		var id = $('#id-from-post').val();
		data.idPost = id;

		var title = $('#title-from-post').text();
		data.titlePost = title;
		let date = new Date();        
		let dateStrMonth = date.getMonth() + 1;
		let dateStrDay = date.getDate();        
		let dateStrYear = date.getFullYear();	
		//let dateStr = dateStrYear+ "-" + dateStrMonth + "-" + dateStrDay  ;
		let dateFix = this.dateManagement(dateStrMonth, dateStrDay, dateStrYear);
		data.datePost = dateFix;
		this.commentSvc.saveComment(data);
		$('#nombre-comment').val('');
		$('#comentario-comment').val('');
	}



}
