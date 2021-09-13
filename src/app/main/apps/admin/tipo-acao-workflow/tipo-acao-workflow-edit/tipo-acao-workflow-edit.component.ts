import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {TipoAcaoWorkflow} from '@cdk/models';
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
    selector: 'tipo-acao-workflow-edit',
    templateUrl: './tipo-acao-workflow-edit.component.html',
    styleUrls: ['./tipo-acao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoAcaoWorkflowEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoAcaoWorkflow: TipoAcaoWorkflow;
    tipoAcaoWorkflow$: Observable<TipoAcaoWorkflow>;
    formTipoAcaoWorkflow: FormGroup;

    constructor(
        private _store: Store<fromStore.TipoAcaoWorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tipoAcaoWorkflow$ = this._store.pipe(select(fromStore.getTipoAcaoWorkflow));

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
        this.formTipoAcaoWorkflow = this._formBuilder.group({
            id: [null],
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            trigger: [null, [Validators.required]]
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitTipoAcaoWorkflow(values): void {

        const tipoAcaoWorkflow = new TipoAcaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                tipoAcaoWorkflow[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTipoAcaoWorkflow({
            tipoAcaoWorkflow: tipoAcaoWorkflow,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
