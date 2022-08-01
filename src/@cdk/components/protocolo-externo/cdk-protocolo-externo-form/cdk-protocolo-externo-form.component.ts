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
import {Estado, GeneroSetor, Pagination, Pessoa, Processo, Setor, Usuario} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {FavoritoService} from '../../../services/favorito.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-protocolo-externo-form',
    templateUrl: './cdk-protocolo-externo-form.component.html',
    styleUrls: ['./cdk-protocolo-externo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,

    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'L',
                    monthInput: 'MMMM',
                    timeInput: 'LT',
                    datetimeInput: 'L LT'
                },
                display: {
                    dateInput: 'L',
                    monthInput: 'MMMM',
                    datetimeInput: 'L LT',
                    timeInput: 'LT',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                    popupHeaderDateLabel: 'ddd, DD MMM'
                }
            }
        }
    ]
})
export class CdkProtocoloExternoFormComponent implements OnInit, OnChanges, OnDestroy {

    _profile: Usuario;

    @Input()
    processo: Processo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoProcesso = 'administrativo';

    @Input()
    procedenciaPagination: Pagination;

    @Input()
    setorAtualPagination: Pagination;

    @Output()
    save = new EventEmitter<Processo>();

    @Output()
    abort = new EventEmitter<any>();

    @Output()
    validateNup = new EventEmitter<any>();

    @Output()
    gerirProcedencia = new EventEmitter();

    @Output()
    editProcedencia = new EventEmitter<number>();

    @Input()
    procedencia: Pessoa;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    generoSetorPagination: Pagination;

    @Input()
    pessoaVinculada = false;

    @Input()
    nupIsValid = true;

    @Input()
    estados: Estado[];

    form: FormGroup;

    @Input()
    paramHandle: string;

    activeCard = 'form';

    readonlyNUP: boolean;
    textBotao: string;

    setorAtualList: Setor[] = [];

    setorAtualListIsLoading: boolean;

    @Input()
    existente: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        public _loginService: LoginService,
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            NUP: [null],
            novo: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            titulo: [null],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            unidadeArquivistica: [null],
            classificacao: [null],
            procedencia: [null],
            localizador: [null],
            setorAtual: [null, [Validators.required]],
            dataHoraAbertura: [null],
            tipoProtocolo: [null],
            generoSetor: [null, [Validators.required]],
            estado: [null, [Validators.required]],
            requerimento: [null, [Validators.required, Validators.maxLength(255)]],
            protocoloEletronico: [null]
        });

        this.procedenciaPagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.processoPagination = new Pagination();
        this.generoSetorPagination = new Pagination();
        this.processoPagination.populate = ['configuracaoNup', 'especieProcesso', 'especieProcesso.generoProcesso', 'modalidadeMeio', 'classificacao', 'setorAtual', 'setorAtual.unidade'];
        this._profile = this._loginService.getUserProfile();

        this.readonlyNUP = false;
        this.textBotao = '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {

        if (!this.processo.id) {

            this.form.get('NUP').setValue(null);
            this.form.get('NUP').disable();

            if (this.pessoaVinculada) {
                this.form.get('generoSetor').setValue(null, {emitEvent: false});
                this.form.get('estado').setValue(null, {emitEvent: false});
                this.form.get('setorAtual').setValue(null, {emitEvent: false});
                this.form.get('estado').disable();
                this.form.get('setorAtual').disable();
            }

            this.textBotao = 'SALVAR';
        } else {
            this.form.get('dataHoraAbertura').disable();
            this.readonlyNUP = true;
            this.textBotao = 'SALVAR';
        }

        if (this.pessoaVinculada) {
            this.form.get('generoSetor').valueChanges.subscribe((value) => {
                if (value && typeof value === 'object') {
                    this.form.get('estado').enable();
                    this.setorAtualPagination.filter = {
                        ...this.setorAtualPagination.filter,
                        ...{'unidade.generoSetor.id': `eq:${value.id}`}
                    };
                } else {
                    this.form.get('estado').setValue(null);
                    this.form.get('estado').disable();
                }
            });

            this.form.get('estado').valueChanges.subscribe((value) => {
                if (value && typeof value === 'object') {
                    this.form.get('setorAtual').enable();
                    this.setorAtualPagination.filter = {
                        ...this.setorAtualPagination.filter,
                        ...{'municipio.estado.id': `eq:${value.id}`}
                    };
                } else {
                    this.form.get('setorAtual').setValue(null);
                    this.form.get('setorAtual').disable();
                }
            });
        }

        if(this.existente){
            this.form.get('generoSetor').disable();
            this.form.get('estado').disable();
            this.form.get('setorAtual').disable();
        }
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['processo'] && this.processo && (!this.processo.id || (this.processo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.processo});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                data.forEach((field) => {
                    const control = this.form.get(field.propertyPath);
                    control.setErrors({formError: data.message});
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

        if (changes['procedencia'] && this.procedencia) {
            this.form.get('procedencia').setValue(this.procedencia);
        }

        this._changeDetectorRef.detectChanges();
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

    checkSetorAtual(): void {
        const value = this.form.get('setorAtual').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorAtual').setValue(null);
        }
    }

    selectSetorAtual(unidade: Setor): void {
        if (unidade) {
            this.form.get('setorAtual').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    showSetorAtualGrid(): void {
        this.activeCard = 'setor-atual-gridsearch';
    }

    checkEstado(): void {
        const value = this.form.get('estado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('estado').setValue(null);
        }
    }

    selectEstado(estado: Estado): void {
        if (estado) {
            this.form.get('estado').setValue(estado);
        }
        this.activeCard = 'form';
    }

    showEstadoGrid(): void {
        this.activeCard = 'estado-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }

    checkGeneroSetor(): void {
        const value = this.form.get('generoSetor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('generoSetor').setValue(null);
        }
    }

    selectGeneroSetor(generoSetor: GeneroSetor): void {
        if (generoSetor) {
            this.form.get('generoSetor').setValue(generoSetor);
        }
        this.activeCard = 'form';
    }

    showGeneroSetorGrid(): void {
        this.activeCard = 'genero-setor-gridsearch';
    }
}
