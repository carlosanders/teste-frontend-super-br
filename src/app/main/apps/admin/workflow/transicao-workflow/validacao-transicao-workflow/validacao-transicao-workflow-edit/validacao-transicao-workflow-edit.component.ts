import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ValidacaoTransicaoWorkflow, TransicaoWorkflow, TipoValidacaoWorkflow} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back} from '../../../../../../../store/actions';
import {getRouterState} from '../../../../../../../store/reducers';
import {Router} from '@angular/router';
@Component({
    selector: 'validacao-transicao-workflow-edit',
    templateUrl: './validacao-transicao-workflow-edit.component.html',
    styleUrls: ['./validacao-transicao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ValidacaoTransicaoWorkflowEditComponent implements OnInit, OnDestroy {

    routerState: any;
    validacao$: Observable<ValidacaoTransicaoWorkflow>;
    validacao: ValidacaoTransicaoWorkflow;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoValidacaoWorkflowList: TipoValidacaoWorkflow[];
    tipoValidacaoWorkflowList$: Observable<TipoValidacaoWorkflow[]>;
    action: string;
    componentUrl: string;
    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.validacao$ = this._store.pipe(select(fromStore.getValidacao));
        this.tipoValidacaoWorkflowList$ = this._store.pipe(select(fromStore.getTipoValidacaoWorkflowList));


        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                this.action = '';
                if (routerState) {
                    this.routerState = routerState.state;
                    this.componentUrl = 'validacoes/editar/'+this.routerState.params.validacaoTransicaoWorkflowHandle;
                    const currentUrl = this.routerState.url;
                    if (currentUrl.substr(currentUrl.length-this.componentUrl.length, this.componentUrl.length) == this.componentUrl) {
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
        this.validacao$.subscribe(
            validacao => this.validacao = validacao
        );
        this.tipoValidacaoWorkflowList$.subscribe(
            tipoValidacaoWorkflowList => this.tipoValidacaoWorkflowList = tipoValidacaoWorkflowList
        );
        if (!this.validacao) {
            this.validacao = new ValidacaoTransicaoWorkflow();
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

        const validacao = new ValidacaoTransicaoWorkflow();

        Object.entries(values).forEach(
            ([key, value]) => {
                validacao[key] = value;
            }
        );


        const transicaoWorkflow: TransicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = parseInt(this.routerState.params.transicaoWorkflowHandle);
        validacao.transicaoWorkflow = transicaoWorkflow;
        this._store.dispatch(new fromStore.SaveValidacao(validacao));
    }


    selectValidacaoWorkflow(tipoValidacaoWorkflow: TipoValidacaoWorkflow): void {
        let routeId = null;
        switch (tipoValidacaoWorkflow.sigla){
            case 'ATR_PARA':
                routeId = 1;
                break;
            case 'CRIADO_POR':
                routeId = 2;
                break;
            case 'SETOR_ORG':
                routeId = 3;
                break;
            case 'TIPO_DOC':
                routeId = 4;
                break;
            case 'UNIDADE':
                routeId = 5;
                break;
            default:
                routeId = 0;
        }
        this._router.navigate([this.routerState.url+'/'+routeId+'/form']);
    }
    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
