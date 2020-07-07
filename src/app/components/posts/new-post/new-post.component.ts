import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { CommentI } from '../../../shared/models/comment.interface';
import { PostService } from '../post.service';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
	private image: any;
  constructor(private postSvc: PostService) { }

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
    videoUrl: new FormControl('', Validators.required),
    datePost: new FormControl('', Validators.required),
    downloadLinkPost: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  addNewPost(data: PostI) {
    this.postSvc.preAddAndUpdatePost(data, this.image);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

}
