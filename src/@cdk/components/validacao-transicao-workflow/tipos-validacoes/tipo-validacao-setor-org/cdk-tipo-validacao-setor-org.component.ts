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
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Colaborador, Pagination, Setor} from '@cdk/models';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-tipo-validacao-setor-org',
    templateUrl: './cdk-tipo-validacao-setor-org.component.html',
    styleUrls: ['./cdk-tipo-validacao-setor-org.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoSetorOrgComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    validacao: ValidacaoTransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<ValidacaoTransicaoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    setorOrigemPagination: Pagination;

    unidadePagination: Pagination;

    form: FormGroup;

    _profile: Colaborador;

    activeCard = 'form';

    selected = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile().colaborador;
        this.form = this._formBuilder.group({
            id: [null],
            transicaoWorkflow: [null],
            contexto: [null],
            unidade: [null, [Validators.required]],
            setorOrigem: [null, [Validators.required]],
            nome: ['nome', [Validators.required]],
            descricao: ['descricao', [Validators.required]],
        });

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.filter = {parent: 'isNotNull'};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {
        if (this.form.get('unidade').value) {
            this.form.get('setorOrigem').enable();
            this.setorOrigemPagination.filter['unidade.id'] = `eq:${this.form.get('unidade').value.id}`;
            this.setorOrigemPagination.filter['parent'] = 'isNotNull';
        } else {
            this.form.get('setorOrigem').disable();
        }

        this.form.get('unidade').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setorOrigem').enable();
                        this.form.get('setorOrigem').reset();
                        this.setorOrigemPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorOrigemPagination.filter['parent'] = 'isNotNull';

                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.selected = false;
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorOrigem').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.selected = true;
                    }

                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['validacao'] && this.validacao && ((!this.validacao.id && !this.form.dirty) || (this.validacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.validacao});
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

    selectUnidade(setor: Setor): void {
        if (setor) {
            this.form.get('unidade').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidade(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    selectSetorOrigem(setorOrigem: Setor): void {
        this.form.get('setorOrigem').setValue(setorOrigem);
        this.activeCard = 'form';
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
