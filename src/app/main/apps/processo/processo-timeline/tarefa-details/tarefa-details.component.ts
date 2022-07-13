import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {Tarefa} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector   : 'tarefa-details',
    templateUrl: './tarefa-details.component.html',
    styleUrls  : ['./tarefa-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaDetailsComponent
{
    @Input() tarefa: Tarefa;
}
