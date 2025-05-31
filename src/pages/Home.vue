<template>
  <v-card class="mx-auto my-8" max-width="800">
    <v-card-title>
      Bem-vindo à Pesquisa de Distribuição de Renda
    </v-card-title>
    <v-card-text>
      <p class="mb-4" style="font-style: italic; color: #1976d2;">
        "A exclusão digital reflete a desigualdade de renda: quanto menor o acesso, maior a distância das
        oportunidades."
      </p>

      <p>
        Esta aplicação permite analisarmos os dados das pessoas de Alta, Média e Baixa renda contendo os seguintes
      </p>
      <p>
        <strong>Filtros disponíveis:</strong>
      </p>
      <ul>
        <li>
          <strong>Grupo de Renda:</strong> Filtra entre baixa renda (centis 1-33), média renda (34-66) e alta renda
          (67-100).
        </li>
        <li>
          <strong>Busca livre:</strong> Pesquise por qualquer termo em todos os campos.
        </li>
        <li>
          <strong>Linhas para carregar:</strong> Escolha quantas linhas do arquivo deseja carregar (500, 5000 ou todas).
        </li>
        <li>
          <strong>Ano-calendário:</strong> Ano de referência dos dados (exemplo: 2006).
        </li>
        <li>
          <strong>Ente Federativo:</strong> Unidade federativa (BRASIL, AC, AL, AM, AP, etc.) ou "BRASIL" para dados
          nacionais.
        </li>
        <li>
          <strong>Centil:</strong> Grupo de 1% da população ordenado por renda (1 = mais pobre, 100 = mais rico).
        </li>
        <li>
          <strong>Renda mínima/máxima:</strong> Defina um intervalo de renda média por centil para refinar a busca.
        </li>
      </ul>
      <p>
        Clique no botão abaixo para acessar a tela de filtros.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$router.push('/Filters')">
        Ir para filtros
      </v-btn>
    </v-card-actions>
  </v-card>
</template>