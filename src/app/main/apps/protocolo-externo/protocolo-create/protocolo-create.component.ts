import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Documento, Estado, Pagination, Pessoa, Processo} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getMercureState, getRouterState} from '../../../../store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getPessoa} from '../store/selectors';
import {UpdateData} from '../../../../../@cdk/ngrx-normalizr';
import {documento as documentoSchema } from '@cdk/normalizr/documento.schema';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoaProcedencia$: Observable<Pessoa>;
    pessoaProcedencia: Pessoa;

    unidadePagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    estados$: Observable<Estado[]>;
    estados: Estado[] = [];

    documentos: Documento[] = [];
    documentos$: Observable<Documento[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;

    routerState: any;

    formProcesso: FormGroup;
    javaWebStartOK = false;

    selectedIndex: number;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    /**
     *
     * @param _store
     * @param dialog
     * @param _router
     * @param _formBuilder
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        public dialog: MatDialog,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoaProcedencia$ = this._store.pipe(select(getPessoa));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
        this.estados$ = this._store.pipe(select(fromStore.getEstados));

        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['unidade', 'parent'];
        this.unidadePagination.filter = {parent: 'isNull'};

        this.formProcesso = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            NUP: [null],
            novo: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            titulo: [null],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            outroNumero: [null],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            dataHoraAbertura: [null],
            dataHoraPrazoResposta: [null, [Validators.required]],
            unidadeProtocoloExterno: [null, [Validators.required]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]],
            generoSetor: [null, [Validators.required]],
            especieSetor: [null, [Validators.required]],
            estado: [null, [Validators.required]],
            requerimento: [null, [Validators.required, Validators.maxLength(255)]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(message => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({id: message.content.documentoId, schema: documentoSchema, changes: {assinado: true}}));
                        break;
                }
            }
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe(
            processo => {
                this.processo = processo;
                if (this.processo) {
                    this.formProcesso.value.id = this.processo.id;
                }
                this._changeDetectorRef.markForCheck();
            }
        );

        this.pessoaProcedencia$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(pessoa => !!pessoa)
        ).subscribe(pessoa => {
            this.pessoaProcedencia = pessoa;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documentos => !!documentos)
        ).subscribe(
            documentos => {
                this.documentos = documentos;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.estados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(estados => !!estados)
        ).subscribe(
            estados => {
                this.estados = estados;
            }
        );

        this.assinandoDocumentosId$.subscribe(assinandoDocumentosId => {
            if (assinandoDocumentosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });

        if  (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 2;
            this.processo.tipoProtocolo = 1;
            this.processo.procedencia = this.pessoaProcedencia;
        }

        this.getEstados();
        this.unloadProcesso();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.procedencia = this.pessoaProcedencia;
        processo.titulo = this.formProcesso.get('especieSetor').value.name;

        this._store.dispatch(new fromStore.SaveProcesso(processo));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos({processoOrigem: `eq:${this.processo.id}`}));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    getEstados(): void {
        this._store.dispatch(new fromStore.GetEstados({}));
    }

    unloadProcesso(): void {
        this.selectedIndex = 0;

        if (this.routerState.params.processoHandle) {
            this.selectedIndex = 1;
            this._store.dispatch(new fromStore.UnloadProcesso({reset: true}));
        }
    }
}
