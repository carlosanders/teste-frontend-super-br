import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Relatorio} from '@cdk/models/relatorio.model';
import {Documento} from '../../../../models';

@Component({
    selector: 'cdk-relatorio-list-item',
    templateUrl: './cdk-relatorio-list-item.component.html',
    styleUrls: ['./cdk-relatorio-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkRelatorioListItemComponent implements OnInit, OnChanges {

    @Input()
    relatorio: Relatorio;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Input()
    loadedIdRelatorios: boolean;

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
        this.draggable.data = this.relatorio;
    }

    /**
     * On init
     */
    ngOnInit(): void {

    }

    ngOnChanges(): void {
        if (this.loadedIdRelatorios) {
            this.relatorio.documento = new Documento();
        }
    }


    doDelete(): void {
        this.delete.emit(this.relatorio.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedRelatorios.emit(this.relatorio.id);
    }

}
