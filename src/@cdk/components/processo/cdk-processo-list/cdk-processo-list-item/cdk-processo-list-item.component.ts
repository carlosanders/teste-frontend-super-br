import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Processo, Assunto, Interessado} from '@cdk/models';

@Component({
    selector: 'cdk-processo-list-item',
    templateUrl: './cdk-processo-list-item.component.html',
    styleUrls: ['./cdk-processo-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkProcessoListItemComponent implements OnInit {

    @Input()
    processo: Processo;

    @Input()
    prontoTransicao: boolean;

    @Input()
    selected: boolean;

    @Input()
    deleting: boolean;

    @Input()
    deletedIds: boolean;

    @Input()
    editantoLembrete: boolean;

    @Output()
    toggleInSelectedProcessos = new EventEmitter();

    @Output()
    criarLembrete = new EventEmitter<any>();

    @Output()
    realizarTransicao = new EventEmitter<any>();

    @Output()
    editarLembrete = new EventEmitter<any>();

    @Output()
    classificacao = new EventEmitter<any>();



    @Output()
    salvarLembrete = new EventEmitter<any>();

    @Output()
    codProcesso = new EventEmitter<any>();

    @Output()
    codProcessoInteressado = new EventEmitter<any>();

    @Input()
    assuntos: Assunto[];

    @Input()
    interessados: Interessado[];

    @Input()
    loading: boolean;

    @Input()
    isOpen: boolean = false;

    @Input()
    idProcessoToLoadAssuntos: number;

    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: null,
        effectAllowed: 'all',
        disable: false,
        handle: false
    };
    panelOpenState: boolean;

    constructor() {
        this.deleting = false;
        this.editantoLembrete = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.draggable.data = this.processo;
    }


    onSelectedChange(): void {
        this.toggleInSelectedProcessos.emit(this.processo.id);
    }

    doClassificacao(): void {
        this.classificacao.emit();
    }

    doRealizarTransicao(processo): void {
        this.realizarTransicao.emit(this.processo.id);
    }

    doCriarLembrete(processo): void {
        this.criarLembrete.emit(this.processo.id);
    }

    doEditarLembrete(): void {
        this.editantoLembrete = true;
        this.editarLembrete.emit();
    }

    doSalvarLembrete(processo, conteudo): void {
        this.salvarLembrete.emit({processo: processo, conteudo: conteudo});
    }

    doOpenPanel(): void {
        this.codProcesso.emit(this.processo);
        this.codProcessoInteressado.emit(this.processo);
    }
}


