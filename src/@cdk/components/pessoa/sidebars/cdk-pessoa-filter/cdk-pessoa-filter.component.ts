import {
    ChangeDetectionStrategy,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    Component,
    Output,
    Input
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-pessoa-filter',
    templateUrl: './cdk-pessoa-filter.component.html',
    styleUrls: ['./cdk-pessoa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkPessoaFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filters: any = {};

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    /**
     * @param _formBuilder
     * @param _cdkSidebarService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            numeroDocumentoPrincipal: [null],
            pessoaValidada: [null],
            dataNascimento: [null],
            dataObito: [null],
            nomeGenitora: [null],
            modalidadeQualificacaoPessoa: [null],
            modalidadeGeneroPessoa: [null],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('nome').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({nome: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('nome')) {
                        delete this.filters['nome'];
                    }
                }
            }
        });

        this.form.get('numeroDocumentoPrincipal').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').map(bit => bit.replace(/[^\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({numeroDocumentoPrincipal: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('numeroDocumentoPrincipal')) {
                        delete this.filters['numeroDocumentoPrincipal'];
                    }
                }
            }
        });

        this.form.get('nomeGenitora').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({nomeGenitora: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('nomeGenitora')) {
                        delete this.filters['nomeGenitora'];
                    }
                }
            }
        });

        this.form.get('dataNascimento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataNascimento: `eq:${value.format('YYYY-MM-DD')}`
                };
            }
        });

        this.form.get('dataObito').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataObito: `eq:${value.format('YYYY-MM-DD')}`
                };
            }
        });

        this.form.get('pessoaValidada').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    pessoaValidada: `eq:${value}`
                };
            }
        });

        this.form.get('modalidadeGeneroPessoa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeGeneroPessoa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeGeneroPessoa.id')) {
                        delete this.filters['modalidadeGeneroPessoa.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeQualificacaoPessoa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeQualificacaoPessoa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeQualificacaoPessoa.id')) {
                        delete this.filters['modalidadeQualificacaoPessoa.id'];
                    }
                }
            }
        });
    }

    filtraData(value: any, campo: string): void {
        if (this.filters.hasOwnProperty('andX')) {
            let andX = this.filters['andX'];
            andX = andX.filter((filtro) => {
                return !filtro.hasOwnProperty(campo);
            });
            this.filters = {
                ...this.filters,
                andX: andX
            };
        }

        let andX = this.filters['andX'];
        if (andX) {
            value.forEach((filtro) => andX.push(filtro));
            this.filters = {
                ...this.filters,
                andX: andX
            };
        } else {
            this.filters = {
                ...this.filters,
                andX: value
            };
        }
    }

    hasDateFilter(campo: string): boolean {
        return this.filters.andX?.filter((filtro) => filtro.hasOwnProperty(campo)).length > 0;
    }

    emite(): void {
        const request = {
            filters: this.filters
        };
        this.selected.emit(request);
    }

    buscar(): void {
        this.emite();
        this._cdkSidebarService.getSidebar('cdk-pessoa-filter').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this._cdkSidebarService.getSidebar('cdk-pessoa-filter').close();
    }
}
