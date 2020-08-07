import {
    ChangeDetectionStrategy,
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
    selector: 'widget-tarefa',
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

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        public _loginService: LoginService
    )
    {
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            this._tarefaService.count(
                `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => {
                    console.log(value);
                    this.tarefasCount = value;
                    console.log(this.tarefasCount);
                }
            );

            this._tarefaService.count(
                `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => {
                    console.log(value);
                    this.tarefasVencidasCount = value;
                    console.log(this.tarefasVencidasCount);
                }
            );
        }
    }
}
