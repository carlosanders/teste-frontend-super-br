import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from '../documento-avulso-list/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {ComponenteDigital, DocumentoAvulso} from '@cdk/models';
import {getRespodendoDocumentosAvulsos} from '../documento-avulso-list/store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'upload-bloco',
    templateUrl: './upload-bloco.component.html',
    styleUrls: ['./upload-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UploadBlocoComponent implements OnInit, OnDestroy {

    @ViewChild('cdkUpload', {static: false})
    cdkUpload;

    documentosAvulsos$: Observable<DocumentoAvulso[]>;
    documentosAvulsosBloco: DocumentoAvulso[] = [];
    documentoAvulsoPrincipal: DocumentoAvulso;

    operacoes: any[] = [];

    routerState: any;
    private _profile: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoListAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.documentosAvulsos$ = this._store.pipe(select(getRespodendoDocumentosAvulsos));
        this._profile = _loginService.getUserProfile();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.documentosAvulsos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (documentosAvulsos) => {
                this.documentoAvulsoPrincipal = documentosAvulsos[0] ? documentosAvulsos[0] : null;
                this.documentosAvulsosBloco = documentosAvulsos[1] ? documentosAvulsos.filter(t => t.id !== documentosAvulsos[0].id) : [];
                this._changeDetectorRef.markForCheck();
            });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    upload(): void {
        this.operacoes = [];
        this.cdkUpload.upload();
    }

    onComplete(componenteDigital: ComponenteDigital): void {
        this.operacoes.push({
            type: 'upload',
            content: 'Upload realizado com sucesso!',
            success: true
        });
        this._changeDetectorRef.markForCheck();
    }
}
