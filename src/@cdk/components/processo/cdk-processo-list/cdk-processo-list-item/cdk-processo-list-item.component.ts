import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {Processo} from '@cdk/models';

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
    selected: boolean;

    @Input()
    deleting: boolean;

    @Output()
    toggleInSelectedProcessos = new EventEmitter();

    @Output()
    criarLembrete = new EventEmitter<any>();

    @Output()
    classificacao = new EventEmitter<any>();

    @Output()
    realizarTransicao = new EventEmitter<any>();

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
        this.draggable.data = this.processo;
    }



    onSelectedChange(): void {
        this.toggleInSelectedProcessos.emit(this.processo.id);
    }

    doClassificacao(): void {
        this.classificacao.emit();
    }

    doRealizarTransicao(): void {
        this.realizarTransicao.emit();
    }

    doCriarLembrete(): void {
        this.criarLembrete.emit();
    }


}
