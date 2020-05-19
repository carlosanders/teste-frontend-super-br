import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from '../../store';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'processos-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    mode = 'Processos';

    routerState: any;

    @Input()
    pessoasConveniadas: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ProcessosAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService
    ) {
    }

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
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateProcesso());
    }

    onDrop($event): void {

    }
}
