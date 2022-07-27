import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {AfastamentoService} from "@cdk/services/afastamento.service";
import moment from "moment";

@Component({
    selector: 'widget-afastamentos',
    templateUrl: './widget-afastamentos.component.html',
    styleUrls: ['./widget-afastamentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetAfastamentosComponent implements OnInit, OnDestroy {

    _profile: Usuario;
    afastamentos: any = [];
    loading = false;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _afastamentoService
     * @param _loginService
     * @param _changeDetectorRef
     */
    constructor(
        private _afastamentoService: AfastamentoService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef
    ) {
        this._profile = _loginService.getUserProfile();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.loading = true;
        this._afastamentoService.query(
            `{"colaborador.id": "eq:${this._profile.colaborador.id}", "andX": [{"dataInicioBloqueio": "gte:${moment().format('YYYY-MM-DD')}"}]}`,
            25,
            0,
            '{}',
            JSON.stringify(["populateAll", "colaborador.usuario"]),
        )
            .pipe(
                catchError(() => {
                    this.loading = false;
                    return of([]);
                }),
                takeUntil(this._unsubscribeAll)
            ).subscribe(
            (value) => {
                this.loading = false;
                this.afastamentos = value['entities'];
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
