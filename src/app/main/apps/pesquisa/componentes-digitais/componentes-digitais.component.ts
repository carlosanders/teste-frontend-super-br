import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/componentes-digitais/store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'componentes-digitais',
    templateUrl: './componentes-digitais.component.html',
    styleUrls: ['./componentes-digitais.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ComponentesDigitaisComponent implements OnInit {

    routerState: any;
    componentesDigitais$: Observable<ComponenteDigital[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    private _profile: any;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ComponentesDigitaisAppState>,
        private _loginService: LoginService
    ) {
        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this._profile = _loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetComponentesDigitais({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    view(componenteDigital: ComponenteDigital): void {
        this._router.navigate(['apps/documento/componente-digital/' + componenteDigital.id + '/visualizar']);
    }

    edit(componenteDigital: ComponenteDigital): void {
        this._router.navigate(['apps/documento/' + componenteDigital.documento.id + '/editar']);
    }
}
