import {Component, OnInit} from '@angular/core';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-arquivista-classificacao-edit',
    templateUrl: './arquivista-classificacao-edit.component.html',
    styleUrls: ['./arquivista-classificacao-edit.component.scss']
})
export class ArquivistaClassificacaoEditComponent implements OnInit {

    processoId: number;
    private routerState: RouterStateUrl;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(
        private _store: Store<fromStore.ArquivistaClassificacaoAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.processoId = this.routerState.params.processoHandle;
    }

    ngOnInit(): void {
    }

    submit(values: any): void {
        this._store.dispatch(new fromStore.SaveArquivistaClassificacao({values, changes: {classificacao: values.processo.classificacao}}));
    }
}
