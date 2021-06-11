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
import {FormBuilder, FormGroup} from '@angular/forms';

import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';
import {Pagination, Usuario} from '@cdk/models';
import {LoginService} from '../../../../app/main/auth/login/login.service';

import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';

@Component({
    selector: 'cdk-tipo-relatorio-form',
    templateUrl: './cdk-tipo-relatorio-form.component.html',
    styleUrls: ['./cdk-tipo-relatorio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkTipoRelatorioFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    tipoRelatorio: TipoRelatorio;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    config: any;

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<TipoRelatorio>();

    @Input()
    especieRelatorioPagination: Pagination;

    @Input()
    logEntryPaginationtipoRelatorio: Pagination;

    especieRelatorioList: EspecieRelatorio[] = [];

    especieRelatorioListIsLoading: boolean;

    _profile: any;

    @Input()
    mode = 'regular';

    @Input()
    form: FormGroup;

    activeCard = 'form';

    // tslint:disable-next-line:no-output-native
    @Output()
    abort = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService
    ) {
        this.especieRelatorioPagination = new Pagination();
        this._profile = _loginService.getUserProfile();
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
        if (changes['tipoRelatorio'] && this.tipoRelatorio && ((!this.tipoRelatorio.id && !this.form.dirty) || (this.tipoRelatorio.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tipoRelatorio});
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

    checkEspecieRelatorio(): void {
        const value = this.form.get('especieRelatorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieRelatorio').setValue(null);
        }
    }

    selectEspecieRelatorio(especieRelatorio: EspecieRelatorio): void {
        if (especieRelatorio) {
            this.form.get('especieRelatorio').setValue(especieRelatorio);
        }
        this.activeCard = 'form';
    }

    showEspecieRelatorioGrid(): void {
        this.activeCard = 'especie-relatorio-gridsearch';
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuarioResponsavel').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    doAbort(): void {
        this.abort.emit();
    }
}
