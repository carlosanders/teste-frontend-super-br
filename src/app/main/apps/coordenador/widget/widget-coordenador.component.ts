import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Tarefa, Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as moment from 'moment';

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

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef
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
            this._tarefaService.query(
                `{"setorResponsavel.id": "in:${setoresId}", "dataHoraConclusaoPrazo": "isNull"}`,
                25,
                0,
                '{}',
                '["setorResponsavel", "especieTarefa", "setorResponsavel.unidade", "especieTarefa.generoTarefa"]')
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                (value) => {

                    this.numeroTarefas = [];
                    this.numeroTarefas.push(value);
                    const unique = [...new Map(this.numeroTarefas[0].entities.map((item) => [item.setorResponsavel.id, item]))];
                    this.listaTarefas = [];
                    unique.map(key => {
                            this.listaTarefas.push(key[1]);
                        }
                    )
                    this.tarefas = this.listaTarefas;
                }
            );
        } else {
            this.tarefasCount = 0;
            this.tarefasVencidasCount = 0;
        }
    }

    trocarVisualizacao(): void {
        this.isContadorPrincipal = !this.isContadorPrincipal;
        this.contagemTarefas = [];
    }
}
