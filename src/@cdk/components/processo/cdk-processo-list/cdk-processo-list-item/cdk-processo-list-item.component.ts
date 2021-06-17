import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {ModalidadeTransicao, Processo} from '@cdk/models';

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
    transicionando: boolean;

    @Input()
    editantoLembrete: boolean;

    @Input()
    modalidadeTransicao: ModalidadeTransicao;

    @Output()
    toggleInSelectedProcessos = new EventEmitter();

    @Output()
    editar = new EventEmitter<any>();

    @Output()
    editarLembrete = new EventEmitter<any>();

    @Output()
    realizarTransicao = new EventEmitter<any>();

    @Output()
    desarquivar = new EventEmitter<any>();

    @Output()
    registrarExtravio = new EventEmitter<any>();

    @Output()
    salvarLembrete = new EventEmitter<any>();

    @Output()
    codProcesso = new EventEmitter<any>();

    @Output()
    codProcessoInteressado = new EventEmitter<any>();

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Output()
    loadInteressados = new EventEmitter<any>();

    @Input()
    loadingInteressadosProcessosId: number[];

    isOpen: boolean;
    loadedAssuntos: boolean;
    loadedInteressados: boolean;

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
        this.isOpen = false;
        this.loadedAssuntos = false;
        this.loadedInteressados = false;
        this.deleting = false;
        this.editantoLembrete = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.draggable.data = this.processo;

        if (this.processo?.assuntos?.length > 0){
            this.isOpen = true;
            this.loadedAssuntos = true;
        }

        if (this.processo?.interessados?.length > 0){
            this.isOpen = true;
            this.loadedInteressados = true;
        }
    }

    onSelectedChange(): void {
        this.toggleInSelectedProcessos.emit(this.processo.id);
    }

    doRealizarTransicao(processo): void {
        this.realizarTransicao.emit(processo.id);
    }

    doDesarquivar(processo): void {
        this.desarquivar.emit(processo.id);
    }

    doRegistrarExtravio(processo): void {
        this.registrarExtravio.emit(processo.id);
    }

    doEditar(processo): void {
        this.editar.emit(processo.id);
    }

    doEditarLembrete(): void {
        this.editantoLembrete = true;
        this.editarLembrete.emit();
    }

    doSalvarLembrete(processo, conteudo): void {
        this.salvarLembrete.emit({processo: processo, conteudo: conteudo});
    }

    doTogglePanel(): void {
        if (!this.loadedAssuntos) {
            this.loadAssuntos.emit(this.processo);
        }
        if (!this.loadedInteressados) {
            this.loadInteressados.emit(this.processo);
        }
        this.isOpen = !this.isOpen;
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


