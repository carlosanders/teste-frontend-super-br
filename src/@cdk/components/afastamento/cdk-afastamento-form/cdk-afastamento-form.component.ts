import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Afastamento, ModalidadeAfastamento, Pagination, Usuario} from '@cdk/models';
import {distinctUntilChanged, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'cdk-afastamento-form',
    templateUrl: './cdk-afastamento-form.component.html',
    styleUrls: ['./cdk-afastamento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAfastamentoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    afastamento: Afastamento;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Afastamento>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    usuario: Usuario;

    @Input()
    modalidadeAfastamentoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            modalidadeAfastamento: [null, [Validators.required]],
            dataInicio: [null, [Validators.required]],
            dataFim: [null, [Validators.required]],
            dataInicioBloqueio: [null, [Validators.required]],
            dataFimBloqueio: [null, [Validators.required]],
            colaborador: [null]
        });

        this.modalidadeAfastamentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit():void {
        this.form.get('dataInicio').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap(() => {
                    this.form.get('dataInicioBloqueio').setValue(this.form.get('dataInicio').value)
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('dataFim').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap(() => {
                    this.form.get('dataFimBloqueio').setValue(this.form.get('dataFim').value)
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['afastamento'] && this.afastamento && ((!this.afastamento.id && !this.form.dirty) || (this.afastamento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.afastamento});
        }

        if (this.usuario) {
            this.form.get('colaborador').setValue(this.usuario.colaborador);
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkModalidadeAfastamento(): void {
        const value = this.form.get('modalidadeAfastamento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeAfastamento').setValue(null);
        }
    }

    selectModalidadeAfastamento(modalidadeafastamento: ModalidadeAfastamento): void {
        if (modalidadeafastamento) {
            this.form.get('modalidadeAfastamento').setValue(modalidadeafastamento);
        }
        this.activeCard = 'form';
    }

    showModalidadeAfastamentoGrid(): void {
        this.activeCard = 'modalidade-afastamento-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
