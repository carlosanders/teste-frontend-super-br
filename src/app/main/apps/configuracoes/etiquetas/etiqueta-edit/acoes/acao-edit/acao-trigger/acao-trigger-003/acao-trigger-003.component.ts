import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from '../../store';
import {getRouterState} from "../../../../../../../../../store/reducers";
import {Acao, Etiqueta, Pagination} from "../../../../../../../../../../@cdk/models";

// @ts-ignore
@Component({
    selector: 'acao-trigger-003',
    templateUrl: './acao-trigger-003.component.html',
    styleUrls: ['./acao-trigger-003.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoTrigger003Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
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
        console.log('aqui1223');
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.form = this._formBuilder.group({
            contexto: [null],
            usuarioResponsavel: [null, [Validators.required]]
        });

        this.usuarioPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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

        values.contexto = JSON.stringify({usuarioId: values.usuario.id});
        const acao = new Acao();

        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;
        console.log('ACAO:',acao);
        this._store.dispatch(new fromStore.SaveAcao(acao));
    }

    doAbort(): void {
        console.log('aqui123567');
        console.log(this.routerState);
        this._router.navigate([this.routerState.url.replace('/3/trigger', '')]);
    }
}
