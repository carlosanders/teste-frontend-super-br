import { Component, HostBinding, Input } from '@angular/core';
import {CdkNavigationService} from '../../navigation.service';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'cdk-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class CdkNavHorizontalItemComponent
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
        public _loginService: LoginService)
    {

    }
}
