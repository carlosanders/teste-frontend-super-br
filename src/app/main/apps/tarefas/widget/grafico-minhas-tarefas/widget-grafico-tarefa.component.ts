import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { Usuario } from '@cdk/models';
import { TarefaService } from '@cdk/services/tarefa.service';
import { LoginService } from 'app/main/auth/login/login.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import * as fromStore from 'app/store';
import { CounterState } from 'app/store/reducers/counter.reducer';
import { CdkNavigationItem } from '@cdk/types';
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels,
    ApexPlotOptions,
    ApexTitleSubtitle,
    ApexXAxis,
    ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels
};

@Component({
    selector: 'widget-tarefa',
    templateUrl: './widget-grafico-tarefa.component.html',
    styleUrls: ['./widget-grafico-tarefa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('popOverState', [
            transition('void => *', [
                query('button', style({ transform: 'translateX(-100%)' })),
                query('button',
                    stagger('600ms', [
                        animate('700ms', style({ transform: 'translateX(0)' }))
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
                type: "bar",
                height: "180px"
            },
            title: {
                text: "Tarefas recebidas nas últimas 4 semanas"
            },
            xaxis: {
                categories: periodos
            },
            dataLabels: {
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
