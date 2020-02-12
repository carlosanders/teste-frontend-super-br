import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-documento-avulso-create-bloco',
    templateUrl: './ajuda-documento-avulso-create-bloco.component.html',
    styleUrls: ['./ajuda-documento-avulso-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaDocumentoAvulsoCreateBlocoComponent {
}
