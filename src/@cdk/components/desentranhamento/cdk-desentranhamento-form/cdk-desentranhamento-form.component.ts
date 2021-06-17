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
import {Desentranhamento, Pagination, Processo} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-desentranhamento-form',
    templateUrl: './cdk-desentranhamento-form.component.html',
    styleUrls: ['./cdk-desentranhamento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDesentranhamentoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    desentranhamento: Desentranhamento;

    @Input()
    saving: boolean;

    @Input()
    selecionadas: any[] = [];

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Desentranhamento>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoDestinoPagination: Pagination;

    valid: boolean = false;

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
            observacao: [null, [Validators.required]],
            processoDestino: [null, [Validators.required]],
            checkCiencia: [null, [Validators.required]]
        });

        this.processoDestinoPagination = new Pagination();
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
            switchMap((value) => {
                    if (value === 'processo_existente') {
                        this.form.get('processoDestino').enable();
                    } else {
                        this.form.get('processoDestino').disable();
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
        if (changes['desentranhamento'] && this.desentranhamento && (!this.desentranhamento.id || (this.desentranhamento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.desentranhamento});
        }

        if (changes['selecionadas']) {
            this.valid = this.selecionadas.length > 0;
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

    checkProcessoDestino(): void {
        const value = this.form.get('processoDestino').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processoDestino').setValue(null);
        }
    }

    selectProcesso(processoDestino: Processo): void {
        if (processoDestino) {
            this.form.get('processoDestino').setValue(processoDestino);
        }
        this.activeCard = 'form';
    }

    showProcessoDestinoGrid(): void {
        this.activeCard = 'processo-destino-gridsearch';
    }

    checaCiencia(event): void {
        if (event.checked === false) {
            this.form.get('checkCiencia').setValue(null);
        }
    }

}
