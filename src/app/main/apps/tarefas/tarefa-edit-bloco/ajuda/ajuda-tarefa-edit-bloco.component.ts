import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-tarefa-empty',
    templateUrl: './ajuda-tarefa-edit-bloco.component.html',
    styleUrls: ['./ajuda-tarefa-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaTarefaEditBlocoComponent {
}
