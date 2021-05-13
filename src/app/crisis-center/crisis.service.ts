import { Injectable } from '@angular/core';
import { Crisis } from '../crisis';
import { CRISISES } from './mock-crisis';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  private crisissUrl = 'api/cisises';
  // private crisissUrl = 'http://localhost:8080/members';

  httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // getCrisises() : Crisis[] {
  //   return CRISISES;
  // }

  getCrisises(): Observable<Crisis[]> {
    this.messageService.add('CrisisService: fetched crisises');
    return of(CRISISES);

    // return this.http.get<Crisis[]>(this.crisissUrl)
    //   .pipe(
    //     tap(_ => this.log('fetched crisises')),
    //     catchError(this.handleError<Crisis[]>('getCrisises', []))
    //   );
  }

  getCrisis(id: number): Observable<Crisis> {
    this.messageService.add(`CrisisService: fetched crisis id=${id}`);
    return of(CRISISES.find(crisis => crisis.id === id));

    // const url = `${this.crisissUrl}/${id}`;
    // return this.http.get<Crisis>(url)
    //   .pipe(
    //     tap(_ => this.log(`fetched crisis id=${id}`)),
    //     catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
    //   );
  }

  private log(message: string) {
    this.messageService.add(`Crisis Service: ${message}`);
  }
  
  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);
      
      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}
