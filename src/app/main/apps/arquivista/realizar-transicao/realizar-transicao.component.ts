import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Processo} from "../../../../../@cdk/models";

@Component({
    selector: 'app-realizar-transicao',
    templateUrl: './realizar-transicao.component.html',
    styleUrls: ['./realizar-transicao.component.scss']
})
export class RealizarTransicaoComponent implements OnInit {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    constructor(

    ) {

    }

    ngOnInit(): void {
    }

}
