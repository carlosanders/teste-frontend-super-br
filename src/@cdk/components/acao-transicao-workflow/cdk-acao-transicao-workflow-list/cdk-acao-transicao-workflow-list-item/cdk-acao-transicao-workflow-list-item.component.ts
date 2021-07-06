import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';

@Component({
    selector: 'cdk-acao-transicao-workflow-list-item',
    templateUrl: './cdk-acao-transicao-workflow-list-item.component.html',
    styleUrls: ['./cdk-acao-transicao-workflow-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkAcaoTransicaoWorkflowListItemComponent implements OnInit {

    @Input()
    acao: AcaoTransicaoWorkflow;

    @Input()
    deleting: boolean;

    @Input()
    total: number;

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    delete = new EventEmitter<number>();

    constructor() {
        this.deleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doDelete(): void {
        this.delete.emit(this.acao.id);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }
}
