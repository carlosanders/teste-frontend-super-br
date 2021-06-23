import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-tarefa-edit-bloco',
    templateUrl: './ajuda-tarefa-edit-bloco.component.html',
    styleUrls: ['./ajuda-tarefa-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaTarefaEditBlocoComponent {
}
