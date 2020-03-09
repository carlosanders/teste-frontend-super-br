import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento} from '@cdk/models';

@Component({
    selector: 'cdk-documento-card-list',
    templateUrl: './cdk-documento-card-list.component.html',
    styleUrls: ['./cdk-documento-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoCardListComponent implements OnInit, OnChanges {

    @Input()
    componenteChamador: String = null;

    @Input()
    documentos: Documento[];

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Input()
    deletingId: number[];

    @Input()
    assinandoId: number[];

    @Input()
    convertendoId: number[];

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    selectedIds: number[] = [];

    hasSelected = false;

    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {

/*@retirar
        this.mapDocumentos.clear();
        this.documentos.forEach(
            doc => this.addToMap(
                    this.mapDocumentos,
                    'processo: ' + doc.processoOrigem.NUP + '- tarefa: ' + doc.tarefaOrigem.id,
                    doc)
        );

        console.log(this.mapDocumentos);
*/
    }

/*
    addToMap(map:any, chave:any, valor:any){
        if ( map.has(chave) ) {
            // verificar se já tem no array dentro da chave
            //if (map.get(chave).indexOf(valor) == -1) {
               map.get(chave).push(valor);
            //}   
        } else {
            map.set(chave,[valor]);
        }
        //return map;
    }


    */

    deleteDocumento(documentoId): void {
        this.delete.emit(documentoId);
    }

    toggleInSelected(documentoId): void {
        const selectedDocumentoIds = [...this.selectedIds];
        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);

        if (this.componenteChamador === 'atividade-create-bloco') {
            this.changedSelectedIds.emit([documentoId]);
            console.log("chamador");
        } else {
            console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
            console.log(documentoId);
            console.log(this.selectedIds);
            this.changedSelectedIds.emit(this.selectedIds);
        }

  /*      if (this.componenteChamador === 'atividade-create-bloco') {
            this.changedSelectedIds.emit(documentoId);
            console.log("chamador");
            return;
        }

        const selectedDocumentoIds = [...this.selectedIds];

        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }

        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
console.log(documentoId);
console.log(this.selectedIds);
        this.changedSelectedIds.emit(this.selectedIds);*/
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doAssinatura(documentoId): void {
        this.assinatura.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }

    doDeleteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doDelete(documentoId));
    }

    doAssinaturaDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doAssinatura(documentoId));
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        ev.preventDefault();

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
        console.log("ooooooooooooooooooo");
        console.log(this.documentos);
        const arr = Object.keys(this.documentos).map(k => this.documentos[k]);
        console.log(arr);
        this.selectedIds = arr.map(documento => documento.id);
        this.recompute();
    }

    /**
     * Deselect all documentos
     */
    deselectAll(): void {
        if (this.componenteChamador === 'atividade-create-bloco') {
            this.changedSelectedIds.emit(this.selectedIds);
            // o esvaziamento do array contendo os ids é depois da emissão,
            // para que o componente atividade-create-bloco posso retirá-los da lista que ele armazena
            this.selectedIds = [];
        } else {
            this.selectedIds = [];
            this.recompute();
        }
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

console.log(this.selectedIds);
    }

    // **********************************MUDANÇA CONVERTE
    doConverte(documentoId): void { 
        this.converte.emit(documentoId);
    }

    doConverteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doConverte(documentoId));
        this.deselectAll(); //É PARA MANTER SELECIONADO O PDF?
    }

}
