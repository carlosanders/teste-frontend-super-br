import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState} from 'app/store/reducers';
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {Juntada} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from '../../../../store';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'processo-envia-email',
    templateUrl: './processo-envia-email.component.html',
    styleUrls: ['./processo-envia-email.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoEnviaEmailComponent implements OnInit, OnDestroy {

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    juntada$: Observable<Juntada>;
    juntada: Juntada;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.EnviaEmailAppState>,
        private _router: Router
    ) {
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.juntada$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntada) => {
            this.juntada = juntada;
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        if (this.juntada.id) {
            const payload = {
                usuarioId: values.usuario.id,
                juntadaId: this.juntada.id,
                operacaoId: CdkUtils.makeId()
            };
            this._store.dispatch(new fromStore.EnviaEmail(payload));
        }
    }

    cancel(): void {
        this._router.navigate([this.routerState.url.split('envia-email/')[0]]).then();
    }
}
