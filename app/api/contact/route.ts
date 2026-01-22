import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Disable caching for API routes
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const { name, telephone, message, locale } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    })

    // Email to company (in Bulgarian)
    const companyEmailContent = `
      Нова заявка за контакт:

      Име: ${name}
      Телефон: ${telephone}
      
      Съобщение:
      ${message}

      Време на заявката: ${new Date().toLocaleString('bg-BG')}
      Език: ${locale === 'bg' ? 'Български' : 'English'}
    `

    // Send email to company
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: 'hm.websiteprovisioning@gmail.com',
      subject: 'Нова заявка за контакт - H&M Website Provisioning',
      text: companyEmailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
