import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Setor, Tarefa, Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import * as moment from 'moment';
import {CounterState} from "../../../../store/reducers/counter.reducer";
import {select, Store} from "@ngrx/store";
import * as fromStore from "../../../../store";

@Component({
    selector: 'widget-coordenador',
    templateUrl: './widget-coordenador.component.html',
    styleUrls: ['./widget-coordenador.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetCoordenadorComponent implements OnInit {

    _profile: Usuario;

    tarefasCount: any = false;
    tarefasVencidasCount: any = false;
    isContadorPrincipal: boolean = true;
    contagemTarefas: any;
    listaTarefas: any;
    numeroTarefas: any;
    tarefas: Tarefa[];
    isLoading: boolean = true;
    showComponent: boolean = false;
    hasTarefaAberta: boolean = false;


    private counterState: CounterState;
    private _unsubscribeAll: Subject<any> = new Subject();


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
        this.showComponent = !!this._profile.coordenadores.length;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        const setoresId = this._profile.coordenadores.filter(coordenador => !!coordenador.setor?.id).map(coordenador => coordenador.setor.id).join(',');
        if (setoresId) {
            this._tarefaService.count(
                `{"setorResponsavel.id": "in:${setoresId}", "dataHoraConclusaoPrazo": "isNull"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                (value) => {
                    this.tarefasCount = value;
                    this._changeDetectorRef.markForCheck();
                }
            );
            this._tarefaService.count(
                `{"setorResponsavel.id": "in:${setoresId}", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                (value) => {
                    this.tarefasVencidasCount = value;
                    this._changeDetectorRef.markForCheck();
                }
            );

        } else {
            this.tarefasCount = 0;
            this.tarefasVencidasCount = 0;
        }

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
        this.contagemTarefas = [];

        let modulos = this.recuperarModulos();
        let navigationConverter = 'arquivístico';
        let setores = this.recuperarSetores();

        modulos.forEach((bit) => {
            setores.forEach((bit2) => {
            const totalTarefaCoord = this.contarTarefas(bit, bit2);
            if (totalTarefaCoord > 0) {
                this.hasTarefaAberta = true;
                if(bit === navigationConverter){
                    bit = 'arquivistico';
                }
                this.contagemTarefas[bit+bit2.id] = bit2.id + '_' + bit + '_' + totalTarefaCoord+ '_' + bit2.sigla + '_' + bit2.unidade.sigla;
            }
        })});

        this.isLoading = false;
        this._changeDetectorRef.markForCheck();
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

    recuperarSetores(): any {
        let setores = [];
        this._profile.coordenadores.filter(coordenador => !!coordenador.setor?.id).forEach(coordenador => setores.push(coordenador.setor))
        return setores;
    }


    contarTarefas(modulo: string, setor: Setor): number {
        let valor = 0;
        valor += this.counterState['tarefas_coordenadas_' + setor.id + '_' + modulo]
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
