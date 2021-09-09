import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import {getCurrentComponenteDigitalId} from '../store';
import {getRouterState} from 'app/store';
import {ComponenteDigital, Documento} from '@cdk/models';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UnloadJuntadas} from '../../processo/processo-view/store';
import {CdkUtils} from '../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'anexar-copia',
    templateUrl: './anexar-copia.component.html',
    styleUrls: ['./anexar-copia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AnexarCopiaComponent implements OnInit, OnDestroy {

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
        private _store: Store<fromStore.DocumentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigitalId$ = this._store.pipe(select(getCurrentComponenteDigitalId));
        this.isSaving$ = this._store.pipe(select(fromStore.getComponenteDigitalIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getComponenteDigitalErrors));
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
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
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
        this._store.dispatch(new fromStore.SaveComponenteDigital({
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
