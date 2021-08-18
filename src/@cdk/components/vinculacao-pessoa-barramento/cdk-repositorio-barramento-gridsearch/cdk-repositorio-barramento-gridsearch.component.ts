import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {catchError, finalize} from 'rxjs/operators';
import {Pagination} from '@cdk/models';
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'cdk-repositorio-barramento-gridsearch',
    templateUrl: './cdk-repositorio-barramento-gridsearch.component.html',
    styleUrls: ['./cdk-repositorio-barramento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRepositorioBarramentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    repositorios: any[];

    loading: boolean;

    dataSource: any;

    displayedColumns: string[] = ['id', 'repositorio', 'actions'];

    allColumns: any[] = [
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'repositorio',
            label: 'Repositório',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoPessoaBarramentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.loading = false;
    }

    ngOnInit(): void {
        this.loading = true;

        this._vinculacaoPessoaBarramentoService.consultaRepositorio()
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.dataSource = response.sort(function(a,b) {
                return a['id']-b['id']
            });
            this._changeDetectorRef.markForCheck();
        });
    }

    selectRepositorioBarramento(repositorio): void {
        this.selected.emit(repositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
