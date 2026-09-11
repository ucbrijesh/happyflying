// Object Types
import {imageWithAlt} from './objects/imageWithAlt'
import {seo} from './objects/seo'
import {money} from './objects/money'
import {location} from './objects/location'
import {packageHighlight} from './objects/packageHighlight'
import {inclusionItem} from './objects/inclusionItem'
import {exclusionItem} from './objects/exclusionItem'
import {contactCta} from './objects/contactCta'
import {transfer} from './objects/transfer'
import {packageBadge, feature, socialLink, navItem} from './objects/sharedObjects'

// Document Types
import {destination} from './documents/destination'
import {travelPackage} from './documents/travelPackage'
import {itineraryDay} from './documents/itineraryDay'
import {hotel} from './documents/hotel'
import {activity} from './documents/activity'
import {pricing} from './documents/pricing'
import {testimonial} from './documents/testimonial'
import {faq} from './documents/faq'
import {service} from './documents/service'
import {teamMember} from './documents/teamMember'
import {blogPost} from './documents/blogPost'
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [
  // Objects
  imageWithAlt,
  seo,
  money,
  location,
  packageHighlight,
  inclusionItem,
  exclusionItem,
  contactCta,
  transfer,
  packageBadge,
  feature,
  socialLink,
  navItem,

  // Documents
  destination,
  travelPackage,
  itineraryDay,
  hotel,
  activity,
  pricing,
  testimonial,
  faq,
  service,
  teamMember,
  blogPost,
  siteSettings,
]
