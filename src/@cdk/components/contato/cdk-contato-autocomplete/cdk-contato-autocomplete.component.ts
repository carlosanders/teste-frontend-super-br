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
import {Contato} from '@cdk/models/contato.model';
import {ContatoService} from '@cdk/services/contato.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-contato-autocomplete',
    templateUrl: './cdk-contato-autocomplete.component.html',
    styleUrls: ['./cdk-contato-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'contatoAutocomplete',
})
export class CdkContatoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    contatoList: Contato[];

    contatoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _contatoService: ContatoService
    ) {
        this.contatoList = [];
        this.contatoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.contatoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilterUnidade = [];
                    const andxFilterSetor = [];
                    const andxFilterUsuario = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilterUnidade.push({'unidade.nome': `like:%${bit}%`});
                        andxFilterSetor.push({'setor.nome': `like:%${bit}%`});
                        andxFilterUsuario.push({'usuario.nome': `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilterUnidade.length > 0) {
                        this.contatoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            orX: [
                                {andX: andxFilterUnidade},
                                {andX: andxFilterSetor},
                                {andX: andxFilterUsuario}
                            ]
                        };
                        return this._contatoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.contatoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.contatoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayContatoFn(contato): string {
        return contato ? TitleCasePipe.format(contato.nome) : null;
    }
}
