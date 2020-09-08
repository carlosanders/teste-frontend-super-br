import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Juntada, Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {getProcesso} from '../../../store/selectors';

@Component({
    selector: 'juntada-list',
    templateUrl: './juntada-list.component.html',
    styleUrls: ['./juntada-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class JuntadaListComponent implements OnInit {

    routerState: any;
    juntadas$: Observable<Juntada[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    desentranhandoIds$: Observable<any>;
    copiandoIds$: Observable<any>;
    processo$: Observable<Processo>;
    processo: Processo;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.JuntadaListAppState>,
    ) {
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.desentranhandoIds$ = this._store.pipe(select(fromStore.getDesentranhandoIds));
        this.copiandoIds$ = this._store.pipe(select(fromStore.getCopiandoIds));
        this.processo$ = this._store.pipe(select(getProcesso));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
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

    excluded(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetJuntadas(this.pagination));
    }

    desentranhar(): void {
        this.juntadas$.subscribe(juntadas => {
            this._store.dispatch(new fromStore.DesentranharJuntada(juntadas));
        });
    }

    copiar(juntadaId: number[]): void {
        this._store.dispatch(new fromStore.CopiarDocumentoJuntada(juntadaId));
    }

    editar(documentoId: number): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoId + '/editar']).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
