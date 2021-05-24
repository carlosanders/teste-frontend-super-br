import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {AcaoTransicaoWorkflow, TipoAcaoWorkflow, TransicaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';
import {getTipoAcaoWorkflow} from '../store/selectors';
import {getRouterState} from '../../../../../../../../../store/reducers';

@Component({
    selector: 'tipo-acao-workflow-trigger-001',
    templateUrl: './tipo-acao-workflow-trigger-001.component.html',
    styleUrls: ['./tipo-acao-workflow-trigger-001.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoAcaoWorkflowTrigger001Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
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
        values.contexto = JSON.stringify({modeloId: values.modelo.id});
        const acaoTransicaoWorkflow = new AcaoTransicaoWorkflow();

        Object.entries(values).forEach(
            ([key, value]) => {
                acaoTransicaoWorkflow[key] = value;
            }
        );

        acaoTransicaoWorkflow.transicaoWorkflow = new TransicaoWorkflow();
        acaoTransicaoWorkflow.transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;

        this._store.dispatch(new fromStore.SaveAcao(acaoTransicaoWorkflow));
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace('/1/trigger', '')]);
    }
}
