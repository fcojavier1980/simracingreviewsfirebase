import { PostService } from './../../posts/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostI } from '../../../shared/models/post.interface'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
 
  public posts$: Observable<PostI[]>;
  constructor(private postSvc: PostService) { }

  ngOnInit(){
  	//this.postSvc.getAllPosts().subscribe(res => console.log('POSTS', res));
  	this.posts$ = this.postSvc.getAllPosts();
  }

}
