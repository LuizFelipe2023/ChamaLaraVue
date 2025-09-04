import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import CreateTicket from './components/CreateTicket.vue'
import EditTicket from './components/EditTicket.vue'
import TicketDetails from './components/TicketDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/novo', component: CreateTicket },
  { path: '/editar/:id', component: EditTicket, props: true },
  { path: '/detalhes/:id', component: TicketDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
