import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Processo} from '@cdk/models';

@Component({
    selector: 'cdk-processo-list-item',
    templateUrl: './cdk-processo-list-item.component.html',
    styleUrls: ['./cdk-processo-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkProcessoListItemComponent implements OnInit {

    @Input()
    processo: Processo;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedProcessos = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createProcesso = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();


    @Output()
    toggleUrgente = new EventEmitter<Processo>();

    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: null,
        effectAllowed: 'all',
        disable: false,
        handle: false
    };

    constructor() {
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.draggable.data = this.processo;
    }

    doDelete(): void {
        this.delete.emit(this.processo.id);
    }

    doMovimentar(): void {
        this.movimentar.emit(this.processo.id);
    }

    doCompartilhar(): void {
        this.compartilhar.emit(this.processo.id);
    }

    doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.processo.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedProcessos.emit(this.processo.id);
    }

}
