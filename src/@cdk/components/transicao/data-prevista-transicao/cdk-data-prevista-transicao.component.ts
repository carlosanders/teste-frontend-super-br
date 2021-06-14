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
import {Pagination, Processo} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-data-prevista-transicao',
    templateUrl: './cdk-data-prevista-transicao.component.html',
    styleUrls: ['./cdk-data-prevista-transicao.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDataPrevistaTransicaoComponent implements OnInit, OnChanges {

    @Input()
    processoId: number;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Processo>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
        this.processoPagination = new Pagination();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            dataHoraProximaTransicao: [null, [Validators.required]],
            processo: [null]
        });
    }

    ngOnInit(): void {
        this.setProcesso();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

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

    setProcesso(): void {
        const processoId = parseInt(String(this.processoId), 10);
        const processo = new Processo();

        processo.id = processoId;
        processo.dataHoraProximaTransicao = this.form.value.dataHoraProximaTransicao;
        this.form.get('processo').setValue(processo);
    }

    submit(): void {
        if (this.form.valid) {
            this.setProcesso();
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
