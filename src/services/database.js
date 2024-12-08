import { createClient } from '@supabase/supabase-js';

// Inicialize o cliente Supabase
const supabaseUrl = 'https://qnezskkazqyaowiyaeom.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZXpza2thenF5YW93aXlhZW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5Nzc1MjIsImV4cCI6MjA0NzU1MzUyMn0.qXHLSk5m11CgN3dE7hnVKNtzzLsjnvWu5ykPLB4os8w';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para obter o usuário atual
const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  return user;
};

// Função para obter o ID do usuário atual
const getCurrentUserId = async () => {
  const user = await getCurrentUser();
  return user.id;
};

/* ------------------ Funções para 'history_data' ------------------ */

// Função para inserir um item (sem adicionar manualmente o user_uuid)
export const insertHistoryItem = async (item) => {
  const { data, error } = await supabase
    .from('history_data')
    .insert([item]); // user_uuid é adicionado automaticamente pelo banco de dados

  if (error) {
    throw error;
  }
  return data;
};

// Função para atualizar um item
export const updateHistoryItem = async (id, updatedItem) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('history_data')
    .update(updatedItem)
    .eq('id', id)
    .eq('user_uuid', userId);

  if (error) {
    throw error;
  }
  return data;
};

// Função para deletar um item
export const deleteHistoryItem = async (id) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('history_data')
    .delete()
    .eq('id', id)
    .eq('user_uuid', userId);

  if (error) {
    throw error;
  }
  return data;
};

// Função para listar todos os itens do usuário
export const listHistoryItems = async () => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('history_data')
    .select('*')
    .eq('user_uuid', userId)
    .order('created_at', { ascending: false }); // Altere 'created_at' para o campo correto se necessário

  if (error) {
    throw error;
  }
  return data;
};

// Função para obter um item por ID, garantindo que pertence ao usuário
export const getHistoryItemById = async (id) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('history_data')
    .select('*')
    .eq('id', id)
    .eq('user_uuid', userId) // Garante que o item pertence ao usuário
    .single();

  if (error) {
    throw error;
  }
  return data;
};

/* ------------------ Funções para 'baby_data' ------------------ */

// Função para obter os dados do bebê
export const getBabyData = async () => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('baby_data')
    .select('*')
    .eq('user_uuid', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Nenhum dado encontrado
      return null;
    }
    throw error;
  }

  return data;
};

// Função para inserir ou atualizar os dados do bebê
export const upsertBabyData = async (babyData) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('baby_data')
    .upsert([{ ...babyData, user_uuid: userId }], { onConflict: 'user_uuid' });

  if (error) {
    throw error;
  }

  return data;
};

// Função para realizar logout do usuário
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  return true;
};

/* ------------------ Funções para Dashboard ------------------ */

// Função para obter a contagem de itens por categoria
export const getCountByCategory = async (category) => {
  const userId = await getCurrentUserId();

  const { count, error } = await supabase
    .from('history_data')
    .select('*', { count: 'exact', head: true })
    .eq('user_uuid', userId)
    .eq('category', category);

  if (error) {
    throw error;
  }

  return count || 0;
};

// Função para obter as atividades recentes (limit 5)
export const getRecentActivities = async (limit = 5) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('history_data')
    .select('*')
    .eq('user_uuid', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
};
