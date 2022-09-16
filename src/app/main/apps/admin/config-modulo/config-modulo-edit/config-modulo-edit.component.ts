import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import {cdkAnimations} from '@cdk/animations';
import {Back} from 'app/store/actions';
import {getRouterState} from 'app/store/reducers';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {ConfigModulo, Modulo} from '../../../../../../@cdk/models';
import {Usuario} from '../../../../../../@cdk/models';
import {Pagination} from '@cdk/models/pagination';
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'config-modulo-edit',
    templateUrl: './config-modulo-edit.component.html',
    styleUrls: ['./config-modulo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ConfigModuloEditComponent implements OnInit, OnDestroy {

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    configModule: ConfigModulo;
    configModule$: Observable<ConfigModulo>;

    form: FormGroup;

    mode: string;
    usuario: Usuario;

    moduloPagination: Pagination;

    constructor(
        private _store: Store<fromStore.ConfigModuleEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.configModule$ = this._store.pipe(select(fromStore.getConfigModule));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.url.indexOf('editar') > -1) {
                        this.mode = 'edit';
                    }
                    if (this.routerState.url.indexOf('editar/criar') > -1) {
                        this.mode = 'create';
                    }
                }
            });

        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            sigla: [null, [Validators.maxLength(255)]],
            dataSchema: [null],
            dataType: [null, [Validators.required]],
            dataValue: [null],
            modulo: [null, [Validators.required]],
            mandatory: [true, [Validators.required]],
            invalid: [false, [Validators.required]],
            paradigma: [null]
        });

        this.usuario = _loginService.getUserProfile();

        this.moduloPagination = new Pagination();
    }

    ngOnInit(): void {
        this.configModule$.pipe(
            filter(configModule => !!configModule)
        ).subscribe(configModule => this.configModule = configModule);

        this.form.get('modulo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((modulo: Modulo) => {
                if (modulo !== null) {
                    if (typeof modulo === 'object' && modulo) {
                        const sistema = 'supp_core';
                        const nome =
                            this.form.get('nome').value ?
                                this.form.get('nome').value.split('.').slice(2, this.form.get('nome').value.length).join(".") :
                                ''
                        ;
                        if (!modulo.prefixo) {
                            const moduloCompleto = `${this.normalizedString(modulo.nome)}_backend`;
                            return of(`${sistema}.${moduloCompleto}.${nome}`);
                        } else {
                            return of(`${modulo.prefixo}${nome}`);
                        }
                    }
                }
                return of(null);
            })
        ).subscribe((novoNome: string) => {
            if (this.mode === 'create' && novoNome !== null) {
                this.form.get('nome').setValue(novoNome);
            }
        });

        this.form.get('dataType').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((valor: string) => {
                let retorno: any = null;

                if (this.configModule.id) {
                    if (valor === this.configModule.dataType) {
                        return of(this.configModule.dataSchema);
                    }
                }

                if (valor === 'json' && null === this.configModule.dataSchema) {
                    const baseURI = environment.api_url;
                    const schemaURI = `${baseURI}administrativo/config_module/schema/`;
                    retorno = JSON.stringify({
                        '$schema': 'http://json-schema.org/draft-07/schema#',
                        '$id': `${schemaURI}${this.form.get('nome').value}`,
                        'description': `${this.form.get('descricao').value}`,
                        'type':'object',
                        'required':[
                            'teste'
                        ],
                        'properties':{
                            'teste':{
                                'type': 'string',
                            }
                        },
                        'additionalProperties': false
                    });
                }

                return of(retorno);
            })
        ).subscribe((valor: any) => this.form.get('dataSchema').setValue(valor));

        if (!this.configModule) {
            this.configModule = new ConfigModulo();
            this.configModule.mandatory = true;
            this.configModule.invalid = false;
        }
    }

    submit(values): void {
        const novoConfigModulo = new ConfigModulo();

        Object.entries(values).forEach(
            ([key, value]) => {
                novoConfigModulo[key] = value;
            }
        );
        novoConfigModulo.invalid = false;
        this._store.dispatch(new fromStore.SaveConfigModule(novoConfigModulo));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    normalizedString(value: string): string {
        return value.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/([^\w]+|\s+)/g, '_') // Substitui espaço e outros caracteres por hífen
            .replace(/(^-+|-+$)/, '').toLowerCase();
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.CleanErrors());
    }
}
