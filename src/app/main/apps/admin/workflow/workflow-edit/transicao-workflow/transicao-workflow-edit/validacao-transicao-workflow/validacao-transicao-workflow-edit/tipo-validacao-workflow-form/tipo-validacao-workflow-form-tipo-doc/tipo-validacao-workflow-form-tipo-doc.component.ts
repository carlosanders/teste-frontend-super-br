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
import {Observable, Subject} from 'rxjs';
import * as fromStore from '../../store';
import {getTipoValidacaoWorkflow} from '../store/selectors';
import {getRouterState} from '../../../../../../../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

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
    private _unsubscribeAll: Subject<any> = new Subject();

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

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
            filter(tipo => !!tipo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tipoValidacaoWorkflow) => {
            this.tipoValidacaoWorkflow = tipoValidacaoWorkflow;
            this.startup.emit(this.tipoValidacaoWorkflow.valor);
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveValidacao({
            validacao: validacaoTransicaoWorkflow,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.split('validacoes/editar')[0] + 'validacoes/listar']).then();
    }
}
