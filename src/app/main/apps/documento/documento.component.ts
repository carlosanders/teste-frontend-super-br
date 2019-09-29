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

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {Documento} from '@cdk/models/documento.model';
import * as fromStore from 'app/main/apps/documento/store';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'documento',
    templateUrl: './documento.component.html',
    styleUrls: ['./documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documento$: Observable<Documento>;
    loading$: Observable<boolean>;
    currentComponenteDigital$: Observable<ComponenteDigital>;

    documento: Documento;
    currentComponenteDigital: ComponenteDigital;

    routerState: any;

    /**
     *
     * @param _changeDetectorRef
     * @param _fuseTranslationLoaderService
     * @param _store
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
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
                this._store.dispatch(new fromStore.SetCurrentStep({id: componenteDigital.id, editavel: componenteDigital.editavel && !!this.documento.juntadaAtual}));
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
                this._store.dispatch(new fromStore.SetCurrentStep({id: componenteDigital.id, editavel: componenteDigital.editavel && !!this.documento.juntadaAtual}));
                return;
            }
        });
    }
}
