import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {Pagination, Processo} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-data-prevista-transicao',
    templateUrl: './data-prevista-transicao.component.html',
    styleUrls: ['./data-prevista-transicao.component.scss']
})
export class DataPrevistaTransicaoComponent implements OnInit {


    @Input()
    processoId: number;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Processo>();

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
        });
    }

    ngOnInit(): void {
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


}
