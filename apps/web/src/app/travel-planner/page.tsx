'use client'

import {useState} from 'react'
import Link from 'next/link'
import {
  Compass,
  Sparkles,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  Bot,
  Plane,
  ArrowRight,
  ShieldCheck,
  Hotel,
  Clock,
  Car,
  Utensils,
} from 'lucide-react'
import {ALL_DESTINATIONS, ALL_PACKAGES} from '@/lib/data/packagesData'

interface ItineraryDayPlan {
  day: number
  title: string
  activities: string[]
  meals: string
  stay: string
}

interface GeneratedPlanResult {
  destinationName: string
  destinationSlug: string
  duration: string
  travelType: string
  budget: string
  estimatedPrice: string
  overview: string
  days: ItineraryDayPlan[]
  inclusions: string[]
  perks: string[]
  matchingPackageSlug?: string
}

export default function TravelPlannerPage() {
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState('andaman')
  const [duration, setDuration] = useState('5 Days / 4 Nights')
  const [travelType, setTravelType] = useState('Honeymoon & Romantic Luxury')
  const [budget, setBudget] = useState('Premium Luxury (4-Star / 5-Star)')
  const [travelers, setTravelers] = useState('2 Adults')
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlanResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Knowledge base of destination daily highlights
  const DESTINATION_DAY_TEMPLATES: Record<string, {
    defaultStay: string
    estimatedBase: number
    currency: string
    days: Array<{
      title: string
      activities: string[]
      meals: string
      stay: string
    }>
    inclusions: string[]
    perks: string[]
  }> = {
    andaman: {
      defaultStay: 'Sea Shell Resort / Symphony Palms Havelock',
      estimatedBase: 24999,
      currency: '₹',
      days: [
        {
          title: 'Airport Welcome & Cellular Jail Light & Sound',
          activities: ['Private AC vehicle airport pickup in Port Blair', 'Check-in & relaxation at beachfront hotel', 'Historic Cellular Jail walkthrough & iconic evening Light & Sound narration'],
          meals: 'Dinner Included',
          stay: 'Port Blair 4-Star Resort',
        },
        {
          title: 'Catamaran Cruise to Havelock & Radhanagar Sunset',
          activities: ['Prime-slot Makruzz/Nautika catamaran cruise across turquoise waters', 'Havelock Island jetty meet & transfer', 'Afternoon excursion to world-famous Radhanagar Beach (Asia\'s top beach) for golden sunset'],
          meals: 'Breakfast & Dinner',
          stay: 'Havelock Island Beach Resort',
        },
        {
          title: 'Elephant Beach Speedboat & Cruise to Neil Island',
          activities: ['Speedboat ride to Elephant Beach with complimentary coral snorkeling', 'Explore vibrant living reefs and tropical marine life', 'Afternoon catamaran cruise to Neil Island with sunset stroll at Laxmanpur Beach'],
          meals: 'Breakfast & Dinner',
          stay: 'Neil Island Luxury Resort',
        },
        {
          title: 'Natural Rock Formation & Return to Port Blair',
          activities: ['Visit living coral Howrah Bridge natural rock formation at low tide', 'Leisure at Bharatpur Beach calm shallow lagoon', 'Evening catamaran cruise return to Port Blair and local souvenir shopping at Aberdeen Bazaar'],
          meals: 'Breakfast & Dinner',
          stay: 'Port Blair 4-Star Resort',
        },
        {
          title: 'Corbyn\'s Cove & Airport Farewell',
          activities: ['Morning coastal stroll at Corbyn\'s Cove Beach', 'Hotel checkout with assisted airport transfer to Veer Savarkar Airport'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Ross Island & Chidiya Tapu Sunset (Extended)',
          activities: ['Boat trip to historic Ross Island (Netaji Subhash Chandra Bose Dweep)', 'Scenic evening drive to Chidiya Tapu bird sanctuary for panoramic sunset'],
          meals: 'Breakfast & Dinner',
          stay: 'Port Blair 4-Star Resort',
        },
        {
          title: 'Baratang Island Limestone Caves & Mud Volcano (Grand Tour)',
          activities: ['Early morning scenic drive through tropical rainforest reserve to Baratang', 'Speedboat safari through dense mangrove tunnels to natural Limestone Caves'],
          meals: 'Breakfast & Dinner',
          stay: 'Port Blair 4-Star Resort',
        },
      ],
      inclusions: [
        'Private dedicated AC cab on all 3 islands (point-to-point transfers)',
        'Makruzz / Nautika Premium Class Catamaran cruise tickets pre-reserved',
        'Elephant Beach speedboat trip with guided snorkeling',
        'All monument permits, jetty taxes, and entry fees',
      ],
      perks: ['Complimentary Airport Meet & Greet with flower bouquet', '24/7 dedicated personal tour coordinator in Bangalore'],
    },
    kashmir: {
      defaultStay: 'Luxury Dal Lake Houseboat / The Vintage Gulmarg',
      estimatedBase: 28499,
      currency: '₹',
      days: [
        {
          title: 'Srinagar Arrival & Dal Lake Romantic Houseboat',
          activities: ['Welcome at Srinagar Airport and transfer to luxury Dal Lake Deluxe Houseboat', 'Evening sunset Shikara ride across Floating Vegetable Gardens & Char Chinar', 'Welcome Kashmiri Kahwa tea ceremony'],
          meals: 'Dinner Included (Wazwan / Multi-Cuisine)',
          stay: 'Luxury Dal Lake Deluxe Houseboat',
        },
        {
          title: 'Srinagar to Gulmarg Meadow of Flowers & Gondola',
          activities: ['Scenic mountain drive to Gulmarg through apple orchards', 'World\'s highest Gulmarg Gondola cable car ride to Phase 1 (Kongdoori) & Phase 2 (Apharwat snow peaks)', 'Snow sledging and pine forest walks'],
          meals: 'Breakfast & Dinner',
          stay: 'Gulmarg Mountain Resort',
        },
        {
          title: 'Gulmarg to Pahalgam Valley of Shepherds',
          activities: ['Drive along Lidder River with views of saffron fields in Pampore and Avantipur ruins', 'Check-in to riverside Pahalgam resort and walk along pine banks'],
          meals: 'Breakfast & Dinner',
          stay: 'Pahalgam Riverside Resort',
        },
        {
          title: 'Pahalgam Betaab Valley & Aru Valley Excursion',
          activities: ['Local private union cab tour to Betaab Valley (Bollywood backdrop)', 'Visit scenic Aru Valley and Chandanwari glacial starting point', 'Trout fishing & pony trail walks along Lidder riverbank'],
          meals: 'Breakfast & Dinner',
          stay: 'Pahalgam Riverside Resort',
        },
        {
          title: 'Mughal Gardens & Srinagar Heritage Walk',
          activities: ['Return drive to Srinagar and visit UNESCO-nominated Mughal Gardens (Shalimar Bagh, Nishat Bagh & Chashme Shahi)', 'Local pashmina shawl and walnut wood shopping in Lal Chowk'],
          meals: 'Breakfast & Dinner',
          stay: 'Srinagar 4-Star Luxury Hotel',
        },
        {
          title: 'Day Trip to Sonmarg — Meadow of Gold',
          activities: ['Full-day excursion to Sonmarg along Sindh River valley', 'Pony trek to Thajiwas Glacier snow fields & Sindh river trout viewing'],
          meals: 'Breakfast & Dinner',
          stay: 'Srinagar 4-Star Luxury Hotel',
        },
        {
          title: 'Shankaracharya Temple & Airport Departure',
          activities: ['Morning visit to hilltop Shankaracharya Temple for panoramic Srinagar valley vistas', 'Checkout & transfer to Srinagar Airport'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
      ],
      inclusions: [
        'Dedicated heating-equipped private AC vehicle for the entire valley',
        '1 Night Deluxe Dal Lake Houseboat stay with Shikara ride',
        'All sightseeing and driver allowances included',
      ],
      perks: ['Complimentary Kashmiri Kahwa and dry fruits box', '24/7 dedicated concierge assistance'],
    },
    kerala: {
      defaultStay: 'Blanket Hotel & Spa Munnar / Luxury Alleppey Houseboat',
      estimatedBase: 22999,
      currency: '₹',
      days: [
        {
          title: 'Kochi Arrival & Drive to Misty Munnar',
          activities: ['Meet at Cochin International Airport and scenic drive through Western Ghats', 'Stop at Cheeyappara & Valara cascading waterfalls enroute', 'Check-in to tea garden mountain resort in Munnar'],
          meals: 'Dinner Included',
          stay: 'Munnar Tea Plantation Resort',
        },
        {
          title: 'Munnar Tea Gardens & Eravikulam National Park',
          activities: ['Morning safari in Eravikulam National Park (habitat of endangered Nilgiri Tahr)', 'Visit Mattupetty Dam, Echo Point, and Tata Tea Museum with tea tasting', 'Evening walk through aromatic spice groves'],
          meals: 'Breakfast & Dinner',
          stay: 'Munnar Tea Plantation Resort',
        },
        {
          title: 'Munnar to Thekkady Wildlife & Spice Trails',
          activities: ['Scenic drive across cardamon hills to Thekkady (Periyar)', 'Guided walking tour through organic cardamom, pepper, and cinnamon plantations', 'Evening traditional Kalaripayattu martial arts show'],
          meals: 'Breakfast & Dinner',
          stay: 'Thekkady Boutique Jungle Resort',
        },
        {
          title: 'Thekkady to Alleppey Private Luxury Houseboat',
          activities: ['Drive down to Alleppey backwater jetty', 'Board your private AC Luxury Houseboat by 12:30 PM', 'Cruise through emerald lagoons, paddy fields, and coconut canals with full traditional Kerala meals prepared fresh onboard'],
          meals: 'Lunch, Evening Tea, Dinner & Breakfast',
          stay: 'Private AC Luxury Houseboat',
        },
        {
          title: 'Fort Kochi Heritage & Airport Drop',
          activities: ['Morning cruise checkout and drive to Fort Kochi', 'Walk past historic Chinese Fishing Nets, St. Francis Church, and Mattancherry Dutch Palace', 'Transfer to Cochin Airport for departure'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Kumarakom Bird Sanctuary & Sunset Lagoon Cruise',
          activities: ['Explore Kumarakom tranquil lotus backwaters and bird sanctuary', 'Sunset canoe boat ride in deep village canals'],
          meals: 'Breakfast & Dinner',
          stay: 'Kumarakom Lake Resort',
        },
        {
          title: 'Kovalam Beach & Poovar Island Mangroves',
          activities: ['Drive south to Kovalam Lighthouse Beach', 'Motorboat mangrove safari in Poovar Island floating estuary'],
          meals: 'Breakfast & Dinner',
          stay: 'Kovalam Beachfront Resort',
        },
      ],
      inclusions: [
        'Dedicated Private AC vehicle throughout Kerala circuit',
        'Private Luxury AC Houseboat with exclusive chef and captain',
        'All spice plantation entries and vehicle permits',
      ],
      perks: ['Fresh banana chips gift pack & coconut water welcome', 'Dedicated personal coordinator'],
    },
    rajasthan: {
      defaultStay: 'Heritage Palace Haveli / ITC Rajputana',
      estimatedBase: 21499,
      currency: '₹',
      days: [
        {
          title: 'Delhi Heritage Walk & Drive to Agra',
          activities: ['Meet in Delhi and visit Qutub Minar & India Gate', 'Express expressway drive to Agra and hotel check-in'],
          meals: 'Dinner Included',
          stay: 'Agra 4-Star Heritage Hotel',
        },
        {
          title: 'Sunrise Taj Mahal Wonder & Agra Fort',
          activities: ['Breathtaking sunrise tour of the Taj Mahal', 'Explore the massive red sandstone Agra Fort & Diwan-i-Khas', 'Drive to Jaipur with enroute stop at UNESCO Fatehpur Sikri'],
          meals: 'Breakfast & Dinner',
          stay: 'Jaipur Royal Heritage Haveli',
        },
        {
          title: 'Jaipur Royal Forts: Amber Fort & Hawa Mahal',
          activities: ['Ascend to hilltop Amber Fort with panoramic Maota Lake views', 'Photo stop at the iconic Palace of Winds (Hawa Mahal)', 'Guided tour of Jaipur City Palace & Jantar Mantar observatory'],
          meals: 'Breakfast & Dinner',
          stay: 'Jaipur Royal Heritage Haveli',
        },
        {
          title: 'Nahargarh Fort Sunset & Chokhi Dhani Cultural Village',
          activities: ['Scenic hilltop drive to Nahargarh Fort overlooking the Pink City', 'Evening royal Rajasthani folk dance, camel ride, and traditional thali at Chokhi Dhani'],
          meals: 'Breakfast & Royal Dinner',
          stay: 'Jaipur Royal Heritage Haveli',
        },
        {
          title: 'Bapu Bazaar Shopping & Delhi Departure',
          activities: ['Morning handcrafted jewelry and blue pottery shopping in Bapu Bazaar', 'Smooth drive back to Delhi Airport / Railway station for departure'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Pushkar Holy Lake & Brahma Temple Excursion',
          activities: ['Day trip to holy town of Pushkar, sacred lake ghats, and the world\'s only Brahma Temple'],
          meals: 'Breakfast & Dinner',
          stay: 'Jaipur Heritage Palace',
        },
        {
          title: 'Ranthambore Royal Bengal Tiger Safari',
          activities: ['Early morning 4x4 open Gypsy jungle safari in Ranthambore National Park in search of tigers'],
          meals: 'Breakfast & Dinner',
          stay: 'Ranthambore Wildlife Lodge',
        },
      ],
      inclusions: [
        'Dedicated chauffeur-driven AC Sedan for the full Golden Triangle circuit',
        'Heritage palace hotels with royal buffet breakfast',
        'Taj Mahal and Amber Fort guided walking tours',
      ],
      perks: ['Traditional garland welcome and royal turban ceremony', 'Complimentary local food guide'],
    },
    goa: {
      defaultStay: 'W Goa / Taj Fort Aguada Resort & Spa',
      estimatedBase: 19999,
      currency: '₹',
      days: [
        {
          title: 'Goa Airport Welcome & 5-Star Beach Resort Check-in',
          activities: ['Private AC Sedan pickup from Mopa (GOX) or Dabolim (GOI) airport', 'Check-in to luxury beachfront resort', 'Evening sunset relaxation on the golden sands'],
          meals: 'Dinner Included',
          stay: '5-Star Beachfront Luxury Resort',
        },
        {
          title: 'Private Sunset Yacht Charter along Mandovi River',
          activities: ['Leisure morning by the resort swimming pool and beach cabanas', 'Afternoon 2-Hour Private Yacht Cruise along Mandovi estuary with drinks and music', 'VIP dinner table reservation at premier beach club'],
          meals: 'Breakfast & Sunset Drinks',
          stay: '5-Star Beachfront Luxury Resort',
        },
        {
          title: 'North Goa Coastal Trail: Vagator, Anjuna & Fort Aguada',
          activities: ['Explore 17th-century Portuguese Fort Aguada and lighthouse', 'Panoramic cliffside views at Vagator and Chapora Fort', 'Shopping at local flea markets & waterside dining'],
          meals: 'Breakfast & Dinner',
          stay: '5-Star Beachfront Luxury Resort',
        },
        {
          title: 'South Goa Heritage Churches & Departure',
          activities: ['Visit UNESCO Basilica of Bom Jesus and Se Cathedral in Old Goa', 'Walk through the colorful Portuguese Latin Quarter of Fontainhas', 'Assisted transfer to Goa Airport'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Dudhsagar Waterfalls & Spice Plantation Safari',
          activities: ['Jeep safari through Bhagwan Mahavir Wildlife Sanctuary to Dudhsagar waterfall natural pool', 'Goan traditional buffet lunch at organic spice plantation'],
          meals: 'Breakfast & Lunch',
          stay: '5-Star Beachfront Luxury Resort',
        },
        {
          title: 'Grand Island Scuba Diving & Dolphin Cruise',
          activities: ['Boat trip to Grand Island for guided scuba diving session and dolphin watching'],
          meals: 'Breakfast & Lunch',
          stay: '5-Star Beachfront Luxury Resort',
        },
        {
          title: 'Palolem Beach & Butterfly Island Kayaking',
          activities: ['Drive to pristine South Goa Palolem crescent bay and kayak to secluded Butterfly Beach'],
          meals: 'Breakfast & Dinner',
          stay: 'South Goa Luxury Villa',
        },
      ],
      inclusions: [
        '2-Hour Private Yacht Charter with dedicated skipper & welcome refreshments',
        '5-Star luxury beachfront resort stay',
        'Private AC vehicle for all airport transfers and sightseeing',
      ],
      perks: ['Complimentary bottle of sparkling wine on yacht', 'VIP club entry assistance'],
    },
    bali: {
      defaultStay: 'Aksari Resort Ubud (Private Pool Villa) / Seminyak Beachfront',
      estimatedBase: 38999,
      currency: '₹',
      days: [
        {
          title: 'Denpasar Airport Welcome & Seminyak Resort Check-in',
          activities: ['Warm Balinese garland welcome at Ngurah Rai Airport (DPS)', 'Private AC transfer to vibrant Seminyak beachfront resort', 'Evening sunset cocktail at famous beach clubs (Ku De Ta / Potato Head)'],
          meals: 'Dinner Included',
          stay: 'Seminyak 5-Star Beach Resort',
        },
        {
          title: 'Full-Day Nusa Penida Island Speedboat Tour',
          activities: ['Fast boat transfer to exotic Nusa Penida Island', 'Visit iconic Kelingking Beach (T-Rex Cliff), Broken Beach & Angel\'s Billabong natural infinity pool', 'Snorkeling in crystal waters with buffet lunch on island'],
          meals: 'Breakfast & Island Lunch',
          stay: 'Seminyak 5-Star Beach Resort',
        },
        {
          title: 'Waterfalls & Transfer to Ubud Private Pool Villa',
          activities: ['Scenic drive into the heart of Bali with stop at Tegenungan Waterfall', 'Check-in to your Private Pool Villa in Ubud surrounded by lush jungle', 'Evening traditional Balinese spa & flower bath treatment'],
          meals: 'Breakfast & Dinner',
          stay: 'Ubud Luxury Private Pool Villa',
        },
        {
          title: 'Ubud Bali Jungle Swing, Rice Terraces & Monkeys',
          activities: ['Floating breakfast in your private pool', 'Fly over the jungle on the famous Bali Swing at Aloha Ubud', 'Walk through emerald Tegalalang Rice Terraces and explore Sacred Monkey Forest'],
          meals: 'Floating Breakfast & Dinner',
          stay: 'Ubud Luxury Private Pool Villa',
        },
        {
          title: 'Tanah Lot Sunset Temple & Airport Farewell',
          activities: ['Visit iconic ocean rock temple Pura Tanah Lot for dramatic wave views', 'Souvenir shopping at Ubud art market', 'Private transfer to Denpasar Airport for flight home'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Uluwatu Cliff Temple & Sunset Kecak Fire Dance',
          activities: ['Visit cliff-perched Uluwatu Temple and watch the dramatic ocean sunset Kecak Fire Dance performance', 'Seafood candlelight dinner on the sand at Jimbaran Bay'],
          meals: 'Breakfast & Jimbaran Seafood Dinner',
          stay: 'Seminyak Beach Resort',
        },
        {
          title: 'Mount Batur Sunrise 4x4 Jeep Safari & Hot Springs',
          activities: ['Early morning sunrise 4x4 jeep tour across Mount Batur black volcanic lava fields', 'Soak in natural Batur volcanic hot springs with mountain lake view'],
          meals: 'Breakfast & Lunch',
          stay: 'Ubud Private Pool Villa',
        },
      ],
      inclusions: [
        '2 Nights in Private Pool Villa with 1 Floating Breakfast',
        'Full-Day Nusa Penida Speedboat tour with island transport & lunch',
        'Private English-speaking chauffeur-driven AC car for all tours',
        'Balinese Spa & Massage session included',
      ],
      perks: ['Traditional Balinese flower garland on arrival', 'Local 4G SIM card / eSIM support'],
    },
    dubai: {
      defaultStay: 'JW Marriott Marquis / Address Dubai Marina',
      estimatedBase: 42999,
      currency: '₹',
      days: [
        {
          title: 'Dubai Airport Welcome & Dhow Marina Dinner Cruise',
          activities: ['Meet & greet at Dubai International Airport (DXB) with private luxury transfer', 'Check-in to 5-star hotel in downtown / marina', 'Evening 5-Star Dhow Dinner Cruise along illuminated Dubai Marina'],
          meals: 'Dinner Included',
          stay: 'Dubai 5-Star Hotel',
        },
        {
          title: 'Burj Khalifa Top Floor & Dubai Mall Fountain Show',
          activities: ['Fast-track entry to Burj Khalifa 124th & 125th Floor Observation Decks', 'Explore Dubai Mall, Dubai Aquarium underwater tunnel & choreographed Fountain Show', 'Evening stroll around Souk Al Bahar'],
          meals: 'Breakfast & Dinner',
          stay: 'Dubai 5-Star Hotel',
        },
        {
          title: 'Premium Red Dune Desert Safari & 4x4 Dune Bashing',
          activities: ['Morning at leisure or shopping in gold souks', 'Afternoon 4x4 Land Cruiser pickup for Red Dune Desert Safari', 'Thrilling dune bashing, sandboarding, camel ride, live Tanoura & Belly Dance show with 5-star BBQ buffet dinner under desert stars'],
          meals: 'Breakfast & VIP Desert BBQ Dinner',
          stay: 'Dubai 5-Star Hotel',
        },
        {
          title: 'Museum of the Future & 2-Hour Luxury Yacht Cruise',
          activities: ['Morning tour of the architectural marvel Museum of the Future', 'Afternoon 2-Hour Private Luxury Yacht Charter sailing past Ain Dubai, Atlantis The Palm, and Burj Al Arab', 'Evening visit to Global Village (seasonal) or Dubai Frame'],
          meals: 'Breakfast & Snacks',
          stay: 'Dubai 5-Star Hotel',
        },
        {
          title: 'Palm Jumeirah View & Airport Departure',
          activities: ['Visit The View at The Palm 360-degree observation deck', 'Last-minute luxury shopping at Mall of the Emirates', 'Private luxury transfer to Dubai Airport for departure'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Abu Dhabi Day Trip: Sheikh Zayed Grand Mosque & Louvre',
          activities: ['Full-day excursion to Abu Dhabi', 'Tour magnificent Sheikh Zayed Grand Mosque, Emirates Palace, and Louvre Abu Dhabi museum'],
          meals: 'Breakfast & Lunch',
          stay: 'Dubai 5-Star Hotel',
        },
        {
          title: 'Atlantis Aquaventure & The Lost Chambers Aquarium',
          activities: ['Full-day VIP access to Atlantis Aquaventure Waterpark (world\'s largest) and Lost Chambers aquarium on Palm Jumeirah'],
          meals: 'Breakfast Included',
          stay: 'Dubai 5-Star Hotel',
        },
      ],
      inclusions: [
        'Burj Khalifa 124th & 125th floor tickets included',
        'VIP Desert Safari with 4x4 Dune Bashing & live BBQ buffet dinner',
        '2-Hour Dubai Marina Luxury Yacht Cruise with skyline views',
        'All private luxury AC vehicle airport & excursion transfers',
      ],
      perks: ['Complimentary UAE tourist visa assistance', '24/7 dedicated concierge in Bangalore'],
    },
    thailand: {
      defaultStay: 'The Marina Phuket / Amari Bangkok',
      estimatedBase: 29999,
      currency: '₹',
      days: [
        {
          title: 'Phuket Arrival & Patong Beachfront Check-in',
          activities: ['Arrival at Phuket Airport (HKT) and private transfer to beachfront resort', 'Relaxation by the Andaman Sea and evening stroll at Bangla Road'],
          meals: 'Dinner Included',
          stay: 'Phuket 4-Star Beachfront Resort',
        },
        {
          title: 'Phi Phi Islands & Maya Bay Luxury Speedboat Tour',
          activities: ['Speedboat journey to Phi Phi Don, Phi Phi Leh & world-famous Maya Bay', 'Snorkel among colorful reef fish at Pileh Lagoon and visit Monkey Beach', 'Beachside Thai buffet lunch included on Phi Phi island'],
          meals: 'Breakfast & Island Lunch',
          stay: 'Phuket 4-Star Beachfront Resort',
        },
        {
          title: 'Phuket Big Buddha, Wat Chalong & Flight to Bangkok',
          activities: ['Visit hilltop Big Buddha with panoramic 360-degree island views', 'Explore historic Wat Chalong Temple & Promthep Cape viewpoint', 'Short domestic flight to Bangkok and transfer to luxury city hotel'],
          meals: 'Breakfast & Dinner',
          stay: 'Bangkok Central 4-Star Hotel',
        },
        {
          title: 'Chao Phraya Luxury Dinner Cruise & Bangkok Temples',
          activities: ['Morning tour of Golden Buddha (Wat Traimit) and Marble Temple (Wat Benchamabophit)', 'Evening 2-Hour luxury Chao Phraya Princess river dinner cruise with live band'],
          meals: 'Breakfast & River Dinner Cruise',
          stay: 'Bangkok Central 4-Star Hotel',
        },
        {
          title: 'Siam Paragon Shopping & Airport Farewell',
          activities: ['Shopping at IconSiam & CentralWorld', 'Private transfer to Suvarnabhumi (BKK) / Don Mueang Airport'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'James Bond Island & Phang Nga Bay Canoe Safari',
          activities: ['Speedboat tour to Phang Nga Bay, James Bond Island (Ko Ta Pu), and sea canoeing through hidden limestone sea caves'],
          meals: 'Breakfast & Lunch',
          stay: 'Phuket Beach Resort',
        },
        {
          title: 'Bangkok Safari World & Marine Park Full-Day Tour',
          activities: ['Full-day safari drive-through and dolphin & sea lion shows at Bangkok Safari World'],
          meals: 'Breakfast & Lunch',
          stay: 'Bangkok Central Hotel',
        },
      ],
      inclusions: [
        'Phi Phi Islands & Maya Bay speedboat tour with national park fees and lunch',
        'Chao Phraya River luxury dinner cruise ticket',
        'All private airport and inter-hotel AC vehicle transfers',
      ],
      perks: ['Thailand tourist SIM card with high-speed 5G data', 'Dedicated personal coordinator'],
    },
    maldives: {
      defaultStay: 'Centara Grand Island Resort & Spa / Siyam World Overwater Villa',
      estimatedBase: 84999,
      currency: '₹',
      days: [
        {
          title: 'Male Arrival & Scenic Speedboat/Seaplane to Private Island',
          activities: ['Touchdown at Velana International Airport (MLE)', 'Scenic Speedboat / Seaplane transfer over turquoise atolls to your private island resort', 'Check-in to your Luxury Overwater Pool Villa with direct ocean ladder'],
          meals: 'All-Inclusive Dinner & Drinks',
          stay: '5-Star Overwater Pool Villa',
        },
        {
          title: 'House Reef Snorkeling & Sunset Dolphin Cruise',
          activities: ['Step right off your villa sundeck to snorkel with turtles and tropical fish', 'Afternoon romantic sunset dolphin cruise on traditional wooden Dhoni boat', 'Multi-cuisine dine-around dinner by the lagoon'],
          meals: 'All-Inclusive Breakfast, Lunch & Dinner',
          stay: '5-Star Overwater Pool Villa',
        },
        {
          title: 'Water Sports Adventure & Couple Spa Wellness',
          activities: ['Complimentary ocean kayaking, stand-up paddleboarding, and windsurfing', '60-Minute rejuvenating Balinese couple massage at the overwater spa pavilion', 'Evening candlelight beach dinner with chilled champagne'],
          meals: 'All-Inclusive Breakfast, Lunch & Candlelight Dinner',
          stay: '5-Star Overwater Pool Villa',
        },
        {
          title: 'Sandbank Picnic & Stargazing by the Pool',
          activities: ['Private boat trip to a secluded uninhabited sandbank surrounded by 360-degree turquoise waters', 'Floating sunset cocktails in your private plunge pool under the stars'],
          meals: 'All-Inclusive Breakfast, Lunch & Dinner',
          stay: '5-Star Overwater Pool Villa',
        },
        {
          title: 'Lagoon Farewell & Seaplane/Speedboat Transfer',
          activities: ['Sunrise breakfast over the ocean with manta rays gliding below', 'Speedboat/Seaplane transfer back to Male Airport for flight home'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Manta Ray & Whale Shark Snorkeling Safari',
          activities: ['Guided speedboat excursion to South Ari Atoll protected marine area to snorkel with gentle Whale Sharks and Manta Rays'],
          meals: 'All-Inclusive Dine-Around',
          stay: '5-Star Overwater Pool Villa',
        },
        {
          title: 'Underwater Restaurant Dining Experience',
          activities: ['Exclusive multi-course gourmet lunch 5 meters below sea level surrounded by coral reef sea life'],
          meals: 'All-Inclusive + Underwater Lunch',
          stay: '5-Star Overwater Pool Villa',
        },
      ],
      inclusions: [
        '5-Star Luxury Overwater Villa with private plunge pool and lagoon ladder',
        'All-Inclusive Dine-Around Meal Plan (Breakfast, Lunch, Multi-Course Dinner & Drinks)',
        'Round-trip airport speedboat or seaplane transfers included',
        'All Maldivian Green Taxes and luxury island service charges included',
      ],
      perks: ['Complimentary bottle of champagne and tropical fruit basket', 'Romantic bed floral decoration'],
    },
    switzerland: {
      defaultStay: 'Hotel Schweizerhof Zurich / Victoria-Jungfrau Grand Hotel Interlaken',
      estimatedBase: 124999,
      currency: '₹',
      days: [
        {
          title: 'Zurich Arrival & Scenic Train to Lucerne',
          activities: ['Arrival at Zurich Airport (ZRH)', 'Board panoramic Swiss rail to picture-postcard Lucerne', 'Check-in to lakeside hotel and walk across 14th-century wooden Chapel Bridge (Kapellbrücke)'],
          meals: 'Dinner Included',
          stay: 'Lucerne 4-Star Lakeside Hotel',
        },
        {
          title: 'Mt. Titlis Revolving Rotair Cable Car & Lake Cruise',
          activities: ['Steamboat cruise across Lake Lucerne to Alpnachstad / Engelberg', 'Ascend Mt. Titlis on the world\'s first revolving Rotair cable car to 10,000 ft', 'Walk the thrilling Titlis Cliff Walk suspension bridge and explore Glacier Cave'],
          meals: 'Breakfast & Dinner',
          stay: 'Lucerne 4-Star Lakeside Hotel',
        },
        {
          title: 'Scenic GoldenPass Train to Alpine Interlaken',
          activities: ['Board the famous GoldenPass panoramic train through Brunig Pass to Interlaken nestled between Lake Thun and Lake Brienz', 'Stroll along Hoheweg promenade with views of the snow-capped Jungfrau massif'],
          meals: 'Breakfast & Dinner',
          stay: 'Interlaken 4-Star Alpine Resort',
        },
        {
          title: 'Jungfraujoch — Top of Europe (3,454m)',
          activities: ['Ride the state-of-the-art Eiger Express tricable gondola and cogwheel train to Jungfraujoch railway station (Highest in Europe)', 'Explore Sphinx Observatory, Ice Palace with sculpted ice art, and Alpine Sensation'],
          meals: 'Breakfast & Alpine Lunch',
          stay: 'Interlaken 4-Star Alpine Resort',
        },
        {
          title: 'Lake Brienz Steamboat, Iseltwald & Zurich Departure',
          activities: ['Visit storybook village of Iseltwald on turquoise Lake Brienz (Crash Landing on You filming location)', 'Scenic train journey back to Zurich city and transfer to Zurich Airport'],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: 'Matterhorn Zermatt Alpine Glacier Paradise',
          activities: ['Day trip on Glacier Express train route to car-free Zermatt with iconic views of pyramid-shaped Matterhorn peak'],
          meals: 'Breakfast & Dinner',
          stay: 'Zermatt / Interlaken Resort',
        },
        {
          title: 'Rhine Falls & Zurich Old Town Walking Tour',
          activities: ['Visit Europe\'s largest waterfall — Rhine Falls, with thrilling boat ride to the middle rock, followed by Bahnhofstrasse luxury shopping in Zurich'],
          meals: 'Breakfast & Dinner',
          stay: 'Zurich Central Hotel',
        },
      ],
      inclusions: [
        'Swiss Travel Pass included for unlimited scenic trains, lake steamboats, and city buses',
        'Excursion tickets to Jungfraujoch Top of Europe and Mt. Titlis included',
        '4-Star Swiss hospitality hotel accommodations with daily buffet breakfast',
      ],
      perks: ['Complimentary Swiss chocolate gift box & travel pass wallet', 'Bangalore concierge support'],
    },
  }

  // Fallback template for any other destination (singapore, vietnam, himachal, ladakh, uttarakhand, etc.)
  const getTemplateForDestination = (slug: string, destName: string) => {
    if (DESTINATION_DAY_TEMPLATES[slug]) {
      return DESTINATION_DAY_TEMPLATES[slug]
    }

    // Dynamic intelligent generator for other destinations
    const isInternational = [
      'bali',
      'dubai',
      'thailand',
      'singapore',
      'maldives',
      'vietnam',
      'sri-lanka',
      'switzerland',
      'japan',
      'malaysia',
    ].includes(slug)

    const basePrice = isInternational ? 39999 : 21999

    return {
      defaultStay: `Curated 4-Star / 5-Star Luxury Stays in ${destName}`,
      estimatedBase: basePrice,
      currency: '₹',
      days: [
        {
          title: `Arrival in ${destName} & Welcome Reception`,
          activities: [
            `Warm meet & greet at airport / transport hub by private chauffeur`,
            `Check-in to premium handpicked accommodation with scenic views`,
            `Evening relaxation and welcome dinner highlighting authentic local specialties`,
          ],
          meals: 'Dinner Included',
          stay: `${destName} Premier Hotel`,
        },
        {
          title: `Signature Landmarks & Cultural Highlights of ${destName}`,
          activities: [
            `Comprehensive guided sightseeing tour of top iconic landmarks and viewpoints`,
            `Private AC transport with flexible stops for photography and dining`,
            `Evening sunset experience at the region's most scenic vista`,
          ],
          meals: 'Breakfast & Dinner',
          stay: `${destName} Premier Hotel`,
        },
        {
          title: `Nature, Adventure & Local Wonders Exploration`,
          activities: [
            `Immersion in local natural attractions, scenic trails, and heritage quarters`,
            `Curated experiential activity (boat cruise, cable car, or guided nature walk)`,
            `Leisure evening with options for local artisan markets and cafes`,
          ],
          meals: 'Breakfast & Dinner',
          stay: `${destName} Premier Hotel`,
        },
        {
          title: `Hidden Gems & Bespoke Excursions`,
          activities: [
            `Day trip to secluded surrounding scenic valleys, islands, or historic towns`,
            `Authentic culinary tasting experience and relaxed leisure afternoon`,
            `Farewell dinner organized at top-rated panoramic restaurant`,
          ],
          meals: 'Breakfast & Dinner',
          stay: `${destName} Premier Hotel`,
        },
        {
          title: `Morning Leisure & Farewell Departure`,
          activities: [
            `Relaxed breakfast with morning leisure at the property`,
            `Souvenir shopping and assisted transfer to airport for departure`,
          ],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        },
        {
          title: `Extended Scenic Excursion & Wildlife / Heritage Safari`,
          activities: [
            `Full-day outstation excursion to neighboring scenic viewpoints or protected reserves`,
            `Private guide and exclusive transportation included`,
          ],
          meals: 'Breakfast & Dinner',
          stay: `${destName} Premier Hotel`,
        },
        {
          title: `Grand Tour Finale & Luxury Spa Retreat`,
          activities: [
            `Rejuvenating wellness session and private farewell dinner`,
            `Final photo stops at premier viewpoints`,
          ],
          meals: 'Breakfast & Dinner',
          stay: `${destName} Premier Hotel`,
        },
      ],
      inclusions: [
        `Private dedicated AC vehicle for all transfers and excursions in ${destName}`,
        `4-Star / 5-Star handpicked accommodations with daily breakfast & dinner`,
        `All major sightseeing permits, monument entry passes, and toll taxes included`,
      ],
      perks: [
        `24/7 dedicated personal travel coordinator in Bangalore`,
        `Flexible date rescheduling and transparent billing`,
      ],
    }
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedPlan(null)

    const selectedDest =
      ALL_DESTINATIONS.find((d) => d.slug.current === selectedDestinationSlug) || ALL_DESTINATIONS[0]
    const template = getTemplateForDestination(selectedDest.slug.current, selectedDest.name)

    // Calculate number of days from duration string
    let numDays = 5
    if (duration.includes('4 Days')) numDays = 4
    if (duration.includes('5 Days')) numDays = 5
    if (duration.includes('6 Days')) numDays = 6
    if (duration.includes('7 Days')) numDays = 7

    // Slice template days
    const sliceDays = template.days.slice(0, numDays).map((d, index) => {
      // If it's the last day, ensure it is the departure day
      if (index === numDays - 1 && index > 0) {
        return {
          day: index + 1,
          title: `Souvenir Shopping & Airport Departure`,
          activities: [
            `Enjoy a relaxed breakfast at the hotel`,
            `Last-minute souvenir shopping for local specialties`,
            `Assisted checkout and private vehicle drop to airport for your flight home`,
          ],
          meals: 'Breakfast Included',
          stay: 'Departure Day',
        }
      }
      return {
        day: index + 1,
        title: d.title,
        activities: d.activities,
        meals: d.meals,
        stay: d.stay,
      }
    })

    // Budget multiplier
    let budgetMultiplier = 1.0
    if (budget.includes('Deluxe Comfort')) budgetMultiplier = 0.85
    if (budget.includes('Ultra Luxury')) budgetMultiplier = 1.6

    // Duration multiplier
    const dayMultiplier = numDays / 5

    const finalRate = Math.round(template.estimatedBase * budgetMultiplier * dayMultiplier)
    const formattedPrice = `₹${finalRate.toLocaleString('en-IN')} / person`

    // Look for a matching live package if any
    const matchingPkg = ALL_PACKAGES.find(
      (p) =>
        p.destination?.slug?.current === selectedDest.slug.current ||
        p.slug.current.includes(selectedDest.slug.current)
    )

    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedPlan({
        destinationName: selectedDest.name,
        destinationSlug: selectedDest.slug.current,
        duration,
        travelType,
        budget,
        estimatedPrice: formattedPrice,
        overview: `Handcrafted ${duration} bespoke itinerary designed for ${travelers} exploring ${selectedDest.name}. Customized with private AC transfers, handpicked accommodations, and signature experiences.`,
        days: sliceDays,
        inclusions: template.inclusions,
        perks: template.perks,
        matchingPackageSlug: matchingPkg?.slug?.current,
      })
    }, 800)
  }

  // Pre-load default plan on initial mount
  const currentDest =
    ALL_DESTINATIONS.find((d) => d.slug.current === selectedDestinationSlug) || ALL_DESTINATIONS[0]

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3B604]/20 text-[#0A1320] text-xs font-bold uppercase tracking-wider mb-3">
          <Bot className="h-3.5 w-3.5 text-sky-600" /> TravelIntell AI Assistant
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Smart Travel Itinerary Planner
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Synthesize custom travel itineraries across 20+ domestic and international destinations in real-time. Choose your parameters to preview a day-by-day roadmap and connect directly with our Bangalore travel concierges.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Compass className="h-4 w-4 text-sky-600" /> Trip Parameters
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs sm:text-sm">
            {/* Destination Select with Grouping */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destination
              </label>
              <select
                value={selectedDestinationSlug}
                onChange={(e) => setSelectedDestinationSlug(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-medium focus:border-sky-500 focus:bg-white focus:outline-none transition-colors cursor-pointer"
              >
                <optgroup label="🇮🇳 Domestic Packages (India)">
                  {ALL_DESTINATIONS.filter((d) => d.country === 'India').map((d) => (
                    <option key={d._id} value={d.slug.current}>
                      {d.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="✈️ International Packages">
                  {ALL_DESTINATIONS.filter((d) => d.country !== 'India').map((d) => (
                    <option key={d._id} value={d.slug.current}>
                      {d.name} ({d.country})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-medium focus:border-sky-500 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="4 Days / 3 Nights">4 Days / 3 Nights (Quick Escape)</option>
                <option value="5 Days / 4 Nights">5 Days / 4 Nights (Recommended)</option>
                <option value="6 Days / 5 Nights">6 Days / 5 Nights (Complete Holiday)</option>
                <option value="7 Days / 6 Nights">7 Days / 6 Nights (Grand Tour)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Travel Style & Theme
              </label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-medium focus:border-sky-500 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Honeymoon & Romantic Luxury">Honeymoon & Romantic Luxury</option>
                <option value="Family Vacation with Kids">Family Vacation with Kids</option>
                <option value="Beach & Island Relaxation">Beach & Island Relaxation</option>
                <option value="Adventure, Snow & Water Sports">Adventure, Snow & Water Sports</option>
                <option value="Heritage, Culture & Temples">Heritage, Culture & Temples</option>
              </select>
            </div>

            {/* Budget Tier */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Accommodation & Budget Tier
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-medium focus:border-sky-500 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Premium Luxury (4-Star / 5-Star)">Premium Luxury (4-Star / 5-Star)</option>
                <option value="Deluxe Comfort (3-Star / 4-Star)">Deluxe Comfort (3-Star / 4-Star)</option>
                <option value="Ultra Luxury & Private Pool Villas">Ultra Luxury & Private Pool Villas</option>
              </select>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Travelers
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-medium focus:border-sky-500 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="2 Adults (Couple / Pair)">2 Adults (Couple / Pair)</option>
                <option value="Family (2 Adults + 1-2 Kids)">Family (2 Adults + 1-2 Kids)</option>
                <option value="Small Group (4-6 Friends)">Small Group (4-6 Friends)</option>
                <option value="Solo Traveler">Solo Traveler</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0A1320] py-3.5 text-xs sm:text-sm font-bold text-[#F3B604] shadow-md hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 mt-4 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Synthesizing Itinerary...' : `Generate ${currentDest.name} Plan`}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Dynamic Itinerary Results View */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sky-600" /> Generated Custom Itinerary
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified Plan
              </span>
            </div>

            {generatedPlan ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Plan Overview Banner */}
                <div className="rounded-2xl bg-[#0A1320] text-white p-5 sm:p-6 space-y-3 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F3B604] text-[#0A1320] text-xs font-extrabold">
                      {generatedPlan.travelType}
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                        Estimated Rate
                      </span>
                      <span className="text-lg sm:text-xl font-black text-[#F3B604]">
                        {generatedPlan.estimatedPrice}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {generatedPlan.duration} {generatedPlan.destinationName} Itinerary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {generatedPlan.overview}
                  </p>
                </div>

                {/* Day-by-Day Detailed Roadmap */}
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-sky-600" /> Day-by-Day Schedule
                  </h4>

                  <div className="space-y-3">
                    {generatedPlan.days.map((d) => (
                      <div
                        key={d.day}
                        className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5 space-y-2.5 transition-all hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md">
                            Day {d.day}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <Utensils className="h-3 w-3 text-amber-500" /> {d.meals}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-900">{d.title}</h5>

                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {d.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Hotel className="h-3.5 w-3.5 text-slate-400" />
                            <strong>Stay:</strong> {d.stay}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Inclusions & Perks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-sky-50/60 border border-sky-100 p-4 space-y-2">
                    <h5 className="text-xs font-extrabold uppercase text-sky-900 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" /> What's Included
                    </h5>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {generatedPlan.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-600 font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-4 space-y-2">
                    <h5 className="text-xs font-extrabold uppercase text-amber-900 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> HappyFlying Assurances
                    </h5>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {generatedPlan.perks.map((prk, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">★</span>
                          <span>{prk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Card */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#F3B604]">
                      Ready to customize & book this {generatedPlan.destinationName} trip?
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Our Bangalore concierges can hold seats, customize dates, or upgrade accommodations immediately.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {generatedPlan.matchingPackageSlug && (
                      <Link
                        href={`/packages/${generatedPlan.matchingPackageSlug}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2.5 text-xs font-bold text-white transition-colors"
                      >
                        <span>View Live Package</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}

                    <a
                      href={`https://wa.me/919900113691?text=${encodeURIComponent(
                        `Hi HappyFlying! I generated a ${generatedPlan.duration} ${generatedPlan.travelType} plan for ${generatedPlan.destinationName} (${travelers}, ${budget}). Can you share confirmed quotation and availability?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 space-y-3">
                <Compass className="h-12 w-12 text-slate-300 mx-auto animate-pulse" />
                <h4 className="text-sm font-bold text-slate-700">No Plan Generated Yet</h4>
                <p className="text-xs max-w-sm mx-auto text-slate-500">
                  Select your destination and style on the left, then click &ldquo;Generate Plan&rdquo; to view your personalized day-by-day travel roadmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

