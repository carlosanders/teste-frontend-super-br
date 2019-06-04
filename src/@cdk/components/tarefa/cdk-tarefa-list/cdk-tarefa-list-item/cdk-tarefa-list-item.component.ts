import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Tarefa} from '@cdk/models/tarefa.model';

@Component({
    selector: 'cdk-tarefa-list-item',
    templateUrl: './cdk-tarefa-list-item.component.html',
    styleUrls: ['./cdk-tarefa-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTarefaListItemComponent implements OnInit {

    @Input()
    tarefa: Tarefa;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedTarefas = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    etiquetar = new EventEmitter<number>();

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
        this.draggable.data = this.tarefa;
    }

    doDelete(): void {
        this.delete.emit(this.tarefa.id);
    }

    doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.tarefa.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedTarefas.emit(this.tarefa.id);
    }
}
