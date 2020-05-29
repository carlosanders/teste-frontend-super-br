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
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import {TipoRelatorio} from "../../../models/tipo-relatorio.model";

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
    logEntryPaginationRelatorio: Pagination;

    _profile: any;

    @Input()
    mode = 'regular';

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

    processos: Processo[] = [];

    @Output()
    processo = new EventEmitter<Processo>();

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
            tipoRelatorio: [null, [Validators.required]],
            parametros: [null, [Validators.required]],
            observacao: [null, [Validators.required]],
            formato: [null, [Validators.required]],
        });

        this.tipoRelatorioPagination = new Pagination();
        this.tipoRelatorioPagination.filter = {id: 'isNotNull'};

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
            let relatorio;
            relatorio =  {
                ...this.form.value,
            };
            console.warn(relatorio)
            this.save.emit(relatorio);
        }
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

    showLogEntryGrid(target: string): void {

        const campo = {target: target};
        Object.assign(this.logEntryPaginationRelatorio.filter, campo);

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
