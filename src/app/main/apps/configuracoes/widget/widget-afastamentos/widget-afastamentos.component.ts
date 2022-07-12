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
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {AfastamentoService} from "../../../../../../@cdk/services/afastamento.service";
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
    afastamentos: any = false;

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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
//  {"colaborador.id":"eq:3","andX":[{"dataInicioBloqueio":"gte:2022-07-12"}]}
    /// `{"colaborador.id": "eq:${this._profile.colaborador.id}", "andX": [{"dataInicioBloqueio": "gte:${moment().format('YYYY-MM-DD)"}]}`)
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._afastamentoService.query(
            `{"colaborador.id": "eq:${this._profile.colaborador.id}", "andX": [{"dataInicioBloqueio": "gte:${moment().format('YYYY-MM-DD')}"}]}`,
            25,
            0,
            '{}',
            JSON.stringify(["populateAll", "colaborador.usuario"]),
        )
            .pipe(
                catchError(() => of([])),
                takeUntil(this._unsubscribeAll)
            ).subscribe(
            (value) => {
                this.afastamentos = value['entities'];
                this._changeDetectorRef.markForCheck();
            }
        );

        // this._store
        //     .pipe(
        //         select(fromStore.getCounterState),
        //         takeUntil(this._unsubscribeAll)
        //     ).subscribe((value) => {
        //     this.counterState = value;
        // });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
