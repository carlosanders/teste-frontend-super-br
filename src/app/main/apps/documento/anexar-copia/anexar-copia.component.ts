import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as fromStoreDocumento from '../store';
import {getCurrentComponenteDigitalId} from '../store';
import {getRouterState} from 'app/store';
import {ComponenteDigital, Documento, Processo} from '@cdk/models';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UnloadJuntadas} from '../../processo/processo-view/store';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkSearchBarComponent} from '@cdk/components/search-bar/search-bar.component';

@Component({
    selector: 'anexar-copia',
    templateUrl: './anexar-copia.component.html',
    styleUrls: ['./anexar-copia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AnexarCopiaComponent implements OnInit, OnDestroy {

    @ViewChild('searchBarComponent')
    cdkSearchBar: CdkSearchBarComponent;
    processo$: Observable<Processo>;
    processo: Processo;

    componenteDigital: ComponenteDigital;
    documento$: Observable<Documento>;
    documento: Documento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    currentComponenteDigitalId$: Observable<number>;
    currentComponenteDigitalId: number;

    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.AnexarCopiaAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.documento$ = this._store.pipe(select(fromStoreDocumento.getDocumento));
        this.currentComponenteDigitalId$ = this._store.pipe(select(getCurrentComponenteDigitalId));
        this.isSaving$ = this._store.pipe(select(fromStoreDocumento.getComponenteDigitalIsSaving));
        this.errors$ = this._store.pipe(select(fromStoreDocumento.getComponenteDigitalErrors));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
        });

        this.currentComponenteDigitalId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentComponenteDigitalId) => {
            this.currentComponenteDigitalId = currentComponenteDigitalId;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((processo) => {
            this.processo = processo;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadCopia());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    back(): void {
        const rota = 'componente-digital/' + this.currentComponenteDigitalId + '/editor/ckeditor';
        this._router.navigate(
            [
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent.parent}).then();
    }

    anexarCopia(): void {
        const componenteDigital = new ComponenteDigital();

        componenteDigital.documentoOrigem = this.documento;

        componenteDigital.fileName = this.componenteDigital.fileName;
        componenteDigital.hash = this.componenteDigital.hash;
        componenteDigital.tamanho = this.componenteDigital.tamanho;
        componenteDigital.mimetype = this.componenteDigital.mimetype;
        componenteDigital.extensao = this.componenteDigital.extensao;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStoreDocumento.SaveComponenteDigital({
            componenteDigital: componenteDigital,
            operacaoId: operacaoId
        }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((componenteDigital: ComponenteDigital) => {
                this.componenteDigital = componenteDigital;
            });
        }
    }

    onDeactivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    /**
     * Search
     *
     * @param emissao
     */
    search(emissao): void {
        this.cdkSearchBar.collapse();
        let rota = 'anexar-copia/' + emissao.id;
        if (this.routerState.params.chaveAcessoHandle) {
            rota += '/chave/' + this.routerState.params.chaveAcessoHandle;
        }
        rota += '/visualizar/capa/mostrar';

        if (emissao.id !== this.routerState.params['processoCopiaHandle']) {
            this._store.dispatch(new UnloadJuntadas({reset: true}));
        }

        this._router.navigate(
            [
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent.parent}).then();
    }

}
