import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';
import {Processo} from '@cdk/models/processo.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/processo/store';
import {UnloadProcesso} from 'app/main/apps/processo/processo-edit/dados-basicos/store';
import {CreateProcesso} from 'app/main/apps/processo/processo-edit/dados-basicos/store';
import {takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';


@Component({
    selector: 'processo-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    links: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;

    /**
     * @param _router
     */

    /**
     * Constructor
     */
    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        private _router: Router,
    ) {

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));

        this.links = [
            {
                nome: 'Editar',
                icon: 'edit',
                link: 'editar',
                processo: true
            },
            {
                nome: 'Visualizar',
                icon: 'library_books',
                link: 'visualizar',
                processo: true
            },
            {
                nome: 'Download',
                icon: 'cloud_download',
                link: 'download',
                processo: true
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => this.processo = processo);
        
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    create(): void {
           this._store.dispatch(new fromStore.CreateProcesso());           
           this._store.dispatch(new CreateProcesso());                      
           window.location.assign(this.routerState.url.split('/processo/')[0] + '/processo/criar/novo-editar');

/*           if (this.routerState.url.indexOf('novo-editar') === -1){
//               alert('novo ' + [this.routerState.url.split('/processo/')[0] + '/processo/criar/novo-editar']);
//               this._router.navigate([this.routerState.url.replace('/processo/', '/processo/criar/novo-editar')]);
               this._router.navigate([this.routerState.url.split('/processo/')[0] + '/processo/criar/novo-editar']);
           }else{
//               alert('dados');
//               this._router.navigate([this.routerState.url.replace('/processo/', '/processo/criar/editar')]);       
               this._router.navigate([this.routerState.url.split('/processo/')[0] + '/processo/criar/novo-editar']);                       
           }
//           window.location.reload();
           */
    }

}
