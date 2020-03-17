import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Classificacao, Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';

@Component({
    selector: 'arquivista-classificacao',
    templateUrl: './arquivista-classificacao.component.html',
    styleUrls: ['./arquivista-classificacao.component.scss']
})
export class ArquivistaClassificacaoComponent {

    //
    // isSaving$: Observable<boolean>;
    // errors$: Observable<any>;
    //
    // processo$: Observable<Processo>;
    // processo: Processo;
    // public processoId: number;
    //
    // modalidadeTransicaoPagination: Pagination;
    //
    // private transicao$: Observable<Transicao>;
    // transicao: Transicao;
    // private routerState: RouterStateUrl;
    //
    // constructor(
    //     private _store: Store<fromStore.ArquivistaClassificacaoAppState>
    // ) {
    //     this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
    //     this.errors$ = this._store.pipe(select(fromStore.getErrors));
    //     this.modalidadeTransicaoPagination = new Pagination();
    // }
    //
    // ngOnInit(): void {
    //     this._store
    //         .pipe(select(getRouterState))
    //         .subscribe(routerState => {
    //             if (routerState) {
    //                 this.routerState = routerState.state;
    //             }
    //         });
    //     this.processoId = this.routerState.params.processoHandle;
    // }
    //
    // submit(values): void {
    //     const classificacao = new Classificacao();
    //
    //     Object.entries(values).forEach(
    //         ([key, value]) => {
    //             classificacao[key] = value;
    //         }
    //     );
    //
    //     this._store.dispatch(new fromStore.SaveClassificacao(classificacao));
    //
    // }
}
