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

import {TipoRelatorio} from "@cdk/models/tipo-relatorio.model";
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Favorito} from '@cdk/models';
import {Setor} from '@cdk/models';

import {FavoritoService} from '@cdk/services/favorito.service';
import {Responsavel} from '@cdk/models/respensavel.model';
import {LoginService} from '../../../../app/main/auth/login/login.service';

import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {catchError, debounceTime, distinctUntilChanged, switchMap, distinct} from 'rxjs/operators';
import {of} from 'rxjs';


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

    inputProcesso: boolean;

    @Input()
    blocoEdit = {
        blocoEditEspecie: false,
        blocoEditDistribuicao: false,
        blocoEditInicioPrazo: false,
        blocoEditFinalPrazo: false,
        blocoEditUrgente: false,
        blocoEditObservacao: false
    };

    form: FormGroup;

    activeCard = 'form';

    // processos: Processo[] = [];
    blocoResponsaveis: Responsavel[] = [];

    // @Output()
    // processo = new EventEmitter<Processo>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        public _loginService: LoginService
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            nome: [null],
            descricao: [null, [Validators.maxLength(255)]],
            especieRelatorio: [null, [Validators.required]],
            templateHTML: [null, [Validators.required]],
            parametros: [null],
            DQL: [null],
            ativo: [null],
            somenteExcel: [null],
            limite: [1]
        });

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

        if (changes['tipoRelatorio'] && this.tipoRelatorio && (!this.tipoRelatorio.id || (this.tipoRelatorio.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tipoRelatorio});

            if (this.tipoRelatorio.id) {
                this.inputProcesso = true;
            } else {
                this.inputProcesso = false;
            }
       }

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
            Object.keys(this.form.controls).forEach(key => {
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
            console.log(this.form.value)
            let tipoRelatorio = {
                ...this.form.value
            }
            this.save.emit(tipoRelatorio);
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

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    selectUnidadeResponsavel(setor: Setor): void {
        if (setor) {
            this.form.get('unidadeResponsavel').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidadeResponsavel(): void {
        const value = this.form.get('unidadeResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadeResponsavel').setValue(null);
        }
    }

    showUnidadeResponsavelGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }

    selectSetorResponsavel(setor: Setor): void {
        if (setor) {
            this.form.get('setorResponsavel').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkSetorResponsavel(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }

        if (value !== null && typeof value === 'object' ) {
            if (value.unidade && value.unidade !== this.form.get('unidadeResponsavel').value) {
                this.form.get('unidadeResponsavel').setValue(value.unidade, {emitEvent: false});
            }
        }
    }

    showSetorResponsavelGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    showLogEntryGrid(target: string): void {

        const campo = {target: target};
        Object.assign(this.logEntryPaginationtipoRelatorio.filter, campo);

        this.activeCard = 'logentry-gridsearch';
    }

    selectSetorOrigem(setor: Setor): void {
        if (setor) {
            this.form.get('setorOrigem').setValue(setor);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
