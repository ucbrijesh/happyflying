import type {StructureResolver} from 'sanity/structure'
import {
  PackageIcon,
  PinIcon,
  HomeIcon,
  ActivityIcon,
  CreditCardIcon,
  CommentIcon,
  HelpCircleIcon,
  DocumentTextIcon,
  CogIcon,
  CaseIcon,
  UserIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('HappyFlying CMS')
    .items([
      // WEBSITE GROUP
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.documentTypeListItem('service').title('Services').icon(CaseIcon),
      S.documentTypeListItem('teamMember').title('Team & Concierges').icon(UserIcon),

      S.divider(),

      // CONTENT GROUP
      S.documentTypeListItem('travelPackage').title('Travel Packages').icon(PackageIcon),
      S.documentTypeListItem('destination').title('Destinations').icon(PinIcon),
      S.documentTypeListItem('itineraryDay').title('Itinerary Days').icon(DocumentTextIcon),
      S.documentTypeListItem('hotel').title('Hotels & Resorts').icon(HomeIcon),
      S.documentTypeListItem('activity').title('Activities & Experiences').icon(ActivityIcon),
      S.documentTypeListItem('pricing').title('Pricing & Rates').icon(CreditCardIcon),

      S.divider(),

      // ENGAGEMENT & MARKETING
      S.documentTypeListItem('testimonial').title('Testimonials & Reviews').icon(CommentIcon),
      S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
      S.documentTypeListItem('blogPost').title('Blog & Travel Stories').icon(DocumentTextIcon),
    ])
