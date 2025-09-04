<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        return Ticket::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'prioridade' => 'required|in:Baixa,Média,Alta',
            'status' => 'required|in:Aberto,Em Andamento,Fechado',
        ]);

        $ticket = Ticket::create($request->all());
        return response()->json($ticket, 201);
    }

    public function show($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket não encontrado'], 404);
        }
        return $ticket;
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket não encontrado'], 404);
        }

        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'prioridade' => 'required|in:Baixa,Média,Alta',
            'status' => 'required|in:Aberto,Em Andamento,Fechado',
        ]);

        $ticket->update($request->all());
        return response()->json($ticket);
    }


    public function destroy($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket não encontrado'], 404);
        }

        $ticket->delete();
        return response()->json(null, 204);
    }
}
