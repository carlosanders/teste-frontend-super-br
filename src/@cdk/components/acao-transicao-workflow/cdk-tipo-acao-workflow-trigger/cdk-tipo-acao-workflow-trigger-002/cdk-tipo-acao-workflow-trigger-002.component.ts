import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {Pagination, Setor, Tarefa, TipoAcaoWorkflow, Usuario} from '../../../../models';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-tipo-acao-workflow-trigger-002',
    templateUrl: './cdk-tipo-acao-workflow-trigger-002.component.html',
    styleUrls: ['./cdk-tipo-acao-workflow-trigger-002.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkTipoAcaoWorkflowTrigger002Component implements OnInit, OnDestroy, OnChanges {

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
    tipoAcaoWorkflow: TipoAcaoWorkflow;

    @Output()
    save = new EventEmitter<TipoAcaoWorkflow>();
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
        this.formState = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    submit(values): void {
        values['tipoAcaoWorkflow'] = this.tipoAcaoWorkflow;
        this.save.emit(values);
    }
}
