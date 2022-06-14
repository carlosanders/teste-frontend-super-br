import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

import {Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import * as moment from 'moment';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {CounterState} from 'app/store/reducers/counter.reducer';
import {CdkNavigationItem} from '@cdk/types';

@Component({
    selector: 'widget-compartilhadas',
    templateUrl: './widget-compartilhadas.component.html',
    styleUrls: ['./widget-compartilhadas.component.scss'],
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
export class WidgetCompartilhadasComponent implements OnInit, OnDestroy {

    _profile: Usuario;

    tarefasCount: any = false;
    tarefasVencidasCount: any = false;
    isContadorPrincipal: boolean = true;
    hasTarefaAberta: boolean = false;
    loaded: any;
    contagemTarefas: any;

    private _unsubscribeAll: Subject<any> = new Subject();
    private counterState: CounterState;

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
        this._tarefaService.count(
            `{"compartilhamentos.usuario.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.tarefasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._tarefaService.count(
            `{"compartilhamentos.usuario.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.tarefasVencidasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._store
            .pipe(
                select(fromStore.getCounterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((value) => {
            this.counterState = value;
        });
    }

    trocarVisualizacao(): void {
        this.isContadorPrincipal = !this.isContadorPrincipal;
        this.contagemTarefas = []
        let modulos = this.recuperarModulos();
        let navigationConverter = 'arquivístico';

        modulos.forEach((bit) => {
            const totalTarefaModulo = this.contarTarefas(bit);
            if (totalTarefaModulo > 0) {
                this.hasTarefaAberta = true;
                if(bit === navigationConverter){
                    bit = 'arquivistico';
                }
                this.contagemTarefas[bit] = totalTarefaModulo;
            }
        })


    }

    recuperarModulos(): any {
        let modulos = [];
        for (const key of Object.keys(this.counterState)) {
            if (key.includes('caixa_entrada')) {
                modulos.push(key.split('_')[2]);
            }
        }
        return modulos;
    }

    contarTarefas(modulo: string): number {
        let valor = 0;
        valor += this.counterState['tarefas_compartilhadas_' + modulo]
        for (const key of Object.keys(this.counterState)) {
            if (key.includes('folder_' + modulo)) {
                valor += this.counterState[key]
            }
        }
        return valor;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
