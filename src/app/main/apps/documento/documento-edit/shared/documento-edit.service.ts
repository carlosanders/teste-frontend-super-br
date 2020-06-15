import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentoEditService {

    private messageSource = new BehaviorSubject<string>('atividade');
    activeCard = this.messageSource.asObservable();

  constructor() { }

  doChangeCard(changeCard: string) {
      this.messageSource.next(changeCard)
  }
}
