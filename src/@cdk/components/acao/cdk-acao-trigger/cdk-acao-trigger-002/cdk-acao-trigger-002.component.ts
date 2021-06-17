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
import {Acao, ModalidadeAcaoEtiqueta, Pagination, Setor, Tarefa, Usuario} from '../../../../models';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-acao-trigger-002',
    templateUrl: './cdk-acao-trigger-002.component.html',
    styleUrls: ['./cdk-acao-trigger-002.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger002Component implements OnInit, OnDestroy {

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    unidadeResponsavel: Setor;

    @Input()
    setorResponsavel: Setor;

    @Input()
    usuarioResponsavel: Usuario;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;

    @Output()
    save = new EventEmitter<Acao>();

    @Output()
    abort = new EventEmitter<any>();

    tarefa: Tarefa;
    form: FormGroup;
    formState: string = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    cancel(): void {
        this.formState = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    submit(values): void {
        values['modalidadeAcaoEtiqueta'] = this.modalidadeAcaoEtiqueta;
        this.save.emit(values);
    }
}
