import {ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'cdk-json-editor',
    templateUrl: './cdk-json-editor.component.html',
    styleUrls: ['./cdk-json-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
})
export class CdkJsonEditorComponent {

    @Input()
    editorOptions: JsonEditorOptions;

    @Input()
    dataSchema: any;

    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

    constructor() {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
        //this.options.mode = 'code'; //set only one mode

        this.dataSchema = {
            '$id': 'novoSchema',
            '$schema': 'http://json-schema.org/draft-07/schema#',
            'description': 'Descrição do schema',
            'type': 'object',
            'required': [],
            'properties': []
        };

        this.editorOptions.schema = {
            "$id": "_definitions",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "description": "Parcelas informadas diretamente pelo usuário",
            "definitions": {
                "id": {
                    "$id": "id",
                    "type": "integer"
                },
                "data": {
                    "$id": "data",
                    "type": "string",
                    "format": "date-time"
                },

                "correcao": {
                    "$id": "correcao",
                    "type": "string",
                    "maxLength": 256,
                    "description": "Sigla do tipo de indicador utilizado."
                },

                "juros": {
                    "$id": "juros",
                    "type": "object",
                    "required": ["dataInicioJuros"],
                    "properties": {
                        "id": {
                            "type": "string",
                            "maxLength": 256,
                            "description": "Sigla do tipo de indicador utilizado."
                        },
                        "dataInicioJuros": {
                            "$ref": "#/definitions/data",
                            "description": "Data de início de fluência dos juros."
                        }
                    }
                },

                "filtroCompetencias": {
                    "$id": "filtroCompetencias",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/competencia"
                    },
                    "minItems": 0,
                    "description": "Filtro de competências que ingressam no cálculo das parcelas. Se não informado, todas ingressam."
                },

                "competencia": {
                    "$id": "competencia",
                    "type": "object",
                    "required": [
                        "dataInicio",
                        "dataFim"
                    ],
                    "properties": {
                        "dataInicio": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência inicial"
                        },
                        "dataFim": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência final"
                        },
                        "modalidadeIncidencia": {
                            "type": "string",
                            "enum": [
                                "sobreDevido",
                                "sobreRecebido",
                                "sobreSaldo"
                            ],
                            "description": "Modalidade de incidência. Se não informado, será sobre o saldo."
                        }
                    }
                },

                "faixasPercentuais": {
                    "$id": "faixasPercentuais",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/faixaPercentual"
                    },
                    "minItems": 1,
                    "description": "Faixas de percentuais incidentes."
                },

                "faixaPercentual": {
                    "$id": "faixaPercentual",
                    "type": "object",
                    "required": [
                        "percentual"
                    ],
                    "properties": {
                        "valorInicio": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Valor inicial da faixa. Se não informado, será zero."
                        },
                        "valorFim": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Valor final da faixa. Se não informado, será infinito."
                        },
                        "percentual": {
                            "type": "number",
                            "minimum": 0,
                            "maximum": 1,
                            "description": "Percentual aplicável."
                        }
                    }
                },

                "percentualAplicavelPeriodos": {
                    "$id": "percentualAplicavelPeriodos",
                    "oneOf": [{"$ref": "#/definitions/id" }, { "$ref": "#/definitions/periodosPercentual"}]
                },

                "periodosPercentual": {
                    "$id": "periodosPercentual",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/periodoPercentual"
                    },
                    "minItems": 1,
                    "description": "Relação de períodos e o percentual aplicável em cada um deles."
                },

                "periodoPercentual": {
                    "$id": "periodoPercentual",
                    "type": "object",
                    "required": [
                        "dataInicio",
                        "dataFim",
                        "percentual"
                    ],
                    "properties": {
                        "dataInicio": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência inicial"
                        },
                        "dataFim": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência final"
                        },
                        "percentual": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Percentual aplicável para as competências abarcadas"
                        }
                    }
                },

                "modalidadeCalculo": {
                    "$id": "modalidadeCalculo",
                    "type": "string",
                    "enum": [
                        "percentualUnico",
                        "escalonadoPorFaixa"
                    ],
                    "description": "Indica a modalidade cálculo. Se não informado, será incidente um percentual único referente à última faixa."
                },

                "rubricas": {
                    "$id": "rubricas",
                    "type": "array",
                    "items": {
                        "type": "string",
                        "pattern": "^[0-9]{5}$"
                    },
                    "minItems": 1,
                    "uniqueItems": true,
                    "description": "Relação de rubricas que serão utilizadas."
                },

                "parcelasSimples": {
                    "$id": "parcelasSimples",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/parcelaSimples"
                    },
                    "minItems": 1
                },

                "parcelaSimples": {
                    "$id": "parcelaSimples",
                    "type": "object",
                    "required": [
                        "data",
                        "valor"
                    ],
                    "properties": {
                        "data": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência"
                        },
                        "valor": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Saldo"
                        },
                        "devido": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Valor devido. Se não informado, será zero."
                        },
                        "recebido": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Valor recebido. Se não informado, será zero."
                        },
                        "moeda": {
                            "type": "string",
                            "maxLength": 10,
                            "description": "Moeda. Opcional."
                        }
                    }
                },

                "jurosParcela": {
                    "$id": "jurosParcela",
                    "type": "object",
                    "properties": {
                        "juros": {
                            "type": "number",
                            "description": "Valor dos juros calculados."
                        },
                        "percentualJuros": {
                            "type": "number",
                            "description": "Percentual de juros incidente."
                        },
                        "indicadorJuros": {
                            "type": "string",
                            "maxLength": 256,
                            "description": "Sigla do tipo de indicador utilizado."
                        },
                        "dataInicioJuros": {
                            "$ref": "#/definitions/data",
                            "description": "Data da competência"
                        }
                    }
                },

                "correcaoParcela": {
                    "$id": "correcaoParcela",
                    "type": "object",
                    "properties": {
                        "correcao": {
                            "type": "number",
                            "description": "Valor da correção calculada."
                        },
                        "percentualCorrecao": {
                            "type": "number",
                            "description": "Percentual de correção incidente."
                        },
                        "indicadorCorrecao": {
                            "type": "string",
                            "maxLength": 256,
                            "description": "Sigla do tipo de indicador utilizado."
                        }
                    }
                },

                "parcelasDetalhadas": {
                    "$id": "parcelasDetalhadas",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/parcelaDetalhada"
                    },
                    "minItems": 0
                },

                "parcelaDetalhada": {
                    "$id": "parcelaDetalhada",
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "minLength": 1,
                            "description": "Identificador da parcela"
                        },
                        "nome": {
                            "type": "string",
                            "maxLength": 256,
                            "description": "Nome da parcela"
                        },
                        "ref": {
                            "type": "string",
                            "maxLength": 256,
                            "description": "Referência à parcela que serviu de base para o cálculo desta parcela"
                        },
                        "total": {
                            "type": "number",
                            "description": "Valor total devido"
                        },
                        "parcela" : {
                            "$ref": "#/definitions/parcelaSimples"
                        },
                        "juros": {
                            "$ref": "#/definitions/jurosParcela"
                        },
                        "correcao": {
                            "$ref": "#/definitions/correcaoParcela"
                        }
                    }
                },

                "totalizadorParcelaCalculada": {
                    "$id": "totalizadorParcelaCalculada",
                    "type": "object",
                    "properties": {
                        "valorCalculado": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Valor calculado da parcela."
                        },
                        "percentualAplicavel": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Percentual aplicável."
                        },
                        "baseCalculo": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Base de cálculo da parcela."
                        }
                    }
                },

                "planilhaCalculoInteressado": {
                    "$id": "planilhaCalculoInteressado",
                    "type": "object",
                    "properties": {
                        "principal": {
                            "$ref": "#/definitions/parcelasDetalhadas"
                        },
                        "honorarios": {
                            "$ref": "#/definitions/parcelasDetalhadas"
                        },
                        "multa": {
                            "$ref": "#/definitions/parcelasDetalhadas"
                        },
                        "custas": {
                            "$ref": "#/definitions/parcelasDetalhadas"
                        },
                        "totalPrincipal": {
                            "$ref": "#/definitions/parcelaDetalhada"
                        },
                        "totalHonorarios": {
                            "$ref": "#/definitions/totalMultaHonorario"
                        },
                        "totalMulta": {
                            "$ref": "#/definitions/totalMultaHonorario"
                        },
                        "totalCustas": {
                            "$ref": "#/definitions/parcelaDetalhada"
                        }
                    }
                },

                "interessadoCalculo": {
                    "$id": "interessadoCalculo",
                    "type": "object",
                    "required": [
                        "id"
                    ],
                    "properties": {
                        "id": {
                            "type": "string",
                            "pattern": "([0-9]{9})|([0-9]{11})",
                            "minLength": 1,
                            "description": "Identificador do interessado"
                        },
                        "planilhaCalculo": {
                            "$ref": "#/definitions/planilhaCalculoInteressado"
                        }
                    }
                },

                "interessadosCalculo": {
                    "$id": "interessadosCalculo",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/interessadoCalculo"
                    },
                    "minItems": 0
                },

                "totalMultaHonorario": {
                    "$id": "totalMultaHonorario",
                    "type": "object",
                    "properties": {
                        "parcela": {
                            "$ref": "#/definitions/parcelaDetalhada"
                        },
                        "totalizador": {
                            "$ref": "#/definitions/totalizadorParcelaCalculada"
                        }
                    }
                },

                "planilhaCalculo": {
                    "$id": "planilhaCalculo",
                    "type": "object",
                    "properties": {
                        "interessados": {
                            "$ref": "#/definitions/interessadosCalculo"
                        },
                        "totalPrincipal": {
                            "$ref": "#/definitions/parcelaDetalhada"
                        },
                        "totalCustas": {
                            "$ref": "#/definitions/parcelaDetalhada"
                        },
                        "totalHonorarios": {
                            "$ref": "#/definitions/totalMultaHonorario"
                        },
                        "totalMulta": {
                            "$ref": "#/definitions/totalMultaHonorario"
                        }
                    }
                }
            }
        }
    }
}
