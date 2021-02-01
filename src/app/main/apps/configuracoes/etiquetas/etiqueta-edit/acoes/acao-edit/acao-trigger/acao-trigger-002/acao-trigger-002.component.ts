import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Acao, Etiqueta, ModalidadeAcaoEtiqueta, Pagination} from '@cdk/models';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from '../../store';
import {getRouterState} from "../../../../../../../../../store/reducers";
import {getModalidadeAcaoEtiqueta} from "../store/selectors";

@Component({
    selector: 'acao-trigger-002',
    templateUrl: './acao-trigger-002.component.html',
    styleUrls: ['./acao-trigger-002.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoTrigger002Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
    trigger: any;
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;
    modalidadeAcaoEtiqueta$: Observable<ModalidadeAcaoEtiqueta>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    /**
     * @param _router
     * @param _formBuilder
     * @param _store
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.AcaoEditAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.modalidadeAcaoEtiqueta$ = this._store.pipe(select(getModalidadeAcaoEtiqueta));
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.modalidadeAcaoEtiqueta$.subscribe(
            modalidadeAcaoEtiqueta => this.modalidadeAcaoEtiqueta = modalidadeAcaoEtiqueta
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
        if(!values.usuarioResponsavel){
        values.contexto = JSON.stringify(
            {
                setorResponsavelId: values.setorResponsavel.id,
                unidadeResponsavelId: values.unidadeResponsavel.id
            });
        }else{
            values.contexto = JSON.stringify(
                {
                    setorResponsavelId: values.setorResponsavel.id,
                    unidadeResponsavelId: values.unidadeResponsavel.id,
                    usuarioId: values.usuarioResponsavel.id,
                });
        }
        const acao = new Acao();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;
        acao.modalidadeAcaoEtiqueta = this.modalidadeAcaoEtiqueta;

        this._store.dispatch(new fromStore.SaveAcao(acao));
    }
    doAbort(): void {
        this._router.navigate([this.routerState.url.replace('/2/trigger', '')]);
    }
}
