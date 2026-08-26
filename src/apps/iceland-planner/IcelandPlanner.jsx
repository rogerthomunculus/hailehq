import { useState } from 'react';

const CAMP_COLORS = ['#4a9ab5', '#4a8a68', '#8a6aa8', '#b56a3a'];
const CAMP_ICONS = ['🏙️', '🧊', '🌋', '🌊'];
const HOTEL_KEYS = ['reykjavik', 'glacier', 'myvatn', 'snaefellsnes'];

const hotels = {
  reykjavik: {
    name: 'Reykjavik Residence Apartment Hotel ✓ BOOKED',
    rating: '4.7',
    reviews: '568',
    price: '$2,469 total (4 nights)',
    dates: 'Jul 16–20 · 4 nights',
    highlight: '2 bedrooms, full kitchen, central location',
    why: 'Premium 2-bedroom apartment with full kitchen, two bathrooms, central location 5 min from Old Harbour. 4 nights gives you time to ease in after the overnight flight, do whale + puffin tours, Golden Circle day trip, and enjoy the city without rushing. Kitchen saves significantly on food over 4 days.',
    phone: '+354 561 1200',
    bookUrl: 'https://www.booking.com/hotel/is/reykjavik-residence-apartment.html',
    directUrl: 'http://www.reykjavikresidence.is/',
  },
  glacier: {
    name: 'Hotel Jokulsarlon — Glacier Lagoon Hotel ✓ BOOKED',
    rating: '4.8',
    reviews: '461',
    price: '$2,120 total (3 nights)',
    dates: 'Jul 20–23 · 3 nights',
    highlight: '4.8 stars — highest-rated hotel on the Ring Road',
    why: 'Closest hotel to the lagoon. Outdoor hot tubs, sauna with glacier views, on-site restaurant. Reviewers consistently call it their favourite stay in all of Iceland. Hotel confirmed the booked room accommodates your family of 4 — no upgrade needed.',
    phone: '+354 449 7000',
    bookUrl: 'https://www.booking.com/hotel/is/glacier-lagoon.html',
    directUrl: 'https://hoteljokulsarlon.is/',
  },
  myvatn: {
    name: 'Akureyri Log Cabin ✓ BOOKED',
    rating: '—',
    reviews: '—',
    price: '$878 total (2 nights)',
    dates: 'Jul 23–25 · 2 nights',
    highlight: 'Log cabin base for north Iceland — best lodging value of the trip',
    why: 'Mývatn area was sold out, so we restructured: stop at Mývatn on the drive day (Jul 23) to hit Dimmuborgir, Hverir geothermal area, and the pseudo-craters in 3-4 hours, then continue to Akureyri for the night. Day 24 is a relaxed Akureyri day — botanical garden, swimming pool, possible Húsavík whale day trip. Big upside: real city for two evenings instead of a remote lodge.',
    phone: null,
    bookUrl: null,
    directUrl: null,
  },
  snaefellsnes: {
    name: 'Hotel Vest Mar ✓ BOOKED',
    rating: '4.6',
    reviews: '—',
    price: '$904 total (2 nights)',
    dates: 'Jul 25–27 · 2 nights',
    highlight: '10 min from Snæfellsjökull National Park — renovated 2025',
    why: 'Located in Olafsvik, charming fishing village on the north coast of the peninsula. Half the hotel was renovated in spring 2025 with fresh Scandinavian design. Spacious rooms with big windows, classic-style hotel rare in Iceland. On-site Sker Restaurant. Closest hotel to the main park attractions you came for: glacier, lava arch at Arnarstapi (30 min), Kirkjufell (30 min), Vatnshellir cave.',
    phone: null,
    bookUrl: 'https://www.booking.com/hotel/is/vestmar.html',
    directUrl: 'https://www.west.is/en/service/hotel-vest-mar',
  },
};

const camps = [
  {
    name: 'Reykjavik',
    days: [
      {
        n: 1,
        date: 'Thu Jul 16',
        title: 'Arrival — take it easy',
        drive: 'Keflavik to Reykjavik: 49 km · 45 min',
        plan: [
          'Land 6:25am — you have been traveling since yesterday. Pace yourself.',
          'Wait for Lotus shuttle at designated KEF shuttle stop (runs 5am-6pm). Pickup at 8:30am gives buffer for bags + immigration.',
          'Collect Toyota RAV4 at Lotus office (Flugvellir 6, Keflavik) — confirm 1 booster + 1 Child Seat ready, Platinum insurance active',
          'Drive to Reykjavik, check in at Reykjavik Residence (request early check-in)',
          'Big grocery run at Bonus supermarket — stock up for the whole trip',
          'Short walk to Old Harbour, early dinner, get the kids to sleep at a normal Iceland bedtime',
        ],
        creatures: [],
        tip: "Resist the urge to 'make the most' of day one — jet lag from a 13-hr overnight flight with kids is brutal. Bonus is Iceland's cheapest supermarket. Pick up skyr, bread, snacks, easy breakfast, and kid-friendly dinner for the apartment kitchen. Spending $150 here saves $600+ over the trip.",
      },
      {
        n: 2,
        date: 'Fri Jul 17',
        title: 'Reykjavik Morning + Lava Tunnel',
        drive: 'Reykjavik morning · 30 min drive to Lava Tunnel afternoon',
        plan: [
          'Slow breakfast at apartment',
          'Morning free time — choose based on how the kids feel:',
          '  Option A: Elding whale watching from Old Harbour (~3.5 hrs, walk up at ticket office or book ahead at elding.is, ~$240 family) — you have North Sailing whales already booked on Day 9, so this is optional',
          '  Option B: Whales of Iceland museum (life-size touchable whales, indoor, ~2 hrs)',
          '  Option C: Slow walk of Laugavegur + Braud & Co + Sun Voyager + Harpa',
          "12:30pm: lunch at Bæjarins Beztu — order 'eina með öllu' (one with everything)",
          '3:00pm: leave Reykjavik — drive 30 min southeast to Raufarhólshellir',
          '4:00pm: Lava Tunnel Standard Tour ✓ BOOKED (~1 hr underground in a 5,200-year-old lava tube). Booking LAVAT-92813291.',
          '5:30pm: drive back to Reykjavik',
          '6:30pm: dinner — Messinn harbor location for fish skillet, or apartment dinner with grocery items',
        ],
        creatures: [
          '🐋 Humpback and Minke whales in Faxafloi Bay (if you do whale watching)',
          '🐬 White-beaked dolphins (common in July)',
          '🦜 Puffins visible from whale boat near Lundey island',
        ],
        tip: 'Lava Tunnel at 4pm is your only fixed commitment today — everything else is flex time to enjoy Reykjavik at a slow pace. The Lava Tunnel is naturally 4-7°C (39-44°F) year-round, so bring fleece + jackets. They provide helmets and headlamps. If you do whale watching, wear warm layers UNDER the Elding-provided overalls, and Sea-Bands on Lucas. Get everyone in bed early tonight — tomorrow is Golden Circle day.',
      },
      {
        n: 3,
        date: 'Sat Jul 18',
        title: 'Golden Circle Day Trip',
        drive: 'Reykjavik loop ~260 km · ~4 hrs spread across the day',
        plan: [
          'Leave Reykjavik by 9am',
          'Þingvellir National Park — walk the rift between tectonic plates',
          'Geysir — Strokkur erupts every 5-8 min, watch 3-4 eruptions',
          'Lunch: Fridheimar tomato farm restaurant — family lunches inside a greenhouse with tomato plants everywhere. Famous tomato soup with unlimited refills. Book ahead at fridheimar.is',
          'Gullfoss — double-tiered waterfall, walk right to the edge',
          'Faxi Waterfall — 10 min detour, smaller and quieter than Gullfoss, salmon ladder visible in summer, almost no crowds',
          'Kerið Crater — 15 min further, volcanic crater lake with vivid red rock and blue-green water, ~20 min rim walk, ~$5/adult entry',
          'Secret Lagoon in Flúðir (optional) — quieter and cheaper than Blue Lagoon. ~$28/adult, kid-friendly warm soak',
          'Back to Reykjavik apartment by 7-8pm for dinner',
        ],
        creatures: [
          '🦢 Arctic terns at Þingvellir lake',
          '🐑 Icelandic sheep everywhere on the drive',
          '🐟 Salmon visible jumping the ladder at Faxi in summer',
        ],
        tip: "Fridheimar is a genuine highlight — a working tomato greenhouse with a restaurant literally among the plants. Kids love it. Book a table at fridheimar.is ahead of time. Order the tomato soup with unlimited refills. Faxi and Kerið are both quick, low-effort additions that add real variety — a quiet waterfall and a dramatic crater lake, neither crowded like Gullfoss. Secret Lagoon is a totally different vibe from Blue Lagoon — rural, no-frills, cheaper. Since you also have Blue Lagoon booked for tomorrow, feel free to skip Secret Lagoon if you're running late or the kids are tired.",
      },
      {
        n: 4,
        date: 'Sun Jul 19',
        title: 'Reykjavik Morning + Blue Lagoon Afternoon',
        drive: 'Reykjavik morning on foot · 50 min drive each way to Blue Lagoon',
        plan: [
          'Slow breakfast at apartment',
          'Morning: Hallgrimskirkja church + elevator to the top for 360° city views (1,500 ISK/adult, 200 ISK/kid)',
          'Mid-morning coffee and pastries at Braud & Co (rainbow-painted bakery, best cinnamon rolls in Iceland)',
          'Walk Laugavegur main shopping street — lopapeysa browsing at the Handknitting Association',
          'Early lunch at Icelandic Street Food — unlimited lamb soup refills, complimentary waffles with jam',
          'Leave apartment by 2pm sharp — 50 min drive to Blue Lagoon, arrival time is strict',
          'Blue Lagoon Comfort Package — 3pm entry, soak until ~5:30-6pm',
          'Drive back to Reykjavik after (~50 min) — kids will be happy-tired',
          'Easy dinner at apartment or casual takeaway — pack skyr/fruit in the fridge for anyone too tired to eat out',
        ],
        creatures: [],
        tip: "Blue Lagoon is the centerpiece of today — everything else is structured around being ready to leave the apartment by 2pm. They don't let you in early or late. Bring swimsuits in a daybag. The silica mud mask is included. Kids get soft drinks at the in-water bar; adults can have a beer or wine. Skip the Lava restaurant at the lagoon (expensive, slow service). Get everyone in bed early tonight — tomorrow is another driving day + Katla ice cave.",
      },
    ],
  },
  {
    name: 'Glacier Zone',
    days: [
      {
        n: 5,
        date: 'Mon Jul 20',
        title: 'South Coast Drive + Katla Ice Cave',
        drive: 'Reykjavik to Hotel Jökulsárlón via Vík · ~380 km · full driving day',
        plan: [
          '8:00am: leave Reykjavik apartment (check out, pack the car)',
          '9:30am: Seljalandsfoss + Gljúfrabúi — the waterfall you walk BEHIND + the hidden one next door (45 min total, full raincoat required)',
          '10:45am: Skógafoss — hike the 370-step staircase for rainbow views at the top (30-45 min)',
          '12:30pm: lunch in Vík — Suður-Vík (lamb leg, arctic char, kids menu) or Black Crust Pizzeria',
          '1:30-3:45pm: Reynisfjara black sand beach (basalt columns, sea stacks) + Dyrhólaey promontory if time (puffins nesting on cliffs until mid-August)',
          '4:15pm: Arctic Adventures meeting point — bus parking lot on the SOUTH side of the Icewear/Krónan building (Austurvegur 20, Vík — facing the sea)',
          '4:30-7:30pm: KATLA ICE CAVE + SUPER JEEP — Ticket ARC-T137226358 (~3 hrs total including super jeep transfer across glacial rivers)',
          '7:30pm: bathroom break, snacks, kids can burn energy for 10 min',
          '7:45pm: drive east on Route 1 — 2 hrs to Hotel Jökulsárlón. Skip Fjaðrárgljúfur canyon (no time)',
          '9:45pm: arrive Hotel Jökulsárlón, check in — home for 3 nights. Easy dinner at hotel restaurant.',
        ],
        creatures: [
          '🦭 Seals sometimes spotted along Seljalandsá river',
          '🦜 Puffins nesting at Dyrhólaey cliffs (bring binoculars)',
          '⚠️ Sneaker waves at Reynisfjara are DEADLY — NEVER turn your back on the water, stay 30m up the beach',
          '🐑 Icelandic sheep throughout the drive',
        ],
        tip: "The tour ends late (~7:30pm) but Iceland's July midnight sun means it's fully daylight until well past midnight. You'll drive to Hotel Jökulsárlón in bright evening light. Wear ALL your warm gear from the morning — you'll be swapping between wet waterfall stops and the cold ice cave. Arctic Adventures provides crampons + helmets, but bring your OWN warm gloves and hat (cave is 32-36°F). Meeting point clarification: south side of the Icewear/Krónan building in Vík, facing the sea. Arrive 4:15pm at latest — they leave promptly. Fjaðrárgljúfur canyon has to be skipped this trip. Confirm dinner at hotel restaurant is possible after 10pm arrival, or plan for grocery items in the room.",
      },
      {
        n: 6,
        date: 'Tue Jul 21',
        title: 'Glacier Lagoon + Diamond Beach',
        drive: 'Hotel to lagoon: ~10 min each way',
        plan: [
          'Slow morning at hotel (kids need it after Day 5 drive + Katla)',
          '9:45am: leave hotel, 10 min drive to Jökulsárlón',
          '10:20-11:00am: AMPHIBIAN BOAT TOUR ✓ BOOKED (JOK-00040230, ~$155 family) — 40 min on the water among icebergs the size of buildings',
          '11:00am: Diamond Beach across the road — icebergs washing up on jet-black sand, 30-45 min',
          '12:00pm: lunch at Fancy Sheep Food Truck right in the lagoon parking lot — lamb burgers, fish and chips, coffee',
          'Afternoon: back to hotel for hot tub + sauna + rest',
          'Dinner at hotel restaurant (isolated location, no other real options nearby)',
          '10pm: return to the lagoon — midnight sun, zero crowds, completely surreal',
        ],
        creatures: [
          '🦭 Harbor seals among icebergs — almost guaranteed',
          '🕊️ Arctic terns near Diamond Beach (they will dive at you, wear a hat)',
          '🐦 Great skuas on the lagoon shore',
        ],
        tip: 'The lagoon at 10pm under the midnight sun is the single most surreal experience in Iceland. Go twice — morning for the boat tour, late evening for the light and quiet. Bring binoculars for seal spotting from the boat. Warm layers under the provided life vest — the water is 2°C even in July.',
      },
      {
        n: 7,
        date: 'Wed Jul 22',
        title: 'Vatnajökull National Park Explorer Day',
        drive: 'Full-day loop from hotel: ~130 km total · 6 stops · west leg then back east',
        plan: [
          'Slow morning at hotel — sleep in, hot tub, big breakfast',
          '10:00am: leave hotel, drive west (~1 hr) to Fjaðrárgljúfur Canyon',
          '11:00-11:45am: Fjaðrárgljúfur — 100m deep mossy green canyon, flat rim walk (~45 min), the one we cut from Day 5',
          '12:00pm: quick roadside stop at Foss á Síðu waterfall (5 min photo)',
          '12:30pm: continue east to Skaftafell Visitor Centre',
          '12:45pm: lunch at Skaftafell Bistro (soup, sandwiches, coffee)',
          '1:45pm: Skaftafellsjökull glacier viewpoint — 10-15 min flat walk from parking to the glacier tongue',
          'OPTIONAL 2:30-4:00pm: Svartifoss waterfall hike (45 min each way, basalt columns behind falls). Skip if kids are tired.',
          '3:30pm: drive 15 min east to Svínafellsjökull glacier tongue — drive-up glacier viewpoint (filming location for Interstellar and Game of Thrones)',
          '4:15pm: continue east 20 min to Kvíárjökull viewpoint — quieter, off-tourist-path glacier tongue',
          "5:00pm: last stop at Fjallsárlón 'Little Glacier Lagoon' — quieter alternative to Jökulsárlón, café on-site for snacks",
          '6:00pm: return to Hotel Jökulsárlón — hot tub, dinner',
          'Optional 10pm: return to Jökulsárlón or Diamond Beach for midnight sun photos',
        ],
        creatures: [
          '🦅 White-tailed eagles occasionally near Skaftafell',
          '🐦 Ptarmigan on the glacier margins',
          '🐑 Sheep throughout the drives',
          '🦭 Seals at Fjallsárlón lagoon',
        ],
        tip: "This is 'drive around and see cool stuff' day — six named glacier tongues plus a canyon, all in one relaxed loop. The Skaftafell guided glacier walk was cut because operators require kids 8+, but you're not missing much — Skaftafellsjökull and Svínafellsjökull viewpoints are dramatic and free. Layers are critical: each glacier viewpoint runs 5-10°C colder than the road. Bathroom logic: Skaftafell Visitor Centre is the main one — plan around it. Kids' engagement game: spot and name each glacier tongue (Skaftafellsjökull, Svínafellsjökull, Kvíárjökull, Fjallsárlón). If everyone's wiped after Skaftafell, just head back to the hotel — the eastern glacier stops are optional bonus.",
      },
    ],
  },
  {
    name: 'Akureyri + Mývatn',
    days: [
      {
        n: 8,
        date: 'Thu Jul 23',
        title: 'Glacier → East Fjords → Mývatn → Akureyri',
        drive:
          'Glacier Zone to Akureyri via Mývatn: ~580 km · the biggest drive day, 9+ hrs with stops',
        plan: [
          'Hard start — leave hotel by 7:30am',
          'Hofn for fuel + a proper bathroom stop (10-15 min). Optional: breakfast at Kaffi Hornið for langoustine soup',
          'Drive the East Fjords — scenic but long. Pull over whenever kids need a break',
          'Stop 1: Djupivogur — tiny village with colorful harbor, 15 min stretch',
          "Stop 2: Petra's Stone Collection in Stöðvarfjörður — one woman's 80-year lifetime of minerals and crystals. Weirdly captivating for kids. 30 min, small entry fee.",
          'Egilsstaðir — natural midpoint. Fuel, bathrooms, lunch at N1 or bakery',
          'Mid-afternoon: arrive at Mývatn area (3-4 hr stop)',
          'Mývatn highlights: Dimmuborgir lava labyrinth, Skútustaðir pseudo-craters, Hverir geothermal area (boiling mud, sulfur steam — alien landscape)',
          'Vogafjós farm restaurant for dinner — cowshed dining room with lake views, smoked lamb, fresh trout, Geysir bread baked underground (the kids will love watching the cows)',
          "Essential final stop: Goðafoss waterfall (literally on Route 1, 10 min stop) — 'Waterfall of the Gods' drops 12m in a perfect semi-circle",
          'Drive 30 min west to Akureyri Log Cabin, arrive by 10-11pm (still light out)',
        ],
        creatures: [
          '🦌 REINDEER — scan roadsides constantly in East Iceland',
          '🦅 White-tailed eagles near the fjords',
          '🦭 Harbor seals at Djupivogur',
          '🦆 15+ duck species around Mývatn lake',
        ],
        tip: "This is THE drive day. Pre-download 3+ hours of audiobooks/shows for the kids. Ice pack in the cooler with skyr and fruit. Make reindeer-spotting a game — they're real and they're there. Vogafjós is the dining highlight of your trip — the restaurant is inside a converted working dairy cowshed with floor-to-ceiling windows into the barn. Don't skip Goðafoss — it's 10 min off your exact driving path.",
      },
      {
        n: 9,
        date: 'Fri Jul 24',
        title: 'Húsavík Whales — North Sailing ✓ BOOKED',
        drive: 'Akureyri to Húsavík: ~75 km · 1 hr each way',
        plan: [
          'Wake 7am at Akureyri Log Cabin — pack daypack (binoculars, Sea-Bands, layers)',
          'Quick breakfast — protein bars in the car, save Kaffi Ilmur for tomorrow',
          '7:30am: leave Akureyri',
          '8:30am: arrive Húsavík, grab coffee at harbor',
          '9:30am: check in at North Sailing Whale Watching Centre, Hafnarstétt 9 (30 min before sailing)',
          '10:00am-1:00pm: Húsavík Original Whale Watching — 3 hrs on traditional oak boat (Booking NOS-89947819)',
          '1:00pm: lunch at Naustið (harbor seafood) or Salka (cozy traditional)',
          '2:30pm: Húsavík Whale Museum — excellent, 1-1.5 hrs, has 25m blue whale skeleton',
          '4:00pm: drive back to Akureyri (1 hr)',
          "5:30pm: Brynja ice cream (NON-NEGOTIABLE — Iceland's most legendary soft-serve)",
          "Evening: Akureyri Swimming Pool (Iceland's best public pool, ~$12 family) OR quiet cabin dinner — whichever the kids want",
        ],
        creatures: [
          '🐋 Humpback whales — near-guaranteed in July, 97% sighting success rate',
          '🐋 Minke whales — common in Skjálfandi Bay',
          '🐬 White-beaked dolphins — common pods',
          '🦜 Atlantic puffins — visible from boat near Puffin Island',
          '🐦 Northern gannets, fulmars, arctic terns',
        ],
        tip: "North Sailing provides warm overalls + raincoats — wear layers underneath, not your bulky waterproofs. Bring binoculars (transforms the experience). Sea-Bands on Lucas before boarding. Hot chocolate + cinnamon cookies served on the way back. Stand at the SIDES of the boat — kids can't see over the front. The 10am slot is ideal: calmest morning seas, full afternoon for Húsavík + Akureyri activities. Note: Lucas was booked as 'Toddler' (free) — at 6 he might technically be Youth (~$50). Check at the dock; they're family-friendly and may wave it through.",
      },
    ],
  },
  {
    name: 'Snaefellsnes',
    days: [
      {
        n: 10,
        date: 'Sat Jul 25',
        title: 'Drive Akureyri → Snaefellsnes',
        drive: 'Akureyri to Olafsvik: ~430 km · ~5.5 hrs with stops',
        plan: [
          'Breakfast at cabin, check out by 10am',
          'Drive south and west across north Iceland',
          'Stop 1: Varmahlid — fuel + snacks, 15 min',
          'Stop 2: Blonduos — lunch at Vinberid, famous homemade ice cream cafe (45 min)',
          'Optional short detour: Hvammstangi seal watching centre (15 min off route)',
          'MUST STOP: Deildartunguhver + Hraunfossar cluster (30 min off Ring Road, 45 min on site)',
          "— Deildartunguhver: Europe's highest-flow hot spring, 180 L/sec of boiling water. Dramatic steam clouds. 10 min photo stop.",
          '— Hraunfossar: waterfalls streaming out of a lava field for 700m — water appears from rocks with no cliff. Totally unique to Iceland. Flat path, kid-friendly. 30 min.',
          '— Barnafoss: violent rapids just upstream from Hraunfossar, 5 min walk',
          'Continue west onto Snæfellsnes peninsula',
          'Arrive Hotel Vest Mar in Olafsvik by late afternoon — home for 2 nights',
          'Evening: Kirkjufell mountain and waterfall — 15 min drive east, most photographed mountain in Iceland',
          'Dinner at Sker Restaurant (in your hotel)',
        ],
        creatures: [
          '🐴 Icelandic horses on farms throughout the drive',
          '🦭 Seals at Hvammstangi if you detour',
        ],
        tip: "The Deildartunguhver + Hraunfossar cluster is 30 min off the direct route but genuinely worth it — these are unique Icelandic phenomena you won't see anywhere else. Kirkjufell at 10-11pm with golden hour light is magic — plenty of time to drive there after dinner since it stays light until past midnight. Arnarstapi village is 30 min south of your hotel, keep it in mind for tomorrow.",
      },
      {
        n: 11,
        date: 'Sun Jul 26',
        title: 'Snaefellsnes Peninsula Full Day',
        drive: 'Peninsula loop ~120 km · 2-3 hrs spread across the day',
        plan: [
          'Breakfast at hotel',
          "Morning: drive south to Ytri-Tunga beach — Iceland's most reliable seal colony, walk right up to the rocks (45 min drive)",
          'Arnarstapi village + lava arch — puffin burrows visible right from the coastal path',
          'Lunch: Fjöruhúsið cafe in Hellnar — literally on the beach, legendary fish soup (tiny and amazing)',
          "Snaefellsjokull glacier volcano viewing — Jules Verne's Journey to the Center of the Earth",
          'Djupalonssandur black pebble beach and shipwreck remains',
          'Vatnshellir Cave tour — descend 35m into a lava tube (~$50/adult, book ahead, minimum age 5)',
          'Return to hotel. Dinner at Sjávarpakkhúsið in Stykkishólmur (worth the drive for fresh fish)',
          'Evening: Kirkjufell again at midnight sun golden hour if you have stamina',
        ],
        creatures: [
          '🦭 10-30 seals at Ytri-Tunga (almost guaranteed)',
          '🦜 Puffins nesting at Arnarstapi cliffs',
          '🐴 Icelandic horses — ask hotel about a riding tour',
        ],
        tip: "Ytri-Tunga is a private farm beach with ~$5 parking fee. The seals are so habituated they'll stare back at your kids from 3 metres away. Fjöruhúsið cafe is hard to find (look for the tiny wooden building right on the beach in Hellnar) — the soup is considered one of the best in Iceland by locals. Vatnshellir Cave is worth adding if kids still have energy — walk-up booking at Snæfellsnes National Park visitor centre, kids 5+ accepted (Lucas OK). Stop in Bjarnarhöfn shark museum if you want to try hákarl (fermented shark) and terrify the kids.",
      },
    ],
  },
];

const finalDay = {
  date: 'Sun Jul 27',
  drive: 'Snaefellsnes → Borgarnes → Keflavik: ~210 km · ~2.5 hrs',
  plan: [
    'Leisurely morning — no rush, check out by 9-9:30am',
    'Drive south through Snæfellsnes — the drive itself is beautiful, final views of the glacier',
    'Stop: Borgarnes (~11:30am) — lunch at Englendingavík restaurant by the harbor',
    'Dessert: Geirabakari Kaffihús bakery next door — chocolate cinnamon buns, featured in The Secret Life of Walter Mitty',
    'Drive 1 hour south to Keflavík, return Toyota RAV4 to Lotus by 2pm',
    'Fill tank before returning — companies charge 3x market rate to refuel',
    'Check in, security, airport — relaxed with time to spare',
    'Fly home 5:10pm — KEF → Nashville → New Orleans, arrive MSY 12:20am Jul 28',
  ],
  creatures: [
    '🦭 Last chance: Icelandic horses in fields along Route 54',
    '🐦 Seabirds at Borgarnes harbor',
  ],
  tip: 'Englendingavík is in an 1885 building on a quiet bay — fish-focused, harbor views, family-friendly, consistently the best meal in Borgarnes. Travel days with two small kids should be relaxed, not a race.',
};

const campGuides = {
  reykjavik: {
    summary:
      "Iceland's capital and your trip warmup. Walkable core, great kitchens at your apartment, and the easiest base for kids. You'll eat well, see whales and puffins, soak at the Blue Lagoon, and do the Golden Circle without pushing anyone past their limits.",
    extras: [
      {
        name: 'Grótta lighthouse sunset walk',
        note: '15 min west of Old Harbour. Tidal causeway to a lighthouse. Empty, calm, great for golden hour (10pm-1am in July). Check tide times — the path floods at high tide.',
        priority: 'Hidden gem',
      },
      {
        name: 'Tjörnin duck pond',
        note: 'Right in central Reykjavik. Free. Ducks, geese, swans — completely tame. Perfect 30-min arrival day stop for your 6-year-old. Buy birdseed at nearby shops (not bread).',
        priority: 'Kid win',
      },
      {
        name: 'Harpa Concert Hall interior',
        note: 'Free to walk inside. The honeycomb glass facade creates a kaleidoscope effect. 10 min at the Old Harbour anytime.',
        priority: 'Quick',
      },
      {
        name: 'Kolaportið flea market',
        note: 'Weekends only. Downtown. Icelandic snacks (try the hangikjöt lamb on rye), local crafts, random old treasures. Good rainy-day option.',
        priority: 'Weekends only',
      },
      {
        name: 'Sky Lagoon',
        note: 'Alternative to Blue Lagoon — 10 min from downtown, ocean infinity edge. Has a 7-step ritual with cold plunge. You booked Blue Lagoon, so this is the skip — but worth knowing about for future trips.',
        priority: 'Already decided',
      },
    ],
    food: [
      {
        name: 'Bæjarins Beztu hot dogs',
        where: 'Old Harbour — the red stand',
        note: "Order 'eina með öllu' — one with everything. $5 each. Bill Clinton and Anthony Bourdain both ate here. Kids will demand seconds.",
      },
      {
        name: 'Braud & Co bakery',
        where: 'Frakkastígur 16 — the rainbow-painted bakery',
        note: 'The best cinnamon rolls (snúður) in Iceland. Queue moves fast. Buy extras for the road.',
      },
      {
        name: 'Sandholt bakery',
        where: 'Laugavegur 36',
        note: 'Artisan bakery — sourdough, pastries, open-faced sandwiches for lunch. Multi-generational bakers.',
      },
      {
        name: 'Icelandic Street Food',
        where: 'Lækjargata 8',
        note: 'Unlimited lamb soup refills, complimentary waffles with jam, casual. Perfect kid-friendly lunch.',
      },
      {
        name: 'Messinn',
        where: 'Lækjargata 6 or Old Harbour',
        note: 'Their fish skillet portions are massive — $30-35 feeds 2 adults + 2 kids comfortably. Order one skillet to share.',
      },
      {
        name: 'Matur og Drykkur',
        where: 'Grandagarður 2, Old Harbour',
        note: 'Traditional Icelandic cooking with a modern touch. If you want one nicer dinner in Reykjavik, go here. Reservations essential.',
      },
      {
        name: 'Fish Market (Fiskmarkaðurinn)',
        where: 'Aðalstræti 12',
        note: 'Upscale Icelandic fish — if you want a splurge tasting menu night while your wife is there. Get babysitter or early dinner with kids.',
      },
    ],
  },
  glacier: {
    summary:
      "Your most remote base. Iceland's wildest landscape — icebergs, glaciers, volcanic sand, and sea. Hotel Jökulsárlón is genuinely isolated which is part of the magic. Food options are limited on this stretch, so plan where you eat carefully.",
    extras: [
      {
        name: 'Fjallsárlón (quieter glacier lagoon)',
        note: '10 min before Jökulsárlón on Route 1. A smaller, quieter glacier lagoon with a cafe. Gets 1/10 the crowd. Stop here first for icebergs without the tour buses.',
        priority: 'Hidden gem',
      },
      {
        name: 'Stokksnes / Vestrahorn mountain',
        note: '30 min east of Höfn. The jagged Vestrahorn mountain reflects in a black sand beach with dunes. ~$10 entry at a small cafe. Can be magical if weather is clear, muddy if not. Worth the detour if you have a morning with good light.',
        priority: 'Weather dependent',
      },
      {
        name: 'Fjaðrárgljúfur canyon',
        note: 'Between Vík and Jökulsárlón on Route 1. A 100m deep mossy canyon with winding river. 20-30 min walk along the rim. Detour: ~15 min off Ring Road. Good Day 5 drive stop.',
        priority: 'Drive stop',
      },
      {
        name: 'Höfn evening dinner trip',
        note: "30 min east of the hotel. Known as Iceland's langoustine capital. Worth one evening trip for Pakkhús restaurant.",
        priority: 'Dinner option',
      },
      {
        name: 'Lómagnúpur cliff',
        note: 'Roadside. A 767m cliff that rises vertically from flat plain on the drive toward the glacier zone. Photo stop.',
        priority: 'Drive stop',
      },
    ],
    food: [
      {
        name: 'Pakkhús (Höfn)',
        where: 'Krosseyjarvegur 3, Höfn — 30 min from hotel',
        note: 'The langoustine pilgrimage. Soup and grilled tails are both legendary. Expensive ($40-55/main) but worth one dinner here. Book ahead.',
      },
      {
        name: 'Hotel Jökulsárlón restaurant',
        where: 'Your hotel',
        note: 'The arctic char dish gets strong reviews. Fine for most nights given the location. Breakfast buffet is included and solid.',
      },
      {
        name: 'Fancy Sheep food truck',
        where: 'Jökulsárlón lagoon parking lot',
        note: "Lamb burgers, fish and chips, coffee. Open daytime hours, cheap, right where you'll be for the boat tour.",
      },
      {
        name: 'Nýibær Cafe',
        where: 'Skaftafell visitor centre',
        note: 'Soup, sandwiches, coffee at your glacier walk base. Fine post-glacier fuel.',
      },
      {
        name: 'Systrakaffi',
        where: 'Kirkjubæjarklaustur (drive stop)',
        note: '1 hr west of hotel on Route 1. Pizza, fish and chips, ice cream. Best lunch option between Vík and the glacier zone.',
      },
      {
        name: 'Kaffi Hornið (Höfn)',
        where: 'Hafnarbraut 42, Höfn',
        note: 'The langoustine soup is cheaper here than Pakkhús and nearly as good. Casual atmosphere, fits families.',
      },
    ],
  },
  myvatn: {
    summary:
      "A full day of driving gets you here, and the payoff is one of Iceland's most otherworldly landscapes — sulfur vents, lava fields, pseudo-craters — plus a proper city (Akureyri) to recover in. The long drive day deserves deliberate stops. Optional Húsavík day trip adds whales and puffins if you can pull it off.",
    extras: [
      {
        name: 'Goðafoss waterfall',
        note: "Between Mývatn and Akureyri on Route 1 — you literally drive past it. 5-10 min stop, park right at the top, walk 2 min to the edge. The 'Waterfall of the Gods' drops 12m in a semi-circle. Cannot skip this.",
        priority: 'Essential — on the way',
      },
      {
        name: 'Húsavík whale watching day trip',
        note: "1 hr from Akureyri. Europe's whale capital — near-guaranteed humpback sightings. North Sailing runs wooden schooners with puffin combo tours. Whale Museum in town is excellent. Allow a full day.",
        priority: 'Day 9 option',
      },
      {
        name: 'Mývatn Nature Baths',
        note: 'Geothermal baths near Mývatn lake. Kids FREE under 12. Far less crowded than Blue Lagoon. Can be squeezed in during the Day 8 drive stop if time allows.',
        priority: 'Day 8 option',
      },
      {
        name: 'Stuðlagil canyon',
        note: '2.5 hr detour east of Ring Road. A turquoise river flowing between towering basalt columns. Best viewed from the west side (no hike needed). Probably too far for this trip but noting it.',
        priority: 'Too far this trip',
      },
      {
        name: 'Grjótagjá hot spring cave',
        note: 'Near Mývatn — a geothermal cave where Jon Snow and Ygritte filmed. Closed for bathing (too hot now) but you can look inside. 5 min stop.',
        priority: 'Quick curiosity',
      },
      {
        name: 'Akureyri Botanical Garden',
        note: "World's northernmost. Free entry. Roses, arctic plants, great for kids to run around. Close to your Log Cabin base.",
        priority: 'Free, relaxing',
      },
    ],
    food: [
      {
        name: 'Brynja (Akureyri)',
        where: 'Aðalstræti 3, Akureyri',
        note: 'PILGRIMAGE. Legendary soft-serve since 1939. Icelanders drive hours for this. Get the dipped cone. Non-negotiable.',
      },
      {
        name: 'Kaffi Ilmur (Akureyri)',
        where: 'Hafnarstræti 107b, Akureyri',
        note: "Downtown Akureyri's best breakfast and coffee. Homemade pastries, cozy atmosphere, fits families.",
      },
      {
        name: 'Bryggjan (Akureyri)',
        where: 'Akureyri harbor',
        note: 'Fresh fish with kid-friendly menu. Great lunch spot with harbor view.',
      },
      {
        name: 'Rub23 (Akureyri)',
        where: 'Kaupvangsstræti 6',
        note: 'Upscale sushi-meets-Icelandic. If you want one nicer dinner in Akureyri. Reserve ahead.',
      },
      {
        name: 'Vogafjós (Mývatn)',
        where: 'Vogar, near Mývatn — on drive day',
        note: 'Eat dinner inside a working dairy cowshed with floor-to-ceiling windows into the barn. Smoked lamb, fresh trout, Geysir bread baked underground. The kids will talk about this for years.',
      },
      {
        name: 'Akureyri Fish & Chips',
        where: 'Skipagata 14, Akureyri',
        note: 'Casual takeaway, fresh cod, cheap. Perfect for the cabin dinner.',
      },
    ],
  },
  snaefellsnes: {
    summary:
      "Called 'Iceland in Miniature' — glacier, fjords, lava fields, waterfalls, black sand, volcanic cones all on one peninsula. Less crowded than the South Coast. Hotel Vest Mar in Ólafsvík puts you 10 min from the national park. Great final stop before the flight home.",
    extras: [
      {
        name: 'Kirkjufell + Kirkjufellsfoss',
        note: 'The most photographed mountain in Iceland, 15 min east of your hotel. Game of Thrones fans will recognize it. Best at midnight sun golden hour (10pm-midnight).',
        priority: 'Essential',
      },
      {
        name: 'Vatnshellir Cave',
        note: 'Descend 35m into an 8,000-year-old lava tube. Guided tours every hour, $50/adult, minimum age 5. Helmets and lights provided. Book ahead.',
        priority: 'Kid highlight',
      },
      {
        name: 'Búðakirkja black church',
        note: 'South coast of peninsula, isolated black wooden church in a lava field with glacier behind. Iconic photo stop. 5 min parking.',
        priority: 'Photo stop',
      },
      {
        name: 'Gerðuberg basalt cliffs',
        note: 'South coast. A wall of hexagonal basalt columns 100m long. Good drive stop on your way in or out of Snæfellsnes.',
        priority: 'Drive stop',
      },
      {
        name: 'Rauðfeldsgjá gorge',
        note: 'Near Arnarstapi. Scramble into a narrow mossy crack in the mountain with a waterfall inside. Kids love it. Wear boots, feet will get wet.',
        priority: 'Hidden gem',
      },
      {
        name: 'Saxhóll crater',
        note: 'A small volcanic crater with metal steps to the top. 10 min each way. 360° view from the summit.',
        priority: 'Quick kid win',
      },
      {
        name: 'Londrangar basalt sea stacks',
        note: 'West coast of peninsula. Two volcanic rock pillars rising from the sea — 75m and 61m. Short walk to viewpoint.',
        priority: 'Photo stop',
      },
    ],
    food: [
      {
        name: 'Sjávarpakkhúsið (Stykkishólmur)',
        where: 'Hafnargata 2, Stykkishólmur — 45 min from hotel',
        note: 'Harbor fish restaurant in a historic building. Mussels from the bay. Worth the drive for a proper seafood dinner.',
      },
      {
        name: 'Fjöruhúsið (Hellnar)',
        where: 'Tiny wooden building on the Hellnar beach',
        note: "Legendary fish soup — considered one of Iceland's best by locals. Hard to find. Cash or card, limited hours.",
      },
      {
        name: 'Bjargarsteinn (Grundarfjörður)',
        where: 'Near Kirkjufell',
        note: 'Fine dining in a restored 1908 house that was moved to Grundarfjörður in 2014. Nordic-style tasting. Reserve ahead.',
      },
      {
        name: 'Narfeyrarstofa (Stykkishólmur)',
        where: 'Aðalgata 3',
        note: 'Historic building, Icelandic food with modern presentation. Good alternative to Sjávarpakkhúsið if fully booked.',
      },
      {
        name: 'Sker Restaurant',
        where: 'Inside Hotel Vest Mar, your hotel',
        note: "Convenient when you're tired. Decent Icelandic menu. Fine for one dinner, not worth multiple.",
      },
      {
        name: 'Bjarnarhöfn shark museum',
        where: 'Shark farm on peninsula',
        note: 'Try hákarl — fermented Greenlandic shark. Small entry fee. The 9-year-old will either be horrified or thrilled. Either way, a trip story forever.',
      },
    ],
  },
};

const looseEnds = {
  next2Weeks: [
    {
      item: 'Icelandair check-in ✓ TOMORROW at 11:50am Central',
      detail:
        'Check in on icelandair.com with BLYK5I 24 hrs before flight. Save all 4 boarding passes to Apple Wallet or Google Wallet. Try Southwest.com with the same code — if it works, save those too.',
    },
    {
      item: 'Bag prep — weighed and under 50 lbs each ✓',
      detail:
        '4 checked bags at max 50 lbs each. 4 carry-ons at max 22 lbs each. Icelandair limits are enforced.',
    },
    {
      item: 'MSY at the Southwest counter — Icelandair booking BLYK5I',
      detail:
        "Say: 'This is Icelandair booking BLYK5I, Economy Standard, all 4 have free checked bags included. Please tag bags through to KEF.' Photograph every bag tag receipt.",
    },
    {
      item: 'BWI layover — do NOT go to baggage claim',
      detail:
        "3.5 hr layover at BWI. Walk directly from Southwest gate to Icelandair gate. Bags stay in the system automatically because it's one ticket.",
    },
    {
      item: 'T-Mobile roaming enabled ✓',
      detail: 'Data roaming confirmed on in the T-Mobile app before leaving the house.',
    },
    {
      item: 'Photograph the whole family this morning',
      detail:
        "Airport-standard advice: if a child gets separated, you have a current photo showing exactly what they're wearing.",
    },
  ],
  weeksOut: [
    {
      item: 'USPS mail hold ✓ DONE',
      detail: 'Set start Jul 15, end Jul 28. Mail hold on usps.com.',
    },
    {
      item: 'Smart home / lights / neighbor notified ✓ DONE',
      detail: "Lights on schedule, neighbor knows you're gone.",
    },
    {
      item: 'ICE contact in phones',
      detail:
        'Add a stateside contact marked ICE (In Case of Emergency) in both your phones. Most phones show this on locked screen.',
    },
    {
      item: 'Volcano status check — Reykjanes Peninsula',
      detail:
        'Reykjanes has been intermittently active. Check mbls.is or safetravel.is the morning of flight. If any active eruption near KEF, Tin Leg Gold covers trip disruption under Natural Disaster.',
    },
  ],
  weekBefore: [
    {
      item: 'Charge everything to 100% tonight',
      detail:
        'Both phones, both power banks, all tablets, laptop if bringing. Charge in the wall while you sleep.',
    },
    {
      item: 'Downloads verified',
      detail:
        'Google Maps offline Iceland (~500MB) · Netflix/Disney+ kids shows (8+ hrs) · Audible audiobooks · Google Translate Icelandic offline pack · Spotify playlists.',
    },
    {
      item: 'Apps installed + logged in',
      detail:
        'Icelandair, Southwest, Lotus Assistance, Vedur, Safetravel.is, 112 Iceland, Google Maps, Google Translate.',
    },
    {
      item: 'Set 2 alarms for tomorrow morning',
      detail:
        'Leave the house by 9:20am for 11:50am MSY departure. 10-min drive to MSY + security buffer.',
    },
    {
      item: 'Kids in bed by 8pm tonight',
      detail: "Long travel day tomorrow. They'll thank you.",
    },
  ],
  toBuy: [
    {
      item: 'SHOPPING COMPLETE ✓',
      detail: 'All gear purchased and packed. Reference below preserved for verification.',
    },
    {
      item: 'European Type F power adapters ✓ ALREADY OWN',
      detail: 'Packed in carry-on for BWI layover + Iceland arrival.',
    },
    {
      item: 'Portable power banks ✓ ALREADY OWN',
      detail: 'Charged 100%, packed in carry-on.',
    },
    {
      item: 'Adult waterproof rain jackets — REI Co-op Rainier ✓ PURCHASED',
      detail: 'Wear on plane tomorrow.',
    },
    {
      item: 'Kids waterproof rain jackets — Columbia Glennaker ✓ PURCHASED',
      detail: 'Wear on plane tomorrow.',
    },
    {
      item: 'Kids quick-dry shoes — KEEN Newport H2 ✓ PURCHASED',
      detail:
        'Two-pair shoe strategy: KEEN Newport H2 for wet days + regular sneakers for dry days and glacier walk (crampons need closed shoe).',
    },
    {
      item: 'Merino wool socks ✓ PURCHASED',
      detail: '4-5 pairs per person. Cotton socks are miserable when wet.',
    },
    {
      item: 'Nike Pegasus Trail 5 + Columbia Fairbanks Low (Hai) ✓ ALREADY OWN',
      detail: 'Trail 5 as primary daily shoe, Fairbanks as waterproof backup for heavy rain days.',
    },
    {
      item: 'Sunscreen SPF 30-50 ✓ PACKED',
      detail: "Iceland's high-latitude sun burns hard even in 55°F.",
    },
    {
      item: 'Sea-Bands / Bonine for Lucas',
      detail:
        "Motion sickness prevention for the North Sailing whale boat (Jul 24, 3 hrs). Optional — pick up at any CVS if you don't have.",
    },
    {
      item: 'Basic medical kit ✓ PACKED',
      detail: 'Tylenol, ibuprofen, Benadryl, bandaids, Neosporin, moleskin.',
    },
  ],
};

const printChecklist = {
  mustPrint: [
    {
      item: 'Icelandair flight tickets',
      detail:
        'Booking BLYK5I · all 4 travelers · MSY→BWI→KEF outbound, KEF→BNA→MSY return. Print confirmation email + boarding passes day-of.',
      source: "Gmail: 'Your Icelandair Ticket to Keflavik on 15 Jul 2026'",
    },
    {
      item: 'Lotus rental car confirmation',
      detail:
        'Booking 2QFX7V · Toyota RAV4 · Pickup Jul 16 8:30am, drop-off Jul 27 2pm. They will ask for this at the counter.',
      source: "Gmail: 'Car Rental Confirmation 2QFX7V - Lotus Car Rental'",
    },
    {
      item: 'Tin Leg insurance ID card + coverage letter',
      detail:
        'Policy 53-TLG-FDD-6EB76 · Print the ID card showing emergency phone numbers. Keep one copy with Hai, one with Linda.',
      source:
        "Gmail: 'Tin Leg Confirmation - Policy Number 53-TLG-FDD-6EB76' (attachment: Policy-53-TLG-FDD-6EB76-Documents.pdf)",
    },
    {
      item: 'All 4 hotel confirmations',
      detail:
        'Reykjavik Residence (Jul 16-20), Hotel Jökulsárlón (Jul 20-23), Akureyri Log Cabin (Jul 23-25), Hotel Vest Mar (Jul 25-27). Some hotels in Iceland still ask for printed confirmation at check-in.',
      source: 'Booking.com or direct hotel emails',
    },
    {
      item: 'Blue Lagoon Comfort Package booking',
      detail:
        'Jul 19, 3pm · 2 adults + 2 children. Strict timed entry — they scan a QR code that you can pull up on phone, but a printed copy is backup.',
      source: 'Gmail: Blue Lagoon confirmation email',
    },
    {
      item: 'North Sailing whale watching ticket',
      detail:
        'Booking NOS-89947819 · Jul 24, 10am · Húsavík Original Whale Watching. Print the ticket-NOS-T128517658.pdf attachment.',
      source: "Gmail: 'Booking: Fri 24.Jul '26 @ 10:00'",
    },
  ],
  niceToBackup: [
    {
      item: 'Tin Leg full policy certificate (48 pages)',
      detail:
        "Don't print this — it's huge. Save the PDF to your phone and Linda's phone. Email a copy to yourself in a labeled folder.",
      source: 'Gmail attachment: Tin_Leg_Gold.pdf',
    },
    {
      item: 'All 4 passport photo pages',
      detail:
        "Print scans of all 4 passports' photo pages. Keep one set with Hai, one set with Linda, separate from the actual passports. Critical if any passport is lost.",
      source: 'Scan at home',
    },
    {
      item: "Driver's license (Hai)",
      detail:
        'Print a scan as backup. US license is valid in Iceland — no IDP needed — but a copy is useful if the original is lost.',
      source: 'Scan at home',
    },
    {
      item: 'Credit cards — front and back scans',
      detail:
        'Scan all 3 credit cards (front and back). Keep digital copies in a secure note. If any card is lost or stolen, you have the issuer phone number on the back.',
      source: 'Scan at home',
    },
    {
      item: 'Emergency contacts sheet',
      detail:
        "One-page printout: Tin Leg emergency (844-927-9265 / +1 727-264-5657 collect), Lotus (+354 787 4444), US Embassy Reykjavik (+354 595 2200), Iceland emergency (112), all 4 hotel phone numbers, Hai's mom or another stateside contact.",
      source: 'Create yourself',
    },
  ],
  toursBookedLater: [
    {
      item: 'Glacier walk Skaftafell (when booked)',
      detail: 'Will be needed at meeting point on Day 7. Print confirmation when received.',
      source: 'icelandicmountainguides.is',
    },
    {
      item: 'Jökulsárlón amphibious boat tour (when booked)',
      detail: 'Will need confirmation at boat dock on Day 6.',
      source: 'icelagoon.is',
    },
    {
      item: 'Elding whale watching Reykjavik (when booked)',
      detail: 'Old Harbour terminal on Day 2.',
      source: 'elding.is',
    },
  ],
  digitalOnly: [
    {
      item: 'T-Mobile international roaming confirmed',
      detail: 'Verify in T-Mobile app before flight. Enable data roaming on both phones.',
    },
    {
      item: 'Lotus Assistance app',
      detail: "Download to Hai's phone. Has booking info, roadside help, Iceland driving tips.",
    },
    {
      item: 'Google Maps offline area for Iceland',
      detail:
        'Download the entire Iceland region for offline use BEFORE leaving. Critical for the rural drives.',
    },
    {
      item: 'Maps.me offline maps',
      detail: 'Backup to Google Maps. Better for hiking trails and remote spots.',
    },
    {
      item: 'Vedur (weather) app',
      detail: "Iceland's official weather app. Critical for daily route decisions.",
    },
    {
      item: 'Safetravel.is alerts app',
      detail:
        "Iceland's official travel safety service. Alerts for road closures, weather warnings, volcanic activity.",
    },
    {
      item: 'Tin Leg policy PDF in Google Drive',
      detail: 'Both PDFs (confirmation + full certificate) in a labeled folder. Share with Linda.',
    },
    {
      item: "All booking PDFs in 'Iceland Trip' folder",
      detail: 'Google Drive folder accessible offline. Linda has access too.',
    },
  ],
};

const bookingPhases = [
  {
    label: '✅ Already Done',
    urgent: false,
    done: true,
    items: [
      {
        text: 'Flights booked — $3,898 total · Booking ref BLYK5I',
        note: 'Outbound: MSY → BWI → KEF, departs Jul 15 11:50am, arrives KEF Jul 16 6:25am. Return: KEF → BNA → MSY, departs Jul 27 5:10pm, arrives MSY Jul 28 12:20am.',
        url: null,
      },
      {
        text: 'Reykjavik Residence Apartment Hotel — Jul 16-20 · $2,469',
        note: 'Premium 2BR apartment with full kitchen',
        url: null,
      },
      {
        text: 'Blue Lagoon Comfort Package — Jul 19, 3pm · 2 adults + 2 children ✓ BOOKED',
        note: '50 min from apartment. Leave by 2pm. Strict timed entry.',
        url: null,
      },
      {
        text: 'Hotel Jokulsarlon Glacier Lagoon — Jul 20-23 · $2,120',
        note: 'Family of 4 confirmed OK in booked room',
        url: null,
      },
      {
        text: 'Akureyri Log Cabin — Jul 23-25 · $878',
        note: 'Replaced sold-out Mývatn options. Mývatn becomes a drive-day stop.',
        url: null,
      },
      {
        text: 'Hotel Vest Mar (Olafsvik, Snæfellsnes) — Jul 25-27 · $904',
        note: 'Renovated 2025, 10 min from National Park entrance',
        url: null,
      },
      {
        text: 'Lotus Car Rental — Toyota RAV4 4x4 automatic · Jul 16-27 · ~$2,945 · Booking 2QFX7V',
        note: 'Pickup Jul 16 8:30am at KEF, drop-off Jul 27 2pm. Platinum Insurance (zero excess) + Free WiFi + GPS + Roadside Assistance. Hai + Linda both registered drivers. 1 booster (Hailey) + 1 Child Seat 15-36 kg (Lucas). Online check-in opens Jul 9.',
        url: 'https://www.lotuscarrental.is/',
      },
      {
        text: 'Travel Insurance — Tin Leg Gold · $634 · Policy 53-TLG-FDD-6EB76 ✓ BOOKED',
        note: "$500K medical + $500K evacuation per person (primary coverage, no deductible). Pre-existing conditions covered. 100% trip cancellation ($14K). 150% trip interruption ($21K). Volcanic eruption covered. Emergency: 844-927-9265 (US), +1 727-264-5657 (int'l collect).",
        url: null,
      },
      {
        text: 'T-Mobile confirmed for Iceland — data roaming included on your plan',
        note: 'Enable data roaming before you leave',
        url: null,
      },
      {
        text: 'North Sailing Húsavík Whale Watching ✓ BOOKED — Jul 24, 10am',
        note: 'Booking NOS-89947819 · Húsavík Original Whale Watching, 3 hrs · ~$255 family. Meeting: Whale Watching Centre, Hafnarstétt 9, Húsavík, 9:30am.',
        url: 'https://www.northsailing.is/',
      },
      {
        text: 'Lava Tunnel (Raufarhólshellir) ✓ BOOKED — Jul 17, 4pm',
        note: 'Booking LAVAT-92813291 · Standard Tour, ~1 hr · 30 min southeast of Reykjavik. Naturally 4-7°C inside year-round, bring fleece + jackets. Helmets/headlamps provided.',
        url: 'https://www.thelavatunnel.is/',
      },
      {
        text: 'Katla Ice Cave + Super Jeep ✓ BOOKED — Jul 20, 4:30pm',
        note: 'Ticket ARC-T137226358 (rebooked from Jul 18) · Arctic Adventures · ~$610 family · 3 hrs total. Meeting point: bus parking lot on SOUTH side of Icewear/Krónan building, Austurvegur 20, Vík (facing the sea). Arrive 4:15pm.',
        url: 'https://adventures.is/',
      },
      {
        text: 'Itinerary structure locked — 4-3-2-2 split',
        note: 'All 11 nights of lodging booked. Total: $6,371.',
        url: null,
      },
    ],
  },
  {
    label: '✈️ Trip Starts Tomorrow',
    urgent: true,
    items: [
      {
        text: 'All essential bookings locked. 🎉',
        note: 'Flex tours in Iceland below.',
        url: null,
      },
    ],
  },
  {
    label: '🎯 Flex Tours — Book on the Ground',
    urgent: false,
    items: [
      {
        text: 'Elding whale watching Reykjavik (Day 2, optional)',
        note: 'Walk-up at Old Harbour or book same-day. You already have North Sailing whales on Day 9, so this is optional. ~$240 family.',
        url: 'https://elding.is/',
      },
      {
        text: 'Skaftafell glacier walk (Day 7, likely skip)',
        note: 'icelandicmountainguides.is — minimum age is 8-10 at most operators, too old for Lucas. Consider skipping and doing Skaftafell park trails (Svartifoss hike) + Fjaðrárgljúfur canyon instead.',
        url: 'https://www.icelandicmountainguides.is/',
      },
    ],
  },
  {
    label: '🤔 Reference Info',
    urgent: false,
    items: [
      {
        text: 'Photography plan — midnight sun golden hour runs 10pm to 2am',
        note: null,
        url: null,
      },
      {
        text: "Kids' entertainment for long drives (Day 5 = ~6 hrs, Day 8 = ~9 hrs)",
        note: 'Audiobooks, downloaded shows, car snack strategy',
        url: null,
      },
      {
        text: 'Volcano activity monitoring — Reykjanes Peninsula near Keflavik is active',
        note: 'Check mbls.is for eruption status before travel',
        url: 'https://www.mbls.is/english/',
      },
      {
        text: 'VAT refund at airport — reclaim 24% on purchases over ~6,000 ISK',
        note: 'Present goods, form, and receipts at Keflavik before checking bags',
        url: null,
      },
      {
        text: 'Iceland time zone — UTC year-round, 5 hrs ahead of New Orleans in July',
        note: null,
        url: null,
      },
    ],
  },
  {
    label: '📦 On The Ground in Iceland',
    urgent: false,
    items: [
      {
        text: 'Check road.is every morning before driving',
        note: null,
        url: 'https://www.road.is/',
      },
      {
        text: 'Check Vedur for daily weather + wind forecasts',
        note: 'Wind drives route decisions in Iceland',
        url: 'https://en.vedur.is/',
      },
      {
        text: 'Use 112 Iceland safety app in emergencies',
        note: 'Sends your GPS to rescue services instantly',
        url: 'https://safetravel.is/112-iceland-app/',
      },
      {
        text: 'Pull cash on arrival — 15,000 ISK ATM withdrawal at KEF',
        note: '~$110 total for emergencies. Card accepted almost everywhere.',
        url: null,
      },
      {
        text: 'Costco Iceland stop on Day 1 (Kauptún 3, Garðabær)',
        note: 'Costco membership card in wallet. Save $600-800 on trip food.',
        url: null,
      },
      {
        text: 'VAT refund at airport on return',
        note: 'Reclaim 24% on purchases over ~6,000 ISK. Present goods + receipts at KEF before checking bags Jul 27.',
        url: null,
      },
    ],
  },
];

const budgetLines = [
  { label: 'Flights (family of 4) ✓ BOOKED', comfort: 3898, goBig: 3898 },
  {
    label: 'Lotus RAV4 (11 days, Platinum + Linda + Roadside) ✓ BOOKED',
    comfort: 2945,
    goBig: 2945,
  },
  { label: 'Fuel (~1,800 km total)', comfort: 400, goBig: 400 },
  { label: 'Iceland Km Tax (2026)', comfort: 120, goBig: 120 },
  { label: 'Lodging (11 nights, 4 hotels) ✓ BOOKED', comfort: 6371, goBig: 6371 },
  { label: 'Blue Lagoon Comfort (family) ✓ BOOKED', comfort: 360, goBig: 360 },
  { label: 'Travel Insurance (Tin Leg Gold) ✓ BOOKED', comfort: 634, goBig: 634 },
  { label: 'Lava Tunnel + Katla + Amphibian ✓ BOOKED', comfort: 885, goBig: 885 },
  { label: 'Flex tour — Elding whale watching (optional)', comfort: 0, goBig: 240 },
  { label: 'Food + Restaurants', comfort: 2000, goBig: 3500 },
  { label: 'Souvenirs + Incidentals', comfort: 400, goBig: 1000 },
];

const activities = [
  {
    name: 'Whale Watching Classic Tour (optional)',
    location: 'Reykjavik · Day 2 flex time',
    price: '$80 adult / $45 child · ~$240 family',
    duration: '3 to 3.5 hrs',
    book: 'elding.is — walk-up at Old Harbour if wanted. Optional since North Sailing whale tour is booked for Jul 24.',
    priority: true,
  },
  {
    name: 'Lava Tunnel Standard Tour ✓ BOOKED',
    location: 'Raufarhólshellir · Jul 17, 4pm',
    price: 'Booked',
    duration: '~1 hr',
    book: 'BOOKED — LAVAT-92813291. 30 min southeast of Reykjavik. Naturally 4-7°C inside.',
    priority: true,
  },
  {
    name: 'Katla Ice Cave + Super Jeep ✓ BOOKED',
    location: 'Vík · Jul 20, 4:30pm',
    price: '$610 family total',
    duration: '3 hrs total',
    book: 'BOOKED — Ticket ARC-T137226358. Arctic Adventures. Meeting: south side Icewear/Krónan bldg, Vík. Wear warm layers + gloves.',
    priority: true,
  },
  {
    name: 'North Sailing Húsavík Original ✓ BOOKED',
    location: 'Húsavík · Jul 24, 10am',
    price: '$255 family total',
    duration: '3 hrs',
    book: 'BOOKED — NOS-89947819. Meet 9:30am at Whale Watching Centre, Hafnarstétt 9.',
    priority: true,
  },
  {
    name: 'Jökulsárlón Amphibian Boat Tour ✓ BOOKED',
    location: 'Glacier Lagoon · Jul 21, 10:20am',
    price: '~$155 family (21,200 ISK)',
    duration: '40 min',
    book: 'BOOKED — JOK-00040230. Meet at Jökulsárlón Glacier Lagoon Boat Tours and Cafe.',
    priority: true,
  },
  {
    name: 'Family Glacier Walk (Vatnajokull)',
    location: 'Skaftafell',
    price: '$85 adult / $65 child',
    duration: '3 hrs',
    book: 'icelandicmountainguides.is',
    priority: true,
  },
  {
    name: 'Icelandic Horse Riding',
    location: 'Snaefellsnes',
    price: '$80 adult / $60 child',
    duration: '1 to 2 hrs',
    book: 'Book through hotel',
    priority: true,
  },
  {
    name: 'Blue Lagoon Comfort Package ✓ BOOKED',
    location: 'Reykjavik day trip · Jul 19, 3pm',
    price: '$360 family total',
    duration: '2 to 3 hrs',
    book: 'BOOKED — 2 adults + 2 children. Leave apartment by 2pm.',
    priority: true,
  },
  {
    name: 'Myvatn Nature Baths',
    location: 'Lake Myvatn',
    price: '$38 adult / FREE under 12',
    duration: '2 hrs',
    book: 'jardbadin.is',
    priority: false,
  },
  {
    name: 'Secret Lagoon',
    location: 'Fludir, Golden Circle',
    price: '$28 adult / $15 child',
    duration: '1.5 hrs',
    book: 'secretlagoon.is',
    priority: false,
  },
  {
    name: 'Whale Museum Husavik',
    location: 'Husavik',
    price: '$22 adult / $10 child',
    duration: '1 hr',
    book: 'Walk-in fine',
    priority: false,
  },
];

const freeAttractions = [
  'Thingvellir National Park — walk between tectonic plates (just $10 parking)',
  'Seljalandsfoss, Gljufrabui, Skogafoss, Gullfoss waterfalls',
  'Reynisfjara black sand beach and basalt columns',
  'Diamond Beach — icebergs on black sand',
  'Dimmuborgir lava labyrinth at Myvatn',
  'Skutustadir pseudo-craters',
  'Krafla volcano and Leirhnjukur lava field',
  'Seydisfjordur rainbow town detour',
  'East Fjords scenic drive — reindeer watching',
  'Kirkjufell mountain viewpoint',
  'Ytri-Tunga seal beach (~$5 parking)',
];

const packingList = {
  Clothing: [
    'Waterproof jacket with hood — worn every day, non-negotiable',
    'Waterproof rain trousers for the kids',
    'Merino wool base layers (2 sets each)',
    'Fleece mid-layer',
    'Warm hat and gloves — July highs are only 10 to 14C (50 to 57F)',
    'Sturdy waterproof hiking boots, not trail runners',
    'Sandals or Crocs for geothermal pools',
    'Swimsuit for each person — used at 3 pools on this trip',
    '7+ pairs of socks per person — feet will get wet',
  ],
  'Kids Specific': [
    "Blackout sleep masks — July means 24-hr daylight, essential for kids' sleep",
    'Bug head nets for Myvatn midge season (buy locally or bring)',
    'Small daypack each kid for hikes',
    "Sea-Bands or kids' Dramamine for whale watching boats",
    'Compact binoculars — transforms whale watching and bird spotting',
    'Snacks for the car — trail mix, bars, fruit pouches',
    'Birds of Iceland picture guide for the 9-year-old',
  ],
  'Car Essentials': [
    'Grocery bags — big shop at Bonus supermarket on Day 1',
    'Soft cooler bag for dairy and produce',
    '4 reusable water bottles — tap water is glacier-fed, never buy bottled',
    'Car chargers and power bank',
    'Wet wipes and hand sanitizer',
    'High-protein snacks for East Fjords — no services for hours',
  ],
  'Documents + Admin': [
    'Passports (no visa needed for US citizens in Iceland)',
    'Car rental docs and insurance confirmation',
    'Printed hotel confirmations for all 4 base camps',
    'Iceland emergency number: 112',
    'road.is app — check road conditions every morning',
    'Google Maps or Maps.me downloaded offline for Iceland',
    'Travel insurance with trip cancellation and emergency medical',
  ],
};

const carCompanies = [
  {
    name: 'Lotus Car Rental ✓ YOUR BOOKING',
    rating: '9.6',
    reviews: '500+',
    tag: 'Booking 2QFX7V',
    tagColor: '#4a8a68',
    fleet: 'Toyota RAV4 2022-25',
    notes:
      'Local family-owned. Your Platinum insurance includes FREE WIFI IN THE CAR — genuinely useful for road.is and maps. No deposit with a valid credit card. 24/7 office, self-service pickup available with Platinum. Online check-in opens 7 days before pickup (July 9).',
    url: 'https://www.lotuscarrental.is/',
    priceRange: '$75–520/day',
  },
];

const insuranceItems = [
  {
    name: 'CDW — Collision Damage Waiver',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      'Covers collision damage to the car body. Your Lotus Platinum includes this with $0 deductible.',
  },
  {
    name: 'SCDW — Super CDW',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      'Reduces your deductible to zero on collision damage. Bundled into your Platinum package.',
  },
  {
    name: 'GP — Gravel Protection',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      'Gravel road stone chips are the single most common Iceland claim. Your Platinum covers windshield, headlights, paint, mirrors at $0 deductible.',
  },
  {
    name: 'SAAP — Sand and Ash Protection',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      "Volcanic sand and ash damage — common on the south coast. A sandstorm hit can cost $3,500-10,500 without this coverage. You're protected.",
  },
  {
    name: 'TP — Theft Protection',
    included: true,
    verdict: '✓ Covered',
    color: '#4a8a68',
    detail:
      'Covers vehicle theft. Included in your Platinum package. Iceland has very low theft rates anyway.',
  },
  {
    name: 'Tire Insurance',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      'Covers flat tires and wheel damage from gravel roads. Included in your Platinum package.',
  },
  {
    name: 'Animal Damage',
    included: true,
    verdict: '✓ Covered (zero excess)',
    color: '#4a8a68',
    detail:
      'Covers vehicle damage if you hit a sheep (must still report to 112 by law). Included in your Platinum package.',
  },
  {
    name: 'Towing',
    included: true,
    verdict: 'Covered with 35,000 ISK ($250) deductible',
    color: '#c09060',
    detail:
      "If the vehicle breaks down and needs a tow, you pay the first ~$250. This is the ONLY thing in your Platinum that isn't zero excess.",
  },
  {
    name: 'Wind Damage to Doors',
    included: false,
    verdict: '⚠ NOT insurable — be careful',
    color: '#b56a3a',
    detail:
      'No Iceland insurance at any tier covers wind damage to car doors. Icelandic wind can rip a door backwards off its hinges in one gust. Repairs run $1,500-3,000. Rule: park facing into the wind, hold doors firmly when opening.',
  },
  {
    name: 'Off-Road / F-Road Driving',
    included: true,
    verdict: "✓ Covered (but you're not doing this)",
    color: '#4a8a68',
    detail:
      "Your Platinum includes F-Road and River Crossing coverage, which is unusual. But your route (Ring Road + Snæfellsnes) has NO F-roads. Don't tempt it — even with coverage, getting stuck in a river with kids is dangerous.",
  },
];

const drivingRules = [
  { icon: '🚗', rule: 'Drive on the right', detail: 'Same as the US — no adjustment needed.' },
  {
    icon: '💡',
    rule: 'Headlights on always',
    detail:
      'Day or night, midnight sun or blizzard. It is the law. Most rentals have auto lights — confirm at pickup.',
  },
  {
    icon: '🍺',
    rule: 'Effectively zero alcohol',
    detail:
      'BAC limit is 0.02% — one drink and you cannot legally drive. Fines up to 100,000 ISK, license suspension, or jail.',
  },
  {
    icon: '📱',
    rule: 'No phone while driving',
    detail: 'Hands-free only. Fines are actively enforced.',
  },
  {
    icon: '🐑',
    rule: 'Sheep on the road',
    detail:
      'Free-roaming sheep appear without warning, year-round. If you see a lamb on one side and a sheep on the other, expect the lamb to bolt. Slow down near any livestock. Hitting a sheep must be reported to 112 immediately.',
  },
  {
    icon: '🌉',
    rule: 'Single-lane bridges',
    detail:
      'You will encounter many. Sign says Einbreid Bru. First vehicle to arrive has right of way. If a car is already on it, wait. If you arrive simultaneously, car on the right goes first. Never rush these.',
  },
  {
    icon: '💨',
    rule: 'Icelandic wind is serious',
    detail:
      'Wind can push your vehicle and rip car doors off hinges. Always hold your door firmly when opening. Park facing into the wind when possible. Wind damage is not covered by any insurance.',
  },
  {
    icon: '🪨',
    rule: 'Gravel roads — slow down',
    detail:
      "About a third of Iceland's roads are gravel. Reduce speed before corners. Keep extra distance — flying stones crack windscreens. Do not brake hard. Watch for road edges that drop off suddenly.",
  },
  {
    icon: '⚠️',
    rule: 'Malbik Endar sign',
    detail:
      'This means pavement ends — road is about to become gravel. Slow down immediately when you see it.',
  },
  {
    icon: '🔄',
    rule: 'Roundabouts work differently',
    detail:
      'Inner lane always has priority — opposite to what many US drivers expect. Signal right when exiting regardless of lane.',
  },
  {
    icon: '🚫',
    rule: 'Off-road driving is illegal',
    detail:
      "Everywhere, even on soft grass or moss. Tire tracks damage Iceland's fragile volcanic landscape for decades. Fines are severe.",
  },
  {
    icon: '📷',
    rule: 'No stopping in the road for photos',
    detail:
      'Pull fully off the road before stopping. A common tourist mistake that causes accidents and hefty fines.',
  },
];

const speedLimits = [
  { type: 'Towns and urban areas', limit: '50 km/h', mph: '31 mph' },
  { type: 'Gravel rural roads', limit: '80 km/h', mph: '50 mph' },
  { type: 'Paved rural roads (Ring Road)', limit: '90 km/h', mph: '56 mph' },
  { type: 'Single-lane bridges', limit: '50 km/h', mph: '31 mph' },
];

const apps = [
  {
    name: 'road.is',
    use: 'Live road closures, weather alerts, F-road status — check every morning before driving',
    essential: true,
    url: 'https://www.road.is/',
  },
  {
    name: '112 Iceland',
    use: 'Safety app — sends your GPS to emergency services instantly. Install before you land.',
    essential: true,
    url: 'https://safetravel.is/112-iceland-app/',
  },
  {
    name: 'Maps.me',
    use: 'Offline maps — download Iceland before you go. No cell signal in remote areas.',
    essential: true,
    url: 'https://maps.me/',
  },
  {
    name: 'Vedur.is',
    use: 'Iceland Met Office weather app — essential for day-to-day planning',
    essential: true,
    url: 'https://en.vedur.is/',
  },
  {
    name: 'Google Maps',
    use: 'Download Iceland offline as a backup. Familiar interface for the family.',
    essential: false,
    url: 'https://maps.google.com',
  },
];

const carPickupChecklist = [
  "Physical credit card (Chase Sapphire) in main driver's name — mobile wallets and virtual cards are rejected",
  'Passport + US driving license for both Hai and Linda (both registered drivers on contract)',
  'Confirm booster seat (Hailey) + Child Seat 15-36 kg (Lucas) are both ready and installed',
  'Confirm Toyota RAV4 is automatic 4x4 — verify before signing',
  'Confirm Platinum Insurance is active on the agreement — zero excess on gravel, sand/ash, tire, theft, etc.',
  'Activate the free 4G WiFi device (usually in the glove box or on dashboard)',
  'Pick up the Cheaper Fuel discount card',
  'Ask where the spare tire is and how to use it before leaving the lot',
  'Walk-around video of entire car BEFORE driving off — all 4 sides, roof, underside, windshield. Photograph every existing scratch, chip, dent.',
  'Verify fuel tank is actually full (not just stated as full)',
  'Confirm 2026 km road tax is built into your daily rate (it is)',
  'Confirm GPS works OR your phone offline maps are ready (Google Maps + Maps.me)',
  'Check headlights are set to automatic (legally required on at all times)',
  'Save Lotus emergency number +354 787 4444 in your phone',
  'Online check-in opens July 9 at shuttle.lotuscarrental.is — do this to save 20-30 min at pickup',
];

const carSeatRules = {
  rule: 'Iceland law: all children under 135 cm (4\'5") must use an approved child car seat or booster — no exceptions.',
  yourKids: [
    {
      age: '9-year-old',
      action: 'Measure height tonight',
      detail:
        "Iceland's threshold is 135 cm (4'5\"). If under 135 cm → high-back booster required. If over 135 cm → regular seatbelt in back seat is legal (but booster recommended until 150 cm for proper seatbelt fit). Never front seat with active airbag until 150 cm.",
    },
    {
      age: '6-year-old',
      action: 'Booster seat required',
      detail:
        'High-back booster is recommended over backless. Must weigh at least 15 kg (33 lbs) for a booster — if lighter, a forward-facing harness seat is required. Back seat only.',
    },
  ],
  dontDo:
    "DO NOT bring US car seats. They're not ECE R44/04 or R129 certified and are technically illegal in Iceland. Could be an insurance issue if you're in an accident.",
  whatToDo:
    "Rent 2 high-back boosters from your rental company. $7–28 per seat per day. For 11 days × 2 seats = roughly $150–300 extra. Reserve in advance — July demand is high. When booking, give them each child's height and weight.",
};

const cantMiss = {
  food: [
    {
      name: 'Lamb soup (Kjötsúpa)',
      where: 'Everywhere — every guesthouse, every town',
      price: '$15–22',
      verdict:
        'The national comfort food. Slow-cooked Icelandic lamb with root vegetables. Order it on your first cold, wet day after a waterfall. You will order it again.',
      mustTry: true,
    },
    {
      name: 'Hot dog at Bæjarins Beztu',
      where: 'Old Harbour, Reykjavik — the red stand',
      price: '$4',
      verdict:
        'Eina með öllu — one with everything. Lamb and pork dog with raw onion, crispy onion, ketchup, sweet mustard, and remoulade. Bill Clinton ate here. So did Anthony Bourdain. Your kids will demand a second one.',
      mustTry: true,
    },
    {
      name: 'Langoustine (Lobster soup or tails)',
      where: 'Hofn — the langoustine capital of Iceland',
      price: '$30–50 for a bowl',
      verdict:
        'Hofn is 30 min from your glacier lagoon base camp. This is the freshest, sweetest langoustine you will ever eat. Go to Pakkhus restaurant. Worth every krona.',
      mustTry: true,
    },
    {
      name: 'Skyr',
      where: 'Every supermarket, every breakfast table',
      price: '$3–5 at a supermarket',
      verdict:
        'Thick Icelandic dairy — not quite yogurt, not quite cheese. High protein, slightly tangy. Your kids will live on this at breakfast. Buy it at Bonus on Day 1 and keep it in the cooler bag.',
      mustTry: true,
    },
    {
      name: 'Rye bread ice cream',
      where: 'Geysir area and Mývatn',
      price: '$6–9',
      verdict:
        'Warm dark rye bread baked underground using geothermal heat, crumbled over soft vanilla ice cream. Sounds bizarre. Tastes extraordinary. The 9-year-old will talk about this for weeks.',
      mustTry: true,
    },
    {
      name: 'Icelandic fish and chips',
      where: 'Reykjavik Old Harbour — try Fishmarket or Fish & Chips van',
      price: '$18–25',
      verdict:
        'Cod and haddock so fresh it was in the ocean yesterday. The batter is lighter than anything you know from the US. Eat it standing up at the harbour.',
      mustTry: true,
    },
    {
      name: 'Arctic char (Bleikja)',
      where: 'Any restaurant near the glacier zone or Myvatn',
      price: '$30–45',
      verdict:
        'Indigenous Icelandic fish, salmon-like but more delicate. Often served with local herbs and glacier water butter. Order it instead of salmon — it is far more interesting and uniquely Icelandic.',
      mustTry: false,
    },
    {
      name: 'Kleina (Icelandic doughnut)',
      where: 'Any bakery, petrol station, guesthouse',
      price: '$2–3',
      verdict:
        'Twisted fried pastry, lightly spiced with cardamom. The Icelandic version of a doughnut, less sweet and more interesting. Buy a bag at a petrol station for the car.',
      mustTry: false,
    },
    {
      name: 'Hákarl (fermented shark)',
      where: 'Supermarkets and some restaurants',
      price: '$5 to try',
      verdict:
        'Fermented Greenlandic shark, smells like powerful ammonia, tastes like blue cheese crossed with something alarming. A genuine Icelandic tradition. Your 9-year-old will either be horrified or delighted. Try a tiny piece — it is a story forever.',
      mustTry: false,
    },
    {
      name: 'Skúffukaka (sheet cake)',
      where: 'Any Icelandic bakery or cafe',
      price: '$4–6',
      verdict:
        'Dense chocolate cake with caramel glaze, sold in thick slabs. Every Icelandic grandmother makes it. Every cafe has a version. Perfect with coffee while it rains outside.',
      mustTry: false,
    },
  ],

  experiences: [
    {
      name: 'Jökulsárlón at 10pm under the midnight sun',
      type: 'Unmissable moment',
      detail:
        'No boat tour. Just walk to the lagoon edge at 10pm when everyone else is gone. Icebergs glowing in angled golden light, complete silence, seals occasionally surfacing. This is the single most otherworldly thing you will experience in Iceland. Build it into Day 5 deliberately.',
    },
    {
      name: 'Walk behind Seljalandsfoss',
      type: 'Physical experience',
      detail:
        'The path goes completely behind the waterfall curtain. You are drenched, the roar is overwhelming, and you see the valley through a wall of water. The kids will think this is the best thing they have ever done. Wear the full waterproofs.',
    },
    {
      name: 'Watch Strokkur erupt from 2 metres away',
      type: 'Nature spectacle',
      detail:
        'Every 5 to 8 minutes, a column of boiling water shoots 20 to 30 metres into the air. Go late evening when the tour buses are gone and stand right at the edge. The ground trembles slightly before it blows. Kids absolutely lose their minds.',
    },
    {
      name: 'The tectonic plate walk at Þingvellir',
      type: 'Geological wonder',
      detail:
        'You walk along the actual rift between the North American and Eurasian plates. The ground is slowly pulling apart — about 2 cm per year. Explain this to the kids while standing in it. The 9-year-old will be thinking about this for days.',
    },
    {
      name: 'Geothermal pool, late evening',
      type: 'Cultural experience',
      detail:
        'Whether Myvatn Nature Baths, Secret Lagoon, or Blue Lagoon — pick at least one. Sitting in 38°C geothermal water at 9pm under a pale gold sky while it is 12°C outside is one of the most distinctly Icelandic feelings there is. Kids get it immediately.',
    },
    {
      name: 'Driving the East Fjords in silence',
      type: 'Drive and atmosphere',
      detail:
        'Put on music you love, slow down, and drive the East Fjords without an agenda. The winding in and out of fjords, the reindeer scanning, the almost total absence of other people — it is meditative in a way that big attractions cannot be. One of the best days of the trip.',
    },
    {
      name: 'Glacier walk on Vatnajökull',
      type: 'Once in a lifetime',
      detail:
        'Standing on 1,000 metres of ancient ice with your 6-year-old in crampons is an absurd and wonderful thing. The ice is vivid blue inside the crevasses. The silence is absolute except for wind. This is why you came to Iceland.',
    },
    {
      name: 'Whale breaching next to the boat at Húsavík',
      type: 'Wildlife encounter',
      detail:
        'When a humpback whale surfaces 10 metres from your wooden boat and exhales, the spray hits you and the sound is enormous. Your kids will be standing there with their mouths open. This is the wildlife moment of the trip.',
    },
  ],

  dontMiss: [
    {
      item: 'Gljúfrabúi waterfall',
      why: 'Secret cave waterfall 10 min walk from Seljalandsfoss. Almost nobody goes. You scramble through a narrow rock opening and suddenly a waterfall is inside a cave above you.',
    },
    {
      item: 'Diamond Beach at dawn or dusk',
      why: 'Icebergs washed up on black sand in raking light. Photographic and genuinely surreal. Five minutes from your glacier base camp.',
    },
    {
      item: 'Dimmuborgir at golden hour',
      why: 'The twisted lava towers turn orange and shadow at golden hour (which is basically all evening in July). Your kids can run loose through the labyrinth.',
    },
    {
      item: "Hofn's langoustine festival (late June/July)",
      why: 'If the timing aligns, Hofn hosts a langoustine festival with tastings, boats, and festivities. Check the dates — worth planning around.',
    },
    {
      item: 'Hallgrímskirkja tower elevator',
      why: "Most people photograph the church but don't take the elevator to the top. The view over Reykjavik is spectacular and it costs almost nothing.",
    },
    {
      item: 'Feed the birds at Tjörnin pond, Reykjavik',
      why: 'The city pond in central Reykjavik has ducks, geese, and swans that are completely tame. Buy birdseed (not bread) from nearby shops. Great for the 6-year-old on arrival day.',
    },
  ],

  souvenirsBuy: [
    {
      name: 'Lopapeysa (Icelandic wool sweater)',
      price: '$80–180',
      where: 'Rammagerðin, Handknitting Association of Iceland (Laugavegur), or direct from farms',
      why: 'Hand-knitted by Icelandic women using pure Icelandic wool. The circular yoke pattern is genuinely unique. Keeps you warm in the field for the rest of the trip. One of the few souvenirs that is both authentic and useful. Buy early — wear it the whole trip.',
    },
    {
      name: 'Nói Síríus Icelandic chocolate',
      price: '$4–8 per bar',
      where: 'Any Bónus or Krónan supermarket',
      why: "Iceland's beloved domestic chocolate brand. The blue wrapper milk chocolate bar has been made since 1920. Buy a dozen at the supermarket — far cheaper than tourist shops and just as good.",
    },
    {
      name: 'Icelandic sea salt (Saltverk)',
      price: '$12–18',
      where: 'Specialty shops in Reykjavik, or direct at the Westfjords',
      why: 'Handcrafted using geothermal energy in the Westfjords. Genuinely extraordinary salt, flaky and clean. The small tins are perfect gifts. Cooks back home will love it.',
    },
    {
      name: 'Lava jewelry or volcanic stone pieces',
      price: '$20–80',
      where: 'Reykjavik design shops — try Geysir or Kraum',
      why: 'Jewellery set with Icelandic obsidian, lava, or hekla stone. Genuinely made from local materials. Far more meaningful than generic tourist versions.',
    },
    {
      name: 'Icelandic wool blanket or throw',
      price: '$60–150',
      where: 'Rammagerðin or Handknitting Association',
      why: 'Pure Icelandic wool, impossibly warm, will outlast anything you own. The natural undyed colours — cream, grey, brown, black — are beautiful. A real heirloom piece.',
    },
    {
      name: 'Brennivín (Icelandic schnapps)',
      price: '$25–35',
      where: 'Vínbúðin (government liquor store) — only place alcohol is sold',
      why: "The Icelandic national spirit, caraway-flavoured, called 'Black Death.' The Reykjavik Vínbúðin has a good selection. A great gift for a liquor-drinking friend back home who has never heard of it.",
    },
    {
      name: "Children's picture books in Icelandic",
      price: '$10–20',
      where: 'Mál og Menning bookshop, Reykjavik',
      why: "An Icelandic picture book or saga for kids is a genuinely meaningful souvenir. Even if they can't read it, the illustrations are stunning and it connects them to the trip.",
    },
  ],

  souvenirAvoid: [
    {
      item: "Plastic Viking helmets and 'I Love Iceland' hoodies",
      why: 'Made in China, sold at inflated prices near tourist spots. Completely disconnected from anything Icelandic.',
    },
    {
      item: 'Airport duty-free chocolate',
      why: 'Keflavik airport charges roughly 3x the supermarket price for the same Nói Síríus bars. Buy at Bónus on Day 1 and bring them home in your luggage.',
    },
    {
      item: 'Puffin stuffed animals from tourist shops',
      why: 'Manufactured abroad. If the kids want puffin things, buy them at the Icelandic-made craft shops in Reykjavik, not the airport stalls.',
    },
    {
      item: 'Lopapeysa from a tourist shop that seems cheap',
      why: "Authentic hand-knitted lopapeysas cost $80+. If it's $25, it is not authentic Icelandic wool and not hand-knitted. Go to the Handknitting Association on Skólavörðustígur and buy the real thing.",
    },
    {
      item: 'Alcohol anywhere other than Vínbúðin',
      why: 'Alcohol is only sold legally at government Vínbúðin stores. Anything sold elsewhere is either illegal or massively overpriced duty-free. Find the store, buy there.',
    },
  ],
};

const desserts = {
  classics: [
    {
      name: 'Skyr',
      emoji: '🥛',
      what: "Iceland's iconic yogurt-like dessert. Thicker, creamier, less sour than Greek yogurt. Eaten plain or topped with berries and honey.",
      where:
        'Every supermarket (Bonus, Kronan) sells 20+ flavors. Try blueberry, vanilla, or caramel. Breakfast staple at every hotel.',
      kidTip:
        'Get them the vanilla or blueberry skyr cups from Bonus on day 1 — cheap, filling, healthy-ish breakfast for the apartment.',
    },
    {
      name: 'Skúffukaka',
      emoji: '🍫',
      what: "Iceland's national chocolate sheet cake. Moist, deeply chocolatey, topped with chocolate glaze and toasted coconut. Every Icelandic family has their own recipe. It's THE cake — served at every birthday, every gathering.",
      where:
        'Bernhöftsbakarí in Reykjavik has the most traditional version. Most bakeries on the Ring Road sell their own take. Sandholt in Reykjavik also excellent.',
      kidTip:
        'Dense, fudgy, chocolate-coconut — basically a brownie elevated. 6 and 9 year olds will demolish it. Pair with cold milk.',
    },
    {
      name: 'Kleina (Kleinur plural)',
      emoji: '🍩',
      what: 'Twisted, deep-fried dough knots flavored with cardamom. Slightly crisp outside, soft inside. The Icelandic donut, eaten with coffee or hot chocolate. 200+ years of history.',
      where:
        "Sandholt Bakery (Laugavegur), Bernhöftsbakarí. Or — fun fact — IKEA's kleinur are legitimately considered some of the best in Iceland by locals. The recipe is from an Icelandic grandmother.",
      kidTip:
        "Sweet, slightly crunchy, twisted shape that's fun to eat. Order a few — they disappear fast.",
    },
    {
      name: 'Snúður',
      emoji: '🧁',
      what: 'Icelandic cinnamon roll, but bigger and with a thick layer of chocolate, caramel, or pink glaze on top. Eat it by peeling apart the layers. Much more bready than American cinnamon rolls.',
      where:
        'Braud & Co (rainbow-painted storefront in Reykjavik) — the defining version. Also Sandholt. Available at most gas station bakeries across Iceland too.',
      kidTip:
        'The pink-glaze bleikt snúður is a kid magnet. Get a chocolate one for yourself. One is enough to share between 2 kids.',
    },
    {
      name: 'Pönnukökur',
      emoji: '🥞',
      what: 'Thin Icelandic pancakes/crepes, folded and filled with whipped cream and rhubarb jam, or rolled with sugar inside. More delicate than American pancakes.',
      where:
        "Kaffi Loki near Hallgrímskirkja in Reykjavik (traditional Icelandic food with pönnukökur on the menu). Mokka Kaffi (Reykjavik's oldest coffeehouse, since 1958) is iconic.",
      kidTip:
        "Order one to share between the kids — with whipped cream and jam they'll be thrilled. Adults: get one with sugar and lemon.",
    },
    {
      name: 'Hjónabandssæla',
      emoji: '🥧',
      what: "Literally 'marriage bliss' — a rhubarb or blueberry jam tart with a buttery oat crumble top. Dense, sweet, slightly tart. A bakery case staple.",
      where:
        'Braud & Co in Reykjavik. Most proper bakeries across Iceland. Café Vatnajökull near Skaftafell is a great stop after the glacier walk.',
      kidTip:
        'Kids love the crumble top. The rhubarb version is tart-sweet; blueberry is sweeter and a safer kid bet.',
    },
    {
      name: 'Vínarterta',
      emoji: '🎂',
      what: "Iceland's layered celebration cake — 5 to 7 thin almond cake layers sandwiched with sticky prune jam. Traditionally a Christmas cake but available year-round.",
      where:
        'Bernhöftsbakarí. Large bakeries in Reykjavik and Akureyri. Sliced thin — a little goes a long way.',
      kidTip:
        'More of an adult dessert — the prune filling is less kid-friendly. But show them a slice for the visual — the layers are striking.',
    },
    {
      name: 'Ástarpungar (Love Balls)',
      emoji: '🍪',
      what: "Deep-fried sweet dough balls studded with raisins. Denser than kleina, eaten warm with coffee. The name translates to 'love balls' which delights every English-speaking tourist.",
      where: 'Most Icelandic bakeries. Great warm on a cold morning.',
      kidTip:
        "Ball-shaped, sweet, fun name — your kids will request 'love balls' for weeks after you get home.",
    },
  ],
  iceCream: [
    {
      name: 'Brynja (Akureyri) — the pilgrimage spot',
      emoji: '🍦',
      what: "Akureyri's legendary soft-serve ice cream stand, open since 1939. Icelanders drive hours for it. The plain vanilla is the stuff of Icelandic childhood memories.",
      where: 'Aðalstræti 3, Akureyri. On foot from your log cabin base. Open late.',
      kidTip:
        'This is NON-NEGOTIABLE on your Akureyri day. Go. Get the dipped cone. The Icelandic soft-serve tradition is a real thing and this is its temple.',
    },
    {
      name: 'Valdís (Reykjavik)',
      emoji: '🍨',
      what: "Reykjavik's beloved ice cream shop. 20+ rotating flavors including licorice, rye bread, birch, sea salt caramel, and seasonal Icelandic berries.",
      where: 'Grandagarður 21, Reykjavik (Old Harbour area, very close to your apartment).',
      kidTip:
        'Let the kids pick the weirdest flavor they can find. Skip licorice (adult-only Icelandic specialty). The strawberry and vanilla are kid-safe winners.',
    },
    {
      name: 'Ísbúð Vesturbæjar (Reykjavik)',
      emoji: '🍦',
      what: "Classic neighborhood ice cream stand, locals' favorite. Soft-serve with every topping imaginable — chocolate dip, rainbow sprinkles, crushed Prins Póló (Iceland's favorite candy bar).",
      where: 'Hagamelur 67, Reykjavik. Walkable from Reykjavik Residence area.',
      kidTip: "Order 'brædingur' — soft serve with broken-up candy mixed in. Peak kid happiness.",
    },
    {
      name: 'Vinberið (Blonduos, drive day stop)',
      emoji: '🍨',
      what: 'Famous stop on the Akureyri-to-Snæfellsnes drive. Homemade ice cream plus full cafe menu. Legitimate road trip institution.',
      where:
        'Blonduos, right on Ring Road between Akureyri and Snæfellsnes. About halfway through your Day 10 drive.',
      kidTip:
        'Perfect break point on the long Day 10 drive. Proper lunch and ice cream in one stop.',
    },
    {
      name: 'Sveitasetrið Gamli Bær (near Vik)',
      emoji: '🍦',
      what: "Farm-based ice cream made from the dairy's own cows. Rare and special — farm-to-cone.",
      where: 'Just off Ring Road near Vik. Good stop on the way to the glacier zone.',
      kidTip:
        'Tell the kids the milk came from cows they can see from the window. Blows their minds.',
    },
  ],
  hotDrinks: [
    {
      name: 'Icelandic hot chocolate',
      emoji: '☕',
      what: 'Thicker and richer than American hot chocolate, usually topped with a pile of whipped cream. The post-waterfall reward.',
      where:
        'Every cafe. Notable: Mokka Kaffi (Reykjavik), Kaffi Ilmur (Akureyri), Café Loki (Reykjavik).',
      kidTip:
        'After a cold whale watching boat or a waterfall soaking, ordering hot chocolate is a tradition. Worth every krona.',
    },
    {
      name: 'Kakósúpa (chocolate soup)',
      emoji: '🍵',
      what: 'Literally chocolate soup — hot cocoa served as a dessert course with whipped cream. Icelandic school cafeteria classic many adults still crave.',
      where: 'Some traditional restaurants. Ask specifically — not every menu lists it.',
      kidTip:
        "Kids will lose their minds at 'chocolate soup.' If you see it on a menu, order it immediately.",
    },
  ],
  chocolate: [
    {
      name: 'Nói Síríus (grocery store chocolate)',
      emoji: '🍫',
      what: "Iceland's beloved national chocolate brand since 1933. Milk chocolate, hazelnut, rum raisin, licorice-filled. Cheap, delicious, ubiquitous.",
      where:
        'Every Bonus and Kronan grocery store. Stock up on Day 1. DO NOT buy at the airport — 3x the price.',
      kidTip:
        "Buy a handful of different bars for trip snacks. The milk chocolate 'Konsum' bars are the kid-safe classic.",
    },
    {
      name: 'Prins Póló',
      emoji: '🍫',
      what: "Polish wafer bar that became Iceland's unofficial national candy. Every Icelandic child grew up on these. Cheap, chocolatey, crispy.",
      where: 'Every gas station and grocery store.',
      kidTip: 'Trip snack essential. Pack a handful in the car.',
    },
    {
      name: 'Omnom Chocolate (artisan)',
      emoji: '🍫',
      what: 'Reykjavik-based bean-to-bar chocolate maker, internationally famous. Beautiful packaging, serious craft chocolate. Flavors like black and burnt barley, liquorice and sea salt, milk + caramel.',
      where:
        'Omnom factory store at Hólmaslóð 4, Reykjavik (worth a visit — free tasting). Also at Flying Tiger and gift shops.',
      kidTip:
        'Grown-up chocolate. Let the kids taste a square and keep the rest for yourself. The milk + caramel is kid-friendly.',
    },
  ],
  candy: [
    {
      name: "Nammi (pick 'n mix)",
      emoji: '🍬',
      what: "Every supermarket has a massive pick 'n mix candy wall with 50+ options. Saturday candy is an Icelandic tradition — locals call it 'laugardagsnammi.' Pay by weight.",
      where:
        'Bonus, Kronan, every grocery. Saturday afternoons especially busy with families doing their weekly candy run.',
      kidTip:
        'Give the kids a small bag each and let them pick their own. This is peak kid happiness. Avoid the salted licorice bins — that stuff is aggressive.',
    },
    {
      name: 'Lakkrís (Icelandic licorice)',
      emoji: '🖤',
      what: "Iceland's national sweet obsession. Salted licorice, chocolate-covered licorice, licorice-in-everything. An acquired taste — most adults love it, most kids hate it.",
      where: 'Everywhere. Djúpur is the legendary brand.',
      kidTip: 'Let them try ONE piece. They will make a face. You will now have a trip story.',
    },
    {
      name: 'Appolo Lakkrís (chocolate-covered licorice)',
      emoji: '🍬',
      what: 'Icelandic candy classic — soft licorice chunks coated in milk chocolate. The training-wheels version of Icelandic licorice for the rest of the world.',
      where: 'Any grocery store, gas station.',
      kidTip:
        'More kid-accessible than pure salted licorice. Start here if they want to try Icelandic candy.',
    },
  ],
  specialTreats: [
    {
      name: 'Reykjavik Roasters pastry + coffee',
      emoji: '☕',
      what: "Reykjavik's best coffee shop. Their pastry case rotates daily — cardamom buns, kanelbullar, cruffins, seasonal specials.",
      where: 'Kárastígur 1, Reykjavik. Small and always busy.',
      kidTip: 'Adult dessert destination, but the cardamom bun for the kids works.',
    },
    {
      name: 'Bæjarins Beztu Bryggjan Ice Cream',
      emoji: '🍦',
      what: 'Dip-cone soft-serve next door to the famous hot dog stand. Post-hot-dog tradition for Reykjavik families.',
      where: 'Tryggvagata, Old Harbour.',
      kidTip: 'Hot dog THEN ice cream. Full Reykjavik kid experience.',
    },
    {
      name: 'Gullfoss Kaffi rhubarb crumble',
      emoji: '🥧',
      what: 'At the Gullfoss waterfall visitor center on Golden Circle day — their hot rhubarb crumble with vanilla ice cream is reputedly the best in Iceland.',
      where: 'Gullfoss parking lot cafe. Right on your Day 3 route.',
      kidTip:
        'Perfect warm-up after the freezing waterfall mist. Share one between the whole family.',
    },
    {
      name: 'Hot fresh kleina from Almar Bakari',
      emoji: '🍩',
      what: 'Three locations along the South Ring Road (Hveragerði, Selfoss, Hella). Ring Road legend — hot kleinur straight from the fryer.',
      where: 'Almar Bakari, roadside. Right on your Day 5 South Coast drive.',
      kidTip:
        'Make this the first stop out of Reykjavik on South Coast day. Hot, sweet, warm kids = happy kids.',
    },
  ],
};

const TABS = [
  'Itinerary',
  'Hotels',
  'Budget',
  'Activities',
  'Packing',
  'Car + Driving',
  "Can't Miss",
  'Desserts',
  'Booking',
];

export default function IcelandGuide() {
  const [tab, setTab] = useState(0);
  const [openCamp, setOpenCamp] = useState(0);
  const [openDay, setOpenDay] = useState(null);
  const [checked, setChecked] = useState({});
  const [budgetMode, setBudgetMode] = useState('comfort');

  const toggle = (k) => setChecked((p) => ({ ...p, [k]: !p[k] }));

  const s = {
    page: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      background: '#080f1c',
      minHeight: '100vh',
      color: '#d0e8f4',
    },
    header: { padding: '30px 20px 18px', borderBottom: '1px solid #1a3040' },
    inner: { maxWidth: 820, margin: '0 auto' },
    eyebrow: {
      fontSize: 10,
      letterSpacing: 5,
      textTransform: 'uppercase',
      color: '#5aa8c4',
      marginBottom: 6,
    },
    h1: {
      margin: '0 0 4px',
      fontSize: 36,
      fontWeight: 'normal',
      color: '#fff',
      letterSpacing: '-0.5px',
    },
    sub: { margin: '0 0 14px', color: '#3a5a6a', fontSize: 13 },
    pillRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
    tabBar: {
      background: 'rgba(0,0,0,0.4)',
      borderBottom: '1px solid #1a3040',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    tabInner: { maxWidth: 820, margin: '0 auto', display: 'flex' },
    body: { maxWidth: 820, margin: '0 auto', padding: '20px 16px 60px' },
    intro: { color: '#3a5a6a', fontSize: 13, margin: '0 0 16px', lineHeight: 1.7 },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.inner}>
          <div style={s.eyebrow}>Iceland · Family of 4 · 4 Base Camps</div>
          <h1 style={s.h1}>Iceland — Jul 16–27, 2026</h1>
          <p style={s.sub}>
            MSY → BWI → KEF · Departs Jul 15 11:50am · Arrives KEF Jul 16 6:25am · Departs KEF Jul
            27 5:10pm · KEF → BNA → MSY · Arrives Jul 28 12:20am · 11 nights
          </p>
          <div style={s.pillRow}>
            {camps.map((c, i) => (
              <span
                key={i}
                style={{
                  background: '#0d2030',
                  border: '1px solid ' + CAMP_COLORS[i] + '40',
                  borderRadius: 20,
                  padding: '3px 12px',
                  fontSize: 11,
                  color: CAMP_COLORS[i],
                }}
              >
                {CAMP_ICONS[i]} {c.name} · {hotels[HOTEL_KEYS[i]].dates}
              </span>
            ))}
            <span
              style={{
                background: '#0d2030',
                border: '1px solid #c09030',
                borderRadius: 20,
                padding: '3px 12px',
                fontSize: 11,
                color: '#c09030',
              }}
            >
              ✈️ Fly Home · Jul 27
            </span>
          </div>
        </div>
      </div>

      <div style={s.tabBar}>
        <div style={s.tabInner}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: tab === i ? '2px solid #5aa8c4' : '2px solid transparent',
                color: tab === i ? '#5aa8c4' : '#2a5060',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'inherit',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={s.body}>
        {tab === 0 && (
          <div>
            <div
              style={{
                padding: '12px 14px',
                background: '#0d1a10',
                borderRadius: 9,
                border: '1px solid #2a4a30',
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#5a9068',
                  marginBottom: 4,
                }}
              >
                ✓ 11 Nights · 4 Base Camps · $6,371 Total Lodging
              </div>
              <div style={{ fontSize: 12, color: '#6a9878', lineHeight: 1.6 }}>
                Reykjavik (4) → Glacier (3) → Akureyri + Mývatn (2) → Snæfellsnes (2). All hotels
                booked. Day plans include real drive times, stop suggestions, and restaurant
                recommendations.
              </div>
            </div>
            <p style={s.intro}>
              4 hotels, 4 check-ins over 11 nights. Tap any camp or day to expand.
            </p>
            {camps.map((camp, ci) => {
              const color = CAMP_COLORS[ci];
              const hotel = hotels[HOTEL_KEYS[ci]];
              const isOpen = openCamp === ci;
              return (
                <div
                  key={ci}
                  style={{
                    marginBottom: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid ' + color + (isOpen ? '50' : '22'),
                  }}
                >
                  <button
                    onClick={() => {
                      setOpenCamp(isOpen ? -1 : ci);
                      setOpenDay(null);
                    }}
                    style={{
                      width: '100%',
                      background: '#0d1e28',
                      border: 'none',
                      padding: '15px 17px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontFamily: 'inherit',
                      color: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{CAMP_ICONS[ci]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, color: '#e8f4fa' }}>
                        Base Camp {ci + 1}: {camp.name}
                      </div>
                      <div style={{ fontSize: 11, color: color, marginTop: 2 }}>
                        {hotel.dates} — {hotel.name}
                      </div>
                    </div>
                    <span style={{ color: '#1e4050', fontSize: 13 }}>{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 13px 13px' }}>
                      <div
                        style={{
                          margin: '12px 0 10px',
                          padding: '11px 13px',
                          background: '#0a1820',
                          borderRadius: 8,
                          border: '1px solid #1a3040',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 10,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 9,
                              letterSpacing: 3,
                              textTransform: 'uppercase',
                              color: color,
                              marginBottom: 4,
                            }}
                          >
                            Your Hotel
                          </div>
                          <div style={{ fontSize: 14, color: '#d8f0f8' }}>{hotel.name}</div>
                          <div style={{ fontSize: 11, color: '#2a5060', marginTop: 2 }}>
                            {'★ ' +
                              hotel.rating +
                              ' · ' +
                              hotel.reviews +
                              ' reviews · ' +
                              hotel.price}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#4a7080',
                              marginTop: 3,
                              fontStyle: 'italic',
                            }}
                          >
                            {hotel.highlight}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <a
                            href={hotel.bookUrl}
                            style={{
                              background: '#0d2030',
                              border: '1px solid ' + color + '50',
                              borderRadius: 6,
                              padding: '6px 13px',
                              color: color,
                              fontSize: 12,
                              textDecoration: 'none',
                            }}
                          >
                            Booking.com
                          </a>
                          <a
                            href={hotel.directUrl}
                            style={{
                              background: 'transparent',
                              border: '1px solid #1a3040',
                              borderRadius: 6,
                              padding: '6px 13px',
                              color: '#3a6070',
                              fontSize: 12,
                              textDecoration: 'none',
                            }}
                          >
                            Direct site
                          </a>
                        </div>
                      </div>

                      {(() => {
                        const guide = campGuides[HOTEL_KEYS[ci]];
                        if (!guide) return null;
                        return (
                          <div
                            style={{
                              marginBottom: 14,
                              padding: '13px 14px',
                              background: '#080f18',
                              borderRadius: 8,
                              border: '1px solid ' + color + '25',
                            }}
                          >
                            <div
                              style={{
                                fontSize: 12,
                                color: '#80a8b8',
                                lineHeight: 1.6,
                                fontStyle: 'italic',
                                marginBottom: 12,
                              }}
                            >
                              {guide.summary}
                            </div>

                            <div
                              style={{
                                fontSize: 9,
                                letterSpacing: 3,
                                textTransform: 'uppercase',
                                color: color,
                                marginBottom: 7,
                              }}
                            >
                              Also in the Area
                            </div>
                            {guide.extras.map((e, ei) => (
                              <div
                                key={ei}
                                style={{
                                  marginBottom: 7,
                                  padding: '8px 10px',
                                  background: '#0a1820',
                                  borderRadius: 6,
                                  border: '1px solid #1a2a30',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginBottom: 3,
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  <span style={{ fontSize: 12, color: '#d8f0f8' }}>{e.name}</span>
                                  <span
                                    style={{
                                      background: '#0d2030',
                                      border: '1px solid ' + color + '40',
                                      borderRadius: 4,
                                      padding: '1px 7px',
                                      fontSize: 9,
                                      color: color,
                                    }}
                                  >
                                    {e.priority}
                                  </span>
                                </div>
                                <div style={{ fontSize: 11, color: '#6a8a9a', lineHeight: 1.55 }}>
                                  {e.note}
                                </div>
                              </div>
                            ))}

                            <div
                              style={{
                                fontSize: 9,
                                letterSpacing: 3,
                                textTransform: 'uppercase',
                                color: color,
                                margin: '13px 0 7px',
                              }}
                            >
                              Where to Eat
                            </div>
                            {guide.food.map((f, fi) => (
                              <div
                                key={fi}
                                style={{
                                  marginBottom: 7,
                                  padding: '8px 10px',
                                  background: '#0a1820',
                                  borderRadius: 6,
                                  border: '1px solid #1a2a30',
                                }}
                              >
                                <div style={{ fontSize: 12, color: '#d8f0f8', marginBottom: 2 }}>
                                  {f.name}
                                </div>
                                <div style={{ fontSize: 10, color: '#3a6070', marginBottom: 3 }}>
                                  📍 {f.where}
                                </div>
                                <div style={{ fontSize: 11, color: '#6a8a9a', lineHeight: 1.55 }}>
                                  {f.note}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {camp.days.map((day, di) => {
                        const dk = ci + '-' + di;
                        const isDayOpen = openDay === dk;
                        return (
                          <div
                            key={di}
                            style={{
                              marginBottom: 6,
                              borderRadius: 7,
                              overflow: 'hidden',
                              border: isDayOpen ? '1px solid ' + color + '40' : '1px solid #1a2a30',
                              background: isDayOpen ? '#0a1820' : '#090f18',
                            }}
                          >
                            <button
                              onClick={() => setOpenDay(isDayOpen ? null : dk)}
                              style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                padding: '10px 13px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontFamily: 'inherit',
                                color: 'inherit',
                              }}
                            >
                              <div
                                style={{
                                  background: '#0d2030',
                                  border: '1px solid ' + color + '40',
                                  borderRadius: '50%',
                                  width: 26,
                                  height: 26,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 10,
                                  color: color,
                                  flexShrink: 0,
                                }}
                              >
                                {'D' + day.n}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: '#c0e0f0' }}>
                                  <span style={{ color: '#2a5060', marginRight: 6 }}>
                                    {day.date}
                                  </span>
                                  {day.title}
                                </div>
                              </div>
                              <span style={{ color: '#1a3040', fontSize: 12 }}>
                                {isDayOpen ? '▲' : '▼'}
                              </span>
                            </button>
                            {isDayOpen && (
                              <div
                                style={{ padding: '0 13px 13px', borderTop: '1px solid #1a2a30' }}
                              >
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: '#2a5060',
                                    padding: '8px 0 9px',
                                    borderBottom: '1px solid #1a2a30',
                                  }}
                                >
                                  {'🚗 ' + day.drive}
                                </div>
                                <div
                                  style={{
                                    fontSize: 9,
                                    letterSpacing: 3,
                                    textTransform: 'uppercase',
                                    color: color,
                                    margin: '9px 0 6px',
                                  }}
                                >
                                  Day Plan
                                </div>
                                {day.plan.map((p, pi) => (
                                  <div
                                    key={pi}
                                    style={{
                                      display: 'flex',
                                      gap: 7,
                                      marginBottom: 5,
                                      fontSize: 12,
                                      color: '#90b8c8',
                                      lineHeight: 1.55,
                                    }}
                                  >
                                    <span style={{ color: '#1a4050', flexShrink: 0 }}>→</span>
                                    <span>{p}</span>
                                  </div>
                                ))}
                                {day.creatures.length > 0 && (
                                  <div
                                    style={{
                                      margin: '10px 0 7px',
                                      padding: '9px 11px',
                                      background: '#0a1820',
                                      borderRadius: 6,
                                      border: '1px solid #1a3040',
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: 9,
                                        letterSpacing: 3,
                                        textTransform: 'uppercase',
                                        color: '#5aa8c4',
                                        marginBottom: 5,
                                      }}
                                    >
                                      Wildlife Today
                                    </div>
                                    {day.creatures.map((c, i) => (
                                      <div
                                        key={i}
                                        style={{ fontSize: 12, color: '#6a9aaa', marginBottom: 3 }}
                                      >
                                        {c}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div
                                  style={{
                                    marginTop: 8,
                                    padding: '9px 11px',
                                    background: '#0a1410',
                                    borderRadius: 6,
                                    borderLeft: '3px solid #705020',
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 9,
                                      letterSpacing: 3,
                                      textTransform: 'uppercase',
                                      color: '#906020',
                                      marginBottom: 4,
                                    }}
                                  >
                                    Pro Tip
                                  </div>
                                  <div style={{ fontSize: 11, color: '#806030', lineHeight: 1.6 }}>
                                    {day.tip}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid ' + (openDay === 'final' ? '#c09030' : '#302010'),
              }}
            >
              <button
                onClick={() => setOpenDay(openDay === 'final' ? null : 'final')}
                style={{
                  width: '100%',
                  background: '#0d1810',
                  border: 'none',
                  padding: '15px 17px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'inherit',
                  color: 'inherit',
                }}
              >
                <span style={{ fontSize: 22 }}>✈️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: '#e8f4fa' }}>Day 12 — Fly Home</div>
                  <div style={{ fontSize: 11, color: '#c09030', marginTop: 2 }}>
                    {finalDay.date} · Borgarnes lunch, then KEF 5:10pm flight
                  </div>
                </div>
                <span style={{ color: '#302010', fontSize: 13 }}>
                  {openDay === 'final' ? '▲' : '▼'}
                </span>
              </button>
              {openDay === 'final' && (
                <div style={{ padding: '0 15px 15px', borderTop: '1px solid #302010' }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#2a5060',
                      padding: '8px 0 9px',
                      borderBottom: '1px solid #1a2a30',
                    }}
                  >
                    {'🚗 ' + finalDay.drive}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: '#c09030',
                      margin: '9px 0 6px',
                    }}
                  >
                    Day Plan
                  </div>
                  {finalDay.plan.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 7,
                        marginBottom: 5,
                        fontSize: 12,
                        color: '#90b8c8',
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ color: '#503010', flexShrink: 0 }}>→</span>
                      <span>{p}</span>
                    </div>
                  ))}
                  <div
                    style={{
                      margin: '10px 0 7px',
                      padding: '9px 11px',
                      background: '#0a1820',
                      borderRadius: 6,
                      border: '1px solid #1a3040',
                    }}
                  >
                    {finalDay.creatures.map((c, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#6a9aaa' }}>
                        {c}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      padding: '9px 11px',
                      background: '#0a1410',
                      borderRadius: 6,
                      borderLeft: '3px solid #705020',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        color: '#906020',
                        marginBottom: 4,
                      }}
                    >
                      Pro Tip
                    </div>
                    <div style={{ fontSize: 11, color: '#806030', lineHeight: 1.6 }}>
                      {finalDay.tip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <p style={s.intro}>
              4 hotels total. Book in this order — glacier zone first, it sells out soonest.
            </p>
            {HOTEL_KEYS.map((key, i) => {
              const h = hotels[key];
              const color = CAMP_COLORS[i];
              return (
                <div
                  key={key}
                  style={{
                    marginBottom: 12,
                    background: '#0a1820',
                    border: '1px solid #1a3040',
                    borderRadius: 10,
                    padding: '16px 16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 12,
                      flexWrap: 'wrap',
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 9,
                          letterSpacing: 3,
                          textTransform: 'uppercase',
                          color: color,
                          marginBottom: 4,
                        }}
                      >
                        {CAMP_ICONS[i]} Base Camp {i + 1} · {h.dates}
                      </div>
                      <div style={{ fontSize: 16, color: '#d8f0f8' }}>{h.name}</div>
                      <div style={{ fontSize: 11, color: '#2a5060', marginTop: 3 }}>
                        {'★ ' + h.rating + ' (' + h.reviews + ' reviews) · ' + h.price}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <a
                        href={h.bookUrl}
                        style={{
                          background: '#0d2030',
                          border: '1px solid ' + color + '50',
                          borderRadius: 6,
                          padding: '7px 14px',
                          color: color,
                          fontSize: 12,
                          textDecoration: 'none',
                        }}
                      >
                        Booking.com →
                      </a>
                      <a
                        href={h.directUrl}
                        style={{
                          border: '1px solid #1a3040',
                          borderRadius: 6,
                          padding: '7px 14px',
                          color: '#3a6070',
                          fontSize: 12,
                          textDecoration: 'none',
                          background: 'transparent',
                        }}
                      >
                        Direct site →
                      </a>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      background: '#080f18',
                      borderRadius: 7,
                      border: '1px solid #1a2a30',
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ fontSize: 12, color: '#6a9aaa', lineHeight: 1.6 }}>{h.why}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        background: '#0d2030',
                        border: '1px solid ' + color + '35',
                        borderRadius: 6,
                        padding: '3px 10px',
                        fontSize: 11,
                        color: color,
                      }}
                    >
                      {h.highlight}
                    </span>
                    <span style={{ fontSize: 11, color: '#2a5060' }}>{h.phone}</span>
                  </div>
                </div>
              );
            })}
            <div
              style={{
                padding: '12px 14px',
                background: '#120808',
                borderRadius: 9,
                border: '1px solid #401010',
              }}
            >
              <div style={{ fontSize: 13, color: '#d06050', lineHeight: 1.7 }}>
                Booking priority: Hotel Jokulsarlon (glacier zone) first — this sells out months
                ahead for July. Its available dates anchor the whole trip. Open that link right now.
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div>
            <p style={s.intro}>Toggle between Comfort and Go Big to see the full cost breakdown.</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {['comfort', 'goBig'].map((m) => (
                <button
                  key={m}
                  onClick={() => setBudgetMode(m)}
                  style={{
                    background: budgetMode === m ? '#0d2030' : 'transparent',
                    border: '1px solid ' + (budgetMode === m ? '#5aa8c4' : '#1a3040'),
                    borderRadius: 7,
                    padding: '9px 18px',
                    color: budgetMode === m ? '#5aa8c4' : '#2a5060',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                >
                  {m === 'comfort' ? 'Comfort' : 'Go Big'}
                </button>
              ))}
            </div>
            {(() => {
              const total = budgetLines.reduce((sum, l) => sum + l[budgetMode], 0);
              return (
                <div>
                  <div
                    style={{
                      background: '#0a1820',
                      border: '1px solid #1a3040',
                      borderRadius: 10,
                      padding: '18px 20px',
                      marginBottom: 20,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 4,
                          textTransform: 'uppercase',
                          color: '#5aa8c4',
                        }}
                      >
                        Estimated Total
                      </div>
                      <div style={{ fontSize: 34, color: '#fff', marginTop: 4 }}>
                        {'$' + total.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 11, color: '#2a5060', marginTop: 3 }}>
                        Family of 4 · 12 days · July · All-in including flights
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: '#4a8090' }}>
                        Per person:{' '}
                        <span style={{ color: '#5aa8c4' }}>
                          {'$' + Math.round(total / 4).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#4a8090', marginTop: 4 }}>
                        Per day (family):{' '}
                        <span style={{ color: '#5aa8c4' }}>
                          {'$' + Math.round(total / 12).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {budgetLines.map((line, i) => {
                    const val = line[budgetMode];
                    const pct = Math.round((val / total) * 100);
                    return (
                      <div key={i} style={{ marginBottom: 13 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                            fontSize: 13,
                          }}
                        >
                          <span style={{ color: '#90b8c8' }}>{line.label}</span>
                          <span style={{ color: '#5aa8c4' }}>{'$' + val.toLocaleString()}</span>
                        </div>
                        <div style={{ height: 5, background: '#0d1820', borderRadius: 3 }}>
                          <div
                            style={{
                              height: '100%',
                              width: pct + '%',
                              background: '#1e6080',
                              borderRadius: 3,
                            }}
                          />
                        </div>
                        <div style={{ fontSize: 10, color: '#1a4050', marginTop: 2 }}>
                          {pct + '% of total'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
            <div
              style={{
                marginTop: 20,
                background: '#0a1408',
                borderRadius: 9,
                padding: '14px 16px',
                border: '1px solid #1a3010',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#608030',
                  marginBottom: 10,
                }}
              >
                Save $800 to 1,500
              </div>
              {[
                'Use accommodation kitchens for breakfast and lunch every day — saves $600 to 800 vs eating out every meal.',
                'Big grocery run at Bonus on Day 1. Cheapest supermarket in Iceland.',
                "Iceland's best stuff is free: every waterfall, every beach, every viewpoint, every roadside reindeer.",
                'Fill water bottles from the tap — Icelandic water is glacier-fed, never buy bottled.',
                'Return rental car with full tank — companies charge 2 to 3x market rate to fill it.',
                'Kids under 12 free at Myvatn Nature Baths — saves $76 right there.',
              ].map((tip, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 6,
                    fontSize: 12,
                    color: '#507030',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ flexShrink: 0 }}>→</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 3 && (
          <div>
            <p style={s.intro}>
              Activity total estimate: $2,500 to $4,000 for the family. Every major paid activity
              plus a full list of free ones.
            </p>
            {activities.map((a, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a2a30',
                  borderRadius: 8,
                  padding: '11px 14px',
                  marginBottom: 7,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 11 }}>{a.priority ? '⭐' : '✅'}</span>
                    <span style={{ fontSize: 13, color: '#c0e0f0' }}>{a.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#2a5060', marginBottom: 2 }}>
                    {'📍 ' + a.location + ' · ⏱ ' + a.duration}
                  </div>
                  <div style={{ fontSize: 11, color: '#3a6070' }}>{'Book: ' + a.book}</div>
                </div>
                <div
                  style={{
                    background: '#0d2030',
                    border: '1px solid #1e4050',
                    borderRadius: 6,
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 11, color: '#5aa8c4' }}>{a.price}</div>
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: 10,
                padding: '13px 14px',
                background: '#0a1408',
                borderRadius: 8,
                border: '1px solid #1a3010',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#608030',
                  marginBottom: 8,
                }}
              >
                Free — Just Show Up
              </div>
              {freeAttractions.map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    color: '#507030',
                    marginBottom: 4,
                    paddingLeft: 12,
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0 }}>·</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 4 && (
          <div>
            {Object.entries(packingList).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: '#5aa8c4',
                    marginBottom: 9,
                    paddingBottom: 5,
                    borderBottom: '1px solid #1a2a30',
                  }}
                >
                  {cat}
                </div>
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 9,
                      fontSize: 13,
                      color: '#80a8b8',
                      lineHeight: 1.5,
                      marginBottom: 7,
                    }}
                  >
                    <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
            <div
              style={{
                background: '#0a1408',
                borderRadius: 8,
                padding: '13px 14px',
                border: '1px solid #1a3010',
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 12, color: '#508030', fontStyle: 'italic', lineHeight: 1.7 }}>
                July averages 10 to 14C (50 to 57F). Feels cold on whale boats and glaciers
                regardless of sunshine. Layering is the system — you will strip and re-dress
                multiple times each day. The kids will be wet at every waterfall whether they want
                to be or not.
              </div>
            </div>

            {/* PRINT CHECKLIST */}
            <div style={{ fontSize: 14, color: '#d8f0f8', marginBottom: 4, marginTop: 8 }}>
              📄 Documents to Print + Bring
            </div>
            <div style={{ fontSize: 11, color: '#5a7888', marginBottom: 18, lineHeight: 1.55 }}>
              Iceland is largely paperless but redundancy is cheap insurance. Print the items below,
              put them in a labeled folder. Hai carries the originals; Linda carries copies of the
              same set in a separate bag.
            </div>

            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#b56a3a',
                marginBottom: 9,
                paddingBottom: 5,
                borderBottom: '1px solid #2a1a0c',
              }}
            >
              Must Print
            </div>
            {printChecklist.mustPrint.map((doc, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  padding: '9px 11px',
                  background: '#0a1820',
                  borderRadius: 7,
                  border: '1px solid #1a2a30',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                  <span style={{ fontSize: 13, color: '#d8f0f8' }}>{doc.item}</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6a8a9a',
                    lineHeight: 1.55,
                    marginLeft: 17,
                    marginBottom: 4,
                  }}
                >
                  {doc.detail}
                </div>
                <div
                  style={{ fontSize: 10, color: '#3a6070', marginLeft: 17, fontStyle: 'italic' }}
                >
                  📍 {doc.source}
                </div>
              </div>
            ))}

            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '20px 0 9px',
                paddingBottom: 5,
                borderBottom: '1px solid #1a2a30',
              }}
            >
              Smart Backups (highly recommended)
            </div>
            {printChecklist.niceToBackup.map((doc, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  padding: '9px 11px',
                  background: '#0a1820',
                  borderRadius: 7,
                  border: '1px solid #1a2a30',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                  <span style={{ fontSize: 13, color: '#d8f0f8' }}>{doc.item}</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6a8a9a',
                    lineHeight: 1.55,
                    marginLeft: 17,
                    marginBottom: 4,
                  }}
                >
                  {doc.detail}
                </div>
                <div
                  style={{ fontSize: 10, color: '#3a6070', marginLeft: 17, fontStyle: 'italic' }}
                >
                  📍 {doc.source}
                </div>
              </div>
            ))}

            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#c09060',
                margin: '20px 0 9px',
                paddingBottom: 5,
                borderBottom: '1px solid #2a200c',
              }}
            >
              Once You Book Remaining Tours
            </div>
            {printChecklist.toursBookedLater.map((doc, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  padding: '9px 11px',
                  background: '#0a1820',
                  borderRadius: 7,
                  border: '1px solid #1a2a30',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                  <span style={{ fontSize: 13, color: '#d8f0f8' }}>{doc.item}</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6a8a9a',
                    lineHeight: 1.55,
                    marginLeft: 17,
                    marginBottom: 4,
                  }}
                >
                  {doc.detail}
                </div>
                <div
                  style={{ fontSize: 10, color: '#3a6070', marginLeft: 17, fontStyle: 'italic' }}
                >
                  📍 {doc.source}
                </div>
              </div>
            ))}

            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#7a8aa0',
                margin: '20px 0 9px',
                paddingBottom: 5,
                borderBottom: '1px solid #1a2a30',
              }}
            >
              Digital Only (no print needed)
            </div>
            {printChecklist.digitalOnly.map((doc, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  padding: '8px 11px',
                  background: '#0a1820',
                  borderRadius: 7,
                  border: '1px solid #1a2a30',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 3 }}>
                  <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                  <span style={{ fontSize: 13, color: '#d8f0f8' }}>{doc.item}</span>
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', lineHeight: 1.55, marginLeft: 17 }}>
                  {doc.detail}
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: 22,
                padding: '13px 14px',
                background: '#1a1408',
                borderRadius: 9,
                border: '1px solid #3a2810',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#c09060',
                  marginBottom: 6,
                }}
              >
                📁 The Travel Folder System
              </div>
              <div style={{ fontSize: 12, color: '#a08060', lineHeight: 1.7 }}>
                Use a slim plastic folder with two compartments. Front pocket: passports + boarding
                passes (active travel docs). Back pocket: everything else (hotel confirmations,
                insurance, rental car, tour tickets). Hai keeps the master folder. Linda keeps a
                duplicate in her bag. Take photos of everything inside before leaving home — if both
                physical sets are lost, you still have phone backups.
              </div>
            </div>
          </div>
        )}

        {tab === 5 && (
          <div>
            <p style={s.intro}>
              Everything you need to know before picking up your keys — your booking, insurance,
              rules, and apps.
            </p>

            {/* COMPANIES */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 10,
              }}
            >
              Your Rental Booking
            </div>
            {carCompanies.map((c, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a3040',
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 15, color: '#d8f0f8' }}>{c.name}</span>
                      <span
                        style={{
                          background: '#0d2030',
                          border: '1px solid ' + c.tagColor + '40',
                          borderRadius: 5,
                          padding: '2px 8px',
                          fontSize: 10,
                          color: c.tagColor,
                        }}
                      >
                        {c.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#2a5060' }}>
                      {'★ ' + c.rating + ' · ' + c.reviews + ' reviews · ' + c.fleet}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      alignItems: 'flex-end',
                    }}
                  >
                    <a
                      href={c.url}
                      style={{
                        background: '#0d2030',
                        border: '1px solid ' + c.tagColor + '40',
                        borderRadius: 6,
                        padding: '6px 13px',
                        color: c.tagColor,
                        fontSize: 12,
                        textDecoration: 'none',
                      }}
                    >
                      Book direct →
                    </a>
                    <span style={{ fontSize: 11, color: '#2a5060' }}>{c.priceRange}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#6a9aaa', lineHeight: 1.6 }}>{c.notes}</div>
              </div>
            ))}

            {/* WHAT TO RENT */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 10,
              }}
            >
              Your Rental — Toyota RAV4 (Lotus)
            </div>
            <div
              style={{
                background: '#0a1820',
                border: '1px solid #1a3040',
                borderRadius: 10,
                padding: '14px 16px',
                marginBottom: 22,
              }}
            >
              {[
                [
                  'Vehicle',
                  'Toyota RAV4 2022-25 — 5-seat AWD SUV, automatic. Booking 2QFX7V. Total: 404,636 ISK (~$2,945) including Linda as additional driver + Roadside Assistance.',
                ],
                [
                  'Insurance',
                  'Platinum Insurance — ZERO excess on everything. Covers CDW, SCDW, Theft, Gravel, Sand & Ash, Tire, River Crossing, F-Road, Animal Damage. Towing has 35,000 ISK deductible. Wind door damage still not covered (be careful).',
                ],
                [
                  'Extras included',
                  'GPS, 4G WiFi in car (free), Cheaper fuel discount card, Unlimited mileage, Road Tax, Admin fee. Online check-in opens 7 days before pickup (Jul 9).',
                ],
                [
                  'Kids',
                  '1 booster seat (Hailey) + 1 Child Seat 15-36 kg / high-back booster (Lucas)',
                ],
                [
                  'Pickup',
                  'Jul 16 at 8:30am — KEF shuttle stop after exiting Arrivals. Shared shuttle runs 5am-6pm. 2-hr buffer from your 6:25am landing.',
                ],
                [
                  'Drop-off',
                  'Jul 27 at 2:00pm — same KEF location. 3+ hr buffer before 5:10pm flight.',
                ],
                ['Contact', 'lotus@lotuscarrental.is · +354 787 4444. Save this number.'],
              ].map(([label, detail], i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 10,
                    paddingBottom: 10,
                    borderBottom: i < 6 ? '1px solid #1a2a30' : 'none',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#5aa8c4', minWidth: 130, flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 12, color: '#80a8b8', lineHeight: 1.6 }}>{detail}</span>
                </div>
              ))}
            </div>

            {/* INSURANCE */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 10,
              }}
            >
              Your Insurance Coverage
            </div>
            <div
              style={{
                padding: '12px 14px',
                background: '#0d1a10',
                borderRadius: 9,
                border: '1px solid #2a4a30',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#5a9068',
                  marginBottom: 4,
                }}
              >
                ✓ Lotus Platinum — Zero Excess on Everything
              </div>
              <div style={{ fontSize: 12, color: '#6a9878', lineHeight: 1.6 }}>
                You are fully covered. Nothing below is an action item — this is a reference for
                what Platinum includes versus the two things it doesn't cover (wind doors +
                off-road, neither of which applies to your route).
              </div>
            </div>
            {insuranceItems.map((ins, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a2a30',
                  borderRadius: 8,
                  padding: '11px 14px',
                  marginBottom: 7,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    background: '#0d2030',
                    border: '1px solid ' + ins.color + '40',
                    borderRadius: 5,
                    padding: '3px 8px',
                    fontSize: 10,
                    color: ins.color,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {ins.verdict}
                </span>
                <div>
                  <div style={{ fontSize: 13, color: '#c0e0f0', marginBottom: 3 }}>{ins.name}</div>
                  <div style={{ fontSize: 11, color: '#507080', lineHeight: 1.6 }}>
                    {ins.detail}
                  </div>
                </div>
              </div>
            ))}

            {/* SPEED LIMITS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 10px',
              }}
            >
              Speed Limits
            </div>
            <div
              style={{
                background: '#0a1820',
                border: '1px solid #1a3040',
                borderRadius: 10,
                overflow: 'hidden',
                marginBottom: 22,
              }}
            >
              {speedLimits.map((s2, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: i < speedLimits.length - 1 ? '1px solid #1a2a30' : 'none',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#80a8b8' }}>{s2.type}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 14, color: '#5aa8c4', fontWeight: 500 }}>
                      {s2.limit}
                    </span>
                    <span style={{ fontSize: 11, color: '#2a5060', marginLeft: 8 }}>{s2.mph}</span>
                  </div>
                </div>
              ))}
              <div
                style={{
                  padding: '10px 14px',
                  background: '#120808',
                  borderTop: '1px solid #1a2a30',
                }}
              >
                <div style={{ fontSize: 11, color: '#b05040', lineHeight: 1.6 }}>
                  Speed cameras are widespread including remote areas. Fines are steep — 20 km/h
                  over the limit = ISK 50,000+ (~$330). Fines are charged directly to your rental
                  car credit card.
                </div>
              </div>
            </div>

            {/* DRIVING RULES */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 10,
              }}
            >
              Rules + Things That Will Surprise You
            </div>
            <div style={{ display: 'grid', gap: 7, marginBottom: 22 }}>
              {drivingRules.map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: '#0a1820',
                    border: '1px solid #1a2a30',
                    borderRadius: 8,
                    padding: '10px 13px',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: '#c0e0f0', marginBottom: 2 }}>{r.rule}</div>
                    <div style={{ fontSize: 11, color: '#507080', lineHeight: 1.6 }}>
                      {r.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* APPS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 10,
              }}
            >
              Apps to Download Before You Fly
            </div>
            {apps.map((app, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                  padding: '10px 12px',
                  background: '#0a1820',
                  borderRadius: 8,
                  border: '1px solid #1a2a30',
                }}
              >
                <span
                  style={{
                    background: app.essential ? '#0d2030' : '#080f18',
                    border: '1px solid ' + (app.essential ? '#5aa8c4' : '#1a2a30') + '40',
                    borderRadius: 5,
                    padding: '2px 7px',
                    fontSize: 10,
                    color: app.essential ? '#5aa8c4' : '#3a5060',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {app.essential ? 'Essential' : 'Backup'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: '#c0e0f0', marginBottom: 2 }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: '#507080', lineHeight: 1.5 }}>{app.use}</div>
                </div>
                <a
                  href={app.url}
                  style={{
                    fontSize: 11,
                    color: '#5aa8c4',
                    textDecoration: 'none',
                    paddingTop: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Open →
                </a>
              </div>
            ))}

            {/* CAR SEAT RULES */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 10px',
              }}
            >
              Car Seats — Icelandic Law
            </div>
            <div
              style={{
                padding: '14px 16px',
                background: '#1a1408',
                borderRadius: 9,
                border: '1px solid #3a2810',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: '#c0a058',
                  lineHeight: 1.6,
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                {carSeatRules.rule}
              </div>
              {carSeatRules.yourKids.map((kid, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 10,
                    padding: '10px 12px',
                    background: '#100a04',
                    borderRadius: 7,
                    border: '1px solid #2a1a08',
                  }}
                >
                  <div style={{ fontSize: 12, color: '#e0b068', marginBottom: 3, fontWeight: 600 }}>
                    {kid.age} — {kid.action}
                  </div>
                  <div style={{ fontSize: 12, color: '#a08058', lineHeight: 1.6 }}>
                    {kid.detail}
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: 10,
                  padding: '10px 12px',
                  background: '#200808',
                  borderRadius: 7,
                  border: '1px solid #601010',
                }}
              >
                <div style={{ fontSize: 12, color: '#d06050', lineHeight: 1.6 }}>
                  ⚠ {carSeatRules.dontDo}
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                  padding: '10px 12px',
                  background: '#081810',
                  borderRadius: 7,
                  border: '1px solid #1a4028',
                }}
              >
                <div style={{ fontSize: 12, color: '#60a078', lineHeight: 1.6 }}>
                  ✓ {carSeatRules.whatToDo}
                </div>
              </div>
            </div>

            {/* PICKUP CHECKLIST */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 10px',
              }}
            >
              At Lotus Pickup — Jul 16, 8:30am
            </div>
            {carPickupChecklist.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 9,
                  fontSize: 13,
                  color: '#80a8b8',
                  lineHeight: 1.5,
                  marginBottom: 7,
                  padding: '8px 12px',
                  background: '#0a1820',
                  borderRadius: 7,
                  border: '1px solid #1a2a30',
                }}
              >
                <span style={{ color: '#1a3040', flexShrink: 0, marginTop: 2 }}>□</span>
                <span>{item}</span>
              </div>
            ))}

            {/* FUEL */}
            <div
              style={{
                marginTop: 20,
                padding: '14px 16px',
                background: '#0a1408',
                borderRadius: 9,
                border: '1px solid #1a3010',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#608030',
                  marginBottom: 8,
                }}
              >
                Fuel
              </div>
              <div style={{ fontSize: 12, color: '#508030', lineHeight: 1.7 }}>
                Fuel costs roughly $9.50 to $10.50 per US gallon — about double US prices. Fill up
                whenever your tank drops below half. Gaps between stations can be 200 km in the East
                Fjords. Most stations accept credit cards including unmanned self-service ones.
                Return the car with a full tank — rental companies charge 2 to 3x market rate to
                refuel it themselves.
              </div>
            </div>
          </div>
        )}

        {tab === 6 && (
          <div>
            <p style={s.intro}>
              The food you must eat, the moments you must not rush past, the things worth buying,
              and the tourist traps to skip.
            </p>

            {/* FOOD */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                marginBottom: 12,
              }}
            >
              Food — What to Eat in Iceland
            </div>
            {cantMiss.food.map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a2a30',
                  borderRadius: 9,
                  padding: '13px 15px',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {f.mustTry && (
                      <span
                        style={{
                          background: '#0d2030',
                          border: '1px solid #5aa8c4',
                          borderRadius: 5,
                          padding: '2px 7px',
                          fontSize: 9,
                          color: '#5aa8c4',
                          flexShrink: 0,
                        }}
                      >
                        Must Try
                      </span>
                    )}
                    <span style={{ fontSize: 14, color: '#d8f0f8' }}>{f.name}</span>
                  </div>
                  <span
                    style={{ fontSize: 12, color: '#5aa8c4', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {f.price}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#2a5060', marginBottom: 5 }}>
                  {'📍 ' + f.where}
                </div>
                <div style={{ fontSize: 12, color: '#6a9aaa', lineHeight: 1.6 }}>{f.verdict}</div>
              </div>
            ))}

            {/* EXPERIENCES */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Experiences — Do Not Rush Past These
            </div>
            {cantMiss.experiences.map((e, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a2a30',
                  borderRadius: 9,
                  padding: '13px 15px',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}
                >
                  <span
                    style={{
                      background: '#0d2030',
                      border: '1px solid #8a6aa8',
                      borderRadius: 5,
                      padding: '2px 7px',
                      fontSize: 9,
                      color: '#8a6aa8',
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {e.type}
                  </span>
                  <span style={{ fontSize: 14, color: '#d8f0f8' }}>{e.name}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6a9aaa', lineHeight: 1.6 }}>{e.detail}</div>
              </div>
            ))}

            {/* HIDDEN GEMS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Easy Wins — Things Most Tourists Miss
            </div>
            {cantMiss.dontMiss.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                  padding: '10px 13px',
                  background: '#0a1820',
                  borderRadius: 8,
                  border: '1px solid #1a2a30',
                }}
              >
                <span style={{ color: '#b56a3a', flexShrink: 0, marginTop: 2 }}>→</span>
                <div>
                  <div style={{ fontSize: 13, color: '#c0e0f0', marginBottom: 2 }}>{d.item}</div>
                  <div style={{ fontSize: 11, color: '#507080', lineHeight: 1.5 }}>{d.why}</div>
                </div>
              </div>
            ))}

            {/* SOUVENIRS — BUY */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Souvenirs — What to Buy
            </div>
            {cantMiss.souvenirsBuy.map((sv, i) => (
              <div
                key={i}
                style={{
                  background: '#0a1820',
                  border: '1px solid #1a2a30',
                  borderRadius: 9,
                  padding: '13px 15px',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 10,
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 14, color: '#d8f0f8' }}>{sv.name}</span>
                  <span
                    style={{ fontSize: 12, color: '#5aa8c4', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {sv.price}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#2a5060', marginBottom: 5 }}>
                  {'🛍 ' + sv.where}
                </div>
                <div style={{ fontSize: 12, color: '#6a9aaa', lineHeight: 1.6 }}>{sv.why}</div>
              </div>
            ))}

            {/* SOUVENIRS — AVOID */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#b56a3a',
                margin: '22px 0 12px',
              }}
            >
              Souvenirs — What to Avoid
            </div>
            {cantMiss.souvenirAvoid.map((sv, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                  padding: '10px 13px',
                  background: '#120808',
                  borderRadius: 8,
                  border: '1px solid #2a1010',
                }}
              >
                <span style={{ color: '#b05040', flexShrink: 0, marginTop: 2 }}>✕</span>
                <div>
                  <div style={{ fontSize: 13, color: '#c09080', marginBottom: 2 }}>{sv.item}</div>
                  <div style={{ fontSize: 11, color: '#704030', lineHeight: 1.5 }}>{sv.why}</div>
                </div>
              </div>
            ))}

            {/* STILL TO DO */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Trip Status
            </div>
            {[
              {
                item: 'Flights booked — $3,898',
                detail:
                  'MSY → BWI → KEF, departs Jul 15 11:50am, arrives KEF Jul 16 6:25am. KEF → BNA → MSY, departs Jul 27 5:10pm, arrives MSY Jul 28 12:20am. Booking ref BLYK5I.',
                done: true,
                urgent: false,
              },
              {
                item: 'All 4 hotels booked — $6,371',
                detail:
                  'Reykjavik Residence (4 nights), Hotel Jökulsárlón (3 nights), Akureyri Log Cabin (2 nights), Hotel Vest Mar (2 nights).',
                done: true,
                urgent: false,
              },
              {
                item: 'Blue Lagoon booked — Jul 19, 3pm',
                detail:
                  'Comfort package, 2 adults + 2 children. Leave Reykjavik apartment by 2pm. Strict timed entry.',
                done: true,
                urgent: false,
              },
              {
                item: 'Lotus Car Rental — Toyota RAV4 ✓ BOOKED',
                detail:
                  'Booking 2QFX7V. ~$2,945 (incl. Linda as additional driver + Roadside Assistance). Platinum Insurance (zero excess) + Free WiFi. 1 booster (Hailey) + 1 Child Seat (Lucas). Pickup Jul 16 8:30am, drop-off Jul 27 2pm. Online check-in opens Jul 9.',
                done: true,
                urgent: false,
              },
              {
                item: 'Travel insurance ✓ BOOKED',
                detail:
                  'Tin Leg Gold · Policy 53-TLG-FDD-6EB76 · $634 · $500K medical + evacuation per person, primary, no deductible, pre-existing covered. Emergency: 844-927-9265.',
                done: true,
                urgent: false,
              },
              {
                item: 'Passports verified ✓',
                detail: 'All 4 passports valid past Oct 27, 2026. Confirmed good for travel.',
                done: true,
                urgent: false,
              },
              {
                item: 'T-Mobile Iceland roaming',
                detail: 'Data roaming included on your plan. Enable roaming before departure.',
                done: true,
                urgent: false,
              },
              {
                item: 'Payment strategy set ✓',
                detail:
                  "Chase Sapphire as primary (no FX fees, travel protections). Chase doesn't require travel notification. 2 backup credit cards. Skipped Wise. Chase PIN ordered.",
                done: true,
                urgent: false,
              },
              {
                item: 'North Sailing Húsavík (Day 9) ✓ BOOKED',
                detail:
                  'Booking NOS-89947819 · Húsavík Original Whale Watching · Jul 24, 10am · ~$255 family · 3 hrs.',
                done: true,
                urgent: false,
              },
              {
                item: 'Lava Tunnel ✓ BOOKED',
                detail:
                  'LAVAT-92813291 · Jul 17, 4pm · Standard Tour 1 hr. Inside 4-7°C, bring fleece.',
                done: true,
                urgent: false,
              },
              {
                item: 'Katla Ice Cave + Super Jeep ✓ BOOKED',
                detail:
                  'Ticket ARC-T137226358 · Jul 20, 4:30pm · ~$610 family · 3 hrs from Vík. Rebooked from Jul 18 — now on Day 5 south coast drive. Meeting: south side of Icewear/Krónan building in Vík.',
                done: true,
                urgent: false,
              },
              {
                item: 'Elding whale watching Reykjavik ○ FLEX',
                detail:
                  'Day 2 flex time — decide morning of Jul 17. Walk-up at Old Harbour or book same-day on elding.is. Optional: you already have North Sailing whales on Day 9. ~$240 family.',
                done: true,
                urgent: false,
              },
              {
                item: 'Jökulsárlón amphibian boat ✓ BOOKED',
                detail:
                  'Booking JOK-00040230 · Tue Jul 21, 10:20am · 40 min on water · ~$155 family (21,200 ISK). Meet at Jökulsárlón Glacier Lagoon Boat Tours and Cafe.',
                done: true,
                urgent: false,
              },
              {
                item: 'Skaftafell glacier walk ✗ SKIPPED',
                detail:
                  'Guided glacier walks all require age 8-10 minimum, too old for Lucas. Day 7 now: Skaftafell park trails + Fjaðrárgljúfur canyon (both free, kid-friendly).',
                done: true,
                urgent: false,
              },
              {
                item: 'Photography — midnight sun golden hour',
                detail: 'Golden hour runs roughly 10pm to 2am in July. Best light of your life.',
                done: false,
                urgent: false,
              },
              {
                item: "Kids' car entertainment plan",
                detail:
                  'Day 5 = ~5 hrs (south coast), Day 8 = 9+ hrs (glacier to Akureyri). Downloaded shows, audiobooks, car snack rotation.',
                done: false,
                urgent: false,
              },
              {
                item: 'Volcano activity check',
                detail:
                  'Reykjanes Peninsula near Keflavik has been active. Monitor mbls.is closer to departure.',
                done: false,
                urgent: false,
              },
              {
                item: 'VAT refund at airport',
                detail:
                  'Reclaim 24% on purchases over ~6,000 ISK. Present goods and receipts at Keflavik before checking bags.',
                done: false,
                urgent: false,
              },
              {
                item: 'ISK cash on arrival',
                detail:
                  'Withdraw ~15,000 ISK (~$110) from ATM at Keflavik on arrival. Iceland is nearly cashless but good for emergencies.',
                done: false,
                urgent: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                  padding: '10px 13px',
                  background: item.done ? '#080f10' : item.urgent ? '#120808' : '#0a1820',
                  borderRadius: 8,
                  border:
                    '1px solid ' + (item.done ? '#1a3a20' : item.urgent ? '#2a1010' : '#1a2a30'),
                }}
              >
                <span
                  style={{
                    color: item.done ? '#4a8a68' : item.urgent ? '#d06050' : '#f0c050',
                    flexShrink: 0,
                    marginTop: 2,
                    fontSize: 14,
                  }}
                >
                  {item.done ? '✓' : item.urgent ? '!' : '·'}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: item.done ? '#3a6a48' : item.urgent ? '#c08070' : '#c0e0f0',
                      marginBottom: 2,
                      textDecoration: item.done ? 'line-through' : 'none',
                    }}
                  >
                    {item.item}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: item.done ? '#2a4a30' : item.urgent ? '#704030' : '#507080',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 7 && (
          <div>
            <p style={s.intro}>Iceland takes its sweets seriously. Your kids will too.</p>

            {/* KIDS' DESSERT PILGRIMAGES — NEW TOP SECTION */}
            <div
              style={{
                padding: '14px 16px',
                background: '#1a1408',
                borderRadius: 10,
                border: '1px solid #3a2810',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#c09060',
                  marginBottom: 10,
                }}
              >
                🧒 Kids' Top Dessert Pilgrimages
              </div>
              <div style={{ fontSize: 12, color: '#a08060', lineHeight: 1.75 }}>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>1. Brynja soft-serve (Akureyri)</strong> —
                  Day 9, non-negotiable. The dipped cone. Since 1939. Icelanders drive hours for
                  this.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>
                    2. Braud & Co cinnamon roll (Reykjavik)
                  </strong>{' '}
                  — Day 4 morning. The rainbow bakery. Best snúður in Iceland.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>
                    3. Geirabakari cinnamon bun (Borgarnes)
                  </strong>{' '}
                  — Day 12. Chocolate-covered, with sea view. Featured in Walter Mitty. Your last
                  Iceland pastry.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>4. Nammi pick 'n mix on Saturday</strong> —
                  Jul 18 or Jul 25 in a Bonus/Kronan. Icelandic 'laugardagsnammi' tradition. Let
                  each kid pick their own bag by weight.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>
                    5. Rye bread ice cream (Geysir or Mývatn)
                  </strong>{' '}
                  — Day 3 or Day 8. Warm underground-baked rye bread crumbled over vanilla
                  soft-serve. Weird. Incredible.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: '#d8b878' }}>6. Skúffukaka slice at any bakery</strong> —
                  the national chocolate sheet cake. Every kid's new favorite.
                </div>
                <div>
                  <strong style={{ color: '#d8b878' }}>
                    7. Vínberið homemade ice cream (Blönduós)
                  </strong>{' '}
                  — Day 10 drive break. The halfway point on the long Akureyri-to-Snæfellsnes drive.
                </div>
              </div>
            </div>

            {/* CLASSIC ICELANDIC DESSERTS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '14px 0 12px',
              }}
            >
              Classic Icelandic Desserts
            </div>
            {desserts.classics.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            {/* ICE CREAM */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Ice Cream — Iceland's Real Obsession
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#8aa0b0',
                lineHeight: 1.6,
                marginBottom: 12,
                fontStyle: 'italic',
              }}
            >
              Icelanders eat ice cream year-round — even in winter. Every town has its shrine. These
              are the ones to actually hit.
            </div>
            {desserts.iceCream.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            {/* HOT DRINKS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Hot Chocolate + Warm Drinks
            </div>
            {desserts.hotDrinks.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            {/* CHOCOLATE */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Chocolate
            </div>
            {desserts.chocolate.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            {/* CANDY */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Candy & Nammi
            </div>
            {desserts.candy.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            {/* SPECIAL TREATS */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#5aa8c4',
                margin: '22px 0 12px',
              }}
            >
              Specific Spots to Hit
            </div>
            {desserts.specialTreats.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 13px',
                  background: '#0a1820',
                  borderRadius: 9,
                  border: '1px solid #1a2a30',
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 14, color: '#c0e0f0', marginBottom: 6 }}>
                  {d.emoji} {d.name}
                </div>
                <div style={{ fontSize: 12, color: '#8aa0b0', lineHeight: 1.6, marginBottom: 6 }}>
                  {d.what}
                </div>
                <div style={{ fontSize: 11, color: '#6a8a9a', marginBottom: 4 }}>
                  <span style={{ color: '#5aa8c4' }}>Where:</span> {d.where}
                </div>
                <div style={{ fontSize: 11, color: '#c09060', lineHeight: 1.5 }}>🧒 {d.kidTip}</div>
              </div>
            ))}

            <div
              style={{
                marginTop: 24,
                padding: '14px 16px',
                background: '#0a1820',
                borderRadius: 10,
                border: '1px solid #1a3040',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#5aa8c4',
                  marginBottom: 6,
                }}
              >
                Iceland Dessert Strategy
              </div>
              <div style={{ fontSize: 12, color: '#80a8b8', lineHeight: 1.7 }}>
                Iceland is more of a dessert country than people realize — every petrol station has
                a bakery case, every supermarket has a candy wall, and every town has its ice cream
                institution. Your kids will eat more sweets here in 12 days than they probably do in
                a month at home, and that's fine. The quality is high, the portions are reasonable,
                and most desserts involve dairy so nutritionally it's a wash. Buy kleinur and
                skúffukaka at supermarkets for the car. Save bakery visits for mornings. End each
                major city day with ice cream.
              </div>
            </div>
          </div>
        )}

        {tab === 8 && (
          <div>
            <p style={s.intro}>
              Flights are booked. Work through this in order. Tap any item to check it off.
            </p>
            {bookingPhases.map((phase, pi) => (
              <div key={pi} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: 'inline-block',
                    background: phase.done
                      ? 'rgba(74,138,104,0.15)'
                      : phase.urgent
                        ? '#200808'
                        : '#0a1820',
                    border:
                      '1px solid ' +
                      (phase.done ? '#4a8a6840' : phase.urgent ? '#601010' : '#1a3040'),
                    borderRadius: 6,
                    padding: '3px 12px',
                    fontSize: 11,
                    color: phase.done ? '#4a8a68' : phase.urgent ? '#d06050' : '#5aa8c4',
                    marginBottom: 9,
                  }}
                >
                  {phase.label}
                </div>
                {phase.items.map((item, ii) => {
                  const k = pi + '-' + ii;
                  const done = !!checked[k];
                  return (
                    <div
                      key={ii}
                      onClick={() => toggle(k)}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        marginBottom: 7,
                        padding: '10px 12px',
                        background: done ? '#080f18' : '#090f18',
                        borderRadius: 7,
                        border: '1px solid #1a2a30',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: '1px solid #2a5060',
                          borderRadius: 3,
                          flexShrink: 0,
                          marginTop: 1,
                          background: done ? '#5aa8c4' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {done && <span style={{ fontSize: 10, color: '#080f18' }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            color: done ? '#2a5060' : '#90b8c8',
                            textDecoration: done ? 'line-through' : 'none',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.text}
                        </div>
                        {item.note && (
                          <div style={{ fontSize: 11, color: '#2a4050', marginTop: 2 }}>
                            {item.note}
                          </div>
                        )}
                      </div>
                      {item.url && !done && (
                        <a
                          href={item.url}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: 11,
                            color: '#5aa8c4',
                            textDecoration: 'none',
                            paddingTop: 2,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Open →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* LOOSE ENDS */}
            <div style={{ fontSize: 16, color: '#d8f0f8', marginTop: 28, marginBottom: 6 }}>
              ✈️ Trip-Day Checklist
            </div>
            <div style={{ fontSize: 11, color: '#5a7888', marginBottom: 16, lineHeight: 1.55 }}>
              The trip-day essentials. Tomorrow's departure, then admin during the trip.
            </div>

            {[
              {
                key: 'next2Weeks',
                label: '✈️ Departure Day',
                color: '#d06050',
                bg: '#200808',
                border: '#601010',
              },
              {
                key: 'weeksOut',
                label: '🏠 Home Front',
                color: '#c09060',
                bg: '#1a1408',
                border: '#3a2810',
              },
              {
                key: 'weekBefore',
                label: '📆 Final Checklist Tonight',
                color: '#5aa8c4',
                bg: '#0a1820',
                border: '#1a3040',
              },
            ].map((section, si) => (
              <div key={section.key} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: 'inline-block',
                    background: section.bg,
                    border: '1px solid ' + section.border,
                    borderRadius: 6,
                    padding: '3px 12px',
                    fontSize: 11,
                    color: section.color,
                    marginBottom: 9,
                  }}
                >
                  {section.label}
                </div>
                {looseEnds[section.key].map((item, ii) => {
                  const k = 'loose-' + si + '-' + ii;
                  const done = !!checked[k];
                  return (
                    <div
                      key={ii}
                      onClick={() => toggle(k)}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        marginBottom: 7,
                        padding: '10px 12px',
                        background: '#090f18',
                        borderRadius: 7,
                        border: '1px solid #1a2a30',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: '1px solid #2a5060',
                          borderRadius: 3,
                          flexShrink: 0,
                          marginTop: 1,
                          background: done ? '#5aa8c4' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {done && <span style={{ fontSize: 10, color: '#080f18' }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            color: done ? '#2a5060' : '#90b8c8',
                            textDecoration: done ? 'line-through' : 'none',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.item}
                        </div>
                        <div
                          style={{ fontSize: 11, color: '#2a4050', marginTop: 3, lineHeight: 1.55 }}
                        >
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* TO BUY */}
            <div style={{ fontSize: 16, color: '#d8f0f8', marginTop: 28, marginBottom: 6 }}>
              🛒 Things to Buy ✓ SHOPPING COMPLETE
            </div>
            <div style={{ fontSize: 11, color: '#5a7888', marginBottom: 16, lineHeight: 1.55 }}>
              Shopping done. Reference list preserved below for packing verification.
            </div>

            {looseEnds.toBuy.map((item, ii) => {
              const k = 'buy-' + ii;
              const done = !!checked[k];
              const needed = item.detail.includes('NEEDED');
              return (
                <div
                  key={ii}
                  onClick={() => toggle(k)}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    marginBottom: 7,
                    padding: '10px 12px',
                    background: '#090f18',
                    borderRadius: 7,
                    border: '1px solid ' + (needed ? '#3a2010' : '#1a2a30'),
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: '1px solid #2a5060',
                      borderRadius: 3,
                      flexShrink: 0,
                      marginTop: 1,
                      background: done ? '#5aa8c4' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {done && <span style={{ fontSize: 10, color: '#080f18' }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: done ? '#2a5060' : '#90b8c8',
                          textDecoration: done ? 'line-through' : 'none',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.item}
                      </span>
                      {needed && (
                        <span
                          style={{
                            fontSize: 9,
                            color: '#c08060',
                            border: '1px solid #3a2010',
                            borderRadius: 3,
                            padding: '1px 6px',
                          }}
                        >
                          NEEDED
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: '#2a4050', marginTop: 3, lineHeight: 1.55 }}>
                      {item.detail.replace(' NEEDED.', '').replace(' NEEDED', '')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
