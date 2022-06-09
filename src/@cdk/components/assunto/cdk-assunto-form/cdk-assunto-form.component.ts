import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assunto, AssuntoAdministrativo, Pagination} from '@cdk/models';
import {FavoritoService} from '../../../services/favorito.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-assunto-form',
    templateUrl: './cdk-assunto-form.component.html',
    styleUrls: ['./cdk-assunto-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    assunto: Assunto;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Assunto>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    assuntoAdministrativoPagination: Pagination;

    @Input()
    form: FormGroup;

    activeCard = 'form';

    assuntoAdministrativoList: AssuntoAdministrativo[] = [];

    assuntoAdministrativoListIsLoading: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            processo: [null, [Validators.required]],
            principal: [null],
            assuntoAdministrativo: [null, [Validators.required]]
        });

        this.assuntoAdministrativoPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.assuntoAdministrativoPagination.populate = ['parent'];
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['assunto'] && this.assunto && ((!this.assunto.id && !this.form.dirty) || (this.assunto.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.assunto});
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
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkAssuntoAdministrativo(): void {
        const value = this.form.get('assuntoAdministrativo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('assuntoAdministrativo').setValue(null);
        }
    }

    selectAssuntoAdministrativo(assuntoAdministrativo: AssuntoAdministrativo): void {
        if (assuntoAdministrativo) {
            this.form.get('assuntoAdministrativo').setValue(assuntoAdministrativo);
        }
        this.activeCard = 'form';
    }

    showAssuntoAdministrativoGrid(): void {
        this.activeCard = 'assunto-administrativo-gridsearch';
    }

    showAssuntoAdministrativoGridTree(): void {
        this.activeCard = 'assunto-administrativo-grid-tree';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    getFavoritosAssuntoAdministrativo(): void {
        this.assuntoAdministrativoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\AssuntoAdministrativo',
                context: 'eq:assunto_' + this.assunto.processo.especieProcesso.id + '_assunto_administrativo'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.assuntoAdministrativoPagination.populate)
        ).pipe(
            finalize(() => this.assuntoAdministrativoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.assuntoAdministrativoList = [];
                response['entities'].forEach((favorito) => {
                    this.assuntoAdministrativoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
