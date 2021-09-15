import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ModalidadeOrgaoCentral} from '@cdk/models';
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
    selector: 'modalidade-orgao-central-edit',
    templateUrl: './modalidade-orgao-central-edit.component.html',
    styleUrls: ['./modalidade-orgao-central-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModalidadeOrgaoCentralEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral;
    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    formModalidadeOrgaoCentral: FormGroup;

    constructor(
        private _store: Store<fromStore.ModalidadeOrgaoCentralEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modalidadeOrgaoCentral$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentral));

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
        this.formModalidadeOrgaoCentral = this._formBuilder.group({
            id: [null],
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitModalidadeOrgaoCentral(values): void {
        const modalidadeOrgaoCentral = new ModalidadeOrgaoCentral();
        Object.entries(values).forEach(
            ([key, value]) => {
                modalidadeOrgaoCentral[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveModalidadeOrgaoCentral({
            modalidadeOrgaoCentral: modalidadeOrgaoCentral,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
