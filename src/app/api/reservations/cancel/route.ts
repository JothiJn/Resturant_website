import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title } = body;

    if (!id) {
      return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 });
    }

    // 1. In a real app, update DB status to Cancelled.
    // await db.reservations.update({ where: { id }, data: { status: 'Canceled' } });

    console.log(`[API] Processing Cancellation for Reservation: ${id}`);

    // 2. Simulated Owner Notification
    console.log(`[OWNER ALERT] Reservation ${id} ("${title}") was just canceled. Owner can call the customer immediately.`);

    // 3. Simulated Guest Notification
    console.log(`[GUEST ALERT] Email dispatched to guest confirming cancellation of ${title}.`);

    return NextResponse.json({ 
      success: true, 
      message: 'Reservation canceled, owner and customer notified successfully' 
    });

  } catch (error) {
    console.error('Cancellation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
