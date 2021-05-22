import axios from 'axios'
export default {
    attrs: {
        style: {
            width: '100%'
        }
    },
    header: {
        attrs: {},
        rows: [
            {
                attrs: {
                    style: {
                        textAlign: 'left'
                    }
                },
                cols: [
                    {
                        label: 'Nome'
                    },
                    {
                        label: 'Sigla'
                    }
                ]
            }
        ]
    },
    body: {
        attrs: {},
        rows: async function(table, row, col) {
            // Retorna opções de forma sincrona usando axios
            // Deve ser usado dessa forma para chamada de recursos externos
            var res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            let rows = [];
            for(let i in res.data) {
                rows.push({
                    cols: [
                        {label: '<a href="#rota-qualquer">' +res.data[i].nome + '</a>'}, 
                        {label: res.data[i].sigla}
                    ]
                })
            }
            console.log(this, table, row, col)
            table.body.rows = rows
        }
    },
    footer: {
        attrs: {}
    },
}