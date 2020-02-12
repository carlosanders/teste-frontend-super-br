import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-atividade-create-bloco',
    templateUrl: './ajuda-atividade-create-bloco.component.html',
    styleUrls: ['./ajuda-atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaAtividadeCreateBlocoComponent {
}
