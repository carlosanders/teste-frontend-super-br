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

import {Tarefa} from '@cdk/models/tarefa.model';
import {AssuntoService} from '../../../../services/assunto.service';
import { processo } from '@cdk/normalizr/processo.schema';
import * as fromStore from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store';

@Component({
    selector: 'cdk-tarefa-list-item',
    templateUrl: './cdk-tarefa-list-item.component.html',
    styleUrls: ['./cdk-tarefa-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTarefaListItemComponent implements OnInit {

    @Input()
    tarefa: Tarefa;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedTarefas = new EventEmitter();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<number>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    /*
    * ISSUE-100
    */
    @Output()
    codProcesso = new EventEmitter<any>();

    @Input()
    assuntos: Assunto[];

    @Input()
    bsAssuntos: BehaviorSubject<Assunto[]>;

    @Input()
    pagAssunto: PaginatedResponse;

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
        this.draggable.data = this.tarefa;
    }

    doDelete(): void {
        this.delete.emit(this.tarefa.id);
    }

    doMovimentar(): void {
        this.movimentar.emit(this.tarefa.id);
    }

    doCompartilhar(): void {
        this.compartilhar.emit(this.tarefa.id);
    }

    doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.tarefa.id);
    }

    doCreateTarefa(): void {
        this.createTarefa.emit({tarefaId: this.tarefa.id, processoId: this.tarefa.processo.id});
    }

    doEditTarefa(): void {
        this.editTarefa.emit(this.tarefa.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedTarefas.emit(this.tarefa.id);
    }

    doToggleUrgente(): void {
        this.toggleUrgente.emit(this.tarefa);
    }

    doOpenPanel(idProcesso: any): void {
        this.codProcesso.emit(idProcesso);
    }

    doClosePanel(): void {
        this.pagAssunto = null;
    }
}
