import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';

@Component({
    selector: 'cdk-acao-transicao-workflow-list',
    templateUrl: './cdk-acao-transicao-workflow-list.component.html',
    styleUrls: ['./cdk-acao-transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAcaoTransicaoWorkflowListComponent {

    @Input()
    loading: boolean;

    @Input()
    acoes: AcaoTransicaoWorkflow[] = [];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    actions: string[] = ['delete'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    create = new EventEmitter<any>();

    hasExcluded = false;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    loadPage(): void {
        this.reload.emit();
    }

    doDeleteacao(acaoTransicaoWorkflowId): void {
        this.delete.emit(acaoTransicaoWorkflowId);
    }

    doCreate(): void {
        this.create.emit();
    }
}