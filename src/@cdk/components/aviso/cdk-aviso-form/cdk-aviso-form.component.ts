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
import {Aviso, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '../../../models';
import {FavoritoService} from '../../../services/favorito.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'cdk-aviso-form',
    templateUrl: './cdk-aviso-form.component.html',
    styleUrls: ['./cdk-aviso-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAvisoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    aviso: Aviso;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    admin: boolean;

    @Output()
    save = new EventEmitter<Aviso>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    orgaoCentralPagination: Pagination;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    tipos: any[] = [
        {
            id: '',
            label: 'Selecione o tipo'
        },
        {
            id: 'M',
            label: 'Órgão central'
        },
        {
            id: 'U',
            label: 'Unidade'
        },
        {
            id: 'S',
            label: 'Setor'
        },
        {
            id: 'SIS',
            label: 'Sistema'
        },
    ];

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            ativo: [null],
            nome: [null],
            descricao: [null],
            modalidadeOrgaoCentral: [null],
            notificacao: [null],
            unidade: [null],
            setor: [null],
            tipo: [null],
            sistema: [null]
        });
        this.orgaoCentralPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.setorPagination.filter = {parent: 'isNull'};

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.form.get('unidade').value && this.form.get('tipo').value === 'S') {
            this.form.get('setor').enable();
            this.setorPagination.filter['unidade.id'] = `eq:${this.form.get('unidade').value.id}`;
            this.setorPagination.filter['parent'] = 'isNotNull';

            this._changeDetectorRef.markForCheck();
        }


        this.form.get('tipo').valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value) => {
                    switch (value) {
                        case 'M':
                            this.form.get('modalidadeOrgaoCentral').enable();
                            this.form.get('unidade').setValue(null);
                            this.form.get('unidade').disable();
                            this.form.get('setor').setValue(null);
                            this.form.get('setor').disable();
                            break;
                        case 'U':
                            this.form.get('unidade').enable();
                            this.form.get('unidade').setValue(null);
                            this.form.get('modalidadeOrgaoCentral').setValue(null);
                            this.form.get('modalidadeOrgaoCentral').disable();
                            this.form.get('setor').setValue(null);
                            this.form.get('setor').disable();
                            break;
                        case 'S':
                            this.form.get('modalidadeOrgaoCentral').setValue(null);
                            this.form.get('modalidadeOrgaoCentral').disable();
                            this.form.get('unidade').setValue(null);
                            this.form.get('unidade').enable();
                            if (this.form.get('unidade').value && typeof this.form.get('unidade').value === 'object') {
                                this.form.get('setor').enable();
                                this.form.get('setor').reset();
                                this.setorPagination.filter['unidade.id'] = `eq:${this.form.get('unidade').value.id}`;
                                this.setorPagination.filter['parent'] = 'isNotNull';
                            }
                            break;
                        default:
                            this.form.get('modalidadeOrgaoCentral').setValue(null);
                            this.form.get('modalidadeOrgaoCentral').disable();
                            this.form.get('unidade').setValue(null);
                            this.form.get('unidade').disable();
                            this.form.get('setor').setValue(null);
                            this.form.get('setor').disable();
                            break;
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidade').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (this.form.get('tipo').value === 'S' && value && typeof value === 'object') {
                        this.form.get('setor').enable();
                        this.form.get('setor').reset();
                        this.setorPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorPagination.filter['parent'] = 'isNotNull';
                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.form.get('setor').disable();
                        this.form.get('setor').reset();
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
        if (changes['aviso'] && this.aviso && ((!this.aviso.id && !this.form.dirty) || (this.aviso.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.aviso.id,
                nome: this.aviso.nome,
                descricao: this.aviso.descricao,
                ativo: this.aviso.ativo
            });

            this.aviso?.vinculacoesAvisos?.forEach((vinculo) => {
                if(vinculo.setor?.id)
                {
                    this.form.get('tipo').setValue('S');
                    this.form.get('setor').setValue(vinculo.setor);
                    this.form.get('unidade').setValue(vinculo.setor.unidade);
                }

                if(vinculo.unidade?.id)
                {
                    this.form.get('tipo').setValue('U');
                    this.form.get('unidade').setValue(vinculo.unidade);
                }

                if(vinculo.modalidadeOrgaoCentral?.id)
                {
                    this.form.get('tipo').setValue('M');
                    this.form.get('modalidadeOrgaoCentral').setValue(vinculo.modalidadeOrgaoCentral);
                }
            });

            if(this.aviso?.sistema)
            {
                this.form.get('tipo').setValue('SIS');
            }
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

    cancel(): void {
        this.activeCard = 'form';
    }

    checkUnidade(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    selectUnidade(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    showUnidadeGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }


    checkOrgaoCentral(): void {
        const value = this.form.get('modalidadeOrgaoCentral').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeOrgaoCentral').setValue(null);
        }
    }

    selectOrgaoCentral(orgaoCentral: ModalidadeOrgaoCentral): void {
        if (orgaoCentral) {
            this.form.get('modalidadeOrgaoCentral').setValue(orgaoCentral);
        }
        this.activeCard = 'form';
    }

    showOrgaoCentralGrid(): void {
        this.activeCard = 'modalidade-orgao-central-gridsearch';
    }

    checkSetor(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    showSelectTipo(): boolean {
        return this._loginService.isGranted('ROLE_ADMIN') && this._router.url.indexOf('/admin/') !== -1;
    }
}
