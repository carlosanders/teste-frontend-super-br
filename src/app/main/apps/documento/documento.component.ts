import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Documento} from '@cdk/models';
import * as fromStore from 'app/main/apps/documento/store';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Back} from '../../../store/actions';

@Component({
    selector: 'documento',
    templateUrl: './documento.component.html',
    styleUrls: ['./documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documento$: Observable<Documento>;
    loading$: Observable<boolean>;
    currentComponenteDigital$: Observable<ComponenteDigital>;

    documento: Documento;
    currentComponenteDigital: ComponenteDigital;

    routerState: any;

    modoProcesso = 1;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkTranslationLoaderService
     * @param _store
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _store: Store<fromStore.DocumentoAppState>,
        private _router: Router
    ) {
        // Set the defaults
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const content = document.getElementsByTagName('content')[0];
        content.classList.add('full-screen');

        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        this.currentComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

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
        this.destroyEditor();
        const content = document.getElementsByTagName('content')[0];
        content.classList.remove('full-screen');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

    back(): void {
        this.destroyEditor();
        this._store.dispatch(new fromStore.UnloadDocumento());
        this._router.navigate([
                this.routerState.url.split('/documento/')[0]
            ]
        ).then();
    }

    public destroyEditor(): void {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) &&
                    editor.instances[editorInstance]) {
                    editor.instances[editorInstance].destroy();
                    editor.instances[editorInstance] = {
                        destroy: () => true,
                    };
                }
            }
        }
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        this.documento.componentesDigitais.forEach(componenteDigital => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial + 1)) {
                this._store.dispatch(new fromStore.SetCurrentStep({id: componenteDigital.id, editavel: componenteDigital.editavel && this.documento.minuta}));
                return;
            }
        });
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        this.documento.componentesDigitais.forEach(componenteDigital => {
            if (componenteDigital.numeracaoSequencial === (this.currentComponenteDigital.numeracaoSequencial - 1)) {
                this._store.dispatch(new fromStore.SetCurrentStep({id: componenteDigital.id, editavel: componenteDigital.editavel && this.documento.minuta}));
                return;
            }
        });
    }

    visualizarProcessoNovaAba(): void {

        window.open(this.routerState.url.split('/')[1] + '/processo/' + this.documento.processoOrigem.id
            + '/visualizar', '_blank');
    }

    visualizarProcesso(indice): void {

        if (indice === 1) {
            this.modoProcesso = 2;
            this._router.navigate([
                    this.routerState.url.split(this.routerState.params.documentoHandle + '/editar')[0] +
                    this.routerState.params.documentoHandle + '/editar/visualizar-processo/' + this.documento.processoOrigem.id + '/visualizar'
                ]
            ).then();
        } else {
            this.modoProcesso = 1;
            this._store.dispatch(new Back());
        }
    }
}
