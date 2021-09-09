import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store';
import {Back} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'tipo-validacao-workflow-edit',
    templateUrl: './tipo-validacao-workflow-edit.component.html',
    styleUrls: ['./tipo-validacao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoValidacaoWorkflowEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoValidacaoWorkflow: TipoValidacaoWorkflow;
    tipoValidacaoWorkflow$: Observable<TipoValidacaoWorkflow>;
    formTipoValidacaoWorkflow: FormGroup;

    constructor(
        private _store: Store<fromStore.TipoValidacaoWorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tipoValidacaoWorkflow$ = this._store.pipe(select(fromStore.getTipoValidacaoWorkflow));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formTipoValidacaoWorkflow = this._formBuilder.group({
            id: [null],
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            sigla: [null, [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitTipoValidacaoWorkflow(values): void {

        const tipoValidacaoWorkflow = new TipoValidacaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                tipoValidacaoWorkflow[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTipoValidacaoWorkflow({
            tipoValidacaoWorkflow: tipoValidacaoWorkflow,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
