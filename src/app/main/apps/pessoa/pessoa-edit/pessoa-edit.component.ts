import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './dados-pessoa-edit/store';
import {Observable, Subject} from 'rxjs';
import {Pessoa} from '@cdk/models';
import {getRouterState} from '../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'pessoa-edit',
    templateUrl: './pessoa-edit.component.html',
    styleUrls: ['./pessoa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PessoaEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    action = '';
    routerState: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router
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

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('pessoa/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('pessoa/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('pessoa/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });

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
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.pessoaHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('criar', 'listar')]).then();
        }
    }
}
