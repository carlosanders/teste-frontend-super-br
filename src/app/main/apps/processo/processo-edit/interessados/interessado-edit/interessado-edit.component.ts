import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Interessado, Pessoa, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'interessado-edit',
    templateUrl: './interessado-edit.component.html',
    styleUrls: ['./interessado-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class InteressadoEditComponent implements OnInit, OnDestroy {

    interessado$: Observable<Interessado>;
    interessado: Interessado;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    routerState: any;

    pessoa: Pessoa;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.InteressadoEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.interessado$ = this._store.pipe(select(fromStore.getInteressado));
        this.processo$ = this._store.pipe(select(getProcesso));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
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
        ).subscribe(
            processo => this.processo = processo
        );

        this.interessado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            interessado => this.interessado = interessado
        );

        if (!this.interessado) {
            this.interessado = new Interessado();
            this.interessado.processo = this.processo;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const interessado = new Interessado();

        Object.entries(values).forEach(
            ([key, value]) => {
                interessado[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveInteressado({
            interessado: interessado,
            operacaoId: operacaoId
        }));
    }

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.pessoa = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    gerirPessoa(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/listar']).then();
    }

    editPessoa(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
