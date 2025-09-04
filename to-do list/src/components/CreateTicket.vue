<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTickets } from '../composables/useTickets'
import ConfirmModal from '../components/ConfirmModalCreate.vue'

const router = useRouter()
const { criarTicket } = useTickets()

const titulo = ref('')
const descricao = ref('')
const prioridade = ref('Média')

const showModal = ref(false)
const errors = ref([])
const prioridadesValidas = ['Baixa', 'Média', 'Alta']

function validar() {
  errors.value = []
  if (!titulo.value.trim()) errors.value.push('O título é obrigatório.')
  if (!descricao.value.trim()) errors.value.push('A descrição é obrigatória.')
  if (!prioridadesValidas.includes(prioridade.value)) errors.value.push('Prioridade inválida.')

  showModal.value = true
}

function confirmarSalvar() {
  criarTicket(titulo.value, descricao.value, prioridade.value)
  showModal.value = false
  router.push({ path: '/', query: { sucesso: 'Chamado criado com sucesso!' } })
}

function cancelar() {
  showModal.value = false
}
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-lg mx-auto" style="max-width: 700px;">
      <div class="card-header text-dark text-center">
        <h3>Novo Chamado</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="validar">
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
          <div class="mb-3">
            <label class="form-label"><strong>Descrição</strong></label>
            <textarea class="form-control" v-model="descricao" rows="5" placeholder="Descrição"></textarea>
          </div>

          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="router.back()">Cancelar</button>
            <button type="submit" class="btn btn-success">Salvar</button>
          </div>
        </form>
      </div>
    </div>

  
    <ConfirmModal
      :show="showModal"
      title="Confirme o chamado"
      :formData="{ titulo, descricao, prioridade }"
      :errors="errors"
      @confirm="confirmarSalvar"
      @cancel="cancelar"
    />
  </div>
</template>
