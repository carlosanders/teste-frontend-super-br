import { Assunto } from '@cdk/models/assunto.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PaginatedResponse } from '@cdk/models/paginated.response';
import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Relatorio} from '@cdk/models/relatorio.model';


@Component({
    selector: 'cdk-tipo-relatorio-list-item',
    templateUrl: './cdk-tipo-relatorio-list-item.component.html',
    styleUrls: ['./cdk-tipo-relatorio-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTipoRelatorioListItemComponent implements OnInit {

    

    @Input()
    relatorio: Relatorio;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedRelatorios = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createRelatorio = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editRelatorio = new EventEmitter<number>();

    @Output()
    toggleUrgente = new EventEmitter<Relatorio>();

    /*
    * ISSUE-107
    */
    @Output()
    codProcesso = new EventEmitter<any>();

    @Input()
    assuntos: Assunto[];

    @Input()
    loading: boolean;

    @Input()
    isOpen: boolean = false;

    @Input()
    idRelatorioToLoadAssuntos: number;

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
        this.draggable.data = this.relatorio;
    }

    doDelete(): void {
        this.delete.emit(this.relatorio.id);
    }

    doMovimentar(): void {
        this.movimentar.emit(this.relatorio.id);
    }

    doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.relatorio.id);
    }

    doCreateRelatorio(): void {
        this.createRelatorio.emit({relatorioId: this.relatorio.id, processoId: this.relatorio.processo.id});
    }

    doEditRelatorio(): void {
        this.editRelatorio.emit(this.relatorio.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedRelatorios.emit(this.relatorio.id);
    }

    doToggleUrgente($event: Event): void {
        $event.stopPropagation();
        this.toggleUrgente.emit(this.relatorio);
    }

    /*
    * ISSUE-107
    */
    doOpenPanel(): void {
        this.codProcesso.emit(this.relatorio);
    }

}
