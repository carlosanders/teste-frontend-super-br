import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {EspecieTarefa, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-especie-tarefa-autocomplete-chiplist',
    templateUrl: './cdk-especie-tarefa-autocomplete-chiplist.component.html',
    styleUrls: ['./cdk-especie-tarefa-autocomplete-chiplist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieTarefaAutocompleteChiplistComponent {

    @Input() selectedEspecieTarefaList: EspecieTarefa[] = [];
    @Input() displayItemFn: (especieTarefa: EspecieTarefa) => string | '';
    @Input() disableItemFn: (especieTarefa: EspecieTarefa, pagination: Pagination) => boolean | false;
    @Input() pagination: Pagination = new Pagination();
    @Output() valuesChanged: EventEmitter<EspecieTarefa[]> = new EventEmitter<EspecieTarefa[]>();
    @ViewChild('chiplist', {static: true}) chipList;

    remove(especieTarefa: EspecieTarefa): void {
        this.valuesChanged.emit([
            ...this.selectedEspecieTarefaList.filter((selected: EspecieTarefa) => selected.id != especieTarefa.id)
        ]);
    }
}
