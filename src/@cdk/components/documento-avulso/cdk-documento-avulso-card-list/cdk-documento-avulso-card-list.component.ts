import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento} from '@cdk/models/documento.model';

@Component({
    selector: 'cdk-documento-avulso-card-list',
    templateUrl: './cdk-documento-avulso-card-list.component.html',
    styleUrls: ['./cdk-documento-avulso-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoCardListComponent implements OnInit, OnChanges {

    @Input()
    documentos: Documento[];

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

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

    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
    }

    // **********************************MUDANÇA CONVERTE
    doConverte(documentoId): void {
        this.converte.emit(documentoId);
    }

}
