import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Setor, Usuario} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import {TipoRelatorio} from '../../../models/tipo-relatorio.model';
import {EspecieRelatorio} from '../../../models/especie-relatorio.model';
import {GeneroRelatorio} from '../../../models/genero-relatorio.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-relatorio-form',
    templateUrl: './cdk-relatorio-form.component.html',
    styleUrls: ['./cdk-relatorio-form.component.scss'],
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
export class CdkRelatorioFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    relatorio: Relatorio;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<Relatorio>();

    @Input()
    tipoRelatorioPagination: Pagination;

    @Input()
    especieRelatorioPagination: Pagination;

    @Input()
    generoRelatorios: GeneroRelatorio[];

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    @Output()
    abort = new EventEmitter<any>();

    _profile: any;

    @Input()
    mode = 'regular';

    form: FormGroup;

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            observacao: [null],
            formato: [null, [Validators.required]],
            generoRelatorio: [null, [Validators.required]],
            especieRelatorio: [null, [Validators.required]],
            tipoRelatorio: [null, [Validators.required]],
            unidade: [null],
            setor: [null],
            usuario: [null],
            dataHoraInicio: [null],
            dataHoraFim: [null]
        });

        this.tipoRelatorioPagination = new Pagination();
        this.tipoRelatorioPagination.filter = {id: 'isNotNull'};
        this.especieRelatorioPagination = new Pagination();
        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();

        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.desabilitaCampos();

        this.form.get('generoRelatorio').valueChanges.subscribe((value) => {
            if (value) {
                this.form.get('especieRelatorio').enable();
                this.especieRelatorioPagination.filter = {'generoRelatorio.id': `eq:${value.id}`};
            } else {
                this.form.get('especieRelatorio').setValue(null);
                this.form.get('especieRelatorio').disable();
            }
        });

        this.form.get('especieRelatorio').valueChanges.subscribe((value) => {
            if (value) {
                this.form.get('tipoRelatorio').enable();
                this.tipoRelatorioPagination.filter = {
                    ...this.tipoRelatorioPagination.filter,
                    ...{'especieRelatorio.id': `eq:${this.form.get('especieRelatorio').value.id}`}
                };
            } else {
                this.form.get('tipoRelatorio').setValue(null);
                this.form.get('tipoRelatorio').disable();
            }
        });

        this.form.get('tipoRelatorio').valueChanges.subscribe((value) => {
            if (value && value.parametros) {
                this.processaParametros(value);
            }
        });

        if (this.form.get('unidade')) {
            this.form.get('unidade').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value && typeof value === 'object') {
                            this.form.get('setor').enable();
                            this.form.get('setor').reset();
                            this.setorPagination.filter['unidade.id'] = `eq:${value.id}`;
                            this.setorPagination.filter['parent'] = 'isNotNull';
                            this._changeDetectorRef.markForCheck();
                        }
                        if (value === null) {
                            this.form.get('setor').setValue('');
                            this.form.get('setor').disable();
                        }
                        return of([]);
                    }
                )
            ).subscribe();
        }

        this.form.get('setor').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {

                if (value && typeof value === 'object') {

                    if (this.form.get('usuario').enabled)
                    {
                        this.form.get('usuario').reset();
                        this.usuarioPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
                    }
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

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    processaParametros(value): void {

        const parametros = value.parametros.split(',');

        this.form.get('unidade').enable();

        if (parametros.length > 0) {
            parametros.forEach((field) => {
                const control = this.form.get(field);
                control.enable();
            });
        }
    }

    desabilitaCampos(): void {
        this.form.get('especieRelatorio').disable();
        this.form.get('tipoRelatorio').disable();
        this.form.get('unidade').disable();
        this.form.get('setor').disable();
        this.form.get('usuario').disable();
        this.form.get('dataHoraInicio').disable();
        this.form.get('dataHoraFim').disable();
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    selectTipoRelatorio(tipoRelatorio: TipoRelatorio): void {
        if (tipoRelatorio) {
            this.form.get('tipoRelatorio').setValue(tipoRelatorio);
        }
        this.activeCard = 'form';
    }

    checkTipoRelatorio(): void {
        const value = this.form.get('tipoRelatorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoRelatorio').setValue(null);
        }
    }

    showTipoRelatorioGrid(): void {
        this.activeCard = 'tipo-relatorio-gridsearch';
    }

    checkGeneroRelatorio(): void {
        const value = this.form.get('generoRelatorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('generoRelatorio').setValue(null);
        }
    }

    selectGeneroRelatorio(generoRelatorio: GeneroRelatorio): void {
        if (generoRelatorio) {
            this.form.get('generoRelatorio').setValue(generoRelatorio);
        }
        this.activeCard = 'form';
    }

    showGeneroRelatorioGrid(): void {
        this.activeCard = 'genero-tipo-relatorio-gridsearch';
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

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkSetor(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
        }
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
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

    checkUsuario(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuario').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }
}
