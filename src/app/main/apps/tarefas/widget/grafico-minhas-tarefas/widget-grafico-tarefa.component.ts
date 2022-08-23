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
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {CdkNavigationItem} from '@cdk/types';
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels, ApexMarkers,
    ApexPlotOptions, ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis, ApexYAxis,
    ChartComponent
} from "ng-apexcharts";

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
    selector: 'widget-grafico-tarefa',
    templateUrl: './widget-grafico-tarefa.component.html',
    styleUrls: ['./widget-grafico-tarefa.component.scss'],
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
export class WidgetGraficoTarefaComponent implements OnInit, OnDestroy {

    _profile: Usuario;

    tarefasCount: any = false;
    isContadorPrincipal: boolean = true;
    loaded: any;

    @ViewChild('graficoTarefa') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions> = {};

    private _unsubscribeAll: Subject<any> = new Subject();

    @Input()
    item: CdkNavigationItem;

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
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
        this._tarefaService.obterGraficoTarefas()
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.tarefasCount = value;
                this._changeDetectorRef.markForCheck();
                this.carregarGrafico();
            }
        );
    }

    carregarGrafico(): void {
        const series = this.tarefasCount.map(item => {
            return item.quantidade;
        });

        const periodos = this.tarefasCount.map(item => {
            return item.periodo;
        });

        this.chartOptions = {
            series: [
                {
                    name: "tarefas",
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
            title: {
                text: "Distribuições nas últimas 4 semanas"
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            xaxis: {
                categories: periodos
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

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
