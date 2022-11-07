import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeAcaoEtiqueta, Pagination} from '@cdk/models';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-acao-etiqueta-autocomplete',
    templateUrl: './cdk-modalidade-acao-etiqueta-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-acao-etiqueta-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeAcaoEtiquetaAutocomplete',
})
export class CdkModalidadeAcaoEtiquetaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiqueta[];

    @Input()
    modalidadeAcaoEtiquetaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeAcaoEtiquetaService: ModalidadeAcaoEtiquetaService
    ) {
        this.modalidadeAcaoEtiquetaList = [];
        this.modalidadeAcaoEtiquetaListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeAcaoEtiquetaList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            nome: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.modalidadeAcaoEtiquetaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeAcaoEtiquetaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeAcaoEtiquetaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeAcaoEtiquetaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeAcaoEtiquetaFn(modalidadeAcaoEtiqueta): string {
        let displayed = modalidadeAcaoEtiqueta ? TitleCasePipe.format(modalidadeAcaoEtiqueta.nome) : '';
        displayed += (modalidadeAcaoEtiqueta && modalidadeAcaoEtiqueta.generoProcesso) ? (' (' + TitleCasePipe.format(modalidadeAcaoEtiqueta.generoProcesso.nome) + ')') : '';
        return displayed;
    }
}
