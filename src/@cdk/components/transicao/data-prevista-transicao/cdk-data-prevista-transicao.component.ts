import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {Pagination, Processo} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'cdk-data-prevista-transicao',
    templateUrl: './cdk-data-prevista-transicao.component.html',
    styleUrls: ['./cdk-data-prevista-transicao.component.scss']
})
export class CdkDataPrevistaTransicaoComponent implements OnInit {


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


}
