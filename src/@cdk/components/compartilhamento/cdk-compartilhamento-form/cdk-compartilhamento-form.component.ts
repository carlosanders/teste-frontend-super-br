import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Compartilhamento, Pagination, Usuario, Setor, GrupoContato} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'cdk-compartilhamento-form',
    templateUrl: './cdk-compartilhamento-form.component.html',
    styleUrls: ['./cdk-compartilhamento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCompartilhamentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    compartilhamento: Compartilhamento;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    selected = false;

    selectedSetor = false;

    selectedGrupoContato = false;

    @Input()
    errors: any;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    setoresPagination: Pagination;

    @Input()
    grupoContatoPagination: Pagination;

    @Input()
    mode = 'vertical';

    @Input()
    modalidadeCompartilhamento = 'usuario';

    @Output()
    save = new EventEmitter<Compartilhamento>();

    @Output()
    abort = new EventEmitter<any>();

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
            processo: [null],
            tarefa: [null],
            usuario: [null],
            setor: [null],
            grupoContato: [null],
            modalidadeCompartilhamento: [null]
        });
        this.usuarioPagination = new Pagination();
        this.setoresPagination = new Pagination();
        this.grupoContatoPagination = new Pagination();

        this.form.get('usuario').valueChanges.subscribe((valor) => {
            this.selected = typeof valor === 'object';
        });
        this.form.get('setor').valueChanges.subscribe((valor) => {
            this.selectedSetor = typeof valor === 'object';
        });
        this.form.get('grupoContato').valueChanges.subscribe((valor) => {
            this.selectedGrupoContato = typeof valor === 'object';
        });


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('modalidadeCompartilhamento').setValue(this.modalidadeCompartilhamento);

        this.form.get('modalidadeCompartilhamento').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value === 'setor') {
                        this.form.get('setor').enable();
                        this.form.get('usuario').disable();
                        this.form.get('grupoContato').disable();
                    } else if (value === 'usuario'){
                        this.form.get('usuario').enable();
                        this.form.get('setor').disable();
                        this.form.get('grupoContato').disable();
                    } else if (value === 'grupoContato'){
                        this.form.get('grupoContato').enable();
                        this.form.get('setor').disable();
                        this.form.get('usuario').disable();
                    }
                this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

    }
    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['compartilhamento'] && this.compartilhamento && ((!this.compartilhamento.id && !this.form.dirty) || (this.compartilhamento.id !== this.form.get('id').value))) {
            this.form.reset();
            this.form.patchValue({...this.compartilhamento});
            this.form.get('modalidadeCompartilhamento').setValue(this.modalidadeCompartilhamento);
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

    checkGrupoContato(): void {
        const value = this.form.get('grupoContato').value;
        if (!value || typeof value !== 'object') {
            this.form.get('grupo_contato').setValue(null);
        }
    }

    selectGrupoContato(grupoContato: GrupoContato): void {
        if (grupoContato) {
            this.form.get('grupoContato').setValue(grupoContato);
        }
        this.activeCard = 'form';
    }

    showGrupoContatoGrid(): void {
        this.activeCard = 'grupo-contato-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
