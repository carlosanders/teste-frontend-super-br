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
import {Colaborador, Tarefa} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '@cdk/models';
import {FavoritoService} from '@cdk/services/favorito.service';
import {Responsavel} from '@cdk/models';
import {SetorService} from '@cdk/services/setor.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';

// @ts-ignore
@Component({
    selector: 'cdk-distribuir-tarefa-form',
    templateUrl: './cdk-distribuir-tarefa-form.component.html',
    styleUrls: ['./cdk-distribuir-tarefa-form.component.scss'],
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
export class CdkDistribuirTarefaFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    tarefa: Tarefa;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    config: any;

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<Tarefa>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    unidadeResponsavelPagination: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    usuarioResponsavelList: Usuario[] = [];

    usuarioResponsavelListIsLoading: boolean;

    setorResponsavelList: Setor[] = [];

    setorResponsavelListIsLoading: boolean;

    unidadeResponsavelList: Setor[] = [];

    unidadeResponsavelListIsLoading: boolean;

    evento = false;

    editable = true;


    _profile: Colaborador;

    @Input()
    form: FormGroup;

    activeCard = 'form';

    processos: Processo[] = [];
    blocoResponsaveis: Responsavel[] = [];

    @Output()
    processo = new EventEmitter<Processo>();

    generoProcessos: any[] = [];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        private _setorService: SetorService,
        private _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile().colaborador;

        this.form = this._formBuilder.group({
            id: [null],
            distribuicaoAutomatica: [null],
            unidadeResponsavel: [null, [Validators.required]],
            setorResponsavel: [null, [Validators.required]],
            usuarioResponsavel: [null],
            usuarios: [null],
            setores: [null]
        });

        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.filter = {parent: 'isNotNull'};
        this.usuarioResponsavelPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.evento = false;

        if (this.form.get('unidadeResponsavel').value) {
            this.form.get('setorResponsavel').enable();
            this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.form.get('unidadeResponsavel').value.id}`;
            this.setorResponsavelPagination.filter['parent'] = `isNotNull`;
        } else {
            this.form.get('setorResponsavel').disable();
            this.form.get('usuarioResponsavel').disable();
        }

        if (this.form.get('setorResponsavel').value) {
            this.form.get('usuarioResponsavel').enable();
            this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
        } else {
            this.form.get('usuarioResponsavel').disable();
        }

        this.form.get('distribuicaoAutomatica').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
                        this.form.get('usuarioResponsavel').reset();
                        this.form.get('usuarioResponsavel').disable();
                    } else {
                        this.form.get('usuarioResponsavel').enable();
                    }
                    if (this.blocoResponsaveis) {
                        this.blocoResponsaveis = [];
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setorResponsavel').enable();
                        this.form.get('setorResponsavel').reset();
                        this.form.get('usuarioResponsavel').reset();
                        this.form.get('usuarioResponsavel').disable();
                        this.form.get('distribuicaoAutomatica').reset();
                        this.setorResponsavelPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorResponsavelPagination.filter['parent'] = `isNotNull`;
                        this.editable = true;

                        if (value.apenasProtocolo && value.id !== this._profile.lotacoes[0].setor.unidade.id) {
                            this.form.get('distribuicaoAutomatica').setValue(true);
                            this.form.get('setorResponsavel').enable();
                            this.getSetorProtocolo();
                            this.editable = false;
                        }

                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    delete this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.apenasDistribuidor'];

                    if (value && typeof value === 'object' && !this.form.get('distribuicaoAutomatica').value) {
                        this.form.get('usuarioResponsavel').enable();
                        this.form.get('usuarioResponsavel').reset();
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                    }

                    if (this.form.get('blocoResponsaveis').value && this.form.get('distribuicaoAutomatica').value && typeof value === 'object' && value) {
                        const setor = this.form.get('setorResponsavel').value;
                        const usuario = this.form.get('usuarioResponsavel').value;

                        if (usuario) {
                            const findDuplicate = this.blocoResponsaveis.some(item => (item.setor.id === setor.id) && (item.usuario.id === usuario.id));
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        } else {
                            const findDuplicate = this.blocoResponsaveis.some(item => item.setor.id === setor.id);
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        }
                    }

                    // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                    if (typeof value === 'object' && value && value.apenasDistribuidor && value.id !== this._profile.lotacoes[0].setor.id) {
                        this.usuarioResponsavelPagination['context'] = { setorApenasDistribuidor: value.id };
                    }

                    this._changeDetectorRef.markForCheck();

                    return of([]);
                }
            )
        ).subscribe();


        this.form.get('usuarioResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {

                    // bloco de processo
                    if (this.form.get('blocoResponsaveis').value && typeof value === 'object' && value) {
                        const setor = this.form.get('setorResponsavel').value;
                        const usuario = this.form.get('usuarioResponsavel').value;

                        if (usuario) {
                            const findDuplicate = this.blocoResponsaveis.some(item => (item.setor.id === setor.id) && (item.usuario.id === usuario.id));
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        } else {
                            const findDuplicate = this.blocoResponsaveis.some(item => item.setor.id === setor.id);
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        }

                        this.clearValidators();
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
      /*  if (changes['tarefa'] && this.tarefa && (!this.tarefa.id || (this.tarefa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tarefa});
            if (this.tarefa.unidadeResponsavel) {
                this.form.get('setorResponsavel').enable();
                this.form.get('setorResponsavel').reset();
                this.form.get('usuarioResponsavel').reset();
                this.form.get('usuarioResponsavel').disable();
                this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.tarefa.unidadeResponsavel.id}`;
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
        this._changeDetectorRef.markForCheck();*/
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    getSetorProtocolo(): void {
        this._setorService.query(
            JSON.stringify({
                'unidade.id': `eq:${this.form.get('unidadeResponsavel').value.id}`,
                'parent': 'isNotNull', 'nome': 'eq:PROTOCOLO'
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify(['unidade', 'parent'])
        ).pipe(
            catchError(() => of([]))
        ).subscribe(
            response => {
                response['entities'].forEach((setor) => {
                    this.form.get('setorResponsavel').setValue(setor);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    clearValidators(): void {
            this.form.get('setorOrigem').clearValidators();
        }

    checkUsuarioResponsavel(): void {
        const value = this.form.get('usuarioResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioResponsavel').setValue(null);
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

        if (setor !== null && typeof setor === 'object') {
            if (setor.unidade && setor.unidade !== this.form.get('unidadeResponsavel').value) {
                this.form.get('unidadeResponsavel').setValue(setor.unidade, {emitEvent: false});
            }
        }

        this.activeCard = 'form';
    }

    checkSetorResponsavel(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }

        if (value !== null && typeof value === 'object') {
            if (value.unidade && value.unidade !== this.form.get('unidadeResponsavel').value) {
                this.form.get('unidadeResponsavel').setValue(value.unidade, {emitEvent: false});
            }
        }
    }

    showSetorResponsavelGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    showSetorTree(): void {
        this.activeCard = 'setor-tree';
    }
    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }

    getFavoritosUnidadeResponsavel(): void {
        this.unidadeResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id + '_unidade_responsavel'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.unidadeResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
                this.unidadeResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.unidadeResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosSetorResponsavel(): void {
        this.setorResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id +
                    '_setor_responsavel_unidade_' + this.form.get('unidadeResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.setorResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
                this.setorResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.setorResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosUsuarioResponsavel(): void {
        this.usuarioResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Usuario',
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id +
                    '_usuario_responsavel_setor_' + this.form.get('setorResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.usuarioResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
                this.usuarioResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.usuarioResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
