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
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AssuntoAdministrativo, Colaborador, Criteria, Pagination, Setor, Usuario} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'cdk-criteria-form',
    templateUrl: './cdk-criteria-form.component.html',
    styleUrls: ['./cdk-criteria-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCriteriaFormComponent implements OnInit, OnChanges, OnDestroy {

    criteria: Criteria;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<Criteria>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieCriteriaList: Criteria[];

    @Input()
    unidadeRecebidoPagination: Pagination;

    @Input()
    usuarioRecebidoPagination: Pagination;

    @Input()
    setorRecebidoPagination: Pagination;

    @Input()
    assuntoAdministrativoPagination: Pagination;

    @Input()
    form: FormGroup;

    criteriaSelect = new FormControl();

    activeCard = 'form';

    _profile: Colaborador;

    assuntoAdministrativoList: AssuntoAdministrativo[] = [];

    assuntoAdministrativoListIsLoading: boolean;


    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile().colaborador;

        this.form = this._formBuilder.group({
            criteria: [null],
            unidade: [null],
            setor: [null],
            usuario: [null],
            valor: [null],
            exibicao: [null],
            assuntoAdministrativo: [null]
        });
        this.unidadeRecebidoPagination = new Pagination();
        this.unidadeRecebidoPagination.filter = {parent: 'isNull'};
        this.setorRecebidoPagination = new Pagination();
        this.setorRecebidoPagination.filter = {parent: 'isNotNull'};
        this.usuarioRecebidoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.criteriaSelect.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.form.get('valor').reset();
                    this.form.get('valor').enable();
                    this.form.get('unidade').reset();
                    this.form.get('setor').reset();
                    this.form.get('usuario').reset();
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('valor').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.form.get('exibicao').setValue(value);
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidade').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object' && this.criteriaSelect.value?.id === 2) {
                        this.form.get('setor').enable();
                        this.form.get('setor').reset();
                        this.form.get('valor').reset();
                        this.form.get('exibicao').reset();
                        this.setorRecebidoPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorRecebidoPagination.filter['parent'] = 'isNotNull';
                        this._changeDetectorRef.markForCheck();
                    } else if (value && typeof value === 'object' && this.criteriaSelect.value?.id === 3) {
                        this.form.get('valor').setValue(value.id, {emitEvent: false});
                        this.form.get('exibicao').setValue(value.nome);
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setor').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object' && this.criteriaSelect.value?.id === 2) {
                        this.form.get('valor').setValue(value.id, {emitEvent: false});
                        this.form.get('exibicao').setValue(value.unidade.nome + ' - ' + value.nome);
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('usuario').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object' && this.criteriaSelect.value?.id === 4) {
                        this.form.get('valor').setValue(value.id, {emitEvent: false});
                        this.form.get('exibicao').setValue(value.nome);
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('assuntoAdministrativo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object' && this.criteriaSelect.value?.id === 5) {
                        this.form.get('valor').setValue(value.id, {emitEvent: false});
                        this.form.get('exibicao').setValue(value.nome);
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
        if (changes['criteria'] && this.criteria && (!this.criteria.id || (this.criteria.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.criteria});
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
            const criteria = new Criteria();
            criteria.id = this.criteriaSelect.value?.id;
            criteria.descricao = this.criteriaSelect.value.descricao;
            criteria.mapeamento = this.criteriaSelect.value.mapeamento;
            criteria.valor = this.form.value.valor;
            criteria.exibicao = this.form.value.exibicao;
            this.save.emit(criteria);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkUnidadeOrigem(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeOrigemGrid(): void {
        this.activeCard = 'unidade-origem-gridsearch';
    }

    selectUnidadeOrigem(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    checkSetorRecebido(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
            this.form.get('valor').setValue(null);
        }
    }

    showSetorRecebidoGrid(): void {
        this.activeCard = 'setor-recebido-gridsearch';
    }

    selectSetorRecebido(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidadeRecebido(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
            this.form.get('valor').setValue(null);
        }
    }

    showUnidadeRecebidoGrid(): void {
        this.activeCard = 'unidade-recebido-gridsearch';
    }

    selectUnidadeRecebido(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    checkUsuarioRecebido(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
            this.form.get('valor').setValue(null);
        }
    }

    showUsuarioRecebidoGrid(): void {
        this.activeCard = 'usuario-recebido-gridsearch';
    }

    selectUsuarioRecebido(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuario').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    checkAssuntoAdministrativo(): void {
        const value = this.form.get('assuntoAdministrativo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('assuntoAdministrativo').setValue(null);
        }
    }

    showAssuntoAdministrativoGrid(): void {
        this.activeCard = 'assunto-administrativo-gridsearch';
    }

    showAssuntoAdministrativoGridTree(): void {
        this.activeCard = 'assunto-administrativo-grid-tree';
    }

    selectAssuntoAdministrativo(assuntoAdministrativo: AssuntoAdministrativo): void {
        if (assuntoAdministrativo) {
            this.form.get('assuntoAdministrativo').setValue(assuntoAdministrativo);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
