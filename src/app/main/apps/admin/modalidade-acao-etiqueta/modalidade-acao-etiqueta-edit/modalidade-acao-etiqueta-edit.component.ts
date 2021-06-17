import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ModalidadeAcaoEtiqueta, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'modalidade-acao-etiqueta-edit',
    templateUrl: './modalidade-acao-etiqueta-edit.component.html',
    styleUrls: ['./modalidade-acao-etiqueta-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModalidadeAcaoEtiquetaEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;
    modalidadeAcaoEtiqueta$: Observable<ModalidadeAcaoEtiqueta>;
    formModalidadeAcaoEtiqueta: FormGroup;
    modalidadeEtiquetaPagination: Pagination;


    constructor(
        private _store: Store<fromStore.ModalidadeAcaoEtiquetaEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modalidadeAcaoEtiqueta$ = this._store.pipe(select(fromStore.getModalidadeAcaoEtiqueta));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.modalidadeEtiquetaPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formModalidadeAcaoEtiqueta = this._formBuilder.group({
            id: [null],
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeEtiqueta: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            trigger: [null, [Validators.required]]
         });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitModalidadeAcaoEtiqueta(values): void {

        const modalidadeAcaoEtiqueta = new ModalidadeAcaoEtiqueta();
        Object.entries(values).forEach(
            ([key, value]) => {
                modalidadeAcaoEtiqueta[key] = value;
            }
        );


        this._store.dispatch(new fromStore.SaveModalidadeAcaoEtiqueta(modalidadeAcaoEtiqueta));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
