import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from '../store';
import {select, Store} from '@ngrx/store';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../../store/reducers';
import {getRepositorioComponenteDigital} from '../../store/selectors';
import {SetQueryRepositorios, SetRepositorioComponenteDigital} from '../../store/actions';

@Component({
    selector: 'componente-digital-ckeditor',
    templateUrl: './componente-digital-ckeditor.component.html',
    styleUrls: ['./componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ComponenteDigitalCkeditorComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    componenteDigital$: Observable<ComponenteDigital>;
    componenteDigital: ComponenteDigital;

    repositorio$: Observable<string>;
    repositorio: string;

    saving$: Observable<boolean>;
    saving = false;

    errors$: Observable<any>;

    routerState: any;

    /**
     * @param _changeDetectorRef
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.ComponenteDigitalAppState>
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.repositorio$ = this._store.pipe(select(getRepositorioComponenteDigital));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(cd => {
            this.componenteDigital = cd;
        });

        this.saving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(saving => {
            this.saving = saving;
            this._changeDetectorRef.markForCheck();
        });

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
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

    doClearRepositorio(): void {
        this._store.dispatch(new SetRepositorioComponenteDigital(''));
    }

    doQuery(query): void {
        this._store.dispatch(new SetQueryRepositorios({'documento.componentesDigitais.conteudo': query}));
    }

    /**
     * @param data
     */
    save(data: any): void {
        this._store.dispatch(new fromStore.SaveComponenteDigital({componenteDigital: this.componenteDigital, data: data.conteudo, hashAntigo: data.hashAntigo}));
    }
}
