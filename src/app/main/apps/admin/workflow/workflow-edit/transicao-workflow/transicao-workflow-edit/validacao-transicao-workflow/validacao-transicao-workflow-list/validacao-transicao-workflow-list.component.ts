import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../../../../../@cdk/utils';

@Component({
    selector: 'validacao-transicao-workflow-list',
    templateUrl: './validacao-transicao-workflow-list.component.html',
    styleUrls: ['./validacao-transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ValidacaoTransicaoWorkflowListComponent implements OnInit, OnDestroy {

    routerState: any;
    validacoes$: Observable<ValidacaoTransicaoWorkflow[]>;
    validacoes: ValidacaoTransicaoWorkflow[] = [];
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

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

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.validacoes$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(validacoes => !!validacoes)
        ).subscribe(validacoes => this.validacoes = validacoes);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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

    delete(validacaoTransicaoWorkflowId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteValidacao({
            validacaoTransicaoWorkflowId: validacaoTransicaoWorkflowId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }
}
