import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validare de bază
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Câmpuri obligatorii lipsă' },
        { status: 400 }
      )
    }

    // Aici poți adăuga logica pentru trimiterea emailului
    // De exemplu, folosind nodemailer, SendGrid, Resend, etc.
    
    // Pentru moment, returnăm success
    console.log('Contact form submission:', body)
    
    // În producție, integrează cu un serviciu de email
    // Exemplu: await sendEmail(body)
    
    return NextResponse.json(
      { success: true, message: 'Mesaj trimis cu succes' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Eroare la procesarea formularului' },
      { status: 500 }
    )
  }
}
