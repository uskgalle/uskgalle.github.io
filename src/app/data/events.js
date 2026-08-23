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
 *    Change `upcoming: false` and set `recap: { body: '...', images: [1, 2, 3...] }`.
 */
export const events = [
    {
        slug: 'meet-up-04',
        number: 4,
        date: { day: '30', month: 'AUG' },
        year: '2026',
        title: 'Sketch Meet-Up #4',
        type: 'Outdoor',
        description:
            'Come along and sketch with us at our upcoming session: meet fellow artists, explore Galle Fort, and turn everyday moments into meaningful drawings.',
        location: "ART'O'SAN Gallery, Galle Fort",
        time: '8.30 AM - 12.30 PM',
        upcoming: true,
        registerLink: '/events/meet-up-04/register',
        googleFormUrl: null,
        sheetEndpointUrl: 'https://script.google.com/macros/s/AKfycbwaGLRzDY1hbS_JhrXl8JKSePD3iDLDIXSVbFmgw-FsfUi1tYiOvpl1CeCAK7xS13ktBQ/exec', // Add your Google Apps Script Web App URL here to submit directly to Google Sheets!
        instructions: [
            { icon: '📍', title: 'Meeting Point', text: "ART'O'SAN Gallery, Galle Fort at 8.30 AM for a quick intro." },
            { icon: '🎨', title: 'What to Bring', text: 'Sketchbook, drawing pens or watercolors, portable stool, and water bottle.' },
            { icon: '🚶‍♂️', title: 'Outdoor Walking', text: 'We will sketch on-location and walk between stops around Galle Fort.' },
            { icon: '📸', title: 'Photos & Consent', text: 'Group photos & sketches will be shared on Urban Sketchers Galle social media.' },
        ],
        recap: null,
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