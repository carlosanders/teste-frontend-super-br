import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'validacao-transicao-workflow-list',
    templateUrl: './validacao-transicao-workflow-list.component.html',
    styleUrls: ['./validacao-transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ValidacaoTransicaoWorkflowListComponent implements OnInit {

    routerState: any;
    validacoes$: Observable<ValidacaoTransicaoWorkflow[]>;
    validacoes: ValidacaoTransicaoWorkflow[] = [];
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowListAppState>,
    ) {
        this.validacoes$ = this._store.pipe(select(fromStore.getValidacaoList));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.validacoes$.pipe(
            filter(validacoes => !!validacoes)
        ).subscribe(
            validacoes => this.validacoes = validacoes
        );
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetValidacoes(params));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetValidacoes({
            filter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            context: params.context
        }));
    }

    delete(validacaoTransicaoWorkflowId: number): void {
        this._store.dispatch(new fromStore.DeleteValidacao(validacaoTransicaoWorkflowId));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
