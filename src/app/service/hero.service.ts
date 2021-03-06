import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private herosUrl = 'api/heroes';
  // private herosUrl = 'http://localhost:8080/members';

  httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // getHeroes() : Hero[] {
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);

    return this.http.get<Hero[]>(this.herosUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));

    const url = `${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.herosUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    console.log("[log] hero : "+hero);
    
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`Hero Service: ${message}`);
  }
  
  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      // TODO: ????????? ????????? ?????? ????????? ?????????
      console.error(error); // ????????? ????????? ????????? ???????????????.

      // TODO: ???????????? ????????? ??? ?????? ????????? ????????????
      this.log(`${operation} failed: ${error.message}`);
      
      // ?????????????????? ????????? ????????? ????????? ??????????????? ?????? ????????? ???????????????.
      return of(result as T);
    };
  }
}
