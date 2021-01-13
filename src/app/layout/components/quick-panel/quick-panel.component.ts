import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {takeLast, takeUntil} from 'rxjs/operators';
import {getOperacoes, getOperacoesEmProcessamento} from 'app/store';
import {Observable} from 'rxjs';
import {CdkNavigationService} from '../../../../@cdk/components/navigation/navigation.service';
import {CdkSidebarService} from '../../../../@cdk/components/sidebar/sidebar.service';
import {CdkConfigService} from '../../../../@cdk/services/config.service';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {
    date: Date;
    resultados: any[] = [];
    settings: any;

    lockedOpen = false;

    operacoesProcessando = 0;
    operacoesPendentes = 0;
    operacoes$: Observable<any>;
    operacoes = [];

    /**
     *
     * @param _store
     * @param _cdkSidebarService
     */
    constructor(private _store: Store<fromStore.State>,
                private _cdkSidebarService: CdkSidebarService) {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true
        };
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getOperacoes)
        ).subscribe((operacoes) => {
            this.operacoes = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoes.push(operacoes[operacaoId]);
            });
        });

        this._store
            .pipe(
                select(getOperacoesEmProcessamento),
            ).subscribe(value => {
            this.operacoesProcessando = Object.keys(value).length;
            if (this.operacoesProcessando === 0) {
                this.operacoesPendentes = 0;
            } else {
                if (this.operacoesProcessando > this.operacoesPendentes) {
                    this.operacoesPendentes = this.operacoesProcessando;
                }
            }
        });
    }

    refazer(operacao) : void {
        if (Array.isArray(operacao.redo)) {
            operacao.redo.forEach((action) => {
                this._store.dispatch(action);
            });
        } else {
            this._store.dispatch(operacao.redo);
        }
    }

    desfazer(operacao) : void {
        if (Array.isArray(operacao.undo)) {
            operacao.undo.forEach((action) => {
                this._store.dispatch(action);
            });
        } else {
            this._store.dispatch(operacao.undo);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpen(): void {
        this._cdkSidebarService.getSidebar('quickPanel').toggleOpen();
    }

    toggleSidebarUnfold(): void {
        this._cdkSidebarService.getSidebar('quickPanel').unfold();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarLock(): void {
        this._cdkSidebarService.getSidebar('quickPanel').toggleFold();
    }
}
