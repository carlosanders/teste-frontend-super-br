import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-compartilhamento-create-bloco',
    templateUrl: './ajuda-compartilhamento-create-bloco.component.html',
    styleUrls: ['./ajuda-compartilhamento-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaCompartilhamentoCreateBlocoComponent {
}
