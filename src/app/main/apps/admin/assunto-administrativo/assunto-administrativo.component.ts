import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store';
import {takeUntil} from 'rxjs/operators';
import {CdkSidebarService} from '../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'assunto-administrativo',
    templateUrl: './assunto-administrativo.component.html',
    styleUrls: ['./assunto-administrativo.component.scss']
})
export class AssuntoAdministrativoComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;
    navLinks: any[];
    activeLinkIndex = -1;


    constructor(
        private _store: Store<fromStore.State>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router
    ) {
        this.navLinks = [
            {
                label: 'Lista',
                link: './listar',
                index: 0
            }, {
                label: 'Árvore',
                link: './arvore',
                index: 1
            }
        ];
    }

    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });


        this._router.events.subscribe((res) => {
            this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this._router.url));
        });
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/'), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }


    routeLista(): void {
        this._router.navigate(['/apps/admin/assuntos/listar']).then();
    }

    routeTree(): void {
        this._router.navigate(['/apps/admin/assuntos/arvore']).then();
    }
}