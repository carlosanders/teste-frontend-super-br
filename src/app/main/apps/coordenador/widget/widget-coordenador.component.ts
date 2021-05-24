import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';
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
        } else {
            this.tarefasCount = 0;
            this.tarefasVencidasCount = 0;
        }
    }
}
