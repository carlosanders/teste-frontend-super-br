import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {of, Subject} from 'rxjs';
import {CdkConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Pagination} from "../../../../models";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
    selector: 'cdk-componente-digital-filter',
    templateUrl: './cdk-componente-digital-filter.component.html',
    styleUrls: ['./cdk-componente-digital-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @Input()
    isColaborador = false;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    filterCriadoEm = [];
    filterJuntadoEm = [];

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.form = this._formBuilder.group({
            conteudo: [null],
            codigo: [null],
            autor: [null],
            redator: [null],
            destinatario: [null],
            tamanho: [null],
            extensao: [null],
            processo: [null],
            editavel: ['todos'],
            criadoPor: [null],
            criadoEm: [null],
            tipoDocumento: [null],
            juntadoPor: [null],
            juntadoEm: [null],
            unidade: [null],
            setor: [null, [Validators.required]],
            idDocumento: [null]
        });
    }

    ngOnInit(): void {
        if (this.isColaborador) {
            this.form.get('conteudo').enable();
        } else {
            this.form.get('conteudo').disable();
        }

        this.form.get('setor').disable();

        this.form.get('unidade').valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value) => {
                if (value && typeof value === 'object') {
                    this.form.get('setor').enable();
                    this.setorPagination.filter['unidade.id'] = `eq:${this.form.get('unidade').value?.id}`;
                    this.setorPagination.filter['parent'] = 'isNotNull';
                } else {
                    this.form.get('setor').setValue(null);
                    this.form.get('setor').disable();
                }
                this._changeDetectorRef.markForCheck();
                return of([]);
            }
            )
        ).subscribe();
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('conteudo').value) {
            andXFilter.push({'conteudo': `like:%${this.form.get('conteudo').value}%`});
        }

        if (this.form.get('extensao').value) {
            this.form.get('extensao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'extensao': `like:%${bit}%`});
            });
        }

        if (this.form.get('autor').value) {
            this.form.get('autor').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'documento.autor': `like:%${bit}%`});
            });
        }

        if (this.form.get('redator').value) {
            this.form.get('redator').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'documento.redator': `like:%${bit}%`});
            });
        }

        if (this.form.get('destinatario').value) {
            this.form.get('destinatario').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'documento.destinatario': `like:%${bit}%`});
            });
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'documento.juntadaAtual.volume.processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'documento.tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('juntadoPor').value) {
            andXFilter.push({'documento.juntadaAtual.criadoPor.id': `eq:${this.form.get('juntadoPor').value.id}`});
        }

        if (this.form.get('codigo').value) {
            andXFilter.push({'id': `eq:${this.form.get('codigo').value}`});
        }

        if (this.form.get('idDocumento').value) {
            andXFilter.push({'documento.id': `eq:${this.form.get('idDocumento').value}`});
        }

        if (this.filterJuntadoEm?.length) {
            this.filterJuntadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterCriadoEm?.length) {
            this.filterCriadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('editavel').value) {
            if (this.form.get('editavel').value !== 'todos') {
                andXFilter.push({'editavel': `eq:${this.form.get('editavel').value}`});
            } else {
                delete andXFilter['editavel'];
            }
        }

        // if (this.form.get('unidade').value) {
        //     andXFilter.push({'documento.setorOrigem.unidade.id': `eq:${this.form.get('unidade').value.id}`});
        // }

        if (this.form.get('setor').value) {
            andXFilter.push({'documento.setorOrigem.id': `eq:${this.form.get('setor').value.id}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
            this.selected.emit(request);
        } else {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Erro!',
                    message: ' Ao menos um campo deve ser preenchido!',
                    confirmLabel: 'Fechar',
                    hideCancel: true,
                },
                disableClose: false,
            });
        }
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
    }

    filtraJuntadoEm(value: any): void {
        this.filterJuntadoEm = value;
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
        this.form.reset();
        this.form.get('editavel').setValue('todos');
        this.limparFormFiltroDatas$.next(true);
    }
}

