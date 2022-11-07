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
import {Colaborador, Lotacao, Pagination, Setor, Tarefa, Usuario} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FavoritoService} from '@cdk/services/favorito.service';
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
    unidadeResponsavelPagination: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    errors: any;

    @Input()
    config: any;

    @Input()
    valid = true;

    @Input()
    form: FormGroup;

    @Output()
    save = new EventEmitter<Tarefa>();

    @Output()
    abort = new EventEmitter<any>();

    selected = false;

    usuarioResponsavelList: Usuario[] = [];

    usuarioResponsavelListIsLoading: boolean;

    setorResponsavelList: Setor[] = [];

    setorResponsavelListIsLoading: boolean;

    unidadeResponsavelList: Setor[] = [];

    unidadeResponsavelListIsLoading: boolean;

    evento = false;

    editable = true;

    _profile: Colaborador;

    activeCard = 'form';

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
            this.setorResponsavelPagination.filter['parent'] = 'isNotNull';
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
                        this.selected = true;
                    } else {
                        this.form.get('usuarioResponsavel').enable();
                    }

                    if (this.form.get('setorResponsavel').value) {
                        delete this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.apenasDistribuidor'];
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
                        // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                        if (this.form.get('setorResponsavel').value.apenasDistribuidor) {
                            const lotacoes = this._profile.lotacoes.filter(lotacao => lotacao.setor.id == this.form.get('setorResponsavel').value.id);
                            if (lotacoes.length === 0) {
                                this.usuarioResponsavelPagination['context'].setorApenasDistribuidor = this.form.get('setorResponsavel').value.id;
                            }
                        }
                    }

                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeResponsavel').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.selected = true;
                        this.form.get('setorResponsavel').enable();
                        this.form.get('setorResponsavel').reset();
                        this.form.get('usuarioResponsavel').reset();
                        this.form.get('usuarioResponsavel').disable();
                        // this.form.get('distribuicaoAutomatica').reset();
                        this.setorResponsavelPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorResponsavelPagination.filter['parent'] = 'isNotNull';
                        this.editable = true;

                        const unidadesId = [];
                        this._profile.lotacoes.forEach((lotacao: Lotacao) => {
                            unidadesId.push(lotacao.setor.unidade.id);
                        });

                        if (value.apenasProtocolo && unidadesId.indexOf(value.id) === -1) {
                            this.form.get('distribuicaoAutomatica').setValue(true);
                            this.form.get('setorResponsavel').enable();
                            this.getSetorProtocolo();
                            this.editable = false;
                        }

                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.selected = false;
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorResponsavel').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    delete this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.apenasDistribuidor'];

                    if (value && typeof value === 'object' && this.form.get('distribuicaoAutomatica').value) {
                        this.selected = true;
                    }

                    if (value && typeof value === 'object' && !this.form.get('distribuicaoAutomatica').value) {
                        this.selected = false;
                        this.form.get('usuarioResponsavel').enable();
                        this.form.get('usuarioResponsavel').reset();
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                    }

                    // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                    if (typeof value === 'object' && value && value.apenasDistribuidor) {
                        const lotacoes = this._profile.lotacoes.filter(lotacao => lotacao.setor.id == value.id);
                        if (lotacoes.length === 0) {
                            this.usuarioResponsavelPagination['context'].setorApenasDistribuidor = value.id;
                        }
                    }

                    this._changeDetectorRef.markForCheck();

                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('usuarioResponsavel').valueChanges
            .subscribe(((value) => {
                this.selected = value && typeof value === 'object';
            }
        ));
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
            (response) => {
                response['entities'].forEach((setor) => {
                    this.form.get('setorResponsavel').setValue(setor);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
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

    getFavoritosUnidadeResponsavel(): void {
        this.unidadeResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id + '_unidade_responsavel'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.unidadeResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.unidadeResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
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
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.setorResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.setorResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
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
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.usuarioResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.usuarioResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.usuarioResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.usuarioResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
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

    cancel(): void {
        this.activeCard = 'form';
    }
}
