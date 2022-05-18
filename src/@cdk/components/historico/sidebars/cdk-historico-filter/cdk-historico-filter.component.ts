import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {CdkConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {MatMenu} from '@angular/material/menu';

@Component({
    selector: 'cdk-historico-filter',
    templateUrl: './cdk-historico-filter.component.html',
    styleUrls: ['./cdk-historico-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkHistoricoFilterComponent implements OnChanges {

    @ViewChild('criadoEm') criadoEmMenu!: MatMenu;

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.form = this._formBuilder.group({
            tipoPesquisa: ['processo'],
            descricao: [null],
            processo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
        this.form.get('tipoPesquisa').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                if (value === 'processo') {
                    this.form.get('processo').addValidators(Validators.required);
                    this.form.get('processo').markAsPending();
                    this.form.get('criadoEm').clearValidators();
                    this.form.get('criadoEm').setErrors(null);
                    this.removeCloneBackdrop();
                } else if (value === 'tempo') {
                    this.form.get('criadoEm').addValidators(Validators.required);
                    this.form.get('criadoEm').markAsPending();
                    this.form.get('processo').clearValidators();
                    this.form.get('processo').setErrors(null);
                }
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.mode === 'search') {
            this.form.get('tipoPesquisa').addValidators(Validators.required);
        } else {
            this.form.get('tipoPesquisa').clearValidators();
        }
    }

    validate(): void {
        if (this.mode === 'search' && this.form.get('tipoPesquisa').value === 'tempo') {
            if (this.filterCriadoEm.length === 2) {
                this.removeCloneBackdrop();
                this.form.get('criadoEm').setValue(true);
            } else {
                this.createCustomBackdrop();
                this.form.get('criadoEm').setValue(null);
            }
        }
    }

    createCustomBackdrop(): void {
        const clones = document.querySelectorAll('.datasValidateBackdrop');
        if (clones?.length === 0) {
            const overlayers = document.querySelectorAll('.datasBackdrop');
            if (overlayers) {
                overlayers.forEach((element) => {
                    const clone = element.cloneNode(true);
                    (clone as Element).classList.add('datasValidateBackdrop');
                    clone.addEventListener('click', this.select.bind(this));
                    element.parentNode.insertBefore(clone, element.nextSibling);
                });
            }
        }
    }

    select(event: Event): void {
        if (this.filterCriadoEm.length !== 2) {
            event.stopPropagation();
        } else {
            this.removeCloneBackdrop();
            (document.querySelector('.datasBackdrop') as HTMLDivElement).click();
        }
    }

    removeCloneBackdrop(): void {
        document.querySelectorAll('.datasValidateBackdrop').forEach(element => element.remove());
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        if (this.mode === 'search') {
            if (this.form.get('tipoPesquisa').value === 'tempo') {
                if (this.filterCriadoEm.length !== 2) {
                    this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                        data: {
                            title: 'Erro!',
                            message: ' Para pesquisa por tempo, deve ser informada uma data exata, ou um intervalo de datas não superior a 10 dias.',
                            confirmLabel: 'Fechar',
                            hideCancel: true,
                        },
                        disableClose: false,
                    });
                    return;
                }
            }
            if (this.form.get('tipoPesquisa').value === 'processo') {
                if (!this.form.get('processo').value) {
                    this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                        data: {
                            title: 'Erro!',
                            message: ' Para pesquisa por processo, o preenchimento do número do processo é obrigatório.',
                            confirmLabel: 'Fechar',
                            hideCancel: true,
                        },
                        disableClose: false,
                    });
                    return;
                }
            }
        }

        const andXFilter = [];

        if (this.form.get('descricao').value) {
            this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'descricao': `like:%${bit}%`});
            });
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
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

        if (this.mode !== 'search' && this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
            this.selected.emit(request);
            this._cdkSidebarService.getSidebar('cdk-historico-filter').close();
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
        this.limparFormFiltroDatas$.next(false);
        this.validate();
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
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this.form.controls.tipoPesquisa.setValue('processo');
        this.emite();
    }
}

function feed<T>(from: Observable<T>, to: Subject<T>): Subscription {
    return from.subscribe(
        data => to.next(data),
        err => to.error(err),
        () => to.complete(),
    );
}
