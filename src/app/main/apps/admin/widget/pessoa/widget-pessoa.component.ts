import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';
import {PessoaService} from '@cdk/services/pessoa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'widget-pessoa',
    templateUrl: './widget-pessoa.component.html',
    styleUrls: ['./widget-pessoa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetPessoaComponent implements OnInit {

    _profile: Usuario;

    pessoasAguardandoValidacaoCount: any = false;
    pessoasCount: any = false;

    /**
     * Constructor
     */
    constructor(
        private _pessoaService: PessoaService,
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
        this._pessoaService.count(
            `{"pessoaValidada": "eq:false"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => {
                this.pessoasAguardandoValidacaoCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._pessoaService.count(
            `{}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => {
                this.pessoasCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
