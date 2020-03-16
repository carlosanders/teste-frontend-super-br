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
import {Atividade} from '@cdk/models';
import {EspecieAtividade} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Pagination} from '@cdk/models';
import {Setor} from '@cdk/models';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DocumentoAvulso} from '@cdk/models';
import {Favorito} from '@cdk/models';
import {FavoritoService} from '@cdk/services/favorito.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-atividade-form',
    templateUrl: './cdk-atividade-form.component.html',
    styleUrls: ['./cdk-atividade-form.component.scss'],
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
export class CdkAtividadeFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    atividade: Atividade;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    @Input()
    errors: any;

    @Input()
    mode = 'horizontal';

    @Output()
    save = new EventEmitter<Atividade>();

    @Input()
    especieAtividadePagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    usuarioAprovacaoPagination: Pagination;

    @Input()
    setorAprovacaoPagination: Pagination;

    @Input()
    unidadeAprovacaoPagination: Pagination;

    @Input()
    temMinutas = false;

    @Input()
    documentoAvulsoVinculado: DocumentoAvulso;

    form: FormGroup;

    activeCard = 'form';

    especieAtividadeList: EspecieAtividade[] = [];

    especieAtividadeListIsLoading: boolean;

    favoritosList: Favorito[] = [];

    _profile: any;

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
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            respostaDocumentoAvulso: [null],
            especieAtividade: [null, [Validators.required]],
            dataHoraConclusao: [null, [Validators.required]],
            usuario: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            documento: [null],
            tarefa: [null],
            unidadeAprovacao: [null, [Validators.required]],
            setorAprovacao: [null, [Validators.required]],
            usuarioAprovacao: [null, [Validators.required]]
        });

        this.especieAtividadePagination = new Pagination();
        this.usuarioPagination = new Pagination();
        this.usuarioAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination.filter = {parent: 'isNull'};
        this.setorAprovacaoPagination = new Pagination();
        this.setorAprovacaoPagination.filter = {parent: 'isNotNull'};

        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('destinacaoMinutas').setValue('juntar');

        this.form.get('unidadeAprovacao').disable();
        this.form.get('setorAprovacao').disable();
        this.form.get('usuarioAprovacao').disable();

        this.form.get('destinacaoMinutas').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value === 'submeter_aprovacao') {
                        this.form.get('unidadeAprovacao').enable();
                    } else {
                        this.form.get('unidadeAprovacao').reset();
                        this.form.get('unidadeAprovacao').disable();
                        this.form.get('setorAprovacao').reset();
                        this.form.get('setorAprovacao').disable();
                        this.form.get('usuarioAprovacao').reset();
                        this.form.get('usuarioAprovacao').disable();
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeAprovacao').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setorAprovacao').enable();
                        this.form.get('setorAprovacao').reset();
                        this.form.get('usuarioAprovacao').reset();
                        this.form.get('usuarioAprovacao').disable();
                        this.setorAprovacaoPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorAprovacao').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('usuarioAprovacao').enable();
                        this.form.get('usuarioAprovacao').reset();
                        this.usuarioAprovacaoPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
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
        if (changes['atividade'] && this.atividade && (!this.atividade.id || (this.atividade.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.atividade});
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
            this.save.emit(this.form.value);
        }
    }

    checkEspecieAtividade(): void {
        const value = this.form.get('especieAtividade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieAtividade').setValue(null);
        }
    }

    selectEspecieAtividade(especieAtividade: EspecieAtividade): void {
        if (especieAtividade) {
            this.form.get('especieAtividade').setValue(especieAtividade);
        }
        this.activeCard = 'form';
    }

    showEspecieAtividadeGrid(): void {
        this.activeCard = 'especie-atividade-gridsearch';
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

    checkUsuarioAprovacao(): void {
        const value = this.form.get('usuarioAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioAprovacao').setValue(null);
        }
    }

    selectUsuarioAprovacao(usuarioAprovacao: Usuario): void {
        if (usuarioAprovacao) {
            this.form.get('usuarioAprovacao').setValue(usuarioAprovacao);
        }
        this.activeCard = 'form';
    }

    showUsuarioAprovacaoGrid(): void {
        this.activeCard = 'usuario-aprovacao-gridsearch';
    }

    checkSetorAprovacao(): void {
        const value = this.form.get('setorAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorAprovacao').setValue(null);
        }
    }

    selectSetorAprovacao(setorAprovacao: Setor): void {
        if (setorAprovacao) {
            this.form.get('setorAprovacao').setValue(setorAprovacao);
        }
        this.activeCard = 'form';
    }

    showSetorAprovacaoGrid(): void {
        this.activeCard = 'setor-aprovacao-gridsearch';
    }

    selectUnidadeAprovacao(setor: Setor): void {
        if (setor) {
            this.form.get('unidadeAprovacao').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidadeAprovacao(): void {
        const value = this.form.get('unidadeAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadeAprovacao').setValue(null);
        }
    }

    showUnidadeAprovacaoGrid(): void {
        this.activeCard = 'unidade-aprovacao-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showEspecieAtividadeList(): void {

        this.especieAtividadeListIsLoading = true;

        this._favoritoService.query(
            `{"usuario.id": "eq:${this._profile.id}", "especieAtividade": "isNotNull"}`,
            5,
            0,
            '{}',
            '["populateAll"]')
            .pipe(
                catchError(() => {
                        return of([]);
                    }
                )
            ).subscribe(
            value => {

                this.especieAtividadeList = [];
                this.favoritosList = value['entities'];

                this.favoritosList.forEach((favorito) => {
                    const especieAtividade = favorito.especieAtividade;
                    this.especieAtividadeList.push(especieAtividade);
                });

                this.especieAtividadeListIsLoading = false;
                this._changeDetectorRef.markForCheck();
            }
        );
    }

}
