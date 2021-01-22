import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ValidacaoTransicaoWorkflow, TransicaoWorkflow} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back} from '../../../../../../../store/actions';
import {getRouterState} from "../../../../../../../store/reducers";

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
    
    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowEditAppState>,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.validacao$ = this._store.pipe(select(fromStore.getValidacao));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
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
                validacao[key] = value
            }
            );
        if(values.setorOrigem != null){
            validacao.contexto = JSON.stringify({setorOrigem: values.setorOrigem.id});
        }else if(values.tipoDocumento != null){
            validacao.contexto = JSON.stringify({tipoDocumento: values.tipoDocumento.id});
        }else if(values.criadoPor != null){
            validacao.contexto = JSON.stringify({criadoPor: values.criadoPor.id});
        }else if(values.atribuidoPara != null){
            validacao.contexto = JSON.stringify({atribuidoPara: values.atribuidoPara.id});
        }else{
            validacao.contexto = JSON.stringify({unidade: values.unidade.id});
        }      
     

        const transicaoWorkflow:TransicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = parseInt(this.routerState.params.transicaoWorkflowHandle);
        validacao.transicaoWorkflow = transicaoWorkflow;
        this._store.dispatch(new fromStore.SaveValidacao(validacao));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
