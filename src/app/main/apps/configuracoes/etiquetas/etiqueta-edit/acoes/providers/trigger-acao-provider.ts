import {ModalidadeEtiqueta} from "@cdk/models";
import {TriggerAcao} from "@cdk/models/trigger-acao";

export class TriggerAcaoProvider {

    private _triggerAcaoList:TriggerAcao[] = [
        {
            id: 1,
            valor: 'Minuta',
            descricao: 'Gera automaticamente uma minuta na tarefa etiquetada de acordo com o modelo pré-selecionado',
            modalidadeEtiqueta: {valor: 'TAREFA'},
            trigger: 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0001'
        },
        {
            id: 2,
            valor: 'Distribuição automática',
            descricao: 'Distribuir as tarefas de forma automática ou por responsável.',
            modalidadeEtiqueta: {valor: 'TAREFA'},
            trigger: 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0003'
        },
        {
            id: 3,
            valor: 'Compartilhamento',
            descricao: 'Compartilha a tarefa entre usuários.',
            modalidadeEtiqueta: {valor: 'TAREFA'},
            trigger: 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0004'
        },
        {
            id: 4,
            valor: 'Ofício',
            descricao: 'Gera automaticamente um oficio na tarefa etiquetada',
            modalidadeEtiqueta: {valor: 'TAREFA'},
            trigger: 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0005'
        },
    ];

    getTriggers(modalidadeEtiqueta?:ModalidadeEtiqueta): TriggerAcao[]
    {
        return this._triggerAcaoList.filter(
            trigger => !modalidadeEtiqueta || trigger.modalidadeEtiqueta.valor == modalidadeEtiqueta.valor
        );
    }
}