import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';

@Component({
    selector: 'cdk-documento-avulso-list-item',
    templateUrl: './cdk-documento-avulso-list-item.component.html',
    styleUrls: ['./cdk-documento-avulso-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkDocumentoAvulsoListItemComponent implements OnInit {

    @Input()
    documentoAvulso: DocumentoAvulso;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedDocumentosAvulso = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    toggleUrgente = new EventEmitter<DocumentoAvulso>();

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
        this.draggable.data = this.documentoAvulso;
    }

    doDelete(): void {
        this.delete.emit(this.documentoAvulso.id);
    }

    doMovimentar(): void {
        this.movimentar.emit(this.documentoAvulso.id);
    }

    doCompartilhar(): void {
        this.compartilhar.emit(this.documentoAvulso.id);
    }

    /*doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.tarefa.id);
    }

    doCreateTarefa(): void {
        this.createTarefa.emit({tarefaId: this.tarefa.id, processoId: this.tarefa.processo.id});
    }*/

    /*doEditDocumentoAvulso(): void {
        this.doEditDocumentoAvulso.emit(this.documentoAvulso.id);
    }*/

    onSelectedChange(): void {
        this.toggleInSelectedDocumentosAvulso.emit(this.documentoAvulso.id);
    }

    doToggleUrgente(): void {
        this.toggleUrgente.emit(this.documentoAvulso);
    }
}
