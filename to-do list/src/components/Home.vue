<script setup>
import { ref, watch } from "vue";
import { useTickets } from "../composables/useTickets";
import { useRouter, useRoute } from "vue-router";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";

const router = useRouter();
const route = useRoute();
const { tickets, removerTicket } = useTickets();

const mensagemSucesso = ref("");
const mensagemErro = ref("");


const showDeleteModal = ref(false);
const chamadoSelecionado = ref(null);

watch(
  () => route.query,
  (query) => {
    if (query.sucesso) {
      mensagemSucesso.value = query.sucesso;
      setTimeout(() => (mensagemSucesso.value = ""), 3000);
      router.replace({ query: {} });
    }
    if (query.err) {
      mensagemErro.value = query.err;
      setTimeout(() => (mensagemErro.value = ""), 3000);
      router.replace({ query: {} });
    }
  },
  { immediate: true }
);

function editar(id) {
  router.push(`/editar/${id}`);
}

function verDetalhes(id) {
  router.push(`/detalhes/${id}`);
}

function confirmarRemover(chamado) {
  chamadoSelecionado.value = chamado;
  showDeleteModal.value = true;
}

async function removerConfirmado() {
  try {
    await removerTicket(chamadoSelecionado.value.id);
    mensagemSucesso.value = "Chamado removido com sucesso!";
    setTimeout(() => (mensagemSucesso.value = ""), 3000);
  } catch (error) {
    mensagemErro.value = "Erro ao remover chamado.";
    setTimeout(() => (mensagemErro.value = ""), 3000);
  } finally {
    showDeleteModal.value = false;
    chamadoSelecionado.value = null;
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-lg mx-auto" style="max-width: 900px">
      <div class="card-header text-dark">
        <h3 class="mb-0 text-center">📋 Painel de Chamados</h3>
      </div>
      <div class="card-body">
        <div v-if="mensagemSucesso" class="alert alert-success">
          {{ mensagemSucesso }}
        </div>
        <div v-if="mensagemErro" class="alert alert-danger">
          {{ mensagemErro }}
        </div>

        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in tickets" :key="t.id">
              <th>{{ t.id }}</th>
              <td>{{ t.titulo }}</td>
              <td>
                {{
                  t.descricao.length > 50
                    ? t.descricao.slice(0, 50) + "..."
                    : t.descricao
                }}
              </td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': t.status === 'Aberto',
                    'bg-warning': t.status === 'Em Andamento',
                    'bg-secondary': t.status === 'Fechado',
                  }"
                  >{{ t.status }}</span
                >
              </td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': t.prioridade === 'Baixa',
                    'bg-warning': t.prioridade === 'Média',
                    'bg-danger': t.prioridade === 'Alta',
                  }"
                  >{{ t.prioridade }}</span
                >
              </td>
              <td>
                <div class="dropdown">
                  <button
                    class="btn btn-sm btn-secondary dropdown-toggle"
                    type="button"
                    id="acoesDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ações
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="acoesDropdown">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="verDetalhes(t.id)"
                      >
                        🔍 Ver Detalhes
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="editar(t.id)"
                      >
                        ✏️ Editar
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href="#"
                        @click.prevent="confirmarRemover(t)"
                      >
                        ❌ Excluir
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="tickets.length === 0" class="text-center text-muted mt-3">
          Nenhum chamado registrado.
        </div>
      </div>
    </div>

    <ConfirmDeleteModal
      :show="showDeleteModal"
      :chamado="chamadoSelecionado"
      @cancel="showDeleteModal = false"
      @confirm="removerConfirmado"
    />
  </div>
</template>
