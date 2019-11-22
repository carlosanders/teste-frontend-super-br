import { Component, HostBinding, Input } from '@angular/core';
import {FuseNavigationService} from '../../navigation.service';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'fuse-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class FuseNavHorizontalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: any;

    /**
     *
     * @param _loginService
     */
    constructor(
        private _loginService: LoginService)
    {

    }
}
