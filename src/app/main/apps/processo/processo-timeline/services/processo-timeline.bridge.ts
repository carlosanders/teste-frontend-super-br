import {Injectable} from '@angular/core';
import {Tarefa} from '@cdk/models';

@Injectable()
export default class ProcessoTimelineBridge {

    private _reservedHexColor: Map<number, string> = new Map<number, string>();

    public getTarefaHexColor(tarefa: Tarefa): string {
        if (!this._reservedHexColor.has(tarefa.id)) {
            this._reservedHexColor.set(tarefa.id, this.generateRandomHexColor());
        }

        return this._reservedHexColor.get(tarefa.id);
    }

    generateRandomHexColor(size: number = 3): string {
        let result = [];
        let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        for (let n = 0; n < size; n++) {
            result.push(hexRef[Math.floor(Math.random() * 16)]);
        }
        return '#'+result.join('');
    }


}
