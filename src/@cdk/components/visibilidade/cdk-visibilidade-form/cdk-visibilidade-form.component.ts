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
import {Pagination, Setor, Usuario, Visibilidade} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-visibilidade-form',
    templateUrl: './cdk-visibilidade-form.component.html',
    styleUrls: ['./cdk-visibilidade-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVisibilidadeFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    visibilidade: Visibilidade;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    actions: string[] = ['save', 'abort'];

    @Output()
    save = new EventEmitter<Visibilidade>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            usuario: [null, [Validators.required]],
            unidade: [null, [Validators.required]],
            setor: [null, [Validators.required]],
            tipo: [null],
            poderes: [null, [Validators.required]]
        });
        this.usuarioPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.unidadePagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('tipo').setValue('usuario');
        this.form.get('poderes').setValue('master');

        this.form.get('tipo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.form.get('usuario').reset();
                    this.form.get('setor').reset();
                    this.form.get('unidade').reset();
                    if (value === 'usuario') {
                        this.form.get('usuario').enable();
                        this.form.get('unidade').disable();
                        this.form.get('setor').disable();
                    }
                    if (value === 'setor') {
                        this.form.get('unidade').enable();
                        this.form.get('setor').disable();
                        this.form.get('usuario').disable();
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
                    if (value && typeof value === 'object') {
                        this.form.get('setor').enable();
                        this.form.get('setor').reset();
                        this.setorPagination.filter['unidade.id'] = `eq:${value.id}`;
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('usuario').enable();
        this.form.get('setor').disable();
        this.form.get('unidade').disable();

    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['visibilidade'] && this.visibilidade && ((!this.visibilidade.id && !this.form.dirty) || (this.visibilidade.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.visibilidade});
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

            const visibilidade = new Visibilidade();
            visibilidade.tipo = this.form.get('tipo').value;

            switch (this.form.get('tipo').value) {
                case 'usuario':
                    visibilidade.valor = this.form.get('usuario').value.id;
                    break;
                case 'setor':
                    visibilidade.valor = this.form.get('setor').value.id;
                    break;
            }

            switch (this.form.get('poderes').value) {
                case 'master':
                    visibilidade.poderes = ['master'];
                    break;
                case 'ver':
                    visibilidade.poderes = ['ver'];
                    break;
                case 'ver_editar':
                    visibilidade.poderes = ['ver', 'editar'];
                    break;
                case 'ver_editar_apagar':
                    visibilidade.poderes = ['ver', 'editar', 'apagar'];
                    break;
            }

            this.save.emit(visibilidade);
        }
    }

    doAbort(): void {
        this.abort.emit();
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

        if (setor !== null && typeof setor === 'object') {
            if (setor.unidade && setor.unidade !== this.form.get('unidade').value) {
                this.form.get('unidade').setValue(setor.unidade, {emitEvent: false});
            }
        }

        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    showSetorTree(): void {
        this.activeCard = 'setor-tree';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
