import {
  ToneFingerprint,
  ProjectData,
  UserState,
  LeadItem,
  LeadReminder,
  CourseLesson,
  SavedDescription,
  SavedValuation,
  SavedFinancing,
} from './types';

export const DEFAULT_TONE_FINGERPRINTS: ToneFingerprint[] = [
  {
    id: 'tone-hinglish-explainer',
    name: 'Analytical Hinglish Explainer',
    channelName: 'Bharat Intellect',
    niche: 'Geopolitics & Current Affairs',
    language: 'hinglish',
    hinglishRatio: 65, // 65% English terminology, conversational Hindi grammar
    vocabularyLevel: 'Conversational Smart',
    signatureVocabulary: [
      'mudda',
      'case study',
      'ground reality',
      'khaas karke',
      'framework',
      'layer by layer',
      'diplomatic chess',
      'game-changer',
      'deep dive',
    ],
    hookStyle: 'Bold contrarian question backed by sudden data point',
    signatureTransitions: [
      'ab maan lijiye',
      'lekin asal twist yahan aata hai',
      'asal mein ground reality yeh hai ki',
      'ab aap hi sochiye',
      'toh question yeh banta hai',
    ],
    signatureCloses: [
      'Toh chaliye, layer by layer samajhte hain.',
      'Aapka kya take hai ispar? Comments mein zaroor batana.',
    ],
    fillerWords: ['basically', 'dekhiye', 'obviously'],
    bannedWords: ['guys', 'amazing', 'unlock your mind', 'smash the like button'],
    pacingWpm: 145,
    createdAt: '2026-03-01',
  },
  {
    id: 'tone-finance-guru',
    name: 'Practical Finance & Wealth',
    channelName: 'Smart Paisa Club',
    niche: 'Personal Finance & Investing',
    language: 'hinglish',
    hinglishRatio: 75,
    vocabularyLevel: 'Analytical Technical',
    signatureVocabulary: [
      'compounding power',
      'hidden charges',
      'wealth creation',
      'cashflow trap',
      'math simple hai',
      'golden rule',
      'SECP regulation',
      'retail investors',
    ],
    hookStyle: 'Direct financial impact: "How this one loophole cost you PKR 45,000 this year"',
    signatureTransitions: [
      'simple calculation dekhte hain',
      'par yahan pe bank aapko nahi batayega',
      'step number 2 par aate hain',
      'iska direct asar aapke portfolio par padta hai',
    ],
    signatureCloses: [
      'Yeh video koi financial advice nahi hai, educational purpose ke liye hai. Invest wisely!',
    ],
    fillerWords: ['dekho', 'seedhi baat', 'frankly'],
    bannedWords: ['get rich quick', 'guaranteed returns', 'insane hack', 'crorepati in 30 days'],
    pacingWpm: 155,
    createdAt: '2026-03-05',
  },
  {
    id: 'tone-tech-breakdown',
    name: 'Gadget & AI Teardown',
    channelName: 'Tech Sutra',
    niche: 'Technology & AI',
    language: 'hinglish',
    hinglishRatio: 80,
    vocabularyLevel: 'Conversational Smart',
    signatureVocabulary: [
      'benchmark numbers',
      'real-world battery life',
      'thermal throttling',
      'value for money',
      'under-the-hood',
      'user experience',
      'future-proof',
    ],
    hookStyle: 'Immediate blind test or shock spec comparison',
    signatureTransitions: [
      'spec sheet toh acchi hai, lekin practical use mein kya?',
      'ab camera performance par jump karte hain',
      'yeh feature sunne mein gimmick lagta hai, par...',
    ],
    signatureCloses: [
      'Kya yeh upgrade worth it hai? Mera verdict straightforward hai.',
    ],
    fillerWords: ['honestly', 'dekho yaar', 'point being'],
    bannedWords: ['revolutionary', 'mind-blown', 'beast mode'],
    pacingWpm: 160,
    createdAt: '2026-03-10',
  },
  {
    id: 'tone-english-explainer',
    name: 'Global English Documentary & Explainer',
    channelName: 'Global Intellect & Deep Dives',
    niche: 'Geopolitics, Tech & World Affairs',
    language: 'english',
    hinglishRatio: 0,
    vocabularyLevel: 'Conversational Smart',
    signatureVocabulary: [
      'ground reality',
      'unintended consequences',
      'catalyst',
      'structural shift',
      'connecting the dots',
      'first principles',
      'deep dive',
      'game-changer',
    ],
    hookStyle: 'Compelling question framed by an overlooked catalyst: "The detail everyone missed"',
    signatureTransitions: [
      'to understand how we got here, look at this map',
      'here is the twist nobody discussed',
      'now here is where things get interesting',
      'let us look at what verified records show',
    ],
    signatureCloses: [
      'Let us break this down layer by layer.',
      'Drop your thoughts in the comments below. See you in the next deep dive.',
    ],
    fillerWords: ['basically', 'essentially', 'at the end of the day'],
    bannedWords: ['smash that like button', 'mind-blown', 'insane hack', 'you won\'t believe this'],
    pacingWpm: 150,
    createdAt: '2026-03-12',
  },
  {
    id: 'tone-christian-prayer',
    name: 'Christian Daily Prayer & Encouragement',
    channelName: 'Daily Grace & Scripture Walk',
    niche: 'Faith & Spirituality / Christian Daily Prayer & Encouragement',
    language: 'english',
    hinglishRatio: 0,
    vocabularyLevel: 'Storyteller Warm',
    signatureVocabulary: [
      'grace',
      'renew your strength',
      'daily blessing',
      'peace that surpasses understanding',
      'stand firm in faith',
      'gratitude',
      'divine purpose',
      'unfailing love',
    ],
    hookStyle: 'Uplifting scripture promise: "Before you face today\'s burdens, take this reminder to heart"',
    signatureTransitions: [
      'let us pause and take this to prayer',
      'as scripture gently reminds us',
      'wherever your steps take you today',
      'hold fast to this unwavering promise',
    ],
    signatureCloses: [
      'May grace and peace guard your heart today and always. Amen.',
      'Share your prayer requests in the comments — our community prays over every single name.',
    ],
    fillerWords: ['beloved', 'truly', 'take heart'],
    bannedWords: ['smash that like button', 'mind-blown', 'crazy hack'],
    pacingWpm: 130,
    createdAt: '2026-03-15',
  },
  {
    id: 'tone-islamic-family',
    name: 'Islamic Content for Children & Families',
    channelName: 'Noor Family & Moral Stories',
    niche: 'Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)',
    language: 'english',
    hinglishRatio: 20,
    vocabularyLevel: 'Storyteller Warm',
    signatureVocabulary: [
      'Bismillah',
      'Alhamdulillah',
      'kindness & Sabr',
      'bedtime dua',
      'Barakah',
      'moral lesson',
      'good deeds',
      'generosity',
    ],
    hookStyle: 'Heartwarming family opening: "Tonight before bedtime, let\'s discover a story of courage and kindness"',
    signatureTransitions: [
      'and do you know what wonderful thing happened next?',
      'the Prophet ﷺ taught us to always remember',
      'before we close our eyes under the starry sky',
      'as we recite this soothing bedtime dua together',
    ],
    signatureCloses: [
      'SubhanAllah! Remember to recite your bedtime dua and treat everyone with love. Sweet dreams, little believers!',
      'JazakAllah Khair for watching together as a family. Don\'t forget to practice today\'s good deed tomorrow!',
    ],
    fillerWords: ['SubhanAllah', 'dear little friends', 'MashaAllah'],
    bannedWords: ['scary', 'monsters', 'violence', 'clickbait'],
    pacingWpm: 135,
    createdAt: '2026-03-15',
  },
];

export const SAMPLE_PROJECT: ProjectData = {
  id: 'proj-india-pakistan-border',
  title: 'India–Pakistan Border: Why Headlines Flare Again',
  topic: 'India Pakistan border LoC recent headline tensions and geopolitics breakdown',
  niche: 'Geopolitics',
  language: 'hinglish',
  targetRuntimeMin: 10,
  toneFingerprintId: 'tone-hinglish-explainer',
  toneFingerprintName: 'Analytical Hinglish Explainer',
  status: 'ready',
  createdAt: '2026-10-10T14:20:00Z',
  updatedAt: '2026-10-10T14:23:45Z',

  topics: [
    {
      id: 'top-1',
      title: 'India–Pakistan border: why headlines flare again',
      angleDescription: 'Spiking on Google Trends; zero balanced Hinglish explainers currently covering the economic & diplomatic subtext.',
      ideaScore: 94,
      searchVolume: 'Spiking',
      competition: 'Low',
      targetAudience: 'Youth & working professionals seeking factual, unbiased geopolitical reality',
      estimatedRuntimeMin: 10,
      sourceSignal: 'Google Trends',
    },
    {
      id: 'top-2',
      title: 'South Asian diplomacy & trade routes — What comes next for Pakistan?',
      angleDescription: 'Big legacy news channels covered in formal English only; huge opening for engaging conversational breakdown.',
      ideaScore: 88,
      searchVolume: 'High',
      competition: 'Medium',
      targetAudience: 'Foreign policy enthusiasts and competitive exam students',
      estimatedRuntimeMin: 8,
      sourceSignal: 'Dawn / Express',
    },
    {
      id: 'top-3',
      title: 'Modi US visit & defence deals — Hinglish mein simple explainer',
      angleDescription: 'Evergreen for 2-3 weeks; beginner tech-transfer angle is wide open for creator deep dive.',
      ideaScore: 86,
      searchVolume: 'Peaking today',
      competition: 'High',
      targetAudience: 'Tech and national development followers',
      estimatedRuntimeMin: 10,
      sourceSignal: 'YouTube',
    },
  ],
  selectedTopicIndex: 0,

  researchBrief: {
    summary:
      'Recent reports of LoC movement and diplomatic chatter between New Delhi and Islamabad are driven by three distinct factors: internal political realignments, the 2021 ceasefire protocol dynamics, and regional trade corridor friction. Factual timeline confirms border ceasefire remains 92% intact, but rhetorical escalation on domestic channels is high.',
    keyFacts: [
      'The 2021 Director General Military Operations (DGMO) ceasefire agreement renewed cross-border peace protocols.',
      'Bilateral trade through Wagah-Attari currently stands under $500M annually, down from peak $2.4B.',
      'Water dispute discussions under the Indus Waters Treaty (IWT) have seen renewed legal formalization in neutral tribunals.',
      'Domestic election cycles on both sides historically correspond to a 34% surge in hyper-nationalist media coverage.',
    ],
    timeline: [
      '2021 Feb: DGMOs announce surprise reaffirmation of 2003 ceasefire agreement.',
      '2023 Dec: Supreme Court ruling on Article 370 integration formally concluded in New Delhi.',
      '2024-2025: Diplomatic exchanges at SCO summits mark informal ice-breaking.',
      'Current Week: Headlines resurface around border infrastructure maintenance and surveillance upgrades.',
    ],
    sources: [
      {
        name: 'Ministry of Foreign Affairs (MOFA Pakistan)',
        domain: 'mofa.gov.pk',
        credibility: 'Official',
        url: 'https://mofa.gov.pk',
        keyFinding: 'Official press briefing confirming strict border vigilance while maintaining DGMO channels.',
      },
      {
        name: 'Reuters International Desk',
        domain: 'reuters.com',
        credibility: 'High',
        url: 'https://reuters.com',
        keyFinding: 'Satellite imagery verification shows routine winter forward post rotations rather than troop surges.',
      },
      {
        name: 'Dawn Regional Geopolitics Analysis',
        domain: 'dawn.com',
        credibility: 'Verified News',
        url: 'https://dawn.com',
        keyFinding: 'Regional security experts note economic pressures dominate long-term bilateral calculations.',
      },
      {
        name: 'Stimson Center South Asia Program',
        domain: 'stimson.org',
        credibility: 'High',
        url: 'https://stimson.org',
        keyFinding: 'Data-driven analysis tracking LoC incident frequencies over the 2021-2026 timeline.',
      },
    ],
  },

  factCheckList: [
    {
      id: 'fc-1',
      claim: 'The 2021 ceasefire along the LoC was scrapped last month.',
      status: 'flagged',
      confidenceScore: 99,
      explanation: 'FALSE. Official DGMO hotlines and joint military communications confirmed the ceasefire remains formally in effect.',
      source: 'ISPR & DGMO Joint Communications',
    },
    {
      id: 'fc-2',
      claim: 'Bilateral trade through overland routes dropped by over 75% post-2019.',
      status: 'verified',
      confidenceScore: 96,
      explanation: 'VERIFIED. Ministry of Commerce and trade statistics verify trade contracted from $2.4B to ~$480M following tariff adjustments.',
      source: 'DGCI&S Trade Data 2024-2025',
    },
    {
      id: 'fc-3',
      claim: 'Pakistan attended the regional SCO Foreign Ministers conference in India.',
      status: 'verified',
      confidenceScore: 98,
      explanation: 'VERIFIED. Bilateral diplomacy occurred within the multilateral SCO charter framework.',
      source: 'Ministry of External Affairs Records',
    },
  ],

  legalReview: {
    overallRisk: 'Safe',
    defamationChecked: true,
    fairUseCompliant: true,
    sebiCompliance: {
      isFinancialContent: false,
      disclaimerNeeded: false,
    },
    notes: [
      'No personal defamation or unverified criminal allegations against living individuals.',
      'Archival news clip references comply with standard Section 52 fair-dealing principles for commentary and reporting.',
      'Language maintains responsible neutral tone avoiding communal incitement, fully in line with YouTube Advertiser Guidelines.',
    ],
  },

  script: {
    fullText: `[HOOK]
Aaj ka mudda sirf ek headline nahi hai — yeh ek international case study hai. Pichle 72 ghanto mein aapne har TV channel aur news feed par ek hi breaking line dekhi hogi: "Border par phir se hulchul".

[SCENE: MCU, face camera, neutral dark studio backdrop, soft warm rim light]
Lekin kya sach mein situation utni volatile hai jitna media dikha raha hai, ya ground reality kuch aur hi keh rahi hai? 

[INTRO]
Namaskar dosto, main hoon aapka host, aur aaj hum sensationalism ko side mein rakh kar, actual satellite records, official DGMO agreements aur trade numbers ko layer by layer decode karne wale hain.

[B-ROLL: LoC satellite terrain map animation, archival footage of 2021 ceasefire briefing]
Sabse pehle, timeline samajhiye. February 2021 mein dono desho ke DGMOs ne ek surprise announcement kiya tha ki 2003 ka ceasefire protocol strictly maintain hoga. Aur ground data yeh batata hai ki pichle 5 saalo mein cross-border shelling mein 90% se zyada drop aaya hai. Toh phir yeh fresh headlines achanak kahan se aayi?

[BODY]
Yahan par teen crucial factors hain jo main stream debate miss kar deta hai.
Pehla factor: Internal political realignments. Jab bhi domestic politics mein pressure banta hai, border headlines ek natural diversion banti hain.
Doosra factor: Tactical infrastructure upgrades. Both sides are currently constructing all-weather roads and anti-drone electronic sensor towers. It is technical maintenance, not an offensive mobilization.
Teesra factor: Trade corridors and diplomacy behind closed doors. Even today, neutral backchannels are working on Indus Waters Treaty discussions.

[PAUSE: 1.5 seconds deliberate pacing transition]
Ab aap hi sochiye — agar headline TV studio ki TRP badha sakti hai, toh kya humein har screaming graphic ko literal lena chahiye?

[CTA]
Ground reality clear hai: vigilance 100% hai, lekin panicking headline misleading hai. Aapka ispar kya nazariya hai? Niche comments mein apna perspective zaroor share karein. Video pasand aayi ho toh like karke subscribe button press karna na bhulein. Main milunga aapse agle deep dive mein!`,
    wordCount: 1048,
    estimatedReadTimeMinutes: 7,
    toneMatchScore: 96,
    vocabularyScore: 94,
    rhythmScore: 93,
    hooksScore: 97,
    sections: [
      {
        id: 'sec-1',
        type: 'HOOK',
        speakerLabel: 'Host',
        content: 'Aaj ka mudda sirf ek headline nahi hai — yeh ek international case study hai. Pichle 72 ghanto mein aapne har TV channel aur news feed par ek hi breaking line dekhi hogi: "Border par phir se hulchul".',
        productionCue: '[HOOK: High curiosity, zero sensationalism]',
        timestamp: '00:00',
        durationSec: 18,
      },
      {
        id: 'sec-2',
        type: 'SCENE',
        speakerLabel: 'Host',
        content: 'Lekin kya sach mein situation utni volatile hai jitna media dikha raha hai, ya ground reality kuch aur hi keh rahi hai?',
        productionCue: '[SCENE: MCU, eye-level, face camera, subtle red studio rim light]',
        timestamp: '00:18',
        durationSec: 12,
      },
      {
        id: 'sec-3',
        type: 'INTRO',
        speakerLabel: 'Host',
        content: 'Namaskar dosto, aaj hum sensationalism ko side mein rakh kar, actual satellite records, official DGMO agreements aur trade numbers ko layer by layer decode karne wale hain.',
        productionCue: '[INTRO: Tone Fingerprint warm welcome, graphic title card on screen]',
        timestamp: '00:30',
        durationSec: 20,
      },
      {
        id: 'sec-4',
        type: 'B_ROLL',
        speakerLabel: 'Voiceover',
        content: 'Sabse pehle, timeline samajhiye. February 2021 mein dono desho ke DGMOs ne ek surprise announcement kiya tha ki 2003 ka ceasefire protocol strictly maintain hoga.',
        productionCue: '[B-ROLL: High-res LoC topographical map with 2021 timeline marker]',
        timestamp: '00:50',
        durationSec: 25,
      },
      {
        id: 'sec-5',
        type: 'BODY',
        speakerLabel: 'Host',
        content: 'Yahan par teen crucial factors hain jo mainstream debate miss kar deta hai: Internal politics, infrastructure drone towers, aur third-party international mediation.',
        productionCue: '[BODY: Lower-third graphic counter 1-2-3 appearing on right side]',
        timestamp: '01:15',
        durationSec: 90,
      },
      {
        id: 'sec-6',
        type: 'CTA',
        speakerLabel: 'Host',
        content: 'Ground reality clear hai: vigilance 100% hai, lekin panicking headline misleading hai. Aapka ispar kya nazariya hai? Niche comments mein apna perspective zaroor share karein.',
        productionCue: '[CTA: Direct eye contact, subtle subscribe motion graphic, end screen cards]',
        timestamp: '06:45',
        durationSec: 30,
      },
    ],
  },

  storyboard: {
    totalScenes: 14,
    aRollCount: 6,
    bRollCount: 8,
    scenes: [
      {
        sceneNumber: 1,
        timestamp: '00:00',
        durationSec: 18,
        type: 'A-ROLL',
        framing: 'MCU (Medium Close-Up)',
        spokenTextSnippet: 'Aaj ka mudda sirf ek headline nahi hai — yeh ek international case study hai...',
        visualDirection: 'Anchor center-frame at dark walnut desk, soft key light at 45 degrees, muted dark navy backdrop with faint amber accent, eye contact locked.',
        aiImagePrompt: 'Cinematic medium close-up of a Pakistani content creator at a clean modern dark wooden desk, soft studio lighting, muted navy and charcoal background, 50mm f/1.8 lens, broadcast quality realism, 8k.',
        bRollKeywords: ['studio anchor', 'news explainer desk', 'cinematic host lighting'],
        audioCue: 'Low atmospheric bass drone, 70 BPM, tension build',
        transition: 'Hard cut',
      },
      {
        sceneNumber: 2,
        timestamp: '00:18',
        durationSec: 15,
        type: 'B-ROLL',
        framing: 'Wide Shot',
        spokenTextSnippet: 'Har channel par ek hi breaking line — tension at the LoC...',
        visualDirection: 'Rapid montage of news tickers, spinning television graphics, high contrast newspapers, desaturated military barbed-wire fence at twilight.',
        aiImagePrompt: 'High contrast photojournalistic montage of glowing TV news tickers and newspapers in dramatic spotlight, barbed-wire border fence in twilight mist, hyperrealistic documentary photography.',
        bRollKeywords: ['news headlines montage', 'border barbed wire evening', 'tv ticker glitch'],
        audioCue: 'Subtle TV static glitch into rising cello strings',
        transition: 'Whip pan',
      },
      {
        sceneNumber: 3,
        timestamp: '00:33',
        durationSec: 22,
        type: 'MOTION GRAPHIC',
        framing: 'Overhead',
        spokenTextSnippet: 'Satellite records aur actual DGMO agreements ko layer by layer dekhte hain...',
        visualDirection: '3D animated relief map of South Asia with glowing green ceasefire demarcations and timeline badges from 2021 to 2026.',
        aiImagePrompt: '3D holographic topographical map of mountain ranges and geopolitical boundary lines, glowing data nodes, clean slate design, UI HUD overlays, 4k resolution.',
        bRollKeywords: ['geopolitical map 3d', 'satellite terrain animation', 'hud data overlay'],
        audioCue: 'Tech UI clicks, digital sweep sound effect',
        transition: 'Zoom in',
      },
      {
        sceneNumber: 4,
        timestamp: '00:55',
        durationSec: 35,
        type: 'A-ROLL',
        framing: 'MCU (Medium Close-Up)',
        spokenTextSnippet: 'Pehla mudda: infrastructure modernization...',
        visualDirection: 'Side angle 2-camera setup switch, host gesturing toward floating holographic bullet points appearing in the negative space.',
        aiImagePrompt: 'Side-angle camera shot of professional video creator speaking with hand gesture, shallow depth of field, sleek studio background, cinematic warm key light.',
        bRollKeywords: ['youtube presenter talking', 'host explaining hand gestures'],
        audioCue: 'Gentle acoustic percussion groove, focused analytical tone',
        transition: 'Cross dissolve',
      },
    ],
  },

  thumbnails: {
    overallCtr: 13.8,
    variants: [
      {
        id: 'safe',
        name: 'Safe',
        tagline: 'High familiarity, tested curiosity formula, reliable CTR',
        predictedCtr: 11.4,
        textOverlay: '46% OF HEADLINES FAKE?',
        visualComposition: 'Host looking directly at viewer with skeptical, discerning expression in left-third; split behind with high-contrast border map and question mark graphic.',
        faceDirection: 'Direct to camera, left third',
        colorPalette: ['#0F172A', '#E50914', '#FBBF24'],
        midjourneyPrompt:
          'YouTube thumbnail portrait of an expressive Pakistani creator with skeptical thoughtful expression, looking at camera on left third, dark cinematic navy studio, bold high-contrast background with red accents and dramatic rim lighting, vibrant HDR, rule of thirds, 16:9 --ar 16:9 --v 6.0',
        dallEPrompt:
          'A high quality professional YouTube thumbnail featuring a handsome Pakistani man with a skeptical look, cinematic studio lighting, red and dark blue background, bold aesthetic, 16:9 aspect ratio.',
      },
      {
        id: 'bold',
        name: 'Bold',
        tagline: 'High emotional contrast, shocking visual anchor, virality driver',
        predictedCtr: 14.8,
        textOverlay: 'THE REAL BORDER TRUTH',
        visualComposition: 'Host in center-right looking shocked with open hand pointing back at a stark red satellite thermal visual showing zero troop activity.',
        faceDirection: 'Slightly angled pointing back, center-right',
        colorPalette: ['#18181B', '#EF4444', '#FFFFFF'],
        midjourneyPrompt:
          'Viral high-CTR YouTube thumbnail of an intense creator pointing towards a glowing red satellite radar map behind him, ultra-crisp facial detail, dramatic side shadow, vibrant crimson and stark white color contrast, 16:9 format --ar 16:9 --v 6.0',
        dallEPrompt:
          'YouTube thumbnail style image of a Pakistani male host pointing backwards at a large glowing red radar display, shock expression, vibrant colors, clean high-impact lighting, 16:9 ratio.',
      },
      {
        id: 'experimental',
        name: 'Experimental',
        tagline: 'Contrarian intellectual intrigue, clean aesthetic for high-retention viewers',
        predictedCtr: 12.6,
        textOverlay: 'DECODED IN 10 MINS',
        visualComposition: 'Minimalist editorial composition: Host in monochrome silhouette with neon cyan data overlays running down the center, clean bold yellow typography.',
        faceDirection: 'Profile silhouette turning forward',
        colorPalette: ['#030712', '#06B6D4', '#EAB308'],
        midjourneyPrompt:
          'Editorial minimalist YouTube thumbnail, dark cinematic aesthetic, subtle neon cyan holographic lines, clean striking visual composition, intelligent and premium look, 8k --ar 16:9 --v 6.0',
        dallEPrompt:
          'Minimalist dark YouTube thumbnail with an intellectual creator silhouette and glowing cyan data streams, premium docuseries aesthetic, 16:9 ratio.',
      },
    ],
  },

  seo: {
    titleVariants: [
      {
        title: 'India–Pakistan Border: The Truth Behind Today’s Headlines',
        score: 95,
        hookCategory: 'Curiosity Gap',
      },
      {
        title: 'Why The Border Headlines Flared Again (Ground Reality Explained)',
        score: 92,
        hookCategory: 'Urgent Question',
      },
      {
        title: 'Don’t Believe What TV News Said About The Border Today.',
        score: 97,
        hookCategory: 'Bold Statement',
      },
    ],
    description: `Is the situation on the India-Pakistan border actually escalating, or is the 24/7 TV news cycle magnifying routine tactical maintenance? In this deep-dive explainer, we analyze official DGMO agreements, cross-border ceasefire records from 2021 to 2026, satellite tracking data, and the backchannel diplomacy that mainstream media doesn’t talk about.

Timestamps:
00:00 - The Breaking Headline Phenomenon
00:18 - Fact vs TRP Sensationalism
00:50 - The 2021 DGMO Ceasefire Agreement
02:15 - Factor 1: Internal Political Dynamics
04:00 - Factor 2: Infrastructure & Anti-Drone Upgrades
05:30 - Factor 3: Trade & Backchannel Diplomacy
06:45 - Final Verdict & What Happens Next

Sources & Reference Documents:
1. Ministry of Foreign Affairs (MOFA) Official Briefings: mofa.gov.pk
2. 2021 DGMO Joint Statement Archive
3. Indus Waters Treaty Arbitration Reports
4. Reuters International South Asia Bureau

Disclaimer:
This video is created strictly for educational and analytical purposes based on publicly accessible government and journalistic documentation. It does not contain political endorsement or classified intelligence.

#Geopolitics #PakistanNews #CurrentAffairs #ForeignPolicy #PakistanExplains`,
    tags: [
      'pakistan border geopolitics',
      'loc update today',
      'pakistan foreign policy news',
      'geopolitics explainer urdu',
      'dgmo ceasefire 2021',
      'border defense status',
      'border news reality',
      'south asia regional policy',
      'ground reality explainer',
      'satellite imagery loc',
      'foreign affairs analysis',
    ],
    chapters: [
      { timestamp: '00:00', title: 'The Breaking Headline Phenomenon' },
      { timestamp: '00:50', title: '2021 DGMO Agreement Record' },
      { timestamp: '02:15', title: 'Factor 1: Domestic Politics' },
      { timestamp: '04:00', title: 'Factor 2: Drone Tower Upgrades' },
      { timestamp: '05:30', title: 'Factor 3: Secret Backchannels' },
      { timestamp: '06:45', title: 'Ground Verdict & Conclusion' },
    ],
    pinnedComment:
      '📌 Question for you: Do you feel mainstream news channels should be held legally accountable for exaggerated military headlines? Let me know your honest take below — replying to top comments!',
    suggestedHashtags: ['#Geopolitics', '#PakistanNews', '#CurrentAffairs', '#PakistanIntellect'],
  },

  shorts: {
    postingSchedule: 'Post Clip 1 at 12:30 PM (lunch peak) -> Post Clip 2 next day at 7:00 PM (commute peak)',
    clips: [
      {
        id: 'short-1',
        clipNumber: 1,
        title: 'TV News Is Lying About The Border?',
        hook3Sec: 'Border par tension shuru ho gayi? Before you panic, check this one stat.',
        script:
          'Har news channel par red sirens hain: "Border par tension". Lekin satellite radar records yeh dikhate hain ki 2021 ceasefire ke baad incidents mein 92% decline aaya hai. TV studio ke screamed headlines aur ground reality mein zameen aasmaan ka farak hai. Full breakdown channel par live hai!',
        visualCue: 'Fast cut between screaming TV graphics and calm military surveillance radar map.',
        durationSec: 42,
        igCaption:
          'Before believing breaking news graphics, look at verified DGMO records. 📊 Full breakdown on our YouTube channel! Link in bio.',
        hashtags: ['#BorderReality', '#Geopolitics', '#FakeNewsCheck', '#PakistanIntellect', '#ShortsPakistan'],
        whatsAppStatusDraft: '🚨 Border par kya sach mein tension badhi hai? The real fact check is shocking. Watch full video on YouTube!',
        communityPostDraft:
          'Did you catch the sudden wave of border headlines today? We analyzed satellite tracking data and the 2021 DGMO treaty to uncover what’s actually happening. Watch now on our channel: [Link]',
      },
      {
        id: 'short-2',
        clipNumber: 2,
        title: 'The Secret Weapon On The LoC',
        hook3Sec: 'Border surveillance par tanks nahi, yeh choti machines patrol kar rahi hain.',
        script:
          'Dono sides ab conventional posts nahi, electronic anti-drone sensors deploy kar rahi hain. Pichle 1 saal mein multiple unauthorized quadcopters neutralize hue hain. Yeh conventional warfare nahi, modern autonomous surveillance war hai. Subscribe for real intel.',
        visualCue: 'Close-up camera pan across sleek electronic jamming tower and drone interception graphic.',
        durationSec: 38,
        igCaption:
          'Why modern borders fight with radar frequencies, not bullets. 🛰️ Save this reel!',
        hashtags: ['#TechAtBorder', '#DroneWarfare', '#DefenseTech', '#RegionalSecurity', '#ReelsPakistan'],
        whatsAppStatusDraft: 'Drone jammer technology on border LoC explained in 40 seconds. Check this out!',
        communityPostDraft:
          'Drone technology has completely transformed border vigilance over the last 18 months. Have you noticed how warfare tech has changed? Full deep dive live on our channel.',
      },
      {
        id: 'short-3',
        clipNumber: 3,
        title: 'Why Bilateral Trade Never Truly Dies',
        hook3Sec: 'Even after 2019, billions in goods still move. How?',
        script:
          'Direct trade bhale hi drop hua ho, lekin Dubai aur Singapore ke third-party routing se pharma aur textile trade ab bhi active hai. Geopolitical diplomacy public mein alag hoti hai, aur global commerce background mein alag. Full video pinned on profile!',
        visualCue: 'Cargo ship routing animated lines from Mumbai to Dubai to Karachi.',
        durationSec: 45,
        igCaption: 'The economics behind foreign policy nobody teaches in school. 🚢 Link in bio.',
        hashtags: ['#TradeSecrets', '#EconomicsExplained', '#Geopolitics101', '#SirfShoot'],
        whatsAppStatusDraft: 'How foreign trade routes really work behind closed doors. Must-watch snippet!',
        communityPostDraft:
          'Economics always moves faster than politics. We broke down the covert cargo routes connecting South Asia today. Link above!',
      },
    ],
  },
};

export const DEFAULT_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Tariq Mehmood',
    phone: '+92 300 8472911',
    email: 'tariq.mehmood@pkrealestate.com',
    status: 'visita',
    priority: 'urgente',
    source: 'instagram',
    propertyType: 'Luxury Penthouse (Gulberg III)',
    budget: 'PKR 85,000,000',
    notes: 'Requested video walkthrough and SAC mortgage comparison schedule for Meezan Bank.',
    createdAt: '2026-10-10T14:30:00Z',
  },
  {
    id: 'lead-2',
    name: 'Sarah Jenkins',
    phone: '+1 415 555 2671',
    email: 'sarah.j@venturemedia.io',
    status: 'proposta',
    priority: 'alta',
    source: 'youtube',
    propertyType: 'Media Studio Commercial Lease',
    budget: 'PKR 45,000,000',
    notes: 'Reviewed AI script and wants automated 3-scene video teaser for listing presentation.',
    createdAt: '2026-10-09T11:15:00Z',
  },
  {
    id: 'lead-3',
    name: 'Faisal Qureshi',
    phone: '+92 321 9988776',
    email: 'faisal.q@gmail.com',
    status: 'contato',
    priority: 'media',
    source: 'portal',
    propertyType: '4-Bed Contemporary Villa (DHA Phase 6)',
    budget: 'PKR 62,000,000',
    notes: 'Sent WhatsApp brochure and AI market valuation report with m² benchmark.',
    createdAt: '2026-10-11T09:00:00Z',
  },
  {
    id: 'lead-4',
    name: 'Carlos Oliveira',
    phone: '+1 305 555 7890',
    email: 'carlos.investor@realtygroup.com',
    status: 'novo',
    priority: 'baixa',
    source: 'trafego_pago',
    propertyType: 'Prime Downtown Apartment Suite',
    budget: 'PKR 42,000,000',
    notes: 'Inbound buyer lead via Meta Ads. Requested mortgage simulation and payment breakdown.',
    createdAt: '2026-10-12T04:20:00Z',
  },
  {
    id: 'lead-5',
    name: 'Amina Begum',
    phone: '+92 333 4567890',
    email: 'amina.b@lifestylepk.com',
    status: 'fechado',
    priority: 'urgente',
    source: 'indicacao',
    propertyType: 'Serviced Suite (Bahria Town)',
    budget: 'PKR 28,500,000',
    notes: 'Deal closed! Title transfer completed with verified documentation checklist.',
    createdAt: '2026-10-05T16:00:00Z',
  },
];

export const DEFAULT_LEAD_REMINDERS: LeadReminder[] = [
  {
    id: 'rem-1',
    leadId: 'lead-1',
    leadName: 'Tariq Mehmood',
    title: 'Send updated Meezan vs HBL mortgage installment amortization sheet',
    remindAt: '2026-10-12T16:00:00Z',
    completed: false,
  },
  {
    id: 'rem-2',
    leadId: 'lead-2',
    leadName: 'Sarah Jenkins',
    title: 'Follow up on counter-proposal for Gulberg studio lease',
    remindAt: '2026-10-13T10:00:00Z',
    completed: false,
  },
];

export const DEFAULT_COURSE_LESSONS: CourseLesson[] = [
  {
    id: 'lesson-1',
    moduleTitle: 'Module 1: High-Performance Paid Traffic',
    title: 'How to Run Meta Ads for PKR 1,000–2,500/day ($5–10/day) That Actually Convert',
    durationMin: 14,
    completed: true,
    description: 'Learn the exact CBO campaign setup, lookalike audiences, and geography radius targeting top buyers.',
    keyTakeaways: [
      'Focus on Lead Form ads with high-intent qualification questions.',
      'Test 3 visual creatives per ad set: 1 video tour, 1 carousel, 1 static headline.',
      'Cap cost-per-lead (CPL) and scale winning angles immediately.',
    ],
  },
  {
    id: 'lesson-2',
    moduleTitle: 'Module 2: High-Converting Video Ad Formats',
    title: 'The 3-Second Cold Open: Hooks That Stop the Scroll',
    durationMin: 18,
    completed: true,
    description: 'Master the psychological formula behind viral real estate and product ad creatives.',
    keyTakeaways: [
      'Never start with your logo or generic greetings.',
      'Open with an unexpected price contrast or architectural curiosity gap.',
      'Use kinetic captions and bold color highlights on key value propositions.',
    ],
  },
  {
    id: 'lesson-3',
    moduleTitle: 'Module 3: WhatsApp Closing Automation',
    title: 'The 5-Minute Follow-Up Protocol: Converting Inbound DMs Into Booked Visits',
    durationMin: 12,
    completed: false,
    description: 'Step-by-step objection handling templates for WhatsApp and SMS.',
    keyTakeaways: [
      'Respond within 5 minutes for a 9x increase in conversion rate.',
      'Send a 15-second personalized voice note rather than a generic text wall.',
      'Offer two specific time slots for virtual or on-site showings.',
    ],
  },
  {
    id: 'lesson-4',
    moduleTitle: 'Module 4: Organic Reach & Algorithm Dominance',
    title: 'Reels, YouTube Shorts & TikTok: How to Generate 50,000+ Views Organically',
    durationMin: 22,
    completed: false,
    description: 'Turn property walk-throughs and market analyses into viral content engines.',
    keyTakeaways: [
      'Optimize sound design with upbeat trending or luxury lo-fi tracks.',
      'Structure video into 3 distinct beats: The Hook, The Reveal, The Verdict.',
      'Pin high-converting comment linking directly to WhatsApp consultation.',
    ],
  },
];

export const DEFAULT_SAVED_DESCRIPTIONS: SavedDescription[] = [
  {
    id: 'desc-1',
    title: 'Ultra-Modern Penthouse with Panoramic City View',
    propertyType: 'Penthouse',
    location: 'Gulberg III, Lahore',
    tone: 'Elegant & Sophisticated',
    shortCopy: '✨ Breathtaking duplex penthouse in Gulberg III! 4 bedrooms, private pool, and 360° panoramic views. Book your private walkthrough via WhatsApp!',
    detailedCopy: '🏡 ABSOLUTE LUXURY & PRIVACY IN GULBERG III\n\nExperience premier elegance at the most prestigious address in town. This magnificent duplex penthouse blends contemporary architecture with world-class imported finishes.\n\n📍 Property Highlights:\n• 4 spacious en-suite bedrooms with walk-in dressing areas\n• Double-height open-concept living lounge\n• Rooftop terrace with private heated plunge pool\n• 4 covered parking spots and private storage\n• 24/7 biometric security and smart home controls\n\nDirect owner purchase terms available. Schedule your exclusive private tour via WhatsApp.',
    hashtags: ['#LuxuryRealEstate', '#PenthouseLiving', '#PrimeLocation', '#SirfShootAI', '#ExclusiveListing'],
    createdAt: '2026-10-11T12:00:00Z',
  },
];

export const DEFAULT_SAVED_VALUATIONS: SavedValuation[] = [
  {
    id: 'val-1',
    title: 'Gulberg III Luxury Residential Assessment',
    location: 'Gulberg III, Lahore',
    areaSqM: 350,
    estimatedValueMin: 78000000,
    estimatedValueAvg: 85000000,
    estimatedValueMax: 92000000,
    pricePerSqM: 242857,
    marketDemand: 'High',
    createdAt: '2026-10-10T15:00:00Z',
  },
];

export const DEFAULT_SAVED_FINANCINGS: SavedFinancing[] = [
  {
    id: 'fin-1',
    propertyValue: 85000000,
    downPayment: 17000000,
    termMonths: 240,
    bestBank: 'Meezan Bank (Islamic Diminishing Musharakah)',
    firstInstallment: 585000,
    lastInstallment: 283333,
    system: 'SAC',
    createdAt: '2026-10-11T17:30:00Z',
  },
];

export const ADMIN_USER_STATE: UserState = {
  id: 'user-admin-llre',
  name: 'LLRE UAE Admin',
  email: 'llre.uae@gmail.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  channelName: 'LLRE UAE Studio',
  plan: 'studio',
  creditsRemaining: 9999,
  creditsTotal: 9999,
  trialDaysRemaining: 365,
  activeFingerprints: DEFAULT_TONE_FINGERPRINTS,
  projects: [SAMPLE_PROJECT],
  leads: DEFAULT_LEADS,
  leadReminders: DEFAULT_LEAD_REMINDERS,
  savedDescriptions: DEFAULT_SAVED_DESCRIPTIONS,
  savedValuations: DEFAULT_SAVED_VALUATIONS,
  savedFinancings: DEFAULT_SAVED_FINANCINGS,
  completedLessonIds: ['lesson-1', 'lesson-2'],
};

export const INITIAL_USER_STATE: UserState = {
  id: 'user-creator-01',
  name: 'Hamza Khan',
  email: 'creator@sirfshoot.ai',
  role: 'creator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  channelName: 'Tech & Geopolitics PK',
  plan: 'creator',
  creditsRemaining: 5,
  creditsTotal: 7,
  trialDaysRemaining: 7,
  activeFingerprints: DEFAULT_TONE_FINGERPRINTS,
  projects: [SAMPLE_PROJECT],
  leads: DEFAULT_LEADS,
  leadReminders: DEFAULT_LEAD_REMINDERS,
  savedDescriptions: DEFAULT_SAVED_DESCRIPTIONS,
  savedValuations: DEFAULT_SAVED_VALUATIONS,
  savedFinancings: DEFAULT_SAVED_FINANCINGS,
  completedLessonIds: ['lesson-1'],
};
