import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Juntada, Pagination, Processo, VinculacaoDocumento} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Router} from '@angular/router';
import {Back, getRouterState} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {getProcesso} from '../../../store';

@Component({
    selector: 'vinculacao-documento-create',
    templateUrl: './vinculacao-documento-create.component.html',
    styleUrls: ['./vinculacao-documento-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoDocumentoCreateComponent implements OnInit, OnDestroy {

    vinculacaoDocumento: VinculacaoDocumento;

    juntada$: Observable<Juntada>;
    juntada: Juntada;
    processo$: Observable<Processo>;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    modalidadeVinculacaoDocumentoPagination: Pagination;
    documentoVinculadoPagination: Pagination;

    routerState: any;

    displayedColumns = ['juntadaAtual.id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.VinculacaoDocumentoCreateAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.modalidadeVinculacaoDocumentoPagination = new Pagination();
        this.documentoVinculadoPagination = new Pagination();
        this.documentoVinculadoPagination.filter = {
            'juntadaAtual': 'isNotNull',
            'juntadaAtual.ativo': 'eq:1',
            'vinculacoesDocumentos.id': 'isNull',
            'vinculacaoDocumentoPrincipal.id': 'isNull'
        };
        this.documentoVinculadoPagination.populate = [
            'tipoDocumento',
            'juntadaAtual',
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.juntada$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntada) => {
            this.juntada = juntada;
            this.vinculacaoDocumento = new VinculacaoDocumento();
            this.vinculacaoDocumento.documento = this.juntada.documento;

            this.documentoVinculadoPagination.filter['id'] = 'neq:' + this.juntada.documento.id;
        });

        this.processo$.pipe(
            filter(processo => !!processo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.documentoVinculadoPagination.filter['juntadaAtual.volume.processo.id'] = 'eq:' + processo.id;
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const vinculacaoDocumento = new VinculacaoDocumento();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoDocumento[key] = value;
            }
        );

        vinculacaoDocumento.documento = this.juntada.documento;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVinculacaoDocumento({
            vinculacaoDocumento: vinculacaoDocumento,
            operacaoId: operacaoId
        }));
    }

}
