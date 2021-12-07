import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter, OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pessoa, VinculacaoPessoaUsuario} from '@cdk/models';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState} from '../../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'vinculacao-pessoa-usuario-list',
    templateUrl: './vinculacao-pessoa-usuario-list.component.html',
    styleUrls: ['./vinculacao-pessoa-usuario-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoPessoaUsuarioListComponent implements OnInit, OnDestroy {

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() select: EventEmitter<VinculacaoPessoaUsuario> = new EventEmitter();

    routerState: any;
    pessoas$: Observable<VinculacaoPessoaUsuario[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VinculacaoPessoaUsuarioListAppState>,
    ) {
        this.pessoas$ = this._store.pipe(select(fromStore.getVinculacaoPessoaUsuarioList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
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
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVinculacaoPessoaUsuario({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    delete(pessoaId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVinculacaoPessoaUsuario({
            vinculacaoPessoaUsuarioId: pessoaId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    doSelect(pessoa: VinculacaoPessoaUsuario): void {
        this.select.emit(pessoa);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'criar')]).then();
    }

}
