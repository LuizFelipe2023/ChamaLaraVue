<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTickets } from '../composables/useTickets'
import EditConfirmModal from '../components/ConfirmModalEdit.vue'

const route = useRoute()
const router = useRouter()
const { tickets, editarTicket } = useTickets()

const id = Number(route.params.id)
const titulo = ref('')
const descricao = ref('')
const prioridade = ref('')
const status = ref('')

const erro = ref('')
const prioridadesValidas = ['Baixa', 'Média', 'Alta']
const statusValidos = ['Aberto', 'Em Andamento', 'Fechado']

const showModal = ref(false)
const errorsModal = ref([])

onMounted(() => {
  const t = tickets.value.find(t => t.id === id)
  if (!t) return router.push('/')
  titulo.value = t.titulo
  descricao.value = t.descricao
  prioridade.value = t.prioridade
  status.value = t.status
})

function validar() {
  errorsModal.value = []

  if (!titulo.value.trim()) errorsModal.value.push('O título é obrigatório.')
  if (!descricao.value.trim()) errorsModal.value.push('A descrição é obrigatória.')
  if (!prioridadesValidas.includes(prioridade.value)) errorsModal.value.push('Prioridade inválida.')
  if (!statusValidos.includes(status.value)) errorsModal.value.push('Status inválido.')

  return errorsModal.value.length === 0
}

function salvar() {
  erro.value = ''
  if (!validar()) {
    erro.value = 'Existem erros no formulário. Verifique o modal.'
    showModal.value = true
    return
  }
  showModal.value = true
}

function confirmarSalvar() {
  editarTicket(id, {
    titulo: titulo.value,
    descricao: descricao.value,
    prioridade: prioridade.value,
    status: status.value
  })
  showModal.value = false
  router.push({ path: '/', query: { sucesso: 'Chamado atualizado com sucesso!' } })
}

function cancelar() {
  showModal.value = false
}
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-lg mx-auto" style="max-width: 700px;">
      <div class="card-header text-center text-dark">
        <h3>Editar Chamado</h3>
      </div>
      <div class="card-body">
        <div v-if="erro" class="alert alert-danger">{{ erro }}</div>

        <form>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label"><strong>Título</strong></label>
              <input type="text" class="form-control" v-model="titulo" placeholder="Título" />
            </div>
            <div class="col-md-6">
              <label class="form-label"><strong>Prioridade</strong></label>
              <select class="form-select" v-model="prioridade">
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label"><strong>Status</strong></label>
              <select class="form-select" v-model="status">
                <option>Aberto</option>
                <option>Em Andamento</option>
                <option>Fechado</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label"><strong>Data de Edição</strong></label>
              <input type="text" class="form-control" :value="new Date().toLocaleString()" disabled />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label"><strong>Descrição</strong></label>
            <textarea class="form-control" v-model="descricao" rows="5" placeholder="Descrição"></textarea>
          </div>

          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="router.back()">Cancelar</button>
            <button type="button" class="btn btn-success" @click="salvar">Salvar</button>
          </div>
        </form>
      </div>
    </div>

    <EditConfirmModal
      :show="showModal"
      :formData="{ titulo, descricao, prioridade, status }"
      :errors="errorsModal"
      @confirm="confirmarSalvar"
      @cancel="cancelar"
    />
  </div>
</template>
