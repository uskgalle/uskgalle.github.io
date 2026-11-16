/**
 * Events Data Array
 * 
 * TO ADD A NEW UPCOMING EVENT:
 * 1. Add a new object at the top of the array:
 *    {
 *        slug: 'meet-up-05',
 *        number: 5,
 *        date: { day: '25', month: 'SEP' },
 *        year: '2026',
 *        title: 'Sketch Meet-Up #5',
 *        type: 'Outdoor',
 *        description: 'Your event description here...',
 *        location: "ART'O'SAN Gallery, Galle Fort",
 *        time: '8.30 AM - 12.30 PM',
 *        upcoming: true,
 *        registerLink: '/events/meet-up-05/register',
 *        recap: null,
 *    }
 * 
 * 2. That's it! The registration page (/events/meet-up-05/register) and event cards
 *    will automatically generate and handle registration, calendar invites, and social sharing.
 * 
 * 3. WHEN THE EVENT IS CONCLUDED:
 *    Change `upcoming: false` and set `recap: { body: '...', extension: 'jpg' (optional, default 'jpg'), images: [1, 2, 3...] }`.
 */
export const events = [
    {
        slug: 'meet-up-07',
        number: 7,
        date: { day: 'TBA', month: 'SOON' },
        year: '',
        title: 'Sketch Meet-Up #7',
        type: 'Outdoor',
        description:
            'Our next sketch meet is in the works! Date, time and location will be announced soon. Join our WhatsApp group for updates.',
        location: 'Location TBA',
        time: 'Time TBA',
        upcoming: true,
        showOnHomepage: false,
        registerLink: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l',
        actionText: 'Join WhatsApp Group',
        image: '/doodles/hero.jpg',
        recap: null,
    },
    {
        slug: 'meet-up-06',
        number: 6,
        date: { day: '15', month: 'NOV' },
        year: '2026',
        title: 'Sketch Meet-Up #6',
        type: 'Outdoor',
        description:
            'The morning began with a mini workshop on sketching people at ART’O’SAN Gallery, followed by an outdoor sketching session in Galle Fort.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.45 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        image: '/gallery-images/meet-up-06/1.webp',
        whoCanJoinImage: '/doodles/who-can-join.jpg',
        whatToBringImage: '/doodles/what-to-bring.jpg',
        contactImage: '/doodles/contact.jpg',
        whoCanJoin: [
            'All age groups welcome',
            'All skill levels welcome: beginners to professionals',
        ],
        whatToBring: [
            'Pencil',
            'Pen / Ink',
            'Watercolour',
            'Markers',
            'iPad / Digital tools',
            'Or anything else you enjoy using',
        ],
        whatToBringNote: 'No specific tools required. All styles are welcome.',
        contact: {
            name: 'Sandeepa',
            phone: '+94 71 847 2636',
            whatsappLink: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l',
        },
        recap: {
            body: "We began the morning at ART'O'SAN Gallery in Galle Fort with People in the City, a mini workshop on drawing human figures in urban sketches led by Astrid Kahane-Seefeld, also known as Astisketcher. Astrid shared practical tips for sketching people on location and bringing movement into a street scene. After the workshop, we moved to the outdoor sketching spot for a guided session.",
            blogSlug: 'people-in-the-city',
            extension: 'webp',
            images: Array.from({ length: 155 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'meet-up-05',
        number: 5,
        date: { day: '03', month: 'OCT' },
        year: '2026',
        title: 'Sketch Meet-Up #5',
        type: 'Outdoor',
        description:
            "Sketchers met at ART'O'SAN Gallery in Galle Fort and moved together to sketch the vibrant Galle Fish Market, capturing fishermen, colourful wooden boats, morning commerce, and coastal sea breezes.",
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.45 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        image: '/gallery-images/meet-up-05/1.webp',
        whoCanJoinImage: '/doodles/who-can-join.jpg',
        whatToBringImage: '/doodles/what-to-bring.jpg',
        contactImage: '/doodles/contact.jpg',
        whoCanJoin: [
            'All age groups welcome',
            'All skill levels welcome: beginners to professionals',
        ],
        whatToBring: [
            'Pencil',
            'Pen / Ink',
            'Watercolour',
            'Markers',
            'iPad / Digital tools',
            'Or anything else you enjoy using',
        ],
        whatToBringNote: 'No specific tools required. All styles are welcome.',
        contact: {
            name: 'Sandeepa',
            phone: '+94 71 847 2636',
            whatsappLink: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l',
        },
        recap: {
            body: "Artists gathered at ART'O'SAN Gallery in Galle Fort and headed out together to the vibrant Galle Fish Market. Sketchers soaked in the morning light, sea spray, wooden fishing boats, and lively trade scenes, documenting the historic coastal atmosphere through expressive drawings and watercolors.",
            extension: 'webp',
            images: Array.from({ length: 18 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'meet-up-04',
        number: 4,
        date: { day: '30', month: 'AUG' },
        year: '2026',
        title: 'Sketch Meet-Up #4',
        type: 'Outdoor',
        description:
            'A memorable sketching session exploring the historic streets and architecture of Galle Fort.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.30 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        recap: {
            body: 'Featuring the iconic Galle Fort Lighthouse and Clock Tower. A memorable sketching session exploring the historic streets and architecture of Galle Fort. Artists captured the character of these iconic landmarks, from the Lighthouse to the Clock Tower, while enjoying the atmosphere and stories of this historic location.',
            extension: 'png',
            images: Array.from({ length: 31 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'meet-up-03',
        number: 3,
        date: { day: '10', month: 'MAY' },
        year: '2026',
        title: 'Sketch Meet-Up #3',
        type: 'Outdoor',
        description:
            'A friendly sketch meet filled with conversation, creativity, and on-location drawing around the beautiful streets of Galle.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.30 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        recap: {
            body: 'A friendly sketch meet filled with conversation, creativity, and on-location drawing around the beautiful streets of Galle.',
            images: Array.from({ length: 20 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'meet-up-02',
        number: 2,
        date: { day: '08', month: 'MARCH' },
        year: '2026',
        title: 'Sketch Meet-Up #2',
        type: 'Outdoor',
        description:
            'An outdoor sketch meetup filled with creativity, conversation, and shared inspiration among local artists and sketch enthusiasts.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.30 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        recap: {
            body: 'An outdoor sketch meetup filled with creativity, conversation, and shared inspiration among local artists and sketch enthusiasts.',
            images: Array.from({ length: 17 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'meet-up-01',
        number: 1,
        date: { day: '01', month: 'Feb' },
        year: '2026',
        title: 'Sketch Meet-Up #1',
        type: 'Outdoor',
        description:
            'A relaxed morning of sketching, walking, observing, and sharing the city through lines and colours.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '9.15 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        recap: {
            body: 'A relaxed morning of sketching, walking, observing, and sharing the city through lines and colours.',
            images: Array.from({ length: 40 }, (_, i) => i + 1),
        },
    },
    {
        slug: 'sketch-walk-01',
        number: 0,
        date: { day: '14', month: 'Dec' },
        year: '2025',
        title: 'Sketch Walk',
        type: 'Outdoor',
        description:
            "The event was organized by Urban Sketchers Colombo in collaboration with the Collective for Historical Dialogue & Memory and Art'o'San Gallery.",
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '9.15 AM - 12.30 PM',
        upcoming: false,
        registerLink: null,
        recap: {
            body: "The event was organized by Urban Sketchers Colombo in collaboration with the Collective for Historical Dialogue & Memory and Art'o'San Gallery.",
            images: Array.from({ length: 10 }, (_, i) => i + 1),
        },
    }
];
