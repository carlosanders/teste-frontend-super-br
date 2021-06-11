import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';

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

    @Output()
    toggleInSelectedDocumentosAvulso = new EventEmitter();


    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: null,
        effectAllowed: 'all',
        disable: false,
        handle: false
    };

    constructor() {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.draggable.data = this.documentoAvulso;
    }

    onSelectedChange(): void {
        this.toggleInSelectedDocumentosAvulso.emit(this.documentoAvulso.id);
    }

    copiarParaAreaTrabalho(nup): void {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (nup));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }
}
