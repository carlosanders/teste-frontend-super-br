import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-modelo-filter',
    templateUrl: './cdk-modelo-filter.component.html',
    styleUrls: ['./cdk-modelo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloFilterComponent implements OnChanges {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    @Input()
    type = null;

    @Input()
    hasInatived = false;

    form: FormGroup;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _loginService: LoginService
    ) {
        this.form = this._formBuilder.group({
            modalidadeModelo: ['nacional'],
            id: [null],
            conteudo: [null],
            nome: [null],
            descricao: [null],
            tipoDocumento: [null],
            ativo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
        this.form.controls.ativo.setValue("todos");
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] && this.type !== null) {
            this.form.get('modalidadeModelo').setValue(this.type, {emitEvent: false});
            this.form.get('modalidadeModelo').disable();
        }
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('id').value) {
            andXFilter.push({'id': `eq:${this.form.get('id').value}`});
        }

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'documento.componentesDigitais.conteudo': `like:%${bit}%`});
            });
        }

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nome': `like:%${bit}%`});
            });
        }

        if (this.type === null && this.form.get('modalidadeModelo').value) {
            if (this.form.get('modalidadeModelo').value === 'nacional') {
                // Modelos nacionais
                andXFilter.push({
                    'modalidadeModelo.valor': 'eq:NACIONAL',
                    'vinculacoesModelos.modalidadeOrgaoCentral.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                });
            }
            if (this.form.get('modalidadeModelo').value === 'unidade') {
                // Modelos da unidade por especie de setor
                andXFilter.push({
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.unidade.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                });
            }
            if (this.form.get('modalidadeModelo').value === 'setor') {
                // Modelos do setor
                andXFilter.push({
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.setor.id': 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')
                });
            }
            if (this.form.get('modalidadeModelo').value === 'individual') {
                // Modelos individuais
                andXFilter.push({
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                });
            }
            if (this.form.get('modalidadeModelo').value === 'emBranco') {
                // Modelos em branco
                andXFilter.push({
                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                });
            }
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'documento.tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('ativo').value) {
            if(this.form.get('ativo').value !== 'todos') {
                andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
            }
            else {
                delete andXFilter['ativo'];
            }
        }

        if (this.filterCriadoEm?.length) {
            this.filterCriadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterAtualizadoEm?.length) {
            this.filterAtualizadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        const contexto = this.hasInatived ?  {isAdmin: true} : {isAdmin: false};

        const request = {
            filters: {},
            contexto: contexto
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-modelo-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    verificarValor(objeto): void {
        const objetoForm = this.form.get(objeto.target.getAttribute('formControlName'));
        if (!objetoForm.value || typeof objetoForm.value !== 'object') {
            objetoForm.setValue(null);
        }
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.resetarFormulario();
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }

    resetarFormulario(): void {
        this.form.reset();
        this.form.controls.ativo.setValue("todos");
        if (this.type === null) {
            this.form.controls.modalidadeModelo.setValue('nacional');
        } else {
            this.form.controls.modalidadeModelo.setValue(this.type);
        }
    }
}

