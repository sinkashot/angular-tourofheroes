import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../../service/hero.service';
import { MessageService } from '../../service/message.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  // selectedHero: Hero;

  heroes : Hero[];
  
  heroes$: Observable<Hero[]>;
  selectedId: number;

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add('HeroesComponent: Selected hero id='+hero.id);
  // }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes() : void {
    // this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);

    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.heroService.getHeroes();
      })
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return alert('need input name.');
    }
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
