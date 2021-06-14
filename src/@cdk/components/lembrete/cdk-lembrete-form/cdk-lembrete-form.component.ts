import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lembrete, Pagination, Processo} from '../../../models';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {LembreteService} from '../../../services/lembrete.service';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-lembrete-form',
    templateUrl: './cdk-lembrete-form.component.html',
    styleUrls: ['./cdk-lembrete-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLembreteFormComponent implements OnInit, OnChanges {

    activeCard = 'form';
    form: FormGroup;

    /**
     * Outputs
     */

    @Input()
    lembrete: Lembrete;

    @Input()
    total: number;

    @Input()
    logEntryPaginationLembrete: Pagination;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    processo: number;

    @Input()
    lembretes: Lembrete[];

    @Input()
    pagination: Pagination;

    @Input()
    isBloco: boolean;

    @Output()
    save = new EventEmitter<Lembrete>();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    loading: boolean;

    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _lembreteService: LembreteService,
    ) {
        this.loadForm();
        this.loading = false;
        this.pagination = new Pagination();
        if (this.isBloco === null) {
            this.isBloco = false;
        }
    }

    ngOnInit(): void {
        this.setProcesso();
        this.load(this.pagination);
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            processo: [null, [Validators.required]],
            conteudo: [null, [Validators.required, Validators.maxLength(255)]],
        });
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    setProcesso(): void {
        const processo = new Processo();
        processo.id = this.processo;
        this.form.get('processo').setValue(processo);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
        this.form.get('conteudo').setValue('');
    }

    doAbort(): void {
        this.abort.emit();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['lembretes'] && this.lembrete && ((!this.lembrete.id && !this.form.dirty) || (this.lembrete.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.lembrete});
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

    showLogLembreteGrid(): void {
        this.activeCard = 'lembrete-gridsearch';
    }

    doReload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.reload.emit(params);
    }

    load(params): void {

        this.loading = true;

        this._lembreteService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.lembretes = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }
}
