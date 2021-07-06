import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

@Component({
    selector: 'cdk-validacao-transicao-workflow-list',
    templateUrl: './cdk-validacao-transicao-workflow-list.component.html',
    styleUrls: ['./cdk-validacao-transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkValidacaoTransicaoWorkflowListComponent {

    @Input()
    loading: boolean;

    @Input()
    validacoes: ValidacaoTransicaoWorkflow[] = [];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    actions: string[] = ['delete'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

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

    doDeletevalidacao(ValidacaoTransicaoWorkflowId): void {
        this.delete.emit(ValidacaoTransicaoWorkflowId);
    }

    doCreate(): void {
        this.create.emit();
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

}
