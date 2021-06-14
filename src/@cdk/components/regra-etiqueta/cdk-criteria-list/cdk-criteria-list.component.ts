import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Criteria} from '@cdk/models';

@Component({
    selector: 'cdk-criteria-list',
    templateUrl: './cdk-criteria-list.component.html',
    styleUrls: ['./cdk-criteria-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCriteriaListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    criterias: Criteria[] = [];

    @Output()
    criteriasChange = new EventEmitter<Criteria[]>();

    @Input()
    actions: string[] = ['delete'];

    @Output()
    create = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef) {
        this.criterias = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    doDeleteCriteria(rowId): void {
        this.criterias = this.criterias.filter(row => row.exibicao !== rowId);
        this.criteriasChange.emit(this.criterias);
    }

    doCreate(): void {
        this.create.emit();
    }
}
