import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { CommentI } from '../../shared/models/comment.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  /*Creo que con la siguiente línea de código es con la que nos conectamos a la bbdd y nos devuelve los campos que estén definidos en la interface o modelo comments*/
  private commentsCollection: AngularFirestoreCollection<CommentI>;
  constructor( private afs: AngularFirestore, private storage: AngularFireStorage) { 
  	this.commentsCollection = afs.collection<CommentI>('comments', ref => ref.orderBy('datePost', 'desc'));
  }

  public getAllComments(): Observable<CommentI[]> {
    return this.commentsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as CommentI;
            const id = a.payload.doc.id;

            return { id, ...data};
           
          })
          
        )
        
      );
  }  

  public saveComment(comment: CommentI) {
    const commentObj = {
      nombrePost: comment.nombrePost,
      comentarioPost: comment.comentarioPost,
      datePost: comment.datePost,
      idPost: comment.idPost,
      titlePost: comment.titlePost,
    };

      return this.commentsCollection.add(commentObj);

  }

}
