import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Crisis } from '../../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private crisisService: CrisisService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.crisisService.getCrisis(id).subscribe(crisis => this.crisis = crisis);

    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.crisisService.getCrisis(Number(params.get('id'))))
    );
  }

  goBack(): void {
    this.location.back();
  }

  goToCrisis(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    console.log(crisisId);

    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], {relativeTo: this.route});
  }

}
