import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {DocumentoAvulso} from '@cdk/models';

@Component({
    selector: 'cdk-oficios-card',
    templateUrl: './cdk-oficios-card.component.html',
    styleUrls: ['./cdk-oficios-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkOficiosCardComponent {

    @Input() documentoAvulso: DocumentoAvulso;
    @Input() actions: string[] = ['select', 'verResposta', 'remeter'];
    @Input() selected: boolean = true;
    @Input() indice: number;
    @Input() saving: boolean = false;
    @Input() error: string = null;

    @Output() verResposta: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();
    @Output() clicked: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();
    @Output() changedSelected: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();
    @Output() remeter: EventEmitter<DocumentoAvulso> = new EventEmitter<DocumentoAvulso>();

    constructor(private _changeDetectorRef: ChangeDetectorRef)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    toggleInSelected(): void {
        this.selected = !this.selected;
        this.changedSelected.emit(this.documentoAvulso);
    }


    doVerResposta(): void {
        this.verResposta.emit(this.documentoAvulso);
    }

    doClick(): void {
        this.clicked.emit(this.documentoAvulso);
    }

    doRemeter(): void {
        this.remeter.emit(this.documentoAvulso);
    }
}
