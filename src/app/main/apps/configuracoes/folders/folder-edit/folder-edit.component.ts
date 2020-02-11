import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Folder} from '@cdk/models/folder.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'folder-edit',
    templateUrl: './folder-edit.component.html',
    styleUrls: ['./folder-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FolderEditComponent implements OnInit, OnDestroy {

    folder$: Observable<Folder>;
    folder: Folder;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    modalidadeFolderPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.FolderEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.folder$ = this._store.pipe(select(fromStore.getFolder));
        this.usuario = this._loginService.getUserProfile();

        this.modalidadeFolderPagination = new Pagination();
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

        this._store.dispatch(new fromStore.SaveFolder(folder));

    }

}
