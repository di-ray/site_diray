import { Collection } from 'tinacms'

export const CalculatorCollection: Collection = {
  name: 'calculator',
  label: 'Calculadoras',
  path: 'content/calculators',
  format: 'json',
  fields: [
    {
      type: 'string',
      name: 'name',
      label: 'Nome da Calculadora',
      required: true,
    },
    {
      type: 'string',
      name: 'type',
      label: 'Tipo de Calculadora',
      required: true,
      options: [
        { value: 'budget-plans', label: 'Orçamento com Planos' },
        { value: 'salary-based', label: 'Baseada em Salário' },
        { value: 'training-based', label: 'Baseada em Treinamentos' },
        { value: 'custom', label: 'Personalizada' },
      ],
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'object',
      name: 'config',
      label: 'Configuração',
      fields: [
        // Campos para calculadoras com planos
        {
          type: 'object',
          name: 'plans',
          label: 'Planos',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label || 'Novo Plano' }
            },
          },
          fields: [
            {
              type: 'string',
              name: 'id',
              label: 'ID do Plano',
              required: true,
            },
            {
              type: 'string',
              name: 'label',
              label: 'Nome do Plano',
              required: true,
            },
            {
              type: 'string',
              name: 'range',
              label: 'Faixa/Descrição',
            },
            {
              type: 'number',
              name: 'totalCost',
              label: 'Custo Total',
            },
            {
              type: 'number',
              name: 'totalHours',
              label: 'Horas Totais',
            },
            {
              type: 'string',
              name: 'duration',
              label: 'Duração',
            },
            {
              type: 'object',
              name: 'activities',
              label: 'Atividades',
              list: true,
              fields: [
                {
                  type: 'string',
                  name: 'name',
                  label: 'Nome da Atividade',
                },
                {
                  type: 'string',
                  name: 'duration',
                  label: 'Duração',
                },
                {
                  type: 'string',
                  name: 'hours',
                  label: 'Horas',
                },
                {
                  type: 'string',
                  name: 'cost',
                  label: 'Custo',
                },
              ],
            },
          ],
        },
        // Campos para calculadoras baseadas em salário
        {
          type: 'object',
          name: 'salaryRanges',
          label: 'Faixas Salariais',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'id',
              label: 'ID',
              required: true,
            },
            {
              type: 'string',
              name: 'label',
              label: 'Descrição da Faixa',
              required: true,
            },
            {
              type: 'number',
              name: 'min',
              label: 'Valor Mínimo',
            },
            {
              type: 'number',
              name: 'max',
              label: 'Valor Máximo',
            },
            {
              type: 'number',
              name: 'multiplier',
              label: 'Multiplicador',
            },
          ],
        },
        // Campos para calculadoras de treinamento
        {
          type: 'object',
          name: 'trainingTypes',
          label: 'Tipos de Treinamento',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'type',
              label: 'Tipo',
              options: ['synchronous', 'asynchronous'],
            },
            {
              type: 'object',
              name: 'durations',
              label: 'Durações',
              list: true,
              fields: [
                {
                  type: 'number',
                  name: 'hours',
                  label: 'Horas',
                },
                {
                  type: 'number',
                  name: 'consultingHours',
                  label: 'Horas de Consultoria',
                },
                {
                  type: 'number',
                  name: 'cost',
                  label: 'Custo',
                },
                {
                  type: 'number',
                  name: 'weeks',
                  label: 'Semanas',
                },
                {
                  type: 'number',
                  name: 'additionalPerSession',
                  label: 'Adicional por Sessão',
                },
              ],
            },
          ],
        },
        // Configurações gerais
        {
          type: 'number',
          name: 'hourlyRate',
          label: 'Valor da Hora',
        },
        {
          type: 'boolean',
          name: 'requiresLeadForm',
          label: 'Requer Formulário de Lead',
        },
        {
          type: 'boolean',
          name: 'showPDF',
          label: 'Mostrar Botão de PDF',
        },
        {
          type: 'string',
          name: 'formula',
          label: 'Fórmula de Cálculo',
          description: 'Para calculadoras personalizadas',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'object',
          name: 'variables',
          label: 'Variáveis',
          list: true,
          description: 'Para calculadoras personalizadas',
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Nome da Variável',
            },
            {
              type: 'string',
              name: 'label',
              label: 'Label',
            },
            {
              type: 'string',
              name: 'type',
              label: 'Tipo',
              options: ['number', 'select', 'text'],
            },
            {
              type: 'string',
              name: 'defaultValue',
              label: 'Valor Padrão',
            },
            {
              type: 'number',
              name: 'min',
              label: 'Mínimo',
            },
            {
              type: 'number',
              name: 'max',
              label: 'Máximo',
            },
            {
              type: 'number',
              name: 'step',
              label: 'Passo',
            },
            {
              type: 'object',
              name: 'options',
              label: 'Opções',
              list: true,
              fields: [
                {
                  type: 'string',
                  name: 'value',
                  label: 'Valor',
                },
                {
                  type: 'string',
                  name: 'label',
                  label: 'Label',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'object',
      name: 'display',
      label: 'Exibição',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Título da Seção',
        },
        {
          type: 'string',
          name: 'subtitle',
          label: 'Subtítulo',
        },
        {
          type: 'string',
          name: 'buttonText',
          label: 'Texto do Botão',
        },
        {
          type: 'string',
          name: 'warningMessage',
          label: 'Mensagem de Aviso',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'successMessage',
          label: 'Mensagem de Sucesso',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
}