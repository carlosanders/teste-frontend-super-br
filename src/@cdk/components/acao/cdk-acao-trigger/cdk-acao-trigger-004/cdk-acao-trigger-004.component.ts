import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {Acao, DocumentoAvulso, EspecieTarefa, ModalidadeAcaoEtiqueta, Pagination, Pessoa} from '../../../../models';
import {FormBuilder, FormGroup} from '@angular/forms';

// @ts-ignore
@Component({
    selector: 'cdk-acao-trigger-004',
    templateUrl: './cdk-acao-trigger-004.component.html',
    styleUrls: ['./cdk-acao-trigger-004.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger004Component implements OnInit, OnDestroy {

    @Input()
    mode = 'trigger-etiqueta';

    @Input()
    pessoaDestino: Pessoa;

    @Input()
    mecanismoRemessa: string = 'interna';

    @Input()
    documentoAvulso: DocumentoAvulso;

    @Input()
    especieTarefa: EspecieTarefa;

    @Input()
    prazoCriteriaList: [];

    @Input()
    logEntryPagination: Pagination;

    @Input()
    setorDestinoPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    valid = true;

    @Input()
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;

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
        this.modeloPaginationAndx = [{'documento.tipoDocumento.nome': 'eq:OFÍCIO'}];
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

    submit(values): void {
        values['modalidadeAcaoEtiqueta'] = this.modalidadeAcaoEtiqueta;
        this.save.emit(values);
    }

    doGerirPessoaDestino(): void {
        this.gerirPessoaDestino.emit();
    }

    doEditPessoaDestino(pessoaId: number): void {
        this.editPessoaDestino.emit(pessoaId);
    }

}
