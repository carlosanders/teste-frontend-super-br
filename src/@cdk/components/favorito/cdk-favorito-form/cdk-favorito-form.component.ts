import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Favorito } from '@cdk/models/favorito.model';
import {Pagination} from '@cdk/models/pagination';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';
import {EspecieTarefa} from '../../../models/especie-tarefa.model';
import {Setor} from '../../../models/setor.model';

@Component({
    selector: 'cdk-favorito-form',
    templateUrl: './cdk-favorito-form.component.html',
    styleUrls: ['./cdk-favorito-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkFavoritoFormComponent implements OnChanges, OnDestroy {

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

    form: FormGroup;

    activeCard = 'form';

    @Input()
    templatePagination: Pagination;

    displayedColumns: string[] = ['nome', 'actions'];

    @Input()
    showEspecieAtividade: boolean;

    @Input()
    showEspecieTarefa: boolean;

    @Input()
    showSetorResponsavel: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            especieAtividade: [null],
            especieTarefa: [null],
            setorResponsavel: [null]
        });

        this.templatePagination = new Pagination();

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

}