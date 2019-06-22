import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {fuseAnimations} from '@fuse/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './dados-pessoa-edit/store';
import {Observable} from 'rxjs';
import {Pessoa} from '../../../../../@cdk/models/pessoa.model';

@Component({
    selector: 'pessoa-edit',
    templateUrl: './pessoa-edit.component.html',
    styleUrls: ['./pessoa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PessoaEditComponent implements OnInit, OnDestroy {

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoa$ = this._store.pipe(select(fromStore.getPessoa));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
