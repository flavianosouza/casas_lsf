'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitLead(formData: FormData) {
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const telefone = formData.get('telefone') as string;
  const interesse = formData.get('interesse') as string || 'geral';
  const mensagem = formData.get('mensagem') as string;
  
  // Basic validation
  if (!nome || !telefone) {
    return { success: false, message: 'Nome e Telefone são obrigatórios.' };
  }

  try {
    const result = await query(
      `INSERT INTO leads (nome, email, telefone, interesse_tipo, mensagem) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id`,
      [nome, email, telefone, interesse, mensagem]
    );

    revalidatePath('/simulador');
    return { success: true, message: 'Lead capturado com sucesso!', id: result.rows[0].id };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Erro ao salvar lead. Tente novamente.' };
  }
}
