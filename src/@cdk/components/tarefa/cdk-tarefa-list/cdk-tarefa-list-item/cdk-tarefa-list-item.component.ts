import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter,
    Input, OnChanges, OnInit,
    Output, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {Tarefa} from '@cdk/models/tarefa.model';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {CdkTarefaListItemService} from './cdk-tarefa-list-item.service';

@Component({
    selector: 'cdk-tarefa-list-item',
    templateUrl: './cdk-tarefa-list-item.component.html',
    styleUrls: ['./cdk-tarefa-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTarefaListItemComponent implements OnInit, AfterViewInit, OnChanges {

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
    redistribuirTarefa = new EventEmitter<number>();

    @Output()
    cienciaTarefa = new EventEmitter<any>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Input()
    ciencia: boolean;

    isOpen: boolean;
    loadedAssuntos: boolean;

    @ViewChild('dynamicText', {static: false, read: ViewContainerRef}) containerText: ViewContainerRef;
    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        private _dynamicService: DynamicService,
        private _cdkTarefaListItemService: CdkTarefaListItemService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isOpen = false;
        this.loadedAssuntos = false;
        this.deleting = false;
        this.ciencia = false;
        this.selected = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.tarefa.processo?.assuntos?.length > 0) {
            this.isOpen = true;
            this.loadedAssuntos = true;
        }
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list-item';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });

        const path_item_text = '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list-item#text';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path_item_text)) {
                module.components[path_item_text].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.containerText.createComponent(componentFactory));
                }));
            }
        });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tarefa']) {
            this._cdkTarefaListItemService.tarefa = this.tarefa;
        }
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

    doRedistribuirTarefa(): void {
        this.redistribuirTarefa.emit(this.tarefa.id);
    }

    doCienciaTarefa(): void {
        this.cienciaTarefa.emit(this.tarefa.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedTarefas.emit(this.tarefa.id);
    }

    doToggleUrgente(): void {
        this.toggleUrgente.emit(this.tarefa);
    }

    doTogglePanel(): void {
        if (!this.loadedAssuntos) {
            this.loadAssuntos.emit(this.tarefa.processo.id);
        }
        this.isOpen = !this.isOpen;
    }
}
