import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

	public posts$: Observable<PostI>;

	constructor(private route: ActivatedRoute, private postSvc: PostService, private _sanitizer: DomSanitizer) { }
		
	  
	ngOnInit() {
	  	const idPost = this.route.snapshot.params.id;
	  	this.posts$ = this.postSvc.getOnePost(idPost);

	}

	getVideoIframe(url) {
	    var video, results;
	 
	    if (url === null) {
	        return '';
	    }
	    results = url.match('[\\?&]v=([^&#]*)');
	    video   = (results === null) ? url : results[1];
	 
	    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
	}

	newTabLink(url){
		window.open(url, '_blank');
	}
	

}
