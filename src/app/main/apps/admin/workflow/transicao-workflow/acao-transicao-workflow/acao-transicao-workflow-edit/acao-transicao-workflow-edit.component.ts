import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {AcaoTransicaoWorkflow, TipoAcaoWorkflow, TransicaoWorkflow} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back} from '../../../../../../../store/actions';
import {getRouterState} from "../../../../../../../store/reducers";
import {Router} from "@angular/router";

@Component({
    selector: 'acao-transicao-workflow-edit',
    templateUrl: './acao-transicao-workflow-edit.component.html',
    styleUrls: ['./acao-transicao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoTransicaoWorkflowEditComponent implements OnInit, OnDestroy {

    routerState: any;
    acao$: Observable<AcaoTransicaoWorkflow>;
    acao: AcaoTransicaoWorkflow;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoAcaoWorkflowList: TipoAcaoWorkflow[];
    tipoAcaoWorkflowList$: Observable<TipoAcaoWorkflow[]>;
    action: string;
    componentUrl:string;


    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.AcaoTransicaoWorkflowEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.tipoAcaoWorkflowList$ = this._store.pipe(select(fromStore.getTipoAcaoWorkflowList));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                this.action = '';
                if (routerState) {
                    this.routerState = routerState.state;
                    this.componentUrl = 'acoes/editar/'+this.routerState.params.acaoTransicaoWorkflowHandle;
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
        this.acao$.subscribe(
            acao => this.acao = acao
        );
        this.tipoAcaoWorkflowList$.subscribe(
            tipoAcaoWorkflowList => this.tipoAcaoWorkflowList = tipoAcaoWorkflowList
        );

        if (!this.acao) {
            this.acao = new AcaoTransicaoWorkflow();
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

    submit(values): void {
        const acao = new AcaoTransicaoWorkflow();

        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const transicaoWorkflow:TransicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = parseInt(this.routerState.params.transicaoWorkflowHandle);
        acao.transicaoWorkflow = transicaoWorkflow;

        this._store.dispatch(new fromStore.SaveAcao(acao));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    selectAcaoWorkflow(tipoAcaoWorkflow: TipoAcaoWorkflow): void {
        let routeId = null;
        switch (tipoAcaoWorkflow.trigger){
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\AcaoTransicaoWorkflow\\Trigger0001':
                routeId = 1;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\AcaoTransicaoWorkflow\\Trigger0002':
                routeId = 2;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\AcaoTransicaoWorkflow\\Trigger0003':
                routeId = 3;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\AcaoTransicaoWorkflow\\Trigger0004':
                routeId = 4;
                break;
            default:
                routeId = 0;
        }

        this._router.navigate([this.routerState.url+'/'+routeId+'/trigger']);
    }
}
