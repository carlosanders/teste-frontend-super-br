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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalidadeTransicao, Pagination, Transicao} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-transicao-form',
    templateUrl: './cdk-transicao-form.component.html',
    styleUrls: ['./cdk-transicao-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTransicaoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    transicao: Transicao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Transicao>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    modalidadeTransicaoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            processo: [null, [Validators.required]],
            modalidadeTransicao: [null, [Validators.required]],
            metodo: [null, [Validators.required, Validators.maxLength(255)]],
            edital: [null, [Validators.maxLength(255)]],
            observacao: [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.modalidadeTransicaoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('modalidadeTransicao').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('edital').setValidators([Validators.maxLength(255)]);
                        if (value.valor === 'ELIMINAÇÃO') {
                            this.form.get('edital').setValidators([Validators.required, Validators.maxLength(255)]);
                        }
                        this.form.get('edital').setErrors(null);
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['transicao'] && this.transicao && ((!this.transicao.id && !this.form.dirty) || (this.transicao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.transicao});
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

    checkModalidadeTransicao(): void {
        const value = this.form.get('modalidadeTransicao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeTransicao').setValue(null);
        }
    }

    showModalidadeTransicaoGrid(): void {
        this.activeCard = 'modalidade-transicao-gridsearch';
    }

    selectModalidadeTransicao(modalidadeTransicao: ModalidadeTransicao): void {
        if (modalidadeTransicao) {
            this.form.get('modalidadeTransicao').setValue(modalidadeTransicao);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
