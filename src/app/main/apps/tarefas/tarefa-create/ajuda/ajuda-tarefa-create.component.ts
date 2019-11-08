import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-tarefa-create',
    templateUrl: './ajuda-tarefa-create.component.html',
    styleUrls: ['./ajuda-tarefa-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaTarefaCreateComponent {
}
