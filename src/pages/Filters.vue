<template>
    <v-card class="mx-auto my-8" max-width="1200">
        <v-card-actions>
            <v-btn color="secondary" @click="$router.push('/')">
                Voltar para Home
            </v-btn>
        </v-card-actions>
        <v-card-title>
            Pesquisa sobre Exclusão Digital no Brasil
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-select v-model="filtros.grupoRenda" :items="gruposRenda" label="Grupo de Renda" clearable />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="filtros.texto" label="Busca livre" clearable />
                    </v-col>
                    <v-col cols="12" md="3" class="d-flex align-center">
                        <v-btn color="secondary" variant="outlined" @click="showAdvanced = !showAdvanced">
                            {{ showAdvanced ? 'Ocultar filtros avançados' : 'Filtros avançados' }}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-select v-model="linhasParaCarregar" :items="opcoesLinhas" label="Linhas para carregar" />
                    </v-col>
                </v-row>
                <v-expand-transition>
                    <div v-show="showAdvanced">
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-select v-model="filtros.ano" :items="anos" label="Ano-calendário" clearable />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="filtros.ente" :items="entes" label="Ente Federativo" clearable />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select v-model="filtros.centil" :items="centis" label="Centil" clearable />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="filtros.rendaMin" label="Renda mínima (R$)" type="number"
                                    clearable />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="filtros.rendaMax" label="Renda máxima (R$)" type="number"
                                    clearable />
                            </v-col>
                        </v-row>
                    </div>
                </v-expand-transition>
            </v-form>
            <v-btn color="primary" class="mt-4" @click="carregarDados">Carregar dados</v-btn>
            <v-btn color="secondary" class="mt-4 ml-2" @click="baixarCSV">Baixar CSV</v-btn>
            <v-data-table :headers="headers" :items="dadosFiltrados" :items-per-page="10" class="mt-6" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import Papa from 'papaparse'
import { parseAndCleanCSVData, getRendaGroup } from '@/utils/csv'

const filtros = ref({
    texto: '',
    ano: null,
    ente: null,
    centil: null,
    rendaMin: null,
    rendaMax: null,
    grupoRenda: null,
})

const showAdvanced = ref(false)

const gruposRenda = [
    { title: 'Baixa renda', value: 'baixa' },
    { title: 'Média renda', value: 'media' },
    { title: 'Alta renda', value: 'alta' }
]

const opcoesLinhas = [
    { title: '500 linhas', value: 500 },
    { title: '5000 linhas', value: 5000 },
    { title: 'Todas', value: 'all' }
]
const linhasParaCarregar = ref(500)

const dados = ref([])
const anos = ref([])
const entes = ref([])
const centis = ref([])
const headers = ref([])

const dadosFiltrados = computed(() => {
    let result = dados.value

    if (filtros.value.texto) {
        const texto = filtros.value.texto.toLowerCase()
        result = result.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(texto)
            )
        )
    }
    if (filtros.value.ano) {
        result = result.filter(row => row['Ano-calendário'] === filtros.value.ano)
    }
    if (filtros.value.ente) {
        result = result.filter(row => row['Ente Federativo'] === filtros.value.ente)
    }
    if (filtros.value.centil) {
        result = result.filter(row => String(row['Centil']) === String(filtros.value.centil))
    }
    if (filtros.value.rendaMin) {
        result = result.filter(row =>
            Number(row['Rendimentos Tributaveis - Média da RTB do Centil [R$]']) >= Number(filtros.value.rendaMin)
        )
    }
    if (filtros.value.rendaMax) {
        result = result.filter(row =>
            Number(row['Rendimentos Tributaveis - Média da RTB do Centil [R$]']) <= Number(filtros.value.rendaMax)
        )
    }
    if (filtros.value.grupoRenda) {
        result = result.filter(row => getRendaGroup(row['Centil']) === filtros.value.grupoRenda)
    }
    return result
})

function carregarDados() {
    Papa.parse('/distribuicao-renda.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        delimiter: ';',

        complete: function (results) {
            let cleaned = parseAndCleanCSVData(results.data)
            if (linhasParaCarregar.value !== 'all') {
                cleaned = cleaned.slice(0, linhasParaCarregar.value)
            }
            dados.value = cleaned
            headers.value = results.meta.fields.map(f => ({
                text: f,
                value: f
            }))


            anos.value = [...new Set(cleaned.map(r => r['Ano-calendário']))]
            entes.value = [...new Set(cleaned.map(r => r['Ente Federativo']))]
            centis.value = [...new Set(cleaned.map(r => r['Centil']))]
        }
    })
}

function baixarCSV() {
    window.open('/distribuicao-renda.csv', '_blank')
}
</script>