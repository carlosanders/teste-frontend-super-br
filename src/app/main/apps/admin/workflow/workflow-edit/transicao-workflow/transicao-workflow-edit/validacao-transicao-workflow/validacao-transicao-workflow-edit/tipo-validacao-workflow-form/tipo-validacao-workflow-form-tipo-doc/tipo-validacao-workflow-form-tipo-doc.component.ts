import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {TipoValidacaoWorkflow, TransicaoWorkflow, ValidacaoTransicaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';
import {getTipoValidacaoWorkflow} from '../store/selectors';
import {getRouterState} from '../../../../../../../../../../../store';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'tipo-validacao-workflow-form-tipo-doc',
    templateUrl: './tipo-validacao-workflow-form-tipo-doc.component.html',
    styleUrls: ['./tipo-validacao-workflow-form-tipo-doc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoValidacaoWorkflowFormTipoDocComponent implements OnInit, OnDestroy {

    @Output()
    startup: EventEmitter<any> = new EventEmitter();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    formState: string = 'form';
    routerState: any;
    tipoValidacaoWorkflow: TipoValidacaoWorkflow;
    tipoValidacaoWorkflow$: Observable<TipoValidacaoWorkflow>;

    /**
     * @param _router
     * @param _store
     */
    constructor(
        private _router: Router,
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
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
        this.tipoValidacaoWorkflow$.pipe(
            filter(tipo => !!tipo)
        ).subscribe(
            (tipoValidacaoWorkflow) => {
                this.tipoValidacaoWorkflow = tipoValidacaoWorkflow;
                this.startup.emit(this.tipoValidacaoWorkflow.valor);
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
        values.contexto = JSON.stringify({tipoDocumentoId: values.tipoDocumento.id});
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
        this._router.navigate([this.routerState.url.split('validacoes/editar')[0] + 'validacoes/listar']);
    }
}
