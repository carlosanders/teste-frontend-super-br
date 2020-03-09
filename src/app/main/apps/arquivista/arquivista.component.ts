import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta, Pagination} from '@cdk/models';
import * as fromStore from './arquivista-list/store';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {LoginService} from '../../auth/login/login.service';
import {Observable} from 'rxjs';
import {Usuario} from '@cdk/models/usuario.model';

@Component({
    selector: 'arquivista',
    templateUrl: './arquivista.component.html',
    styleUrls: ['./arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaComponent implements OnInit, OnDestroy {

    etiquetas: Etiqueta[] = [];
    vinculacaoEtiquetaPagination: Pagination;

    maximizado$: any;
    currentProcessoId: Observable<number[]>;

    pagination$: Observable<any>;
    pagination: any;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {CdkSidebarService} _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _processoService: ProcessoService,
        private _router: Router,
        private _store: Store<fromStore.ArquivistaAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults

        this.vinculacaoEtiquetaPagination = new Pagination();


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
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
        };
        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

}



