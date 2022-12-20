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
import {Pagination, Setor, Usuario} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';
import {Contato} from '../../../models/contato.model';
import {TipoContato} from '../../../models/tipo-contato.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-contato-form',
    templateUrl: './cdk-contato-form.component.html',
    styleUrls: ['./cdk-contato-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkContatoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    contato: Contato;

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

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            unidade: [null],
            setor: [null],
            usuario: [null],
            grupoContato: [null],
            tipoContato: [null, [Validators.required]],
        });

        this.usuarioPagination = new Pagination();
        this.usuarioPagination['populate'] = ['colaborador'];
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['contato'] && this.contato && ((!this.contato.id && !this.form.dirty) || (this.contato.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.contato.id,
                tipoContato: this.contato.tipoContato,
                usuario: this.contato.usuario,
                unidade: this.contato.unidade,
                setor: this.contato.setor,
                grupoContato: this.contato.grupoContato,
            });
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

    ngOnInit(): void {

        this.form.get('unidade').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        if (this.form.get('setor')) {
                            this.setorPagination.filter['unidade.id'] = `eq:${value.id}`;
                            this.setorPagination.filter['parent'] = 'isNotNull';
                        }
                        this._changeDetectorRef.markForCheck();
                    }
                 return of([]);
                }
            )
        ).subscribe();

        this.form.get('tipoContato').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.form.get('usuario').setValue(null);
                    this.form.get('unidade').setValue(null);
                    this.form.get('setor').setValue(null);

                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();
    }

    checkTipoContato(): void {
        const value = this.form.get('tipoContato').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoContato').setValue(null);
        }

        this.form.get('setor').setValue(null);
        this.form.get('unidade').setValue(null);
        this.form.get('usuario').setValue(null);
    }

    selectTipoContato(tipoContato: TipoContato): void {
        if (tipoContato) {
            this.form.get('tipoContato').setValue(tipoContato);
        }

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

    showTipoContatoGrid(): void {
        this.activeCard = 'tipo-contato-gridsearch';
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }
}
