import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-config-modulo-filter',
    templateUrl: './cdk-config-modulo-filter.component.html',
    styleUrls: ['./cdk-config-modulo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkConfigModuloFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    contexto: any = {};

    @Input()
    mode = 'list';

    @Input()
    moduloPagination: Pagination;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null],
            descricao: [null],
            sigla: [null],
            modulo: [null],
            configPendente: [false],
            configHerdada: [false],
            configInvalida: [false],
        });

        this.moduloPagination = new Pagination();
    }

    ngOnInit(): void {
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.filters = {};
        this.emite();
    }

    verificarValor(objeto): void {
        const objetoForm = this.form.get(objeto.target.getAttribute('formControlName'));
        if (!objetoForm.value || typeof objetoForm.value !== 'object') {
            objetoForm.setValue(null);
        }
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('descricao').value) {
            this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'descricao': `like:%${bit}%`});
            });
        }

        if (this.form.get('sigla').value) {
            this.form.get('sigla').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'sigla': `like:%${bit}%`});
            });
        }

        if (this.form.get('modulo').value){
            const value = this.form.get('modulo').value;
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    'modulo.id': `eq:${value.id}`
                };
            }
        }

        if (this.form.get('configPendente').value) {
            andXFilter.push(
                {
                    'mandatory': 'eq:1',
                    'dataValue': 'isNull'
                }
            );
        }

        if (this.form.get('configHerdada').value) {
            andXFilter.push(
                {
                    'paradigma': `isNotNull`
                }
            );
        }

        if (this.form.get('configInvalida').value) {
            andXFilter.push(
                {
                    'invalid': `eq:1`
                }
            );
        }

        if (andXFilter.length > 0) {
            this.filters = {
                ...this.filters,
                'andX': andXFilter
            };
        }

        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-config-modulo-filter').close();
    }
}

