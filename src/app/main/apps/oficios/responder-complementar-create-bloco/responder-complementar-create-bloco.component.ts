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

import * as fromStore from '../store';
import {LoginService} from 'app/main/auth/login/login.service';
import {ComponenteDigital, DocumentoAvulso} from '@cdk/models';
import {getSelectedDocumentosAvulso} from '../store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'responder-complementar-create-bloco',
    templateUrl: './responder-complementar-create-bloco.component.html',
    styleUrls: ['./responder-complementar-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ResponderComplementarCreateBlocoComponent implements OnInit, OnDestroy {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;
    documentosAvulso$: Observable<DocumentoAvulso[]>;
    documentosAvulsoBloco: any[] = [];
    documentoAvulsoPrincipal: number;
    operacoes: any[] = [];
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: any;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.documentosAvulso$ = this._store.pipe(select(getSelectedDocumentosAvulso));
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.documentosAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentosAvulso) => {
            this.documentoAvulsoPrincipal = documentosAvulso[0] ? documentosAvulso[0].id : null;
            this.documentosAvulsoBloco = documentosAvulso.filter(documentoAvulso => documentosAvulso[0].id !== documentoAvulso.id);
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
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
            status: 1
        });
        this._changeDetectorRef.markForCheck();
    }
}
