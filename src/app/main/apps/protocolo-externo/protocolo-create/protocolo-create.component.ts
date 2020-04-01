import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import * as moment from 'moment';
import {Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Processo} from '@cdk/models';
import {take, takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {CdkVisibilidadePluginComponent} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.component';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;
    setorResponsavelPagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    visibilidades$: Observable<boolean>;
    NUP: any;

    routerState: any;

    /**
     * @param _store
     * @param _loginService
     * @param dialog
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this._profile = _loginService.getUserProfile().colaborador;
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeProcesso));

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade', 'parent'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(p => {
            this.processo = p;
        });

        this.processo = new Processo();
        this.processo.procedencia = this._profile.lotacoes[0].setor.unidade;

        this.visibilidades$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(
            (restricao) => {
                if (restricao) {
                    const dialogRef = this.dialog.open(CdkVisibilidadePluginComponent, {
                        data: {
                            NUP: this.NUP
                        },
                        hasBackdrop: false,
                        closeOnNavigation: true
                    });

                    dialogRef.afterClosed()
                        .pipe(
                            tap(
                                (value) => {
                                    const processoId = this.routerState.params.processoHandle ?
                                        this.routerState.params.processoHandle : this.processo.id;
                                    if (value === 1 && processoId) {
                                        this._router.navigate(['apps/tarefas/' +
                                        this.routerState.params.generoHandle + '/' +
                                        this.routerState.params.typeHandle + '/' +
                                        this.routerState.params.targetHandle + '/visibilidade/' + processoId]);
                                    }
                                }
                            ),
                            tap(() => dialogRef.close()),
                            take(1)
                        ).subscribe();

                    this._store.dispatch(new fromStore.GetVisibilidadesSuccess({
                        restricaoProcesso: false
                    }));
                }
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    verificaVisibilidadeProcesso(value): void {

        this.NUP = value.NUP;
        this.processo = value;
        this._store.dispatch(new fromStore.GetVisibilidades(value.id));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.vinculacoesEtiquetas = this.processo.vinculacoesEtiquetas;

        this._store.dispatch(new fromStore.SaveProcesso(processo));

    }

}
