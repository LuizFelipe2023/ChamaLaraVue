<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTickets } from '../composables/useTickets'

const route = useRoute()
const router = useRouter()
const { tickets } = useTickets()

const ticket = ref(null)
const id = Number(route.params.id)

onMounted(() => {
  const t = tickets.value.find(t => t.id === id)
  if (!t) return router.push('/')
  ticket.value = t
})
</script>

<template>
  <div class="container py-5" v-if="ticket">
    <div class="card shadow-lg mx-auto" style="max-width: 800px;">
      <div class="card-header text-center text-dark">
        <h3>Detalhes do Chamado</h3>
      </div>
      <div class="card-body">
        <form>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label"><strong>Título</strong></label>
              <input type="text" class="form-control" :value="ticket.titulo" disabled />
            </div>
            <div class="col-md-6">
              <label class="form-label"><strong>Prioridade</strong></label>
              <input type="text" class="form-control" :value="ticket.prioridade" disabled />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label"><strong>Status</strong></label>
              <input type="text" class="form-control" :value="ticket.status" disabled />
            </div>
            <div class="col-md-6">
              <label class="form-label"><strong>Data de Abertura</strong></label>
              <input type="text" class="form-control" :value="new Date(ticket.dataAbertura).toLocaleString()" disabled />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label"><strong>Descrição</strong></label>
            <textarea class="form-control" rows="5" :value="ticket.descricao" disabled></textarea>
          </div>

          <div class="text-center">
            <button type="button" class="btn btn-secondary" @click="router.back()">Voltar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
