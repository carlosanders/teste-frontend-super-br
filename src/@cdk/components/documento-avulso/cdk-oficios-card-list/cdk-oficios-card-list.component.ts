import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {cdkAnimations} from '@cdk/animations';
import {
    CdkOficiosTarefaGroupInterface
} from '@cdk/components/documento-avulso/cdk-oficios-card-list/cdk-oficios-tarefa-group.interface';
import {DocumentoAvulso} from '@cdk/models';

@Component({
    selector: 'cdk-oficios-card-list',
    templateUrl: './cdk-oficios-card-list.component.html',
    styleUrls: ['./cdk-oficios-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkOficiosCardListComponent {

    @Input() actions: string[] = ['select', 'remeter', 'verResposta'];
    @Input() selectedIds: number[] = [];
    @Input() remeterIds: number[] = [];
    @Input() isIndeterminate: boolean = false;
    @Input() saving: boolean = false;
    @Input() loading: boolean = false;
    @Input('tarefasAgrupadas') set agrupaTarefas(tarefasAgrupadas: {[tarefaId: number]: CdkOficiosTarefaGroupInterface}) {
        const processos = {};

        Object.keys(tarefasAgrupadas).forEach((tarefaId) => {
            const grupoTarefa = tarefasAgrupadas[tarefaId];
            if (!processos[grupoTarefa.nupFormatado]) {
                processos[grupoTarefa.nupFormatado] = {tarefas: []};
            }
            processos[grupoTarefa.nupFormatado].tarefas.push(grupoTarefa);
        });

        this.processos = processos;
    }
    @Input() oficios: DocumentoAvulso[] = [];

    @Output() clicked: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();
    @Output() verResposta: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();
    @Output() getMore: EventEmitter<number> = new EventEmitter<number>();
    @Output() changedSelectedIds: EventEmitter<number[]> = new EventEmitter<number[]>();
    @Output() remeterBloco: EventEmitter<DocumentoAvulso[]> = new EventEmitter<DocumentoAvulso[]>();
    @Output() remeter: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    hasSelected: boolean = false;
    processos: {[nupFormatado: string]: {[tarefaId: number]: CdkOficiosTarefaGroupInterface}} = {};

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    toggleInSelected(documenvoAvulso: DocumentoAvulso): void {
        const selectedDocumentoIds = [...this.selectedIds];
        if (selectedDocumentoIds.find(id => id === documenvoAvulso.id) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documenvoAvulso.id);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documenvoAvulso.id];
        }
        this.hasSelected = this.selectedIds.length > 0;
        this.changedSelectedIds.emit(this.selectedIds);
        this.isIndeterminate = (this.selectedIds.length !== this.oficios.length && this.selectedIds.length > 0);
    }


    doVerResposta(documentoAvulso: DocumentoAvulso): void {
        this.verResposta.emit(documentoAvulso);
    }

    onClick(documentoAvulso: DocumentoAvulso): void {
        this.clicked.emit(documentoAvulso);
    }

    toggleSelectAll(event: MouseEvent): void {
        event.preventDefault();
        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        this.selectedIds = Object.keys(this.oficios).map(i => this.oficios[i].id);
        this.recompute();
    }

    /**
     * Deselect all documentos
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.oficios.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
    }

    doGetMore(tarefaId: number): void {
        this.getMore.emit(tarefaId);
    }

    trackBy(index, documentoAvulso: DocumentoAvulso): number {
        return documentoAvulso.id;
    }

    getDocumentoAvulsos(ids: number[]): DocumentoAvulso[] {
        return ids.map((id) => this.oficios.find((oficio) => oficio.id === id))
    }

    doRemeterBloco(): void {
        this.remeterBloco.emit(this.selectedIds.map((id) => this.oficios.find((oficio) => oficio.id === id)));
    }

    doRemeter(documentoAvulso: DocumentoAvulso): void {
        this.remeter.emit(documentoAvulso);
    }
}
