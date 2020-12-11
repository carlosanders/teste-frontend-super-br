import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '../../../../../../@cdk/animations';
import {Observable} from 'rxjs';
import {Pagination} from '@cdk/models/pagination';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'tipo-relatorio-edit',
    templateUrl: './tipo-relatorio-edit.component.html',
    styleUrls: ['./tipo-relatorio-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoRelatorioEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoRelatorio: TipoRelatorio;
    tipoRelatorio$: Observable<TipoRelatorio>;
    formTipoRelatorio: FormGroup;
    especieRelatorioPagination: Pagination;

    constructor(
        private _store: Store<fromStore.TipoRelatorioEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tipoRelatorio$ = this._store.pipe(select(fromStore.getTipoRelatorio));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.especieRelatorioPagination = new Pagination();
        this.especieRelatorioPagination.populate = ['populateAll'];
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formTipoRelatorio = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.maxLength(255)]],
            especieRelatorio: [null, [Validators.required]],
            templateHTML: [null, [Validators.required]],
            parametros: [null],
            DQL: [null],
            ativo: [null],
            limite: [1]
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitTipoRelatorio(values): void {
        const tipoRelatorio = new TipoRelatorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                tipoRelatorio[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveTipoRelatorio(tipoRelatorio));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
