import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';

import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';

@Component({
    selector: 'widget-acompanhamento',
    templateUrl: './widget-acompanhamento.component.html',
    styleUrls: ['./widget-acompanhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetAcompanhamentoComponent implements OnInit {

    _profile: Usuario;

    acompanhamentosCount: any = false;

    /**
     *
     * @param _acompanhamentoService
     * @param _loginService
     * @param _changeDetectorRef
     */
    constructor(
        private _acompanhamentoService: AcompanhamentoService,
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
        this._acompanhamentoService.count(
            JSON.stringify(
                {
                    'usuario.id': 'eq:' + this._loginService.getUserProfile().id,
                    'processo': 'isNotNull'
                }
            )
        ).pipe(
            catchError(() => of([]))
        ).subscribe(
            (value) => {
                this.acompanhamentosCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
