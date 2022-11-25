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
import {Acao, ModalidadeAcaoEtiqueta, Modelo, Pagination} from '../../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    gridsearchModeloPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modeloAndx: any = [];

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    valid: boolean = false;

    @Input()
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;

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
            modalidadeAcaoEtiqueta: [
                this.modalidadeAcaoEtiqueta,
                [Validators.required]
            ],
            contexto: [null],
            modelo: [null, [Validators.required]]
        });
        this.modeloPagination = new Pagination();
        this.gridsearchModeloPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('modelo').valueChanges.subscribe((valor) => {
            if (typeof valor === 'object') {
                this.valid = true;
            } else {
                this.valid = false;
            }
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (
            changes['modalidadeAcaoEtiqueta']
            && this.modalidadeAcaoEtiqueta
            && this.modalidadeAcaoEtiqueta.id !== this.form.get('modalidadeAcaoEtiqueta').value
        ) {
            this.form.get('modalidadeAcaoEtiqueta').setValue(this.modalidadeAcaoEtiqueta);
        }
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
            this.form.get('modelo').setValue(modelo);
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
