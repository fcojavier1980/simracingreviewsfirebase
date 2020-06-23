import { PostService } from './../../posts/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostI } from '../../../shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public searchString: string; 
	
	public posts$: Observable<PostI[]>;
	public postsDate$: Observable<PostI[]>;
  	constructor(private postSvc: PostService,  public dialog: MatDialog) { }


  	public searchPostForm = new FormGroup({
    
    	    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
    videoUrl: new FormControl('', Validators.required),
    datePost: new FormControl('', Validators.required),
  	});

	 ngOnInit(){
	  	//this.postSvc.getAllPosts().subscribe(res => console.log('POSTS', res));
	  	this.posts$ = this.postSvc.getAllPosts();
      this.postsDate$ = this.postSvc.getDate();
	}

    cogerElementos(){
    	var cont = 0;
    	$('.articles_found').hide();
    	
    	var search_string = $("#id_buscador").val();
    	var titulos = $(".titulo");

        $( titulos ).each(function() {
        	var current_obj = $(this);
  			var titulo = $( this ).text();

  			var is_contain = titulo.toUpperCase().indexOf(search_string.toUpperCase());
  			if(is_contain >= 0 && search_string !=''){
  				$('.last_articles').hide();
  				var contenedor = $(current_obj).parent().parent();
  				$(contenedor).css('display', 'flex');
  				cont++;
  				$('#subheader_last_or_new').text('Artículos encontrados');
  			}else if (search_string ==''){
  				$('.last_articles').show();
  				$('#subheader_last_or_new').text('Últimos artículos');
  			}
  			else{

  			}

  			
		});

		if(cont==0){
		  	Swal.fire({
		      title: 'No se han encontrado resultados',
		      text: `Puedes intentar otra búsqueda más genérica`,
		      icon: 'warning',
		      showCancelButton: false,
		      confirmButtonColor: '#3085d6',
		      cancelButtonColor: '#d33',
		      confirmButtonText: 'Cerrar'
		    });
		    $('#subheader_last_or_new').text('Últimos artículos');
        $('#subheader_last_or_new').css('background-color', 'lemmonchiffon');
		  	$('.last_articles').show();

		}
    }

      
      
      
      
ngAfterViewChecked(){
  var titulos = $(".titulo");

        $( titulos ).each(function() {
          var current_obj = $(this);
        var titulo = $( this ).text();

        
    });
}



}
