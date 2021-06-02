import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {CdkConfigService} from '@cdk/services/config.service';
import {Pagination, Processo} from '../../models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';
import {LoginService} from '../../../app/main/auth/login/login.service';
import {MatDialog} from '../../angular/material';

@Component({
    selector   : 'cdk-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class CdkSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    cdkConfig: any;

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Output()
    inputText: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _cdkConfigService
     * @param _formBuilder
     * @param _loginService
     * @param _dialog
     */
    constructor(
        private _cdkConfigService: CdkConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _dialog: MatDialog,
    )
    {
        this.form = this._formBuilder.group({
            processo: [null],
        });

        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['especieProcesso', 'especieProcesso.generoProcesso', 'setorAtual', 'setorAtual.unidade'];

        // Set the defaults
        this.inputText = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.cdkConfig = config;
                }
            );

        if (this.form.get('processo')) {
            this.form.get('processo').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value && typeof value === 'object') {
                            if (value.visibilidadeExterna || this._loginService.isGranted('ROLE_COLABORADOR')) {
                                this.inputText.emit({id: value.id});
                                return of([]);
                            }

                            const dialogRef = this._dialog.open(CdkChaveAcessoPluginComponent, {
                                width: '600px'
                            });

                            dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
                                this.inputText.emit({id: value.id, chaveAcesso: result});
                                return of([]);
                            });
                        }

                        return of([]);
                    }
                )
            ).subscribe();
        }

     }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    checkProcesso(): void {
        const processo = this.form.get('processo').value;
        if (!processo || typeof processo !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }
}
