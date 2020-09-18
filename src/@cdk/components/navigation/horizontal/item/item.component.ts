import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'cdk-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class CdkNavHorizontalItemComponent implements OnInit
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: any;

    isGrantedRole: boolean;
    isCoordenador: boolean;

    /**
     *
     * @param _loginService
     */
    constructor(
        public _loginService: LoginService
    )
    {
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.isGrantedRole = true;

        if (this.item.role) {
            this.isGrantedRole = false;
            if (Array.isArray(this.item.role)) {
                this.item.role.forEach((role) => {
                    if (!this.isGrantedRole) {
                        this.isGrantedRole = this._loginService.isGranted(role);
                    }
                });
            } else {
                this.isGrantedRole = this._loginService.isGranted(this.item.role);
            }
        }

        this.isCoordenador = this._loginService.isCoordenador();
    }
}
