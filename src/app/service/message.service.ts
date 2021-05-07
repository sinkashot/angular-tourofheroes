import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];  //template 바인딩되므로 public

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}
