import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as fromStore from '../store';
import { LoginService } from 'app/main/auth/login/login.service';
import { DocumentoAvulso, ComponenteDigital } from '@cdk/models';
import { getSelectedDocumentosAvulso } from '../store/selectors';
import { getRouterState } from 'app/store/reducers';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'responder-complementar-create-bloco',
    templateUrl: './responder-complementar-create-bloco.component.html',
    styleUrls: ['./responder-complementar-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ResponderComplementarCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documentosAvulso$: Observable<DocumentoAvulso[]>;
    documentosAvulsoBloco: DocumentoAvulso[] = [];
    documentoAvulsoPrincipal: DocumentoAvulso;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

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
        ).subscribe(
            documentosAvulso => {
                this.documentoAvulsoPrincipal = documentosAvulso[0] ? documentosAvulso[0] : null;
                this.documentosAvulsoBloco = documentosAvulso[1] ? documentosAvulso.filter(t => t.id !== documentosAvulso[0].id) : [];
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

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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
            content: `Upload realizado com sucesso!`,
            success: true
        });
        this._changeDetectorRef.markForCheck();
    }
}
