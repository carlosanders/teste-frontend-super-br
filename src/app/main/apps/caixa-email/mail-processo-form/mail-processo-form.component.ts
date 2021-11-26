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
import {Pagination, Processo} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {Message} from '../models/message.model';

@Component({
    selector: 'mail-processo-form',
    templateUrl: './mail-processo-form.component.html',
    styleUrls: ['./mail-processo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MailProcessoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    message: Message;

    @Input()
    saving: boolean;

    @Input()
    loading: boolean;

    @Input()
    errors: any;

    @Input()
    processoPagination: Pagination;

    @Output()
    saveHandler = new EventEmitter<any>();

    @Output()
    cancelarHandler = new EventEmitter<any>();

    private _unsubscribeAll: Subject<any> = new Subject();
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
            tipo: ['processo_existente'],
            processo: [null, [Validators.required]]
        });

        this.processoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('tipo').setValue('processo_existente');

        this.form.get('tipo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll),
            switchMap((value) => {
                    if (value === 'processo_existente') {
                        this.form.get('processo').enable();
                    } else {
                        this.form.get('processo').disable();
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
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void
    {
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
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void
    {
        if (this.form.valid) {
            this.saveHandler.emit(this.form.value);
        }
    }

    cancel(): void
    {
        this.activeCard = 'form';
    }

    checkProcesso(): void
    {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void
    {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    cancelar(): void
    {
        this.form.reset();
        this.cancelarHandler.emit();
    }

    showProcessoGrid(): void
    {
        this.activeCard = 'processo-gridsearch';
    }

}
