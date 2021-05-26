import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {
    AcaoTransicaoWorkflow,
    Pagination, TipoAcaoWorkflow,
    TransicaoWorkflow
} from '@cdk/models';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';
import {getRouterState} from '../../../../../../../../../store/reducers';
import {getTipoAcaoWorkflow} from '../store/selectors';

@Component({
    selector: 'tipo-acao-workflow-trigger-002',
    templateUrl: './tipo-acao-workflow-trigger-002.component.html',
    styleUrls: ['./tipo-acao-workflow-trigger-002.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoAcaoWorkflowTrigger002Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
    trigger: any;

    unidadePagination: Pagination;
    setorPagination: Pagination;
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
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();
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
            (tipoAcaoWorkflow) => {
                this.tipoAcaoWorkflow = tipoAcaoWorkflow;
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
        if(!values.usuarioResponsavel){
        values.contexto = JSON.stringify(
            {
                setorResponsavelId: values.setorResponsavel.id,
                unidadeResponsavelId: values.unidadeResponsavel.id
            });
        }else{
            values.contexto = JSON.stringify(
                {
                    setorResponsavelId: values.setorResponsavel.id,
                    unidadeResponsavelId: values.unidadeResponsavel.id,
                    usuarioId: values.usuarioResponsavel.id,
                });
        }
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
        this._router.navigate([this.routerState.url.replace('/2/trigger', '')]);
    }
}
