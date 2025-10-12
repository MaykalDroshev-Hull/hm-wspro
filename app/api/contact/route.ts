import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Disable caching for API routes
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, locale } = await request.json()

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
      Нова заявка за уебсайт:
      
      Име: ${name}
      Имейл: ${email}
      Съобщение: ${message}
      
      Време на заявката: ${new Date().toLocaleString('bg-BG')}
    `

    // Email to requestor (in their locale)
    const requestorEmailContent = locale === 'bg' ? `
      Благодарим за интереса ви!
      
      Получихме вашето съобщение и ще отговорим в рамките на 24-48 часа.
      
      Вашето съобщение:
      ${message}
      
      С уважение,
      Екипът на H&M Website Provisioning
    ` : `
      Thank you for your interest!
      
      We have received your message and will respond within 24-48 hours.
      
      Your message:
      ${message}
      
      Best regards,
      H&M Website Provisioning Team
    `

    // Send email to company
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: 'hm.websiteprovisioning@gmail.com',
      subject: 'Нова заявка за уебсайт - H&M Website Provisioning',
      text: companyEmailContent,
    })

    // Send confirmation email to requestor
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: email,
      subject: locale === 'bg' ? 'Потвърждение на заявката ви' : 'Request Confirmation',
      text: requestorEmailContent,
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
