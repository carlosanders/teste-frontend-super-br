import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {CdkNavigationItem} from '@cdk/types';
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels,
    ApexPlotOptions, ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis, ApexYAxis,
    ChartComponent
} from "ng-apexcharts";
import {UsuarioService} from "../../../../../../@cdk/services/usuario.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke,
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels
};

@Component({
    selector: 'widget-grafico-taxa-sucesso-judicial',
    templateUrl: './widget-grafico-taxa-sucesso-judicial.component.html',
    styleUrls: ['./widget-grafico-taxa-sucesso-judicial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('popOverState', [
            transition('void => *', [
                query('button', style({transform: 'translateX(-100%)'})),
                query('button',
                    stagger('600ms', [
                        animate('700ms', style({transform: 'translateX(0)'}))
                    ]))
            ])
        ])
    ]
})
export class WidgetGraficoTaxaSucessoJudicialComponent implements OnInit, OnDestroy {

    _profile: Usuario;
    nomeUnidade: string;

    chartData: any = false;
    isContadorPrincipal: boolean = true;

    @ViewChild('graficoTaxaSucessoJudicial') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions> = {};

    private _unsubscribeAll: Subject<any> = new Subject();

    @Input()
    item: CdkNavigationItem;

    /**
     * Constructor
     */
    constructor(
        private _usuarioService: UsuarioService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.State>,
    ) {
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let idUnidade = null;
        this._profile.colaborador.lotacoes.forEach(lotacao => {
            if (lotacao.principal) {
                idUnidade = lotacao.setor.unidade.id;
                this.nomeUnidade = lotacao.setor.unidade.sigla;
            }
        });

        if (idUnidade !== null) {
            this._usuarioService.obterGraficoTaxaSucessoJudicial(idUnidade)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                (value) => {
                    this._changeDetectorRef.markForCheck();
                    this.carregarGrafico(value);
                }
            );
        }
    }

    carregarGrafico(value: any): void {
        if (value) {
            this.chartData = value;

            const series = this.chartData?.data?.map(item => {
                return item.indicador;
            });

            const categories = this.chartData?.data?.map(item => {
                return item.ano_mes.split("/").reverse().join("/");
            });

            this.chartOptions = {
                series: [
                    {
                        name: "taxa_sucesso",
                        data: series
                    }
                ],
                chart: {
                    type: "line",
                    height: "180",
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    curve: 'smooth'
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                xaxis: {
                    categories
                },
                dataLabels: {
                    enabled: true,
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top'
                        }
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
