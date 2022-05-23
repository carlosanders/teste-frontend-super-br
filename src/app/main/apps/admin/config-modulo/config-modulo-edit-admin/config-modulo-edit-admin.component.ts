import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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

@Component({
    selector: 'config-modulo-edit-admin',
    templateUrl: './config-modulo-edit-admin.component.html',
    styleUrls: ['./config-modulo-edit-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ConfigModuloEditAdminComponent implements OnInit {

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    configModulo: ConfigModulo;
    configModulo$: Observable<ConfigModulo>;

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
        this.configModulo$ = this._store.pipe(select(fromStore.getConfigModule));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            dataSchema: [null],
            dataType: [null, [Validators.required]],
            dataValue: [null],
            modulo: [null, [Validators.required]],
            mandatory: [true, [Validators.required]],
            paradigma: [null]
        });

        this.configModulo$.pipe(
            filter(configModule => !!configModule)
        ).subscribe(configModulo => this.configModulo = configModulo);

        this.usuario = _loginService.getUserProfile();

        this.moduloPagination = new Pagination();

        this.mode = 'admin';
    }

    ngOnInit(): void {
        this.form.get('modulo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((modulo: Modulo) => {
                if (modulo !== null) {
                    if (typeof modulo === 'object' && modulo) {
                        const moduloNormalizado = this.normalizedString(modulo.nome);
                        const sistema = 'supp_core';
                        const moduloCompleto = `${moduloNormalizado}_backend`;
                        const nome = this.form.get('nome').value ? this.form.get('nome').value.split('.')[2] : '';
                        this.form.patchValue({'module': moduloNormalizado})
                        return of(`${sistema}.${moduloCompleto}.${nome}`);
                    }
                }
                return of(null);
            })
        ).subscribe((novoNome: string) => this.form.get('nome').setValue(novoNome));

        this.form.get('dataType').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((valor: string) => {
                let retorno: any = null;

                if (this.configModulo.id) {
                    if (valor === this.configModulo.dataType) {
                        return of(this.configModulo.dataSchema);
                    }
                }

                if (valor === 'json' && null === this.configModulo.dataSchema) {
                    retorno = JSON.stringify({
                        'schema': 'http://json-schema.org/draft-07/schema#',
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
        ).subscribe((valor: any) => {
            this.form.get('dataSchema').setValue(valor);
            this.form.get('dataValue').setValue(null);
            this.form.get('paradigma').setValue(null);
        });

        if (!this.configModulo) {
            this.configModulo = new ConfigModulo();
            this.configModulo.mandatory = true;
        }
    }

    submit(values): void {
        const configModule = new ConfigModulo();

        Object.entries(values).forEach(
            ([key, value]) => {
                configModule[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveConfigModule(configModule));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    normalizedString(value: string): string {
        return value.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
            .replace(/(^-+|-+$)/, '').toLowerCase();
    }
}
