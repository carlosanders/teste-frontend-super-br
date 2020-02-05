import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations'; 
import {Observable, Subject} from 'rxjs';

import {Processo} from '@cdk/models/processo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import { takeUntil } from 'rxjs/operators';
import { EspecieProcesso } from '@cdk/models/especie-processo.model';
import { ModalidadeMeio } from '@cdk/models/modalidade-meio.model';
import { Classificacao } from '@cdk/models/classificacao.model';
import { Setor } from '@cdk/models/setor.model';
import { Pessoa } from '@cdk/models/pessoa.model';



@Component({
    selector: 'aproveitar-dados',
    templateUrl: './aproveitar-dados.component.html',
    styleUrls: ['./aproveitar-dados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AproveitarDadosComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    processo$: Observable<Processo>;
    processoOrigem: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    processoPagination: Pagination;

    _profile: Colaborador;

    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AproveitarDadosAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
//        this.processo$ = this._store.pipe(select(fromStore.getProcesso));        

        this._profile = this._loginService.getUserProfile();
        this.processoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.processo$.subscribe(
            processoOrigem => this.processoOrigem = processoOrigem
        );


        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });


/*        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(p => {
            this.processoOrigem = p;
        });*/
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {    
    
//         console.log(values.processoOrigem);
         this._store.dispatch(new fromStore.SaveProcesso(values.processoOrigem));
    }

    onActivate(componentReference): void  {
    }

    onDeactivate(componentReference): void  {
    }

    onClick(values): void {
        this._router.navigate([this.routerState.url.split('/aproveitar-dados')[0] + '/dados-basicos']).then();
    }
}
