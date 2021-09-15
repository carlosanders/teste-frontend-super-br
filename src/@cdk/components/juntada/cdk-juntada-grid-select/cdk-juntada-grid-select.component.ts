import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Juntada} from '@cdk/models';
import {JuntadaDataSource} from '@cdk/data-sources/juntada-data-source';
import {ComponenteDigitalService} from '../../../services/componente-digital.service';

@Component({
    selector: 'cdk-juntada-grid-select',
    templateUrl: './cdk-juntada-grid-select.component.html',
    styleUrls: ['./cdk-juntada-grid-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkJuntadaGridSelectComponent implements OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    juntadas: Juntada[];

    @Input()
    juntadasAdicionadas: Juntada[];

    @Input()
    total = 0;

    @Input()
    actions: string[] = ['desentranharBloco'];

    @Input()
    displayedColumns: string[] = ['id', 'numeracaoSequencial', 'descricao', 'documento.tipoDocumento.nome', 'actions'];

    @Output()
    juntadasSelecionadas = new EventEmitter<Juntada[]>();

    @Output()
    reload = new EventEmitter<any>();

    dataSourceJuntadasAdicionadas: JuntadaDataSource;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
    }

    ngOnChanges(): void {
        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
    }

    desentranharBloco(juntada: Juntada): void {
        this.juntadas = this.juntadas.filter(j => j.id !== juntada.id);
        this.juntadasAdicionadas.push(juntada);
        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
        this.total = (this.total-1 < 0)? 0 : this.total-1;
        this.juntadasSelecionadas.emit(this.juntadasAdicionadas);
    }

    removerDesentranhamento(juntada: Juntada): void {
        this.juntadasAdicionadas = this.juntadasAdicionadas.filter(j => j.id !== juntada.id);
        this.juntadas.push(juntada);
        this.juntadas = [...this.juntadas];
        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
        this.total++;
        this.juntadasSelecionadas.emit(this.juntadasAdicionadas);
    }

    subirJuntada(juntada: Juntada): void {
        let posicaoInicial = this.juntadasAdicionadas.indexOf(juntada);
        this.alterarItemArray(this.juntadasAdicionadas, posicaoInicial, --posicaoInicial);
        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
    }

    doReload(params): void {
        this.reload.emit(params);
    }

    descerJuntada(juntada: Juntada): void {
        let posicaoInicial = this.juntadasAdicionadas.indexOf(juntada);
        this.alterarItemArray(this.juntadasAdicionadas, posicaoInicial, ++posicaoInicial);
        this.dataSourceJuntadasAdicionadas = new JuntadaDataSource(of(this.juntadasAdicionadas));
    }

    alterarItemArray(array: any[], de: number, para: number): void {
        if (para > -1 && para < array.length) {
            const f = array.splice(de, 1)[0];
            array.splice(para, 0, f);
        }
    }
}
