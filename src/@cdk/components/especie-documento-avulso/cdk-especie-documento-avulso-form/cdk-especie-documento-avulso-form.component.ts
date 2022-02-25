import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {Criteria, EspecieDocumentoAvulso, EspecieProcesso, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '@cdk/animations';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-especie-documento-avulso-form',
    templateUrl: './cdk-especie-documento-avulso-form.component.html',
    styleUrls: ['./cdk-especie-documento-avulso-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieDocumentoAvulsoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    especieDocumentoAvulso: EspecieDocumentoAvulso;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoDocumentoAvulsoPagination: Pagination;

    @Input()
    especieTarefaPagination: Pagination;

    @Input()
    especieProcessoPagination: Pagination;

    @Input()
    workflowPagination: Pagination;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    tarefaIniciaList: Criteria[] = [
        {
            ...new Criteria(),
            id: 1,
            descricao: 'Tarefa Padrão',
            valor: 1
        },
        {
            ...new Criteria(),
            id: 2,
            descricao: 'Tarefa Específica',
            valor: 2
        },
        {
            ...new Criteria(),
            id: 3,
            descricao: 'Workflow',
            valor: 3
        }
    ];

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoDocumentoAvulso: [null, [Validators.required]],
            tarefaInicial: [null, [Validators.required]],
            especieTarefa: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
            workflow: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }

    ngOnInit(): void {
        this.form.get('tarefaInicial').valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value) => {
                this.tarefaInicialValuesChange(value);
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
        this.form.get('especieProcesso').valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value: EspecieProcesso) => {
                if (value?.generoProcesso) {
                    if (this.form.get('workflow')?.enabled && this.form.get('workflow').value?.generoProcesso?.id !== value?.generoProcesso?.id) {
                        this.form.get('workflow').reset();
                    }
                    this.workflowPagination.filter = {
                        'generoProcesso.id': `eq:${value.generoProcesso.id}`
                    };
                } else {
                    delete this.workflowPagination?.filter['generoProcesso.id'];
                }
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieDocumentoAvulso'] && this.especieDocumentoAvulso && ((!this.especieDocumentoAvulso.id && !this.form.dirty) || (this.especieDocumentoAvulso.id !== this.form.get('id').value))) {
            let tarefaInicialValue = 1;
            if (this.especieDocumentoAvulso?.workflow) {
                tarefaInicialValue = 3;
            } else if (this.especieDocumentoAvulso?.especieProcesso) {
                tarefaInicialValue = 2;
            }
            this.tarefaInicialValuesChange(tarefaInicialValue);
            this.form.patchValue({...this.especieDocumentoAvulso, tarefaInicial: tarefaInicialValue});
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

    private tarefaInicialValuesChange(value: number): void {
        switch (value) {
            case 2:
                this.form.get('workflow').disable();
                this.form.get('especieProcesso').enable();
                this.form.get('especieTarefa').enable();
                this.form.get('especieProcesso').setValue(null);
                this.form.get('especieTarefa').setValue(null);
                this.form.get('workflow').setValue(null);
                break;
            case 3:
                this.form.get('especieTarefa').disable();
                this.form.get('especieProcesso').enable();
                this.form.get('workflow').enable();
                this.form.get('especieTarefa').setValue(null);
                this.form.get('especieProcesso').setValue(null);
                this.form.get('workflow').setValue(null);
                break;
            default:
                this.form.get('especieProcesso').disable();
                this.form.get('especieTarefa').disable();
                this.form.get('workflow').disable();
                this.form.get('especieTarefa').setValue(null);
                this.form.get('especieProcesso').setValue(null);
                this.form.get('workflow').setValue(null);
                break;
        }
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

    showGrid(gridActiveCard: string): void {
        this.activeCard = gridActiveCard;
    }

    selectItem(model: any, formCtrl: string): void {
        if (model) {
            this.form.get(formCtrl).setValue(model);
        }

        this.activeCard = 'form';
    }

}
