import { Component } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/app/environments/environment';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allMoments: Moment[] = [];
  moments: Moment[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearchengin = faSearchengin;
  searchTerm: string = '';


  constructor(private momentService: MomentService){}

  ngOnInit(): void{
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR');
      });

      this.allMoments = data;
      this.moments = data;
    });    
  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter( (moment) => {
      return moment.title.toLowerCase().includes(value);
    });    
  }
  

}
