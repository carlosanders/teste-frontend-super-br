import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy, OnInit,
    ViewEncapsulation,
    OnChanges, SimpleChange, EventEmitter, Output
} from '@angular/core';

import {Observable} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {Router} from "@angular/router";
import {Acao, DocumentoAvulso, EspecieTarefa, Pagination, Pessoa, Processo} from "../../../../models";
import {FormBuilder, FormGroup} from "@angular/forms";

// @ts-ignore
@Component({
    selector: 'cdk-acao-trigger-004',
    templateUrl: './cdk-acao-trigger-004.component.html',
    styleUrls: ['./cdk-acao-trigger-004.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger004Component implements OnInit, OnDestroy, OnChanges {

    processo$: Observable<Processo>;

    processo: Processo;

    isSaving$: Observable<boolean>;

    errors$: Observable<any>;

    @Input()
    mode = 'trigger-etiqueta';

    @Input()
    pessoaDestino: Pessoa;

    @Input()
    documentoAvulso: DocumentoAvulso;

    @Input()
    especieTarefa: EspecieTarefa;

    @Input()
    prazoCriteriaList: [];

    @Input()
    logEntryPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    valid = true;

    @Input()
    destinatarios = [];

    @Input()
    modeloPaginationAndx: any;

    @Output()
    gerirPessoaDestino = new EventEmitter();

    @Output()
    editPessoaDestino = new EventEmitter<number>();

    @Output()
    save = new EventEmitter<Acao>();

    @Output()
    abort = new EventEmitter<any>();

    routerState: any;

    form: FormGroup;
    activeCard: string = 'form';

    especieDocumentoAvulsoPagination: Pagination;
    setorDestinoPagination: Pagination;
    modeloPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
        this.prazoCriteriaList = [];
        this.especieDocumentoAvulsoPagination = new Pagination();
        this.setorDestinoPagination = new Pagination();
        this.modeloPagination = new Pagination();
        this.modeloPaginationAndx = [{'populate': 'eq:OFÍCIO'}];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.mecanismoRemessa = 'interna';
        this.documentoAvulso.processo = this.processo;
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    submit($values): void {
        this.save.emit($values);
    }


    doGerirPessoaDestino(): void {
        this.gerirPessoaDestino.emit();
    }

    doEditPessoaDestino(pessoaId: number): void {
        this.editPessoaDestino.emit(pessoaId);
    }

}
