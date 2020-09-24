import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {Observable, Subject} from 'rxjs';
import {Processo} from '../../../../../@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../@cdk/animations';

@Component({
    selector: '<span class="mr-4 ml-4">/</span>arquivista-classificacao-edit',
    templateUrl: './arquivista-classificacao-edit.component.html',
    styleUrls: ['./arquivista-classificacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaClassificacaoEditComponent implements OnInit {

    processoId: number;
    private routerState: RouterStateUrl;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;
    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(
        private _store: Store<fromStore.ArquivistaClassificacaoAppState>
    ) {
        this.constructObservables();
        this.initRouteState();
    }

    ngOnInit(): void {
        this.processoId = this.routerState.params.processoHandle;
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe(processos => {
            this.processos = processos;
        });
    }

    constructObservables(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
    }

    initRouteState(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    submit(values: any): void {
        this._store.dispatch(new fromStore.SaveArquivistaClassificacao({
            values,
            changes: {classificacao: values.processo.classificacao}
        }));
    }
}
