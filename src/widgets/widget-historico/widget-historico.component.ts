import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Historico, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {HistoricoService} from '../../@cdk/services/historico.service';

@Component({
    selector: 'widget-historico',
    templateUrl: './widget-historico.component.html',
    styleUrls: ['./widget-historico.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetHistoricoComponent implements OnInit {

    _profile: Usuario;
    historicos: Historico[] = [];
    historicoIsLoding = false;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        private _historicoService: HistoricoService,
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
                        this._changeDetectorRef.markForCheck();
                        return of([]);
                    }
                )
            ).subscribe(
            value => {
                this.historicoIsLoding = false;
                this.historicos = value['entities'];
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
