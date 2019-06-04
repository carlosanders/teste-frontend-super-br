import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@angular/material';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-vinculacao-role-autocomplete',
    templateUrl: './cdk-vinculacao-role-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-role-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'vinculacaoRoleAutocomplete',
})
export class CdkVinculacaoRoleAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: FormControl;

    vinculacaoRoleList: VinculacaoRole[];
    vinculacaoRoleListIsLoading: boolean;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoRoleService: VinculacaoRoleService
    ) {
        this.vinculacaoRoleList = [];
        this.vinculacaoRoleListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            'role.name': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.vinculacaoRoleListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._vinculacaoRoleService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoRoleListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoRoleList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoRoleFn(vinculacaoRole): string {
        return vinculacaoRole ? vinculacaoRole.role.name : null;
    }
}
