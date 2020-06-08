import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

@Component({
    selector: 'cdk-tipo-relatorio-list-item',
    templateUrl: './cdk-tipo-relatorio-list-item.component.html',
    styleUrls: ['./cdk-tipo-relatorio-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTipoRelatorioListItemComponent implements OnInit {

    @Input()
    tipoRelatorio: TipoRelatorio;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedRelatorios = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    isOpen: boolean;

    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: null,
        effectAllowed: 'all',
        disable: false,
        handle: false
    };

    constructor() {
        this.isOpen = false;
        this.deleting = false;
        this.selected = false;
        this.draggable.data = this.tipoRelatorio;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.tipoRelatorio.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedRelatorios.emit(this.tipoRelatorio.id);
    }

}
