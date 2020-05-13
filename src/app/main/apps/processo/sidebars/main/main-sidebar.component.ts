import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/processo/store';
import {takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {LoginService} from "../../../../auth/login/login.service";

@Component({
    selector: 'processo-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    links: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;

    label = 'Protocolo';

    /**
     * @param _router
     */

    /**
     * Constructor
     */
    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));

        this.links = [
            {
                nome: 'Visualizar',
                icon: 'library_books',
                link: 'visualizar',
                processo: true,
                role: 'ROLE_USER'
            },
            {
                nome: 'Editar',
                icon: 'edit',
                link: 'editar',
                processo: true,
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Download',
                icon: 'cloud_download',
                link: 'download',
                processo: true,
                role: 'ROLE_USER'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
            this.processo = processo;
            switch (this.processo.unidadeArquivistica) {
                case 1:
                    this.label = 'Processo';
                    break;
                case 2:
                    this.label = 'Documento Avulso';
                    break;
                case 3:
                    this.label = 'Pasta';
                    break;
                default:
                    this.label = 'Protocolo';
            }
            if (!this.processo.id) {
                this.label = 'Protocolo';
            }
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
