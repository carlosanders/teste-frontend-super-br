import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-atividade-create-bloco',
    templateUrl: './ajuda-atividade-create-bloco.component.html',
    styleUrls: ['./ajuda-atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaAtividadeCreateBlocoComponent {
}
