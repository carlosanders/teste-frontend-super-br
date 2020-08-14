import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Coordenador, ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'widget-tarefa-coordenador',
    templateUrl: './widget-tarefa.component.html',
    styleUrls: ['./widget-tarefa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetTarefaComponent implements OnInit {

    _profile: Usuario;

    tarefasCount: any = false;
    tarefasVencidasCount: any = false;

    setores: Setor[] = [];
    orgaos: ModalidadeOrgaoCentral[] = [];
    unidades: Setor[] = [];

    escopo = ' em seus Setores';

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef
    ) {
        this._profile = _loginService.getUserProfile();

        this._profile.coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.orgaoCentral && !this.orgaos.includes(coordenador.orgaoCentral)) {
                this.orgaos.push(coordenador.orgaoCentral);
            }
            if (coordenador.unidade && !this.unidades.includes(coordenador.unidade)) {
                this.unidades.push(coordenador.unidade);
            }
            if (coordenador.setor && !this.setores.includes(coordenador.setor)) {
                this.setores.push(coordenador.setor);
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let filters: any = {
            dataHoraConclusaoPrazo: 'isNull'
        };
        if (this._loginService.isGranted('ROLE_COORDENADOR_ORGAO_CENTRAL') && this.orgaos.length) {
            filters = {
                ...filters,
                'setorResponsavel.unidade.modalidadeOrgaoCentral.id': 'in:' + this.orgaos.map(orgao => orgao.id).join(',')
            };
            this.escopo = ' em seus Órgãos Centrais';
        } else if (this._loginService.isGranted('ROLE_COORDENADOR_UNIDADE') && this.unidades.length) {
            filters = {
                ...filters,
                'setorResponsavel.unidade.id': 'in:' + this.unidades.map(unidade => unidade.id).join(',')
            };
            this.escopo = ' em suas Unidades';
        } else {
            filters = {
                ...filters,
                'setorResponsavel.id': 'in:' + this.setores.map(setor => setor.id).join(',')
            };
        }
        this._tarefaService.count(JSON.stringify(filters))
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => {
                this.tarefasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        const filtersVencidas = {
            ...filters,
            dataHoraFinalPrazo: 'lt:' + moment().format('YYYY-MM-DDTHH:mm:ss')
        };

        this._tarefaService.count(JSON.stringify(filtersVencidas))
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => {
                this.tarefasVencidasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
