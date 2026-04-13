'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import xss from 'xss'

// Zod schema for rigorous input validation
const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s-]{10,20}$/, "Invalid phone format"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  guests: z.number().int().min(1).max(20),
  occasion: z.string().max(50).nullable().optional(),
  notes: z.string().max(500).nullable().optional()
})

export async function getUserReservations() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: true })

  if (error) {
    console.error('Reservation Fetch Error:', error);
    return { data: null, error: "Failed to fetch reservations." }
  }

  return { data, error: null }
}

export async function createReservation(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to make a reservation' }
  }

  // Parse and validate input
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: formData.get('date'),
    time: formData.get('time'),
    guests: parseInt(formData.get('guests') as string, 10),
    occasion: formData.get('occasion') || null,
    notes: formData.get('notes') || null,
  }

  const validatedFields = reservationSchema.safeParse(rawData)

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten())
    return { error: "Invalid reservation data provided. Please check your inputs." }
  }

  const inserts = {
    user_id: user.id,
    name: xss(validatedFields.data.name),
    email: xss(validatedFields.data.email),
    phone: xss(validatedFields.data.phone),
    date: validatedFields.data.date,
    time: validatedFields.data.time,
    guests: validatedFields.data.guests,
    occasion: validatedFields.data.occasion ? xss(validatedFields.data.occasion) : null,
    notes: validatedFields.data.notes ? xss(validatedFields.data.notes) : null,
    status: 'Confirmed'
  }

  const { error } = await supabase
    .from('reservations')
    .insert(inserts)

  if (error) {
    // Log the actual error secretly on the server
    console.error('Database Reservation Error:', error);
    // Return sanitized message
    return { error: 'Failed to complete reservation. Please try again later.' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/admin/reservations')
  return { success: true }
}

export async function cancelReservation(reservationId: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to cancel a reservation' }
  }

  // Input validation
  if (!reservationId || typeof reservationId !== 'string') {
    return { error: 'Invalid reservation ID.' }
  }

  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Reservation Deletion Error:', error);
    return { error: 'Failed to cancel reservation. Please try again.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
