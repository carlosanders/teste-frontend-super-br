import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {
    trigger,
    style,
    animate,
    transition, query, stagger
} from '@angular/animations';

import {Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import * as moment from 'moment';
import {select, Store} from '@ngrx/store';
import {getCounterState} from '../../../../store';
import * as fromStore from 'app/store';
import {CounterState} from '../../../../store/reducers/counter.reducer';
import {CdkNavigationItem} from '../../../../../@cdk/types';

@Component({
    selector: 'widget-tarefa',
    templateUrl: './widget-tarefa.component.html',
    styleUrls: ['./widget-tarefa.component.scss'],
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
export class WidgetTarefaComponent implements OnInit, OnDestroy {

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
            `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.tarefasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._tarefaService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
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
                select(getCounterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((value) => {
            this.counterState = value;
        });
    }

    trocarVisualizacao(): void {
        this.isContadorPrincipal = !this.isContadorPrincipal;
        this.contagemTarefas = []
        let modulos = this.recuperarModulos();
        for (const modulo of modulos) {
            const totalTarefaModulo = this.contarTarefas(modulo);
            if (totalTarefaModulo > 0) {
                this.hasTarefaAberta = true;
                this.contagemTarefas[modulo] = totalTarefaModulo;
            }
        }
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
        valor += this.counterState['caixa_entrada_' + modulo]
        for (const key of Object.keys(this.counterState)) {
            if (key.includes('folder_' + modulo)) {
                valor += this.counterState[key]
            }
        }
        return valor;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
