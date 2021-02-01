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
import {Acao, Modelo, Pagination} from "../../../../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'cdk-acao-trigger-001',
    templateUrl: './cdk-acao-trigger-001.component.html',
    styleUrls: ['./cdk-acao-trigger-001.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CdkAcaoTrigger001Component implements OnInit, OnDestroy, OnChanges {

    @Input()
    modeloPagination: Pagination;
    @Input()
    saving: boolean;
    @Input()
    errors: any;
    @Input()
    modeloPaginationAndx: any;

    @Output()
    save = new EventEmitter<Acao>();
    @Output()
    abort = new EventEmitter<any>();

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

        this.form = this._formBuilder.group({
            id: [null],
            etiqueta: [null],
            trigger: [
                'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0001',
                [Validators.required]
            ],
            contexto: [null],
            modelo: [null, [Validators.required]]
        });
        this.modeloPaginationAndx = null;
        this.modeloPagination = new Pagination();
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

    checkModelo(): void {
        const value = this.form.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modelo').setValue(null);
        }
    }

    selectModelo(modelo?: Modelo): void {
        if (modelo) {
            this.form.get('modelo').setValue(modelo)
        }
        this.formState = 'form';
    }

    showModeloGrid(): void {
        this.formState = 'modelo-gridsearch';
    }

    cancel(): void {
        this.formState = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

}
