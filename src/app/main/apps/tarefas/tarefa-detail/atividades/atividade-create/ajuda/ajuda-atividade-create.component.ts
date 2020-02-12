import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-atividade-create',
    templateUrl: './ajuda-atividade-create.component.html',
    styleUrls: ['./ajuda-atividade-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaAtividadeCreateComponent{
}
