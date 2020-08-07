import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';

import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

@Component({
    selector: 'widget-alerta',
    templateUrl: './widget-alerta.component.html',
    styleUrls: ['./widget-alerta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetAlertaComponent implements OnInit {

    _profile: Usuario;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef
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
    }
}
