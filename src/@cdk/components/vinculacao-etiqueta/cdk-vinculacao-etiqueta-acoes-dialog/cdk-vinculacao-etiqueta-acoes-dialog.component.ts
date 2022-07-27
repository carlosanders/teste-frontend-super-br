import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject, Input, OnDestroy, ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {Acao, Etiqueta, VinculacaoEtiqueta} from '@cdk/models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkAcaoGridComponent} from '../../acao/cdk-acao-grid/cdk-acao-grid.component';

@Component({
    selector: 'cdk-vinculacao-etiqueta-acoes-dialog',
    templateUrl: './cdk-vinculacao-etiqueta-acoes-dialog.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-acoes-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaAcoesDialogComponent implements OnDestroy{

    @ViewChild('acaoGridComponent', {read: CdkAcaoGridComponent}) acaoGridComponent: CdkAcaoGridComponent;
    @Input() vinculacaoEtiqueta: VinculacaoEtiqueta;
    @Input() isLoading$: Observable<boolean> = new Observable<boolean>();
    @Input() isSaving$: Observable<boolean> = new Observable<boolean>();
    @Input() acoesEtiquetaList$: Observable<Acao[]> = new Observable<Acao[]>();

    form: FormGroup;
    acoesEtiquetaList: Acao[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();


    constructor(
        public _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<CdkVinculacaoEtiquetaAcoesDialogComponent>,
        private _viewContainerRef: ViewContainerRef,
        @Inject(MAT_DIALOG_DATA) {
            vinculacaoEtiqueta,
            acoesEtiquetaList$,
            isSaving$,
            isLoading$,
        }
    ) {
        this.vinculacaoEtiqueta = vinculacaoEtiqueta;
        this.acoesEtiquetaList$ = acoesEtiquetaList$;
        this.isSaving$ = isSaving$;
        this.isLoading$ = isLoading$;
        this.form = this._formBuilder.group({
            id: new FormControl<number>(this.vinculacaoEtiqueta.id),
            podeAlterarConteudo: new FormControl<boolean>(this.vinculacaoEtiqueta.podeAlterarConteudo),
            acoes: new FormControl<number[]>(null, [Validators.required])
        });
        this.acoesEtiquetaList$
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((acoes) => acoes?.length > 0)
            )
            .subscribe((acoes) => {
               if (this.vinculacaoEtiqueta.etiqueta.tipoExecucaoAcaoSugestao < 1) {
                   this.acoesEtiquetaList = acoes;
                   this.changeSelectedIds([]);
               }
            });
    }

    changeSelectedIds(selectedIds: number[]): void {
        switch (this.vinculacaoEtiqueta.etiqueta.tipoExecucaoAcaoSugestao) {
            case Etiqueta.TIPO_EXECUCAO_ACAO_SELECAO_UNICA:
                if (selectedIds.length > 1) {
                    const lastId = selectedIds[selectedIds.length -1];
                    this.acaoGridComponent.selectedIds = [
                        lastId
                    ];
                    this.acaoGridComponent.recompute();
                } else {
                    this.form.get('acoes').setValue(selectedIds);
                }
                break;
            case Etiqueta.TIPO_EXECUCAO_ACAO_TODOS:
                this.form.get('acoes').setValue(this.acoesEtiquetaList.map((acao) => acao.id));
                break;
            default:
                this.form.get('acoes').setValue(selectedIds);
                break;
        }
    }

    getDisplayedColumns(): string[] {
        const displayedColumns = ['modalidadeAcaoEtiqueta.valor', 'modalidadeAcaoEtiqueta.descricao'];

        if (this.vinculacaoEtiqueta.etiqueta.tipoExecucaoAcaoSugestao > 0) {
            displayedColumns.push('select');
        }

        return displayedColumns;
    }

    doCloseModal(): void {
        this._dialogRef.close();
    }

    submit(): void {
        if (this.form.valid) {
            this._dialogRef.close(this.form.get('acoes').value);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
