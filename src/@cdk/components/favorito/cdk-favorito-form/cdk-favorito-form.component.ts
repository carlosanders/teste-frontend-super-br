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
import {EspecieAtividade, EspecieTarefa, Favorito, Pagination, Setor} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-favorito-form',
    templateUrl: './cdk-favorito-form.component.html',
    styleUrls: ['./cdk-favorito-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkFavoritoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    favorito: Favorito;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Favorito>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    templatePagination: Pagination;

    displayedColumns: string[] = ['nome', 'actions'];

    @Input()
    unidadeResponsavelPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            label: [null, [Validators.required]],
            prioritario: [null],
            campo: [null, [Validators.required]],
            context: [null],
            especieAtividade: [null],
            especieTarefa: [null],
            unidadeResponsavel: [null],
            setorResponsavel: [null]
        });

        this.templatePagination = new Pagination();
        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['favorito'] && this.favorito && (!this.favorito.id || (this.favorito.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.favorito});
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
        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    ngOnInit(): void {

        if (this.form.get('setorResponsavel')) {
            this.form.get('setorResponsavel').disable();
        }

        if (this.form.get('unidadeResponsavel')) {
            this.form.get('unidadeResponsavel').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value && typeof value === 'object') {
                            this.form.get('setorResponsavel').enable();
                            this.form.get('setorResponsavel').reset();
                            this.templatePagination.filter['unidade.id'] = `eq:${value.id}`;
                            this.templatePagination.filter['parent'] = 'isNotNull';
                            this._changeDetectorRef.markForCheck();
                        }
                        if (value === null) {
                            this.form.get('setorResponsavel').setValue('');
                            this.form.get('setorResponsavel').disable();
                        }
                        return of([]);
                    }
                )
            ).subscribe();
        }

        if (this.form.get('campo') && !this.favorito.id) {
            this.form.get('campo').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value === 1){
                            this.form.get('label').setValue('ESPÉCIE ATIVIDADE');
                            this.form.get('especieAtividade').enable();
                            this.form.get('especieTarefa').disable();
                            this.form.get('unidadeResponsavel').disable();
                        }
                        if (value === 2){
                            this.form.get('label').setValue('ESPÉCIE TAREFA');
                            this.form.get('especieTarefa').enable();
                            this.form.get('especieAtividade').disable();
                            this.form.get('unidadeResponsavel').disable();
                        }
                        if (value === 3){
                            this.form.get('label').setValue('SETOR');
                            this.form.get('unidadeResponsavel').enable();
                            this.form.get('especieAtividade').disable();
                            this.form.get('especieTarefa').disable();
                        }
                        return of([]);
                    }
                )
            ).subscribe();
        }

        if (this.favorito.id) {
            switch (this.favorito.objectClass) {

                case 'SuppCore\\AdministrativoBackend\\Entity\\EspecieAtividade':
                    this.form.get('campo').setValue(1);
                    this.form.get('especieAtividade').setValue(this.favorito.objFavoritoClass[0]);
                    this.form.get('especieAtividade').disable();
                    break;

                case 'SuppCore\\AdministrativoBackend\\Entity\\EspecieTarefa':
                    this.form.get('campo').setValue(2);
                    this.form.get('especieTarefa').setValue(this.favorito.objFavoritoClass[0]);
                    this.form.get('especieTarefa').disable();
                    break;

                case 'SuppCore\\AdministrativoBackend\\Entity\\Setor':
                    this.form.get('campo').setValue(3);
                    this.form.get('setorResponsavel').setValue(this.favorito.objFavoritoClass[0]);
                    this.form.get('setorResponsavel').disable();
                    break;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

    checkEspecieTarefa(): void {
        const value = this.form.get('especieTarefa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieTarefa').setValue(null);
        }
    }

    selectEspecieTarefa(especieTarefa: EspecieTarefa): void {
        if (especieTarefa) {
            this.form.get('especieTarefa').setValue(especieTarefa);
        }
        this.activeCard = 'form';
    }

    showEspecieTarefaGrid(): void {
        this.activeCard = 'especie-tarefa-gridsearch';
    }

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

    selectSetorResponsavel(setor: Setor): void {
        if (setor) {
            this.form.get('setorResponsavel').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkSetorResponsavel(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }
    }

    showSetorResponsavelGrid(): void {
        this.activeCard = 'setor-gridsearch';
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


}
