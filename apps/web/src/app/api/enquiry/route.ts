import {NextRequest, NextResponse} from 'next/server'
import type {EnquiryFormData} from '@happyflying/types'

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as EnquiryFormData

    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        {error: 'Name, Phone and Email are required fields'},
        {status: 400}
      )
    }

    // In production, this can forward to email, CRM, Zoho, HubSpot, WhatsApp webhook, or Sanity.
    console.log('📬 [HappyFlying Tour Enquiry Received]:', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      package: data.package,
      destination: data.destination,
      dates: data.travelDates,
      travelers: `${data.adults} Adults, ${data.children} Children`,
      message: data.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our concierge will contact you soon.',
    })
  } catch (err: unknown) {
    console.error('Enquiry API Error:', err)
    return NextResponse.json(
      {error: 'Internal Server Error processing inquiry'},
      {status: 500}
    )
  }
}
