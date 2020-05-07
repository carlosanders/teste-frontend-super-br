import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '../../../../../../@cdk/animations';
import {Observable} from 'rxjs';
import {EspecieRelevancia} from '../../../../../../@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'app-especie-relevancia-edit',
    templateUrl: './especie-relevancia-edit.component.html',
    styleUrls: ['./especie-relevancia-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieRelevanciaEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    especieRelevancia: EspecieRelevancia;
    especieRelevancia$: Observable<EspecieRelevancia>;
    formEspecieRelevancia: FormGroup;


    constructor(
        private _store: Store<fromStore.EspecieRelevanciaEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieRelevancia$ = this._store.pipe(select(fromStore.getEspecieRelevancia));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formEspecieRelevancia = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoRelevancia: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitEspecieRelevancia(values): void {
        const especieRelevancia = new EspecieRelevancia();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieRelevancia[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveEspecieRelevancia(especieRelevancia));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
