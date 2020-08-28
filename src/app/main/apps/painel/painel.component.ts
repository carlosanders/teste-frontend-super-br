import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';
import {LoginService} from '../../auth/login/login.service';
import {HistoricoService} from '@cdk/services/historico.service';
import {Historico} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {WidgetsComponent} from '../../../../widgets/widgets.component';

@Component({
    selector     : 'painel',
    templateUrl  : './painel.component.html',
    styleUrls    : ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class PainelComponent implements OnInit, AfterViewInit
{

    _profile: Usuario;

    historicos: Historico[];
    historicoIsLoding = false;

    @ViewChild('widgets', {static: false}) widgets: WidgetsComponent;

    /**
     * Constructor
     */
    constructor(
        private _historicoService: HistoricoService,
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
            this.historicoIsLoding = true;
            this._historicoService.query(
                `{"criadoPor.id": "eq:${this._profile.id}", "criadoEm": "gt:${moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ss')}"}`,
                5,
                0,
                '{}',
                '["populateAll"]')
                .pipe(
                    catchError(() => {
                            this.historicoIsLoding = false;
                            return of([]);
                        }
                    )
                ).subscribe(
                value => {
                    this.historicoIsLoding = false;
                    this.historicos = value['entities'];
                }
            );
        }
    }

    ngAfterViewInit(): void {
    }
}
