import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from '../documento-avulso-list/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {getRespodendoDocumentosAvulsos} from '../documento-avulso-list/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';

@Component({
    selector: 'upload-bloco',
    templateUrl: './upload-bloco.component.html',
    styleUrls: ['./upload-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UploadBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documentosAvulsos$: Observable<DocumentoAvulso[]>;
    documentosAvulsosBloco: DocumentoAvulso[] = [];
    documentoAvulsoPrincipal: DocumentoAvulso;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    @ViewChild('ckdUpload', {static: true})
    cdkUpload;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoListAppState>,
        private _loginService: LoginService,
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
            documentosAvulsos => {
                this.documentoAvulsoPrincipal = documentosAvulsos[0] ? documentosAvulsos[0] : null;
                this.documentosAvulsosBloco = documentosAvulsos[1] ? documentosAvulsos.filter(t => t.id !== documentosAvulsos[0].id) : [];
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