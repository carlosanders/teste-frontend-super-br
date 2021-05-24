import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {Acao, ModalidadeAcaoEtiqueta, ModalidadeEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Etiqueta} from '@cdk/models';
import {getEtiqueta} from '../../store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../../store/reducers';
import {getModalidadeAcaoEtiquetaList} from './store/selectors/modalidade-acao-etiqueta.selectors';

@Component({
    selector: 'acao-edit',
    templateUrl: './acao-edit.component.html',
    styleUrls: ['./acao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    action: string;
    componentUrl: string;
    acao$: Observable<Acao>;
    acao: Acao;
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiqueta[] = [];
    modalidadeAcaoEtiquetaList$: Observable<ModalidadeAcaoEtiqueta[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.AcaoEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.modalidadeAcaoEtiquetaList$ = this._store.pipe(select(getModalidadeAcaoEtiquetaList));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                this.action = '';
                if (routerState) {
                    this.routerState = routerState.state;
                    this.componentUrl = 'acoes/editar/'+this.routerState.params.acaoHandle;
                    const currentUrl = this.routerState.url;
                    if (
                        currentUrl.substr(currentUrl.length-this.componentUrl.length, this.componentUrl.length)
                        == this.componentUrl
                    ) {
                        this.action = 'form-cadastro';
                    }
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.etiqueta$.subscribe(
            (etiqueta) => {
                this.etiqueta = etiqueta;
            }
        );

        this.acao$.subscribe(
            acao => this.acao = acao
        );

        this.modalidadeAcaoEtiquetaList$.subscribe(
            modalidadeAcaoEtiquetaList => this.modalidadeAcaoEtiquetaList = modalidadeAcaoEtiquetaList
        );

        if (!this.acao) {
            this.acao = new Acao();
            this.acao.etiqueta = this.etiqueta;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    goBack(): void {
        this._router.navigate([this.routerState.url.replace(this.componentUrl, 'acoes/listar')]);
    }

    selectTrigger(modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta): void {
        let routeId = null;
        switch (modalidadeAcaoEtiqueta.trigger){
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0001':
                routeId = 1;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0003':
                routeId = 2;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0004':
                routeId = 3;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0005':
                routeId = 4;
                break;
            default:
                routeId = 0;
        }
        this._router.navigate([this.routerState.url+'/'+routeId+'/trigger']);
    }
}
