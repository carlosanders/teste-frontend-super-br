import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Juntada, Pagination, Processo, VinculacaoDocumento} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {getProcesso} from '../../store';

@Component({
    selector: 'processo-view-vinculacao-documento',
    templateUrl: './vinculacao-documento.component.html',
    styleUrls: ['./vinculacao-documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoDocumentoComponent implements OnInit, OnDestroy {

    vinculacaoDocumento: VinculacaoDocumento;

    juntada$: Observable<Juntada>;
    juntadaByDocumentoId: Juntada;
    juntada: Juntada;
    juntadaVinculada$: Observable<Juntada>;
    juntadaVinculada: Juntada;
    processo$: Observable<Processo>;
    processo: Processo;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    modalidadeVinculacaoDocumentoPagination: Pagination;
    documentoVinculadoPagination: Pagination;

    routerState: any;

    displayedColumns = ['juntadaAtual.id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.ProcessoViewVinculacaoDocumentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));
        this.juntadaVinculada$ = this._store.pipe(select(fromStore.getJuntadaVinculada));
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
            'tipoDocumento.especieDocumento',
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
            filter(juntada => !!juntada),
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntada) => {
            this.juntada = juntada;
            this.vinculacaoDocumento = new VinculacaoDocumento();
            this.vinculacaoDocumento.documento = this.juntada.documento;

            this.documentoVinculadoPagination.filter['id'] = 'neq:' + this.juntada.documento.id;
            this._changeDetectorRef.detectChanges();
        });

        this.processo$.pipe(
            filter(processo => !!processo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
            this.documentoVinculadoPagination.filter['juntadaAtual.volume.processo.id'] = 'eq:' + processo.id;
        });

        this.juntadaVinculada$.pipe(
            filter(juntada => !!juntada),
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntada) => {
            this.juntadaVinculada = juntada;
            this._changeDetectorRef.detectChanges();
        });
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

    changeDocumentoVinculado(documentoVinculadoId: number): void {
        this._store.pipe(
            select(fromStore.getJuntadaByDocumentoVinculadoId(documentoVinculadoId)),
            filter(juntada => !!juntada),
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntada) => {
            this.juntadaByDocumentoId = juntada;
        });
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.split('vincular/' + this.routerState.params.juntadaHandle)[0]]).then();
    }

    submit(values): void {
        const vinculacaoDocumento = new VinculacaoDocumento();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoDocumento[key] = value;
            }
        );

        let juntadaVinculadaId = this.juntadaByDocumentoId?.id;

        vinculacaoDocumento.documento = this.juntada.documento;
        if (this.juntadaVinculada) {
            vinculacaoDocumento.documentoVinculado = this.juntadaVinculada.documento;
            juntadaVinculadaId = this.juntadaVinculada.id;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVinculacaoDocumento({
            vinculacaoDocumento: vinculacaoDocumento,
            juntada: this.juntada,
            processoId: this.processo.id,
            juntadaVinculadaId: juntadaVinculadaId,
            operacaoId: operacaoId
        }));

    }
}
