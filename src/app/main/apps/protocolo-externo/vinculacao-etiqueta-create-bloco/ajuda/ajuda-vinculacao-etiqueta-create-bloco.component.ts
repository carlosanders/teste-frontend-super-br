import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-vinculacao-etiqueta-create-bloco',
    templateUrl: './ajuda-vinculacao-etiqueta-create-bloco.component.html',
    styleUrls: ['./ajuda-vinculacao-etiqueta-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaVinculacaoEtiquetaCreateBlocoComponent {
}
