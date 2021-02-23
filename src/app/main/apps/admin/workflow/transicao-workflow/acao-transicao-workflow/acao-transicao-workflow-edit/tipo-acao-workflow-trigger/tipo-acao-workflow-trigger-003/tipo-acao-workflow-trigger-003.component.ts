import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from '../../store';
import {getRouterState} from "../../../../../../../../../store/reducers";
import {TipoAcaoWorkflow, Pagination, TransicaoWorkflow, AcaoTransicaoWorkflow} from "@cdk/models";
import {getTipoAcaoWorkflow} from "../store/selectors";

@Component({
    selector: 'tipo-acao-workflow-trigger-003',
    templateUrl: './tipo-acao-workflow-trigger-003.component.html',
    styleUrls: ['./tipo-acao-workflow-trigger-003.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoAcaoWorkflowTrigger003Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    routerState: any;
    usuarioPagination: Pagination;
    tipoAcaoWorkflow: TipoAcaoWorkflow;
    tipoAcaoWorkflow$: Observable<TipoAcaoWorkflow>;

    /**
     * @param _router
     * @param _formBuilder
     * @param _store
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.AcaoTransicaoWorkflowEditAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.usuarioPagination = new Pagination();
        this.tipoAcaoWorkflow$ = this._store.pipe(select(getTipoAcaoWorkflow));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tipoAcaoWorkflow$.subscribe(
            tipoAcaoWorkflow => {
                this.tipoAcaoWorkflow = tipoAcaoWorkflow
            }
        );
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
        values.contexto = JSON.stringify({usuarioId: values.usuario.id});
        const acao = new AcaoTransicaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        acao.transicaoWorkflow = transicaoWorkflow;
        acao.tipoAcaoWorkflow = this.tipoAcaoWorkflow;

        this._store.dispatch(new fromStore.SaveAcao(acao));
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace('/3/trigger', '')]);
    }
}
