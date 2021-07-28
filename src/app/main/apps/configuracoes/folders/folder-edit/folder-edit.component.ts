import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Folder, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store/reducers';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'folder-edit',
    templateUrl: './folder-edit.component.html',
    styleUrls: ['./folder-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class FolderEditComponent implements OnInit, OnDestroy {
    routerState: any;
    folder$: Observable<Folder>;
    folder: Folder;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    modalidadeFolderPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.FolderEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.folder$ = this._store.pipe(select(fromStore.getFolder));
        this.usuario = this._loginService.getUserProfile();

        this.modalidadeFolderPagination = new Pagination();


        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.folder$.subscribe(
            folder => this.folder = folder
        );

        if (!this.folder) {
            this.folder = new Folder();
            this.folder.usuario = this.usuario;
        }
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

        const folder = new Folder();

        Object.entries(values).forEach(
            ([key, value]) => {
                folder[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveFolder({
            folder: folder,
            operacaoId: operacaoId
        }));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
