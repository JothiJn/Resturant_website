'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAdminDashboardData() {
  const supabase = await createClient()

  // Verify identifying user has admin role (optional, for now we assume anyone accessing admin is allowed)
  // In a real app, check user role or metadata
  
  const [reservations, inquiries] = await Promise.all([
    supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('event_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
  ])

  return {
    reservations: reservations.data || [],
    inquiries: inquiries.data || [],
    error: reservations.error || inquiries.error
  }
}

export async function getMenuItems() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })

  if (error) {
    console.error('Menu Fetch Error:', error);
    return { data: [], error }
  }

  return { data, error: null }
}

export async function createMenuItem(formData: FormData) {
  const supabase = await createClient()
  
  const item = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseInt(formData.get('price') as string, 10),
    category: formData.get('category') as string,
    diet: JSON.parse(formData.get('diet') as string || '[]'),
    image: formData.get('image') as string,
    kcal: parseInt(formData.get('kcal') as string, 10) || null,
    allergens: JSON.parse(formData.get('allergens') as string || '[]'),
    is_available: formData.get('is_available') === 'true'
  }

  const { data, error } = await supabase
    .from('menu_items')
    .insert([item])
    .select()

  if (error) {
    console.error('Create Menu Item Error:', error);
    return { success: false, error }
  }

  return { success: true, data }
}

export async function updateMenuItem(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Update Menu Item Error:', error);
    return { success: false, error }
  }

  return { success: true, data }
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete Menu Item Error:', error);
    return { success: false, error }
  }

  return { success: true }
}
