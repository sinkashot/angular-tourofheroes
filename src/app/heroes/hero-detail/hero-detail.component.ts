import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero : Hero;
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.heroService.getHero(id).subscribe(hero => this.hero = hero);

    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.heroService.getHero(Number(params.get('id'))))
    );
  }

  goBack(): void {
    this.location.back();
  }

  goToHeroes(hero: Hero) {
    // this.router.navigate(['/heroes']);

    const heroId = hero ? hero.id : null;
    console.log(heroId);
    
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
