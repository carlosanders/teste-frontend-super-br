import {Component, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../auth/login/login.service';
import {Usuario} from '@cdk/models';

@Component({
    selector     : 'painel',
    templateUrl  : './painel.component.html',
    styleUrls    : ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class PainelComponent
{
    _profile: Usuario;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService
    )
    {
        this._profile = _loginService.getUserProfile();
    }
}
