import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy, OnInit,
    ViewEncapsulation,
    OnChanges, SimpleChange, EventEmitter, Output
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from "@angular/router";
import {Acao, Pagination, Setor, Tarefa, Usuario} from "../../../../models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'cdk-acao-trigger-002',
    templateUrl: './cdk-acao-trigger-002.component.html',
    styleUrls: ['./cdk-acao-trigger-002.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger002Component implements OnInit, OnDestroy, OnChanges {
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

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
        this.save.emit(values);
    }
}
