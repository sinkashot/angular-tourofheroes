import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Crisis } from '../../crisis';
import { CrisisService } from '../crisis.service';
import { MessageService } from '../../service/message.service';



@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  // selectedCrisis: Crisis;

  crisises : Crisis[];
  
  crisises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private crisisService: CrisisService, 
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCrisises();
  }

  // onSelect(crisis: Crisis): void {
  //   this.selectedCrisis = crisis;
  //   this.messageService.add('CrisisesComponent: Selected crisis id='+crisis.id);
  // }

  // getCrisises(): void {
  //   this.crisises = this.crisisService.getCrisises();
  // }

  getCrisises() : void {
    // this.crisisService.getCrisises().subscribe(crisises => this.crisises = crisises);

    this.crisises$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.crisisService.getCrisises();
      })
    );
  }

}
