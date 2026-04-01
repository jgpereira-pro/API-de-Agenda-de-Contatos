import { ContatosRepository } from '../repositories/ContatosRepository.js';

export const ContatosController = {
  async store(req, res) {
    try {
      const contato = await ContatosRepository.criar(req.body);
      return res.status(201).json(contato);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Este e-mail já está na sua agenda.' });
      }
      return res.status(500).json({ error: 'Erro ao criar contato.' });
    }
  },

  async index(req, res) {
    try {
      const contatos = await ContatosRepository.listarTodos();
      return res.json(contatos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar contatos.' });
    }
  },

  async show(req, res) {
    try {
      const contato = await ContatosRepository.buscarPorId(req.params.id);
      return res.json(contato);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const contato = await ContatosRepository.atualizar(req.params.id, req.body);
      return res.json(contato);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar contato.' });
    }
  },

  async delete(req, res) {
    try {
      await ContatosRepository.excluir(req.params.id);
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir contato.' });
    }
  }
};