import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Atividade} from '@cdk/models/atividade.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models/documento.model';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '../../../../../../@cdk/models/colaborador.model';
import {DocumentoAvulso} from '../../../../../../@cdk/models';


@Component({
    selector: 'responder-complementar',
    templateUrl: './responder-complementar.component.html',
    styleUrls: ['./responder-complementar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResponderComplementarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Colaborador;

    documentoAvulso: DocumentoAvulso;
    routerState: any;
    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    oficios: Documento[] = [];

    public documentoOrigem;
    public action: string;

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
        private _store: Store<fromStore.ResponderComplementarAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this._profile = _loginService.getUserProfile().colaborador;
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
        this.getDocumentOrigem();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getDocumentOrigem(): void {
        this.documentoOrigem = this.routerState.params.documentoAvulsoHandle;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    responderDocumento(): void {
        this.cdkUpload.upload();
        this.action = 'responder';
    }

    complementarDocumento(): void {
        this.cdkUpload.upload();
        this.action = 'complementar';
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
    }

}
