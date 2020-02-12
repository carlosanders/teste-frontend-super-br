import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-compartilhamento-create',
    templateUrl: './ajuda-compartilhamento-create.component.html',
    styleUrls: ['./ajuda-compartilhamento-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaCompartilhamentoCreateComponent {
}
