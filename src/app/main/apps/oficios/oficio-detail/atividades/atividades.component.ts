import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'atividades',
    templateUrl: './atividades.component.html',
    styleUrls: ['./atividades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AtividadesComponent {

}
