import {Component, OnInit} from '@angular/core';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {Observable} from 'rxjs';
import {Processo} from '../../../../../@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';

@Component({
    selector: 'app-criar-data-prevista-transicao',
    templateUrl: './criar-data-prevista-transicao.component.html',
    styleUrls: ['./criar-data-prevista-transicao.component.scss']
})
export class CriarDataPrevistaTransicaoComponent implements OnInit {


    processo$: Observable<Processo>;
    processo: Processo;
    processoId: number;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.DataPrevistaTransicaoAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngOnInit(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.processoId = this.routerState.params.processoHandle;
    }

    submit(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDataPrevistaTransicao(processo));

    }

}
