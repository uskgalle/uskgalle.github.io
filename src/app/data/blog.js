/**
 * USK Galle Blog Posts Data Store
 *
 * HOW TO ADD A NEW BLOG POST:
 * 1. Add your post object to the `blogPosts` array below.
 * 2. Put any post images in `/public/hero-images/` or a custom `/public/blog-images/` folder.
 * 3. Schema:
 *    - slug: unique URL identifier (e.g. 'watercolors-at-sunset')
 *    - title: Post title
 *    - category: 'Urban Sketching' | 'Galle History' | 'Guides & Tips' | or any custom category
 *    - tags: ['Watercolor', 'Galle Fort', 'Techniques']
 *    - coverImage: '/hero-images/1.jpg' (or any image in /public)
 *    - coverAlt: Descriptive alt text for accessibility
 *    - coverCaption: Optional photographer/artist caption or location note
 *    - excerpt: 1-2 sentence summary displayed on cards and search results
 *    - author: 'Yasith Arangala' | 'Amara Perera' | 'System'
 *    - authorSlug: 'yasith-arangala' (links to /artists/[slug]) or null for community/system
 *    - date: 'June 12, 2025'
 *    - readTime: '6 min read'
 *    - featured: true | false (marks as lead featured article on /blog)
 *    - content: HTML string. You can use standard HTML plus our visual styling classes:
 *        • <p class="lead">Introductory paragraph with slightly larger font</p>
 *        • <figure class="article-figure"><img src="..." alt="..." /><figcaption>Caption text</figcaption></figure>
 *        • <div class="image-grid-2"><figure>...</figure><figure>...</figure></div> (side-by-side images)
 *        • <figure class="article-figure-wide"><img src="..." alt="..." /><figcaption>Wide caption</figcaption></figure>
 *        • <div class="tip-box"><div class="tip-icon">💡</div><div><h4>Sketcher's Field Note</h4><p>Tip text</p></div></div>
 *        • <div class="takeaways-box"><h4>Key Takeaways</h4><ul><li>Item 1</li><li>Item 2</li></ul></div>
 *        • <blockquote>"Inspirational quote"</blockquote>
 */

export const blogPosts = [
  {
    slug: 'echoes-of-batavia-galle-fort-history',
    title: "Echoes of Batavia: A Sketcher's Guide to Galle Fort History",
    category: 'Galle History',
    tags: ['Galle History', 'Architecture', 'Dutch Colonial', 'Heritage'],
    excerpt: 'Built by the Portuguese and expanded by the Dutch East India Company, Galle Fort is a living museum of colonial ramparts, coral-stone masonry, and maritime heritage.',
    author: 'System',
    authorSlug: null,
    date: 'June 12, 2025',
    readTime: '7 min read',
    coverImage: '/hero-images/12.jpg',
    coverAlt: 'Sunset light raking across Galle Fort coastal rampart and historic fortifications',
    coverCaption: 'The ancient rampart walls meeting the Indian Ocean at sunset, showing coral-stone masonry.',
    coverColor: '#c9a87c',
    featured: true,
    content: `
      <p class="lead">Galle Fort is not merely a UNESCO World Heritage site; for urban sketchers, it is a living classroom where 400 years of global trade, colonial rivalry, and tropical adaptation are etched into every cobblestone, coral wall, and rampart.</p>

      <h3>From Portuguese Stockade to Dutch Citadel</h3>
      <p>When Portuguese explorer Lorenzo de Almeida sought refuge in Galle's natural bay in 1505, the harbor was already an ancient trade node connecting Arab merchants, Persian dhows, and Chinese junks. The Portuguese built the initial fortifications, named <em>Santa Cruz</em>, from mud and palm trunks.</p>

      <p>However, it was following the Dutch capture of Galle in 1640 that the fort transformed into the massive granite-and-coral bastion network we see today. The Dutch VOC (<em>Vereenigde Oostindische Compagnie</em>) redesigned the fort into an impregnable 52-hectare stronghold, constructing 14 distinct bastions including Sun, Moon, Star, Aurora, and Triton.</p>

      <figure class="article-figure">
        <img src="/hero-images/1.jpg" alt="Historic arched entryway of the Old VOC Storehouse in Galle Fort" />
        <figcaption>The grand entrance archway to the Old VOC Storehouse (1676), now the National Maritime Museum.</figcaption>
      </figure>

      <div class="tip-box">
        <div class="tip-icon">🏛️</div>
        <div>
          <h4>Archivist's Field Note: Spotting VOC Monograms</h4>
          <p>Look above the old inner gate on Queen's Street: you can still see the intricately carved VOC insignia flanked by two lions and a rooster, carved into Dutch limestone in 1669.</p>
        </div>
      </div>

      <h3>Architectural Anatomy for Sketchers</h3>
      <p>When sitting down to sketch inside the fort, notice the distinctive architectural cues that define this unique fusion of European military design and South Asian climate engineering:</p>
      
      <ul>
        <li><strong>Gabled Roofs & Dutch Tiles</strong>: Steep double-pitched gables capped with semi-cylindrical terracotta tiles (<em>clay half-pipes</em>) that create rich parallel shadow lines under the midday sun.</li>
        <li><strong>Verandahs & Tuscan Columns</strong>: To cope with monsoonal rains and intense heat, colonial houses were built with wide overhanging eaves supported by thick masonry columns.</li>
        <li><strong>Granite & Coral Masonry</strong>: The rampart walls are up to 3 meters thick, constructed from blocks of sea coral mixed with local granite and lime mortar.</li>
      </ul>

      <div class="image-grid-2">
        <figure class="article-figure">
          <img src="/hero-images/14.jpg" alt="Narrow cobblestone street framed by colonial walls in Galle Fort" />
          <figcaption>Leyn Baan Street (Rope Walk): narrow cobblestone perspective framed by bougainvillea.</figcaption>
        </figure>
        <figure class="article-figure">
          <img src="/artworks-images/yasith-arangala/2.png" alt="Architectural watercolor sketch of Galle Fort facade by Yasith Arangala" />
          <figcaption>Watercolor & ink study capturing colonial porticos and gables by Yasith Arangala.</figcaption>
        </figure>
      </div>

      <blockquote>"Sketching the fort is like reading a stratigraphy map of Sri Lanka's colonial history: each archway tells a story of survival against monsoon sea-spray and artillery."</blockquote>

      <div class="takeaways-box">
        <h4>Top 3 Historical Vantage Points for Sketchers</h4>
        <ul>
          <li><strong>The Great Warehouse (Old VOC Storehouse)</strong>: Its massive barrel arches and buttressed walls date back to 1676 and cast rich, dramatic shadows.</li>
          <li><strong>Akersloot Bastion</strong>: Perfect for sweeping views of Galle harbor and the distant Roomassala hill across the bay.</li>
          <li><strong>Leyn Baan Street</strong>: The original Rope Walk street offers classic one-point perspective shots of whitewashed walls and vintage wooden sash windows.</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'urban-sketching-101-galle-fort',
    title: 'Urban Sketching 101: Capturing Light & Shadow in Tropical Galle',
    category: 'Urban Sketching',
    tags: ['Technique', 'Light & Shadow', 'Watercolor', 'Field Guide'],
    excerpt: 'Harsh tropical light, sudden monsoon downpours, and bustling street scenes require a specific approach to contrast, quick linework, and color temperature.',
    author: 'Yasith Arangala',
    authorSlug: 'yasith-arangala',
    date: 'May 28, 2025',
    readTime: '5 min read',
    coverImage: '/hero-images/6.jpg',
    coverAlt: 'Bright tropical sunlight and deep shadows falling across an urban sketching scene',
    coverCaption: 'High contrast morning light casting deep ultramarine shadows across Pedlar Street.',
    coverColor: '#8a9e7c',
    featured: false,
    content: `
      <p class="lead">Sketching outdoors in Galle presents unique challenges that you won't encounter in temperate climates. The sun rises swiftly over the Indian Ocean, casting blinding highlights on whitewashed walls while plunging narrow alleys into deep ultramarine shadows.</p>

      <h3>1. Embrace High Contrast (Tonal Value First)</h3>
      <p>Before picking up your watercolor brush or fountain pen, squint at your subject. In tropical light, mid-tones tend to flatten out quickly. Look for the strongest shadow shapes: under balcony overhangs, beneath tuk-tuk roofs, or cast by heavy terracotta roofs.</p>

      <figure class="article-figure">
        <img src="/hero-images/7.jpg" alt="High contrast shadows under colonial verandas in Galle Fort" />
        <figcaption>Strong diagonal shadows cast beneath overhanging Dutch verandas create rhythm and compositional depth.</figcaption>
      </figure>

      <div class="tip-box">
        <div class="tip-icon">🎨</div>
        <div>
          <h4>Pro Tip: The Squint Test</h4>
          <p>Squinting reduces fine detail and reveals only the major light and dark shapes. If your sketch reads clearly in black and white value shapes, your colors will instantly sing!</p>
        </div>
      </div>

      <p>Block in your shadows first! Using a light grey or warm sepia wash to map out shadow shapes creates instant depth before adding color. Keep your light areas clean and let the white of the cotton paper do the heavy lifting.</p>

      <h3>2. Quick Linework for Moving Subjects</h3>
      <p>Galle Fort is alive with movement: school children walking home with colorful umbrellas, vintage bicycles leaning against Dutch walls, community dogs resting in doorways, and red tuk-tuks zipping past ancient archways. Don't try to draw static portraits:</p>

      <div class="image-grid-2">
        <figure class="article-figure">
          <img src="/artworks-images/yasith-arangala/1.png" alt="Rapid watercolor and ink sketch by Yasith Arangala" />
          <figcaption>Quick ink linework capturing the essence of Galle Fort landmarks by Yasith Arangala.</figcaption>
        </figure>
        <figure class="article-figure">
          <img src="/gallery-images/meet-up-01/15.jpg" alt="Urban sketcher drawing on location during a meetup in Galle" />
          <figcaption>Sketching on location: capturing quick gesture lines before the shadows shift.</figcaption>
        </figure>
      </div>

      <ul>
        <li><strong>10-Second Gesture Sketches</strong>: Capture the overall tilt and rhythm of pedestrians in a single continuous line.</li>
        <li><strong>Anchor Moving Objects with Shadows</strong>: Ground a passing tuk-tuk with a dark shadow puddle right under its chassis.</li>
        <li><strong>Overlapping Silhouettes</strong>: Place walking figures in front of architectural pillars to create immediate foreground-to-background depth.</li>
      </ul>

      <h3>3. Be Weather Ready in the Tropics</h3>
      <p>Monsoon showers in Galle arrive swiftly from the Indian Ocean. Always carry waterproof ink (like Platinum Carbon Black or Rohrer & Klingner sketchINK) so that a stray droplet doesn't wash away your linework. Carry a travel towel, bulldog clips to hold flapping paper, and a light umbrella that can double as a sunshade.</p>

      <blockquote>"Urban sketching isn’t about architectural precision: it’s about recording how a place felt at 10:00 AM on a warm Tuesday morning."</blockquote>

      <div class="takeaways-box">
        <h4>Key Takeaways for Tropical Urban Sketching</h4>
        <ul>
          <li>Map tonal values before applying color washes.</li>
          <li>Use ultramarine and burnt sienna to mix expressive tropical shadows instead of muddy blacks.</li>
          <li>Pack 300gsm cold-press cotton paper to prevent warping under Galle's 80% humidity.</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'galle-fort-ramparts-history',
    title: 'Stories Behind the Ramparts: Sketching the Bastions of Galle',
    category: 'Galle History',
    tags: ['Galle History', 'Lighthouse', 'Bastions', 'Coastal Landscapes'],
    excerpt: 'Explore the 14 bastions that encircle the fortress, from Sun Bastion\'s cannons to Point Utrecht Lighthouse, and learn how to render their massive proportions.',
    author: 'Sumudu Udari',
    authorSlug: 'sumudu-udari',
    date: 'May 14, 2025',
    readTime: '6 min read',
    coverImage: '/hero-images/18.jpg',
    coverAlt: 'Point Utrecht Bastion and Galle Fort Lighthouse against a clear coastal sky',
    coverCaption: 'Point Utrecht Bastion with Galle\'s iconic lighthouse framed by palms.',
    coverColor: '#9c8ab0',
    featured: false,
    content: `
      <p class="lead">The ramparts of Galle Fort are among the best-preserved coastal fortification systems in South Asia. Encircling the entire peninsula, the rampart walk is where colonial military engineering meets the endless expanse of the Indian Ocean.</p>

      <h3>The Northern Defense Line</h3>
      <p>The landward side of the fort faced the greatest strategic threat from inland Sri Lankan kingdoms. Thus, the Dutch constructed three massive bastions joined by thick curtain walls that withstand ocean spray and enemy fire alike:</p>
      
      <ul>
        <li><strong>Moon Bastion</strong>: The central fortification, once housing heavy artillery batteries commanding the isthmus.</li>
        <li><strong>Sun Bastion</strong>: Guarding the harbor entrance, offering elevated panoramic views over the international cricket stadium.</li>
        <li><strong>Star Bastion</strong>: Positioned to provide lethal crossfire along the sea bay and northern reefs.</li>
      </ul>

      <figure class="article-figure">
        <img src="/hero-images/20.jpg" alt="Historic iron cannon stationed on Sun Bastion overlooking Galle harbor" />
        <figcaption>Vintage Dutch cannon on Sun Bastion overlooking the rampart perimeter and harbor entrance.</figcaption>
      </figure>

      <h3>Point Utrecht & The Iconic Lighthouse</h3>
      <p>At the southeastern tip stands <strong>Point Utrecht Bastion</strong>, home to Galle's beloved white lighthouse. First erected by the British in 1848 and rebuilt in 1939 after a fire, the lighthouse stands 26.5 meters high, crowned by lantern glazing and framed by swaying coconut palms.</p>

      <div class="image-grid-2">
        <figure class="article-figure">
          <img src="/artworks-images/sumudu-udari/1.png" alt="Watercolor painting of Galle Fort Lighthouse by Sumudu Udari" />
          <figcaption>"Galle Fort Lighthouse with Blue Sky" — watercolor & pen study by Sumudu Udari.</figcaption>
        </figure>
        <figure class="article-figure">
          <img src="/artworks-images/nimthaka-jayavihan/3.png" alt="Ground level perspective sketch of Galle Fort Lighthouse by Nimthaka Jayavihan" />
          <figcaption>Ground-level perspective of the lighthouse by Nimthaka Jayavihan.</figcaption>
        </figure>
      </div>

      <div class="tip-box">
        <div class="tip-icon">📐</div>
        <div>
          <h4>Sketching Tip for Monolithic Structures</h4>
          <p>Drop your horizon line low (at roughly knee or chest height) to emphasize the imposing height of the bastion walls and lighthouse. Render the cylindrical lighthouse with soft horizontal curved contour lines rather than harsh vertical outlines.</p>
        </div>
      </div>

      <figure class="article-figure-wide">
        <img src="/hero-images/22.jpg" alt="Ocean waves crashing against the granite sea wall of Galle Fort" />
        <figcaption>Granite bastion foundations meeting the breaking Indian Ocean surf: contrast rigid geometry with organic waves.</figcaption>
      </figure>

      <div class="takeaways-box">
        <h4>The 3 Must-Sketch Bastions</h4>
        <ul>
          <li><strong>Flag Rock Bastion</strong>: The best spot in the fort to sketch sunset silhouettes and brave cliff divers.</li>
          <li><strong>Point Utrecht Bastion</strong>: The classic postcard view combining lighthouse, palms, and ocean swells.</li>
          <li><strong>Aurora Bastion</strong>: Spectacular morning golden hour lighting for early-bird sketchers.</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'essential-urban-sketching-kit',
    title: 'The Essential On-Location Sketching Kit for Beginners',
    category: 'Guides & Tips',
    tags: ['Field Kit', 'Watercolor', 'Gear', 'Beginners'],
    excerpt: 'What\'s in our sketch bags? Discover the minimal, portable drawing tools, watercolors, and sketchbooks we recommend for field sketching in Galle.',
    author: 'Sachith Vithanage',
    authorSlug: 'sachith-vithanage',
    date: 'April 30, 2025',
    readTime: '4 min read',
    coverImage: '/hero-images/16.jpg',
    coverAlt: 'Curated urban sketching kit spread out with sketchbook, pens, and paint palette',
    coverCaption: 'A compact field kit: A5 sketchbook, pocket watercolor palette, and waterproof pens.',
    coverColor: '#7ca8c9',
    featured: false,
    content: `
      <p class="lead">One of the founding principles of Urban Sketchers worldwide is: <strong>Travel light, draw often.</strong> You don't need a heavy studio setup or dozens of markers to create expressive, evocative sketches on location.</p>

      <h3>Our Recommended Field Setup</h3>
      <p>When walking the cobblestone lanes of Galle Fort under tropical heat, every ounce in your bag counts. Here is the field-tested kit our community members swear by:</p>

      <div class="image-grid-2">
        <figure class="article-figure">
          <img src="/hero-images/2.jpg" alt="Compact watercolor tin palette with rich pigments" />
          <figcaption>A 12-half-pan metal travel palette: lightweight, leak-proof, and fits in any pocket.</figcaption>
        </figure>
        <figure class="article-figure">
          <img src="/hero-images/4.jpg" alt="Water-brush pens and fine fountain pens laid out on paper" />
          <figcaption>Water-brush pens and fountain pens: no messy water jars required on the street.</figcaption>
        </figure>
      </div>

      <h4>1. The Sketchbook</h4>
      <p>Choose an <strong>A5 landscape sketchbook</strong> (approx. 5.8 x 8.3 inches). Ensure the paper weight is at least <strong>250 to 300 gsm</strong> (cotton preferred) so that watercolor washes won't buckle or bleed through to the other side.</p>

      <h4>2. Pens & Ink</h4>
      <ul>
        <li><strong>Fountain Pen with EF or F nib</strong>: Filled with permanent pigment ink such as Platinum Carbon Black or De Atramentis Document Ink.</li>
        <li><strong>Water-Brush Pen</strong>: Carries water directly in the barrel, eliminating the need to balance water cups on stone ramparts.</li>
        <li><strong>2B Graphite Pencil & Kneaded Eraser</strong>: For quick 30-second structural thumbnails.</li>
      </ul>

      <div class="tip-box">
        <div class="tip-icon">🎒</div>
        <div>
          <h4>Field Comfort Tip</h4>
          <p>Always carry a lightweight foldable three-legged stool or a foam cushion. Sitting comfortably lets you sketch for an hour without back fatigue, and keeps you off scorching granite stones!</p>
        </div>
      </div>

      <figure class="article-figure">
        <img src="/gallery-images/meet-up-01/8.jpg" alt="USK Galle artists sitting together on location with sketchbooks" />
        <figcaption>Community members at a Galle sketch meet: comfortable seating and portable palettes make all the difference.</figcaption>
      </figure>

      <div class="takeaways-box">
        <h4>Minimalist Field Kit Checklist</h4>
        <ul>
          <li>A5 300gsm cold-press watercolor sketchbook</li>
          <li>Fountain pen or waterproof fineliner (0.3mm / 0.5mm)</li>
          <li>Pocket 12-color watercolor palette</li>
          <li>Medium round water-brush pen + small microfiber cloth</li>
          <li>Bulldog clips to tame sea breezes</li>
          <li>Reusable water bottle and wide-brim sun hat</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'dutch-reformed-church-architecture',
    title: 'Drawing the Dutch Reformed Church: Architectural Linework',
    category: 'Galle History',
    tags: ['Architecture', 'Linework', 'History', 'Perspective'],
    excerpt: 'Groote Kerk, built in 1755, features distinctive doric pediments, honeycomb stained glass, and gravestone floors rich in crests and history.',
    author: 'Nimthaka Jayavihan',
    authorSlug: 'nimthaka-jayavihan',
    date: 'April 15, 2025',
    readTime: '5 min read',
    coverImage: '/hero-images/10.jpg',
    coverAlt: 'Exterior facade of Groote Kerk Dutch Reformed Church in Galle Fort',
    coverCaption: 'Groote Kerk (Dutch Reformed Church, 1755) with its iconic twin curved gables.',
    coverColor: '#c9a87c',
    featured: false,
    content: `
      <p class="lead">The <strong>Groote Kerk</strong> (Dutch Reformed Church) is one of the oldest Protestant churches still in active worship in Sri Lanka. Erected in 1755 as a thank-offering by Commander Casparus de Jong for the birth of his daughter, the church stands gracefully near the highest point of the fort.</p>

      <figure class="article-figure">
        <img src="/hero-images/13.jpg" alt="Doric pediments and scrolls rising above Church Street in Galle" />
        <figcaption>The North facade showing classical Doric pilasters, ornate volutes, and weather-worn lime plaster.</figcaption>
      </figure>

      <h3>Key Architectural Highlights for Artists</h3>
      <p>When you approach the church along Church Street, several rare architectural features stand out immediately:</p>
      
      <ul>
        <li><strong>Curved Double Gables</strong>: The north and south facades feature stately Dutch baroque gables with intricate scroll mouldings that catch early morning light.</li>
        <li><strong>Paved Floor of Headstones</strong>: The interior floor is paved with intricately carved gravestones transferred from the old Dutch cemetery, complete with carved family crests, hour-glasses, and memento mori skulls.</li>
        <li><strong>Organ & Pulpit</strong>: The interior boasts an impressive calamander wood pulpit topped with a hexagonal sounding canopy.</li>
      </ul>

      <div class="image-grid-2">
        <figure class="article-figure">
          <img src="/artworks-images/nimthaka-jayavihan/2.png" alt="Galle Fort Clock Tower and historic architecture watercolor sketch" />
          <figcaption>Galle Fort architectural context sketch by Nimthaka Jayavihan.</figcaption>
        </figure>
        <figure class="article-figure">
          <img src="/hero-images/23.jpg" alt="Interior architectural details of historic church" />
          <figcaption>Historic timber truss rafters and gravestone pavers inside Groote Kerk.</figcaption>
        </figure>
      </div>

      <div class="tip-box">
        <div class="tip-icon">✏️</div>
        <div>
          <h4>Linework Guide: Two-Point Perspective</h4>
          <p>Position yourself on the opposite pavement of Church Street near the Amangalla veranda. From here, you have an ideal vantage point where both the main facade and the side wing recede toward two distinct vanishing points on your horizon.</p>
        </div>
      </div>

      <blockquote>"The church isn't just stone and mortar — it's a testament to the craftsmen who balanced Dutch civic pride with tropical resilience."</blockquote>

      <div class="takeaways-box">
        <h4>Sketching Checklist: Groote Kerk</h4>
        <ul>
          <li>Establish the base steps and podium first to anchor the massive structure.</li>
          <li>Vary pen pressure: use delicate thin lines for stained-glass mullions and bold strokes for granite footings.</li>
          <li>Apply a warm yellow ochre or raw sienna undertone to capture aged lime plaster.</li>
        </ul>
      </div>
    `
  }
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getAllPosts() {
  return blogPosts;
}

export function getPostsByCategory(category) {
  if (!category || category === 'All') return blogPosts;
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
