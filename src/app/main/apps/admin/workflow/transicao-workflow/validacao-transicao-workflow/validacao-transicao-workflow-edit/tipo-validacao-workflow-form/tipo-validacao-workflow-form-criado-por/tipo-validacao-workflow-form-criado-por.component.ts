import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {ValidacaoTransicaoWorkflow, TipoValidacaoWorkflow, TransicaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from '../../store';
import {getTipoValidacaoWorkflow} from '../store/selectors';
import {getRouterState} from "../../../../../../../../../store/reducers";

@Component({
    selector: 'tipo-validacao-workflow-form-criado-por',
    templateUrl: './tipo-validacao-workflow-form-criado-por.component.html',
    styleUrls: ['./tipo-validacao-workflow-form-criado-por.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoValidacaoWorkflowFormCriadoPorComponent implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
    tipoValidacaoWorkflow: TipoValidacaoWorkflow;
    tipoValidacaoWorkflow$: Observable<TipoValidacaoWorkflow>;

    /**
     * @param _router
     * @param _formBuilder
     * @param _store
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowEditAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.tipoValidacaoWorkflow$ = this._store.pipe(select(getTipoValidacaoWorkflow));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tipoValidacaoWorkflow$.subscribe(
            tipoValidacaoWorkflow => {
                this.tipoValidacaoWorkflow = tipoValidacaoWorkflow
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
        values.contexto = JSON.stringify({criadoPorId: values.criadoPor.id});
        const validacaoTransicaoWorkflow = new ValidacaoTransicaoWorkflow();

        Object.entries(values).forEach(
            ([key, value]) => {
                validacaoTransicaoWorkflow[key] = value;
            }
        );

        validacaoTransicaoWorkflow.transicaoWorkflow = new TransicaoWorkflow();
        validacaoTransicaoWorkflow.transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        validacaoTransicaoWorkflow.tipoValidacaoWorkflow = this.tipoValidacaoWorkflow;

        this._store.dispatch(new fromStore.SaveValidacao(validacaoTransicaoWorkflow));
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace('/1/form', '')]);
    }
}
