import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {AcaoTransicaoWorkflow, TransicaoWorkflow} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back} from '../../../../../../../store/actions';
import {getRouterState} from "../../../../../../../store/reducers";

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


    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.AcaoTransicaoWorkflowEditAppState>,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));

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
        this.acao$.subscribe(
            acao => this.acao = acao
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
}
