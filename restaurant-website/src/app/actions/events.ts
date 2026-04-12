'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import xss from 'xss'

// Zod schema for event inquiries - more flexible for general contact
const eventSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s-]{10,20}$/, "Invalid phone format"),
  event_type: z.string().min(2).max(50),
  date: z.string().min(1, "Date is required").refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  guests: z.number().int().min(1).max(1000),
  services_requested: z.array(z.string().max(50)).nullable().optional(),
  details: z.string().max(2000).nullable().optional()
})

export async function createEventInquiry(formData: FormData) {
  const supabase = await createClient()

  // 1. Get authenticated user (optional now)
  const { data: { user } } = await supabase.auth.getUser()

  // Gather services arrays based on multiple checkbox inputs
  const services_requested = formData.getAll('services') as string[]
  
  const guestsRaw = formData.get('guests');

  // Parse and validate input
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    event_type: formData.get('event_type'),
    date: formData.get('date') || null,
    guests: guestsRaw ? parseInt(guestsRaw as string, 10) : null,
    services_requested: services_requested.length > 0 ? services_requested : null,
    details: formData.get('details') || formData.get('message') || null
  }

  const validatedFields = eventSchema.safeParse(rawData)

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten())
    return { error: "Invalid contact data provided. Please check your inputs." }
  }

  // Extract clean Data
  const inserts: {
    user_id: string | null;
    name: string;
    email: string;
    phone: string;
    event_type: string;
    date: string;
    guests: number;
    services_requested: string[] | null;
    details: string | null;
    status: string;
  } = {
    user_id: user?.id || null,
    name: xss(validatedFields.data.name),
    email: xss(validatedFields.data.email),
    phone: xss(validatedFields.data.phone),
    event_type: xss(validatedFields.data.event_type),
    date: validatedFields.data.date,
    guests: validatedFields.data.guests,
    services_requested: (validatedFields.data.services_requested || []).map(s => xss(s)),
    details: validatedFields.data.details ? xss(validatedFields.data.details) : null,
    status: 'Pending'
  };

  // Since we are using an object literal, we might need to cast or ensure types match exactly
  // The database type for date is 'string', and validatedFields.data.date is 'string'.
  // The database type for guests is 'number', and validatedFields.data.guests is 'number'.
  // The database type for user_id is 'string | null', and user?.id || null is 'string | null'.

  // Insert payload
  const { error } = await supabase
    .from('event_inquiries')
    .insert(inserts)

  if (error) {
    console.error('Database Event Inquiry Error:', error);
    return { error: 'Failed to submit event request. Please try again later.' }
  }

  // Revalidate cache
  revalidatePath('/dashboard')
  return { success: true }
}
