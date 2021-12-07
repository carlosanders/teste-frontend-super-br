import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pessoa/pessoa-list/store';
import {UnloadPessoas} from 'app/main/apps/pessoa/pessoa-list/store';
import {getRouterState} from '../../../store';
import {Router} from '@angular/router';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Observable, Subject} from 'rxjs';
import {Pessoa} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {PessoaEditService} from './pessoa-edit/pessoa-edit.service';

@Component({
    selector: 'pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PessoaComponent implements OnInit, OnDestroy {

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() select: EventEmitter<Pessoa> = new EventEmitter();
    action = '';
    routerState: any;
    pessoas$: Observable<Pessoa[]>;
    pessoaSelecionada: Pessoa;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     * @param _cdkSidebarService
     * @param _pessoaEditService
     */
    constructor(
        private _store: Store<fromStore.PessoaListAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _cdkSidebarService: CdkSidebarService,
        private _pessoaEditService: PessoaEditService
    ) {
        this.pessoas$ = this._store.pipe(select(fromStore.getPessoaList));

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('pessoa/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('pessoa/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('pessoa/editar/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        const content = document.getElementsByTagName('content')[0];
        content.classList.add('full-screen');
        this._pessoaEditService.pessoaSelecionada
            .subscribe((pessoa) => {
                this.pessoaSelecionada = pessoa;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        if (this.pessoaSelecionada && this.select) {
            this.select.emit(this.pessoaSelecionada);
        }

        this._store.dispatch(new UnloadPessoas());

        const content = document.getElementsByTagName('content')[0];
        content.classList.remove('full-screen');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    back(): void {
        this._router.navigate([this.routerState.url.split('/pessoa/')[0]]).then();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.pessoaHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('criar', 'listar')]).then();
        }
    }

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.select.emit(pessoa);
            });
        }

    }

    onDeactivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }
}
