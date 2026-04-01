import { prisma } from '../lib/prisma.js';

export const ContatosRepository = {
  async criar(dados) {
    return await prisma.contact.create({
      data: {
        name: dados.name,
        email: dados.email,
        phone: dados.phone,
      },
    });
  },

  async listarTodos() {
    return await prisma.contact.findMany({
      orderBy: { name: 'asc' },
    });
  },

  async buscarPorId(id) {
    const contato = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });
    
    if (!contato) {
      throw new Error('Contato não encontrado');
    }
    return contato;
  },

  async atualizar(id, dados) {
    return await prisma.contact.update({
      where: { id: Number(id) },
      data: dados,
    });
  },

  async excluir(id) {
    return await prisma.contact.delete({
      where: { id: Number(id) },
    });
  }
};