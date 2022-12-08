import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Moment } from 'src/app/Moment'
import { environment } from 'src/app/environments/environment';
import { faTimesCircle, faEdit } from '@fortawesome/free-regular-svg-icons';

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

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe( (item) => (this.moment = item.data));
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!");
    
    this.router.navigate(['/']);
  }
}
