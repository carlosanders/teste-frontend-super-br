import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento} from '@cdk/models/documento.model';

@Component({
    selector: 'cdk-documento-avulso-card',
    templateUrl: './cdk-documento-avulso-card.component.html',
    styleUrls: ['./cdk-documento-avulso-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoCardComponent implements OnInit {

    @Input()
    documento: Documento;

    @Input()
    selected = true;

    @Input()
    deleting = false;

    @Input()
    assinando = false;

    @Input()
    convertendo = false;

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    toggleInSelected(documentoId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    doAssinatura(documentoId): void {
        this.assinatura.emit(documentoId);
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doConverte(documentoId): void {
        this.converte.emit(documentoId);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }
}
