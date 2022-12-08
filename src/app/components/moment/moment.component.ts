import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { faTimesCircle, faEdit } from '@fortawesome/free-regular-svg-icons';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { environment } from 'src/app/environments/environment';
import { Moment } from 'src/app/Moment'
import { Comment } from 'src/app/Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimesCircle = faTimesCircle;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private commentService: CommentService
  ) {}

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe( (item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("",[Validators.required]),
      username: new FormControl("",[Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!");
    
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return;
    }

    const data: Comment = this.commentForm.value;
    
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment)=> this.moment!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado!");

    this.commentForm.reset();
    formDirective.resetForm();
  }
}
