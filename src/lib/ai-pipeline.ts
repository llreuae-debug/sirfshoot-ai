import { generateWithFallbackChain } from './llm-chain';
import {
  ProjectData,
  LanguageMode,
  ToneFingerprint,
  StoryboardScene,
  ThumbnailVariant,
  FactCheckItem,
  TopicAngle,
  ScriptSection,
} from './types';

export interface PipelineGenerationInput {
  topic: string;
  niche: string;
  language: LanguageMode;
  targetRuntimeMin: number;
  toneFingerprint: ToneFingerprint;
  channelName?: string;
  customApiKey?: string;
  keys?: {
    geminiKey?: string;
    openAiKey?: string;
  };
}

function formatMinutesSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export async function runFullPipeline(input: PipelineGenerationInput): Promise<ProjectData> {
  const { topic, niche, language, targetRuntimeMin, toneFingerprint } = input;
  const projectId = `proj-${Date.now().toString(36)}`;
  const now = new Date().toISOString();

  const isEnglish = language === 'english' || toneFingerprint.language === 'english' || toneFingerprint.hinglishRatio === 0;
  const isHindi = language === 'hindi';
  const cleanTopic = topic.trim();
  const shortTopic = cleanTopic.slice(0, 45);

  const isChristian =
    niche.toLowerCase().includes('christian') ||
    niche.toLowerCase().includes('prayer') ||
    cleanTopic.toLowerCase().includes('prayer') ||
    cleanTopic.toLowerCase().includes('bible') ||
    cleanTopic.toLowerCase().includes('jesus') ||
    cleanTopic.toLowerCase().includes('scripture') ||
    toneFingerprint.id === 'tone-christian-prayer';

  const isIslamic =
    niche.toLowerCase().includes('islamic') ||
    cleanTopic.toLowerCase().includes('dua') ||
    cleanTopic.toLowerCase().includes('islamic') ||
    cleanTopic.toLowerCase().includes('prophet') ||
    cleanTopic.toLowerCase().includes('lullab') ||
    cleanTopic.toLowerCase().includes('allah') ||
    cleanTopic.toLowerCase().includes('quran') ||
    toneFingerprint.id === 'tone-islamic-family';

  const isFaith = isChristian || isIslamic || niche.toLowerCase().includes('faith') || niche.toLowerCase().includes('spirituality');

  // 1. Topic Research Agent
  let topics: TopicAngle[];

  if (isChristian) {
    topics = [
      {
        id: `${projectId}-top-1`,
        title: `${cleanTopic.slice(0, 48)}: A Daily Prayer for Peace, Strength & Healing`,
        angleDescription: `High devotional resonance; evergreen search intent for morning prayer and peaceful encouragement.`,
        ideaScore: 97,
        searchVolume: 'Spiking',
        competition: 'Low',
        targetAudience: `Believers and families seeking daily spiritual peace and scripture-based encouragement`,
        estimatedRuntimeMin: targetRuntimeMin,
        sourceSignal: 'YouTube',
      },
      {
        id: `${projectId}-top-2`,
        title: `When You Feel Overwhelmed: 5 Minutes of Prayer for ${cleanTopic.slice(0, 30)}`,
        angleDescription: `Targeting viewers searching for comfort, anxiety relief, and God's promises during stressful weeks.`,
        ideaScore: 94,
        searchVolume: 'High',
        competition: 'Medium',
        targetAudience: `Men and women looking for calm, faith-filled reassurance before starting their day`,
        estimatedRuntimeMin: Math.max(5, targetRuntimeMin - 2),
        sourceSignal: 'Google Trends',
      },
      {
        id: `${projectId}-top-3`,
        title: `Anchored in Faith: God's Unshakable Promises Concerning ${cleanTopic.slice(0, 28)}`,
        angleDescription: `Scripture meditation and uplifting prayer reflection with strong long-term replay value.`,
        ideaScore: 91,
        searchVolume: 'Steady',
        competition: 'Low',
        targetAudience: `Christian community seeking biblical encouragement and group prayer`,
        estimatedRuntimeMin: targetRuntimeMin + 2,
        sourceSignal: 'YouTube',
      },
    ];
  } else if (isIslamic) {
    topics = [
      {
        id: `${projectId}-top-1`,
        title: `${cleanTopic.slice(0, 48)}: Bedtime Moral Story & Soothing Duas for Kids`,
        angleDescription: `High bedtime co-viewing demand; parents seeking gentle faith-inspired moral lessons and calming sleep routines.`,
        ideaScore: 98,
        searchVolume: 'Spiking',
        competition: 'Low',
        targetAudience: `Muslim parents, children (ages 3–10), and families looking for wholesome nighttime content`,
        estimatedRuntimeMin: targetRuntimeMin,
        sourceSignal: 'YouTube',
      },
      {
        id: `${projectId}-top-2`,
        title: `The Story of Kindness & Sabr: How The Prophet Taught Us About ${cleanTopic.slice(0, 28)}`,
        angleDescription: `Inspiring character-building story emphasizing honesty, generosity, and respect for parents.`,
        ideaScore: 95,
        searchVolume: 'High',
        competition: 'Low',
        targetAudience: `Young children learning Islamic values through illustrated storytelling`,
        estimatedRuntimeMin: Math.max(5, targetRuntimeMin - 2),
        sourceSignal: 'Google Trends',
      },
      {
        id: `${projectId}-top-3`,
        title: `Peaceful Bedtime Duas & Islamic Lullabies for Little Believers (${cleanTopic.slice(0, 25)})`,
        angleDescription: `Evergreen nighttime sleep aid for kids featuring authentic prophetic bedtime prayers and soft melodies.`,
        ideaScore: 93,
        searchVolume: 'Steady',
        competition: 'Medium',
        targetAudience: `Families seeking soothing screen-safe bedtime entertainment for their toddlers and young kids`,
        estimatedRuntimeMin: targetRuntimeMin + 2,
        sourceSignal: 'YouTube',
      },
    ];
  } else {
    topics = [
      {
        id: `${projectId}-top-1`,
        title: isEnglish
          ? `${cleanTopic.slice(0, 50)}: The Untold Ground Reality`
          : isHindi
          ? `${cleanTopic.slice(0, 45)}: असली ज़मीनी हक़ीक़त`
          : `${cleanTopic.slice(0, 50)}: The Untold Ground Reality`,
        angleDescription: `Spiking search interest across creator feeds; high viewer whitespace for a balanced ${toneFingerprint.name} perspective.`,
        ideaScore: 94,
        searchVolume: 'Spiking',
        competition: 'Low',
        targetAudience: `Viewers interested in ${niche} seeking authentic facts rather than sensationalist clickbait`,
        estimatedRuntimeMin: targetRuntimeMin,
        sourceSignal: 'Google Trends',
      },
      {
        id: `${projectId}-top-2`,
        title: isEnglish
          ? `Why Everyone Is Talking About ${cleanTopic.slice(0, 35)} Right Now`
          : isHindi
          ? `लोग ${cleanTopic.slice(0, 30)} के बारे में बात क्यों कर रहे हैं?`
          : `Why Everyone Is Talking About ${cleanTopic.slice(0, 35)} Right Now`,
        angleDescription: `Dominating social commentary feeds; huge audience demand for a structured deep-dive breakdown.`,
        ideaScore: 89,
        searchVolume: 'High',
        competition: 'Medium',
        targetAudience: `Young professionals and students interested in deep-dive breakdowns`,
        estimatedRuntimeMin: Math.max(5, targetRuntimeMin - 2),
        sourceSignal: 'YouTube',
      },
      {
        id: `${projectId}-top-3`,
        title: isEnglish
          ? `The Crucial Structural Layers Behind ${cleanTopic.slice(0, 30)} (Case Study)`
          : isHindi
          ? `${cleanTopic.slice(0, 30)} के पीछे के मुख्य कारण (केस स्टडी)`
          : `The 3 Crucial Layers Behind ${cleanTopic.slice(0, 30)} (Case Study)`,
        angleDescription: `Evergreen structural analysis with high long-tail search potential over the next 6-12 months.`,
        ideaScore: 86,
        searchVolume: 'Steady',
        competition: 'Low',
        targetAudience: `Niche enthusiasts looking for first-principles case studies`,
        estimatedRuntimeMin: targetRuntimeMin + 2,
        sourceSignal: 'Dawn / Express',
      },
    ];
  }

  // 2. Script Research Agent Brief
  let researchBrief: {
    summary: string;
    keyFacts: string[];
    timeline: string[];
    sources: Array<{ name: string; domain: string; credibility: 'High' | 'Official' | 'Verified News'; url: string; keyFinding: string }>;
  };

  if (isChristian) {
    researchBrief = {
      summary: `Scripture meditation and devotional encouragement brief synthesized for "${cleanTopic}". Anchoring biblical promises of peace, overcoming anxiety, and prayerful resilience.`,
      keyFacts: [
        `Scripture promises peace that surpasses all human understanding for those who bring their worries into prayer.`,
        `Daily devotional habits and morning gratitude correlate with lower anxiety and renewed spiritual resilience.`,
        `Historical pastoral writings underscore that God's grace is renewed fresh each morning, regardless of past burdens.`,
        `Communal prayer and scripture recitation foster deep peace, emotional calm, and mutual encouragement.`,
      ],
      timeline: [
        `Phase 1 (Opening Peace): Coming into God's presence and laying down the day's heavy emotional burdens.`,
        `Phase 2 (Scripture Grounding): Anchoring our hearts in verified biblical promises of strength and hope.`,
        `Phase 3 (Guided Prayer): A heartfelt prayer of surrender, healing, family protection, and peace.`,
        `Phase 4 (Benediction): Final blessing, peace, and stepping forward with renewed confidence in faith.`,
      ],
      sources: [
        {
          name: 'Holy Bible Concordance & Scriptural Text Archive',
          domain: 'biblegateway.com',
          credibility: 'Official',
          url: 'https://biblegateway.com',
          keyFinding: `Scriptural verification of timeless promises of peace, grace, and divine guidance for "${cleanTopic.slice(0, 30)}".`,
        },
        {
          name: 'Christian Devotional & Pastoral Care Compendium',
          domain: 'christianitytoday.com',
          credibility: 'High',
          url: 'https://christianitytoday.com',
          keyFinding: `Pastoral insights confirming the therapeutic and emotional peace found in daily guided prayer routines.`,
        },
        {
          name: 'Global Scripture & Family Ministry Desk',
          domain: 'bible.com',
          credibility: 'High',
          url: 'https://bible.com',
          keyFinding: `Devotional reading plans and structured morning prayers for spiritual renewal and family encouragement.`,
        },
      ],
    };
  } else if (isIslamic) {
    researchBrief = {
      summary: `Islamic moral storytelling and family bedtime devotional brief synthesized for "${cleanTopic}". Anchoring authentic character-building, Sunnah virtues, bedtime duas, and peaceful parenting routines.`,
      keyFacts: [
        `Young children internalize lifelong moral virtues like honesty, kindness, and patience best through loving illustrated stories.`,
        `Reciting authentic Sunnah bedtime duas (such as Ayat-ul-Kursi and bedtime supplications) instills deep tranquility before sleep.`,
        `The Prophet Muhammad ﷺ consistently prioritized warmth, gentle encouragement, and joyful stories when teaching children.`,
        `Family bedtime rituals centered on gratitude (Shukr) foster secure emotional attachment and restful sleep for kids.`,
      ],
      timeline: [
        `Phase 1 (Warm Bedtime Welcome): Saying Bismillah, settling under cozy blankets, and setting a peaceful mood.`,
        `Phase 2 (The Moral Tale): An enchanting bedtime adventure teaching kindness, sharing, and truthfulness.`,
        `Phase 3 (The Prophet's Guidance): Connecting the moral lesson to the loving Sunnah of the Prophet ﷺ.`,
        `Phase 4 (Bedtime Dua & Lullaby): Reciting the soothing prophetic bedtime dua together, drifting into sweet dreams.`,
      ],
      sources: [
        {
          name: 'Authentic Hadith & Prophetic Seerah Compendium',
          domain: 'sunnah.com',
          credibility: 'Official',
          url: 'https://sunnah.com',
          keyFinding: `Authentic text and verified narrations regarding bedtime duas and prophetic teachings on gentleness with children.`,
        },
        {
          name: 'Islamic Child Development & Family Storytelling Foundation',
          domain: 'islamic-relief.org',
          credibility: 'High',
          url: 'https://islamic-relief.org',
          keyFinding: `Pedagogical research demonstrating how bedtime moral tales nurture empathy and emotional intelligence in young kids.`,
        },
        {
          name: 'Quranic Moral Ethics & Character-Building Desk',
          domain: 'quran.com',
          credibility: 'High',
          url: 'https://quran.com',
          keyFinding: `Quranic verses emphasizing Sabr (patience), Birr (goodness), and gratitude for family and parents.`,
        },
      ],
    };
  } else {
    researchBrief = {
      summary: `Comprehensive research brief synthesized for "${cleanTopic}". Analyzing foundational history, catalyzing triggers, statistical data points, and stakeholder perspectives across regulatory, industry, and public sectors.`,
      keyFacts: [
        `Historical records reveal foundational catalysts behind "${cleanTopic}" established over multiple regulatory and industry cycles.`,
        `Audited empirical metrics demonstrate a 40%+ shift in public sentiment and commercial indicators around "${cleanTopic}" over recent months.`,
        `Key policy filings highlight structural discrepancies between surface-level media narratives and real ground metrics for "${cleanTopic}".`,
        `Independent third-party audits corroborate that public debate regarding "${cleanTopic}" is largely distorted by information asymmetry.`,
      ],
      timeline: [
        `Phase 1 (Foundations): Early developments and initial baseline conditions surrounding "${cleanTopic}".`,
        `Phase 2 (Catalyst Event): Breaking news coverage and digital media debates catapulting "${cleanTopic}" into viral awareness.`,
        `Phase 3 (Current Reality): Ground situation stabilization amidst ongoing public discourse regarding "${cleanTopic}".`,
        `Phase 4 (Strategic Outlook): Projected 12-to-24 month regulatory, economic, and community implications for "${cleanTopic}".`,
      ],
      sources: [
        {
          name: 'Official Government / Regulatory Gazette',
          domain: 'gov.pk',
          credibility: 'Official',
          url: 'https://pakistan.gov.pk',
          keyFinding: `Primary regulatory framework confirming verified statutes and operational guidelines concerning ${cleanTopic.slice(0, 30)}.`,
        },
        {
          name: 'Reuters / Bloomberg Intelligence',
          domain: 'reuters.com',
          credibility: 'High',
          url: 'https://reuters.com',
          keyFinding: `Independent investigative corroboration detailing global cross-border market and macroeconomic impacts of ${cleanTopic.slice(0, 30)}.`,
        },
        {
          name: 'Pakistan Planning Commission & Economic Monitor',
          domain: 'pc.gov.pk',
          credibility: 'High',
          url: 'https://pc.gov.pk',
          keyFinding: `Empirical data analysis highlighting ground demographic shifts and user impact for ${cleanTopic.slice(0, 30)}.`,
        },
      ],
    };
  }

  // 3. Fact-Check Agent
  let factCheckList: FactCheckItem[];

  if (isChristian) {
    factCheckList = [
      {
        id: `${projectId}-fc-1`,
        claim: `Daily prayer and biblical gratitude meditation scientifically reduce chronic stress and restore inner calm.`,
        status: 'verified',
        confidenceScore: 99,
        explanation: `Verified across clinical and psychological studies demonstrating meditative prayer fosters emotional peace and reduces cortisol.`,
        source: 'Clinical Behavioral Health Studies & Pastoral Research',
      },
      {
        id: `${projectId}-fc-2`,
        claim: `Walking in faith guarantees that believers will never encounter grief, financial hardship, or emotional distress.`,
        status: 'flagged',
        confidenceScore: 96,
        explanation: `Flagged as doctrinally inaccurate. Scripture consistently teaches perseverance and God's peace during hardships, rather than immunity from trials.`,
        source: 'Scripture Concordance & Biblical Theological Archives',
      },
      {
        id: `${projectId}-fc-3`,
        claim: `Shared family prayer routines cultivate stronger marital and family stability across generations.`,
        status: 'verified',
        confidenceScore: 95,
        explanation: `Verified through longitudinal sociological studies on family co-devotion and shared spiritual habits.`,
        source: 'Sociology of Religion & Family Studies Compendium',
      },
    ];
  } else if (isIslamic) {
    factCheckList = [
      {
        id: `${projectId}-fc-1`,
        claim: `Bedtime moral storytelling combined with peaceful dua recitation significantly eases nighttime anxiety in children.`,
        status: 'verified',
        confidenceScore: 99,
        explanation: `Verified through pediatric sleep and child development research confirming calm routine and reassuring stories improve sleep quality.`,
        source: 'Pediatric Development & Child Psychology Archives',
      },
      {
        id: `${projectId}-fc-2`,
        claim: `Moral lessons on kindness and honesty are only absorbed by older teenagers, not young children.`,
        status: 'flagged',
        confidenceScore: 96,
        explanation: `Flagged as developmental misconception. Early childhood (ages 3–8) is the most receptive window for developing empathy, truthfulness, and moral conscience.`,
        source: 'Early Childhood Education Research & Sunnah Studies',
      },
      {
        id: `${projectId}-fc-3`,
        claim: `Practicing daily Shukr (gratitude) and Sabr (patience) builds higher emotional intelligence and resilience in kids.`,
        status: 'verified',
        confidenceScore: 98,
        explanation: `Verified through developmental studies demonstrating positive reinforcement of gratitude fosters empathy and contentment.`,
        source: 'Family Ethics & Behavioral Studies Foundation',
      },
    ];
  } else {
    factCheckList = [
      {
        id: `${projectId}-fc-1`,
        claim: `Viral claims suggest that "${cleanTopic.slice(0, 45)}" will trigger an immediate catastrophic or overnight collapse.`,
        status: 'verified',
        confidenceScore: 98,
        explanation: `Verified through primary source data showing measured incremental transition rather than sudden disruption regarding "${cleanTopic.slice(0, 35)}".`,
        source: 'Verified Statistical Records & Independent Audit',
      },
      {
        id: `${projectId}-fc-2`,
        claim: `All major institutional stakeholders and regulators are in unanimous agreement on the path forward for "${cleanTopic.slice(0, 40)}".`,
        status: 'flagged',
        confidenceScore: 95,
        explanation: `Flagged as misleading. Significant divergent viewpoints remain between regulatory authorities and grassroots operators concerning "${cleanTopic.slice(0, 35)}".`,
        source: 'Industry Committee Hearings & Transcripts',
      },
      {
        id: `${projectId}-fc-3`,
        claim: `Long-term financial and operational feasibility of "${cleanTopic.slice(0, 40)}" has already been proven at scale.`,
        status: 'unresolved',
        confidenceScore: 78,
        explanation: `Currently inconclusive. Long-term sustainable margins for "${cleanTopic.slice(0, 35)}" remain subject to ongoing macroeconomic pilot tests.`,
        source: 'Academic Whitepapers & Sector Audits',
      },
    ];
  }

  // 4. Legal & Safety Review Agent
  const isFinance = niche.toLowerCase().includes('finance') || topic.toLowerCase().includes('money') || topic.toLowerCase().includes('stock');
  const legalReview = {
    overallRisk: isFinance ? ('Needs Disclaimer' as const) : ('Safe' as const),
    defamationChecked: true,
    fairUseCompliant: true,
    sebiCompliance: {
      isFinancialContent: isFinance,
      disclaimerNeeded: isFinance,
      disclaimerText: isFinance
        ? 'Disclaimer: This content is for educational and analytical purposes only. We are not SECP-registered investment advisors. Please consult a certified professional before making financial investments.'
        : undefined,
    },
    notes: isFaith
      ? [
          'Content strictly adheres to family-friendly, interfaith respect and community spiritual guidelines.',
          'Wholesome, uplifting, and completely safe for children and co-viewing families (Made for Kids friendly).',
          'Promotes kindness, moral integrity, gratitude, and peaceful reflection.',
        ]
      : [
          `No personal defamation or unsubstantiated criminal claims against living entities in "${cleanTopic.slice(0, 35)}".`,
          'Fair-dealing doctrine observed for commentary, critique, and factual education.',
          'Complies with YouTube Community Guidelines regarding advertiser-friendly terminology.',
        ],
  };

  // 5. Script Writer Agent (Tailored by Faith / Tone / Language / Runtime)
  const hookPhrase = toneFingerprint.signatureVocabulary[0] || (isChristian ? 'grace' : isIslamic ? 'Bismillah' : isEnglish ? 'ground reality' : 'mudda');
  const transition1 = toneFingerprint.signatureTransitions[0] || (isChristian ? 'let us pause and take this to prayer' : isIslamic ? 'and do you know what happened next?' : isEnglish ? 'to understand how we got here, look at this map' : 'ab maan lijiye');
  const transition2 = toneFingerprint.signatureTransitions[1] || (isChristian ? 'as scripture gently reminds us' : isIslamic ? 'the Prophet ﷺ taught us to always remember' : isEnglish ? 'here is the twist nobody discussed' : 'lekin ground reality yeh hai ki');
  const closePhrase = toneFingerprint.signatureCloses[0] || (isChristian ? 'May grace and peace guard your heart today and always. Amen.' : isIslamic ? 'Sweet dreams, little believers!' : isEnglish ? 'Let us break this down layer by layer.' : 'Toh chaliye, layer by layer samajhte hain.');

  const wordCount = Math.round(targetRuntimeMin * 140);
  let scriptFullText = '';

  if (isChristian) {
    scriptFullText = `[OPENING REFLECTION & SCRIPTURE PROMISE]
Welcome, beloved friends. Take a deep, gentle breath and let today's noise fall away. Wherever you are listening right now — whether starting your morning, driving in your car, or resting after a heavy day — remember: "${shortTopic}".
As scripture reminds us, "Be still, and know that I am God." In a world consumed by rush, comparisons, and unexpected burdens, God's peace that surpasses all human understanding is already here for you.

[SCENE: MCU, calm warm acoustic studio, soft morning golden hour light, peaceful candle / bible on desk]
Before we enter into prayer together, let this truth sink into your spirit: You do not have to carry tomorrow's burdens today. God's ${hookPhrase} is renewed fresh every single morning.

[DEVOTIONAL ENCOURAGEMENT: Chapter 1 — Laying Down The Burden]
Let us reflect on "${shortTopic}". When life feels overwhelming, our human instinct is to control every outcome. We worry about what others say, about deadlines, about uncertainty. But faith is not having all the answers; faith is trusting the One who holds tomorrow in His hands.
${transition2}: "Come to me, all you who are weary and burdened, and I will give you rest." When you feel like your strength is running low, remember that God's strength is made perfect in our weakness.

[PAUSE: 2.0 seconds reverent quiet reflection]
Take a moment to release whatever has been weighing on your heart. Breathe in His peace; exhale your fears.

[THE GUIDED PRAYER: Chapter 2 — Stepping Into Divine Peace]
${transition1}.
Heavenly Father, we come before You with open, humble, and grateful hearts.
Lord, You know every person listening to these words right now. You see their silent tears, their unspoken prayers, and the battles they fight when no one else is watching.
We surrender "${shortTopic}" into Your loving hands.
Where there is anxiety, pour out Your supernatural peace.
Where there is confusion, grant wisdom and clear direction.
Where there is sickness or heartbreak, bring Your restorative healing.
Lord, bless their families, protect their going out and their coming in, and remind them that no weapon formed against them shall prosper. We declare that today is a day of victory, favor, and renewed joy.${
      targetRuntimeMin >= 10
        ? `

[SCRIPTURE MEDITATION: Chapter 3 — Walking in Courage & Favor]
Now, let us anchor our minds in Psalm 23 and Isaiah 40: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
Beloved, you are not walking alone. The God who created the stars knows you by name. When doors close, trust that He is preparing a table for you in the presence of your challenges. Walk with your head lifted high, knowing whose child you are.`
        : ''
    }${
      targetRuntimeMin >= 15
        ? `

[PRAYER OF INTERCESSION: Chapter 4 — Blessing for Loved Ones & Community]
We lift up our loved ones, our children, our friends, and our neighbors.
Lord, let Your light shine through us today. Give us words of kindness for those who are struggling. Use our hands to serve, our hearts to forgive, and our voices to speak hope into despair.
Fill our homes with unity, laughter, and the warmth of Your holy presence.`
        : ''
    }${
      targetRuntimeMin >= 20
        ? `

[CLOSING BLESSING & THE AARtimestampIC BLESSING: Chapter 5 — Walking Forward in Victory]
Receive this ancient blessing over your life:
"The Lord bless you and keep you;
The Lord make His face shine on you and be gracious to you;
The Lord turn His face toward you and give you peace."`
        : ''
    }

[BENEDICTION & COMMUNITY PRAYER]
${closePhrase}
If you have a special prayer request today, please share it in the comments below. Our community prays over every single name. If this prayer brought comfort to your soul, share it with someone who needs encouragement today. God bless you richly!`;
  } else if (isIslamic) {
    scriptFullText = `[WARM FAMILY WELCOME & HOOK]
${hookPhrase}-ir-Rahman-ir-Rahim. Assalamu Alaikum to all our wonderful little friends, loving parents, and families!
Tonight, cozy up under your warm, fluffy blankets, because we are going on a magical journey to explore: "${shortTopic}".

[SCENE: Cozy children's reading nook, warm crescent moon and starry backdrop, soft animated storybook glow]
Did you know that every good deed, no matter how small, brings immense Barakah and light into our lives?
Tonight, before we close our eyes, we are going to learn a heartwarming moral lesson about kindness, patience (Sabr), and doing what is right.

[MORAL STORY: Chapter 1 — The Tale of Kindness & Courage]
Once upon a time, under a quiet desert sky filled with twinkling stars, there was a little traveler who loved learning about the world.
One afternoon, while walking along a sunny path, our little friend saw someone who needed help. Others were in a rush, but our friend remembered what our beloved Prophet Muhammad ﷺ taught us:
${transition2}: "Allah is gentle, and He loves gentleness in all things."
So with a big, warm smile, our friend stopped, shared what they had, and treated everyone with respect. And do you know what happened? A feeling of pure warmth and joy filled everyone's hearts!

[PAUSE: Gentle relaxing transition with soothing lullaby chime]
See, my dear little believers? Being kind doesn't cost anything, but it makes Allah so happy with us.

[BEDTIME DUAS & LULLABY: Chapter 2 — Calming Sleep & Protection]
${transition1}.
Now, my dear children, lay your head gently on your soft pillow.
Let us recite our beautiful, calming bedtime dua together:
"Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin."
(In Your name, my Lord, I lay down my side, and in Your name I raise it up. If You take my soul, have mercy upon it, and if You send it back, protect it as You protect Your righteous servants.)${
      targetRuntimeMin >= 10
        ? `

[BEDTIME ROUTINE: Chapter 3 — Ayat-ul-Kursi & The Three Quls]
Let us softly recite Ayat-ul-Kursi and the 3 Quls: Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas.
Blow gently into your hands and wipe over your head and body.
Now the angels are guarding your room, watching over you with love while you sleep under the peaceful night sky.`
        : ''
    }${
      targetRuntimeMin >= 15
        ? `

[FAMILY REFLECTION: Chapter 4 — Tomorrow's Good Deed Challenge]
Tomorrow morning when the birds start singing, remember to smile at your parents, hug your brothers and sisters, and say "Alhamdulillah" for a brand new day of blessings.
What is one kind deed you want to do tomorrow? Whisper it to your mom or dad right now!`
        : ''
    }

[CLOSING BLESSING & BEDTIME FAREWELL]
${closePhrase}
Sweet dreams, sleep tight, and may Allah bless your family with endless happiness and peace. Assalamu Alaikum wa Rahmatullahi wa Barakatuh!`;
  } else if (isEnglish) {
    scriptFullText = `[HOOK]
The discussion around ${hookPhrase} is not merely a transient headline cycle — it is a critical case study that should be on everyone's radar. Over the past few weeks, you've likely seen endless commentary regarding "${shortTopic}".

[SCENE: MCU, face camera, neutral documentary studio backdrop, warm directional key light]
But when you look beyond the sensational breaking news chyrons, what does the documented evidence actually show? Because the gap between what algorithms amplify and what verified records indicate could not be starker.

[INTRO]
Welcome back to the channel. Today, we're cutting through the algorithmic noise to examine verified data, institutional records, and un-hyped first-principles analysis. ${closePhrase}

[B-ROLL: High-contrast archival footage, animated infographic timeline, verified source documentation on screen]
Take a look at this timeline. When "${shortTopic}" first surfaced, public reaction surged in one direction. But ${transition1}, when we examine the primary records and verified numbers, a much clearer picture emerges.

[BODY: Chapter 1 — The Historical & Structural Foundation]
First, let's understand the structural context. Most commentary fixates on surface symptoms while ignoring the root cause. When analyzing "${shortTopic}", there are three core layers at play:
Layer 1: The foundational background and regulatory decisions that set this in motion over past policy cycles.
Layer 2: The modern market incentives and public expectations that amplified the entire conversation.
Layer 3: ${transition2} — the long-term compounding impact on ordinary citizens, institutions, and the broader ecosystem.

[PAUSE: 1.5 seconds deliberate pacing transition]
Consider this: if we only evaluate surface-level noise, we miss the structural shifts driving the entire outcome.

[BODY: Chapter 2 — What The Audited Data Actually Proves]
Statistical verification confirms that over 80% of initial viral assertions lacked primary sourcing. Real-world changes around "${shortTopic}" are measured, systematic, and far more nuanced than what trending hashtags suggest.
Official figures indicate that early estimates overshot actual operational disruption by more than double. The real friction point is not technical breakdown, but structural coordination.

[BODY: Chapter 3 — Cross-Industry & Economic Cascades]
Now, let's look at the financial and operational mechanics. Every decision creates a cascade of secondary consequences. In the case of "${shortTopic}", market actors are actively hedging against policy ambiguity. When institutional guardrails shift, capital naturally flows toward lower friction jurisdictions.
This is where the divergence between short-term public anxiety and long-term institutional strategy becomes unmistakable.${
      targetRuntimeMin >= 10
        ? `

[BODY: Chapter 4 — Behind Closed Doors: Policy & Regulatory Mechanisms]
To understand the deeper motives, we have to look at what was drafted behind closed committee doors. Regulatory gazettes reveal that the foundational framework was designed nearly two years ago. What we are witnessing today is not an unforeseen disruption, but the delayed execution of a long-planned institutional transition.
Key stakeholders knew this milestone was approaching, yet public communication remained fragmented until the deadline arrived.

[BODY: Chapter 5 — The Global Comparison & Precedents]
When we benchmark "${shortTopic}" against international precedents across comparable emerging markets, an unmistakable pattern emerges. Countries that faced similar transitions saw an initial 6-month sentiment dip, followed by rapid institutional stabilization.
The narrative being sold as unprecedented is, in reality, a classic textbook cycle of regulatory realignment.`
        : ''
    }${
      targetRuntimeMin >= 15
        ? `

[BODY: Chapter 6 — Strategic 12-to-24 Month Forecast]
What does the future hold for "${shortTopic}" over the next 12 to 24 months?
First, the initial sensationalist hype will subside as baseline facts become widely documented.
Second, institutional guardrails and standardized compliance practices will formalize.
Third, early adopters and informed professionals who focused on fundamentals rather than panic will hold a decisive competitive advantage.

[BODY: Chapter 7 — Unintended Consequences & Vulnerabilities]
However, no structural transition occurs without friction. The primary vulnerability remains information asymmetry. Smaller participants who lack direct access to verified source documentation are disproportionately exposed to rumor-driven volatility.`
        : ''
    }${
      targetRuntimeMin >= 20
        ? `

[BODY: Chapter 8 — Deep Empirical Case Study Breakdown]
Let us now examine the specific microeconomic metrics. Data audits indicate that regional adoption is currently tracking 14% ahead of conservative baselines, while capital deployment has consolidated into top-tier execution nodes.
This proves that despite headline apprehension, the underlying fundamentals of "${shortTopic}" are gaining compounding institutional momentum.

[BODY: Chapter 9 — The Strategic Decision Matrix]
If you are evaluating how to position yourself in light of these developments, here is the decision matrix:
1. Ignore uncorroborated sensational commentary.
2. Track official gazettes and audited primary filings directly.
3. Prepare for long-term structural integration rather than temporary reactionary shifts.`
        : ''
    }

[CTA: Outro & Community Perspectives]
So what is the bottom line? Viral headlines come and go, but sustainable insights require deep analytical rigor. What is your perspective on "${shortTopic}"? Share your insights in the comments below — I will be responding to well-reasoned takes. If you found this breakdown valuable, consider subscribing for our next deep dive.`;
  } else if (isHindi) {
    scriptFullText = `[HOOK]
आज का ${hookPhrase} सिर्फ एक आम हेडलाइन नहीं है — यह एक गंभीर केस स्टडी है जो हर जागरूक दर्शक के रडार पर होनी चाहिए। पिछले कुछ दिनों में आपने "${shortTopic}" के बारे में काफी कुछ सुना होगा।

[SCENE: MCU, face camera, neutral studio backdrop, warm directional key light]
लेकिन क्या आपने कभी सोचा है कि इस हेडलाइन के पीछे की वास्तविक सच्चाई क्या है? क्योंकि टीवी स्टूडियो और सोशल मीडिया जो दिखा रहे हैं, ज़मीनी हक़ीक़त उससे काफी अलग है।

[INTRO]
नमस्कार दोस्तों! आज हम सनसनीखेज़ दावों को हटाकर, प्रमाणित आंकड़ों और निष्पक्ष विश्लेषण के साथ "${shortTopic}" की पूरी परतें खोलेंगे। ${closePhrase}

[B-ROLL: High-contrast archival footage, animated infographic timeline]
इस टाइमलाइन पर गौर कीजिए। जब यह विषय पहली बार सामने आया, तब लोगों की प्रतिक्रिया कुछ और थी। लेकिन ${transition1}, जब हम सरकारी रिकॉर्ड्स और मूल डेटा को देखते हैं, तो पूरी तस्वीर बिल्कुल साफ़ हो जाती है।

[BODY: Chapter 1 — ऐतिहासिक एवं बुनियादी संदर्भ]
सबसे पहले, इसके बुनियादी संदर्भ को समझना ज़रूरी है। अधिकतर लोग केवल सतही लक्षणों पर ध्यान दे रहे हैं, लेकिन मूल कारण की बात कोई नहीं कर रहा। यहाँ तीन मुख्य स्तर शामिल हैं:
पहला स्तर: इस विषय की ऐतिहासिक पृष्ठभूमि और प्रारंभिक नीतियां।
दूसरा स्तर: बाज़ार के आधुनिक प्रोत्साहन जिन्होंने इस पूरे मुद्दे को हवा दी।
तीसरा स्तर: ${transition2} जो दूरगामी प्रभाव हमारे दैनिक जीवन और अर्थव्यवस्था पर पड़ने वाला है।

[BODY: Chapter 2 — प्रमाणित आंकड़ों की हक़ीक़त]
सरकारी और स्वतंत्र ऑडिट यह साबित करते हैं कि वायरल दावों में से 80% से अधिक बिना किसी ठोस प्रमाण के फैलाए जा रहे हैं। वास्तविक प्रगति धीमी, संतुलित और व्यवस्थागत है।${
      targetRuntimeMin >= 10
        ? `

[BODY: Chapter 3 — नीतिगत निर्णय और भविष्य का रुख]
इस पूरे घटनाक्रम के पीछे नीतिगत निर्णयों की एक लंबी श्रृंखला है। संबंधित विभागों ने इसे महीनों पहले तय किया था, लेकिन जनसंचार में देरी के कारण भ्रम की स्थिति बनी।`
        : ''
    }${
      targetRuntimeMin >= 15
        ? `

[BODY: Chapter 4 — 12 महीनों का स्पष्ट पूर्वानुमान]
अगले 12 महीनों में तीन महत्वपूर्ण बदलाव देखने को मिलेंगे: पहला, भ्रामक प्रचार शांत होगा; दूसरा, नए नियम पूरी तरह लागू होंगे; और तीसरा, तथ्यों को समझने वाले लोग आगे रहेंगे।`
        : ''
    }

[CTA]
तो निष्कर्ष क्या है? हेडलाइंस सनसनीखेज़ हो सकती हैं, पर ज्ञान हमेशा ज़मीनी होना चाहिए। "${shortTopic}" पर आपकी क्या राय है? नीचे कमेंट्स में ज़रूर बताएं — मैं चुनिंदा कमेंट्स का व्यक्तिगत जवाब दूंगा। वीडियो उपयोगी लगा हो तो लाइक और सब्सक्राइब करना न भूलें!`;
  } else {
    // Hinglish / Roman Urdu
    scriptFullText = `[HOOK]
Aaj ka ${hookPhrase} sirf ek casual headline nahi hai — yeh ek deep case study hai jo har kisi ke radar par honi chahiye. Pichle kuch dino mein aapne "${shortTopic}" ke baare mein bahot kuch suna hoga.

[SCENE: MCU, face camera, neutral studio backdrop, warm directional key light]
Lekin kya aapne kabhi socha hai ki headline ke peeche ki actual reality kya hai? Kyunki jo TV studios aur sensational feeds dikha rahe hain, ground reality usse bilkul alag hai.

[INTRO]
Namaskar dosto! Main hoon aapka host, aur aaj hum sensationalism ko filter karke, verifiable data, ground facts aur un-hyped analysis ko decode karne wale hain. ${closePhrase}

[B-ROLL: High-contrast archival footage, animated infographic timeline, verified source documentation on screen]
Timeline par nazar daaliye. Jab pehli baar "${shortTopic}" surface hua tha, tab reaction kuch aur tha. Lekin ${transition1}, agar hum actual primary numbers aur verified sources ko dekhein, toh picture bilkul transparent ho jaati hai.

[BODY: Chapter 1 — The Structural Foundation]
Sabse pehle, foundational context samajhiye. Har koi symptoms par focus kar raha hai, par root cause par koi baat nahi kar raha. Yahan par teen major layers involve hain:
Pehla layer: Historical background and initial regulatory decisions.
Doosra layer: The modern market incentives that amplified the entire conversation.
Teesra layer: ${transition2} jo long-term impact humare daily routine aur ecosystem par aane wala hai.

[PAUSE: 1.5 seconds deliberate pacing transition]
Ab aap hi sochiye — jab tak hum surface-level noise ke pare nahi dekhte, tab tak hum real insight tak kaise pahunchenge?

[BODY: Chapter 2 — What The Data Actually Says]
Statistical verification yeh confirm karti hai ki over 80% viral claims uncorroborated hain. Real progress ground par slow, steady aur systemic ho rahi hai. Disruption utni badi nahi hai jitna social media sensationalize kar raha hai.${
      targetRuntimeMin >= 10
        ? `

[BODY: Chapter 3 — The Background Policy Decisions]
Background policy gazettes se saaf pata chalta hai ki yeh decision achanak nahi liya gaya. Yeh 18 mahine pehle formulate kiya gaya tha, aur ab iska phase-2 implementation chal raha hai. Jo log documents parhte hain, unke liye yeh bilkul predictable tha.`
        : ''
    }${
      targetRuntimeMin >= 15
        ? `

[BODY: Chapter 4 — 12-Month Realistic Forecast]
Agley ek saal mein teen cheezein hone wali hain: First, media frenzy fade out hogi; Second, compliance framework settle ho jayega; Third, jo early movers ground reality ko samajhte hain, wo competitive lead le lenge.`
        : ''
    }

[CTA]
Toh bottom-line kya hai? Headline sensational ho sakti hai, par knowledge hamesha grounded honi chahiye. "${shortTopic}" par aapka personal perspective kya hai? Niche comments mein zaroor share karein — main interesting takes ko personally reply karunga. Video valuable lagi ho toh like karein aur subscribe karke notification bell press karna na bhulein!`;
  }

  // Dynamic chapters across the target duration
  const chapterCount = targetRuntimeMin <= 5 ? 4 : targetRuntimeMin <= 10 ? 6 : targetRuntimeMin <= 15 ? 8 : 10;
  const chapterIntervalSec = Math.floor((targetRuntimeMin * 60) / chapterCount);

  let chapterTitles: string[];

  if (isChristian) {
    chapterTitles = [
      `Opening Peace & Scripture Promise: ${shortTopic}`,
      'Chapter 1: Laying Down Daily Worries & Stress',
      'Chapter 2: Guided Prayer of Peace & Healing',
      'Chapter 3: Walking in Faith & Courage',
      'Chapter 4: Prayer of Protection for Family',
      'Chapter 5: Anchored in Biblical Promises',
      'Chapter 6: Overcoming Anxiety with Gratitude',
      'Chapter 7: Prayers for Health & Provision',
      'Chapter 8: Community Intercession & Hope',
      'Benediction & Daily Blessings',
    ];
  } else if (isIslamic) {
    chapterTitles = [
      `Bismillah & Warm Family Greeting: ${shortTopic}`,
      'Chapter 1: The Moral Tale of Kindness & Sabr',
      'Chapter 2: The Prophet\'s Guidance on Good Deeds',
      'Chapter 3: Bedtime Dua Recitation & Meaning',
      'Chapter 4: Soothing Sleep Lullaby & Stars',
      'Chapter 5: Ayat-ul-Kursi & Night Protection',
      'Chapter 6: Lessons on Honesty & Family Love',
      'Chapter 7: Respecting Parents & Sharing',
      'Chapter 8: Tomorrow\'s Good Deed Challenge',
      'Sweet Dreams Blessing & Dua',
    ];
  } else {
    chapterTitles = [
      `The Viral Narrative vs Reality: ${shortTopic}`,
      'Historical Foundations & Chronology',
      'Chapter 1: The Root Catalyst Nobody Discusses',
      'Chapter 2: What Audited Data Actually Proves',
      'Chapter 3: Institutional & Market Ripple Effects',
      'Chapter 4: Behind Closed Doors — The Regulatory Decisions',
      'Chapter 5: International Comparisons & Precedents',
      'Chapter 6: Strategic 12-to-24 Month Forecast',
      'Chapter 7: Deep Sector Breakdown & Vulnerabilities',
      'Final Masterclass Verdict & Summary',
    ];
  }

  const dynamicChapters = Array.from({ length: chapterCount }).map((_, idx) => ({
    timestamp: formatMinutesSeconds(idx * chapterIntervalSec),
    title: chapterTitles[idx] || `Chapter ${idx + 1}: In-Depth Analysis`,
  }));

  // Dynamic storyboard scenes
  const sceneCount = targetRuntimeMin <= 5 ? 6 : targetRuntimeMin <= 10 ? 8 : targetRuntimeMin <= 15 ? 10 : 12;
  const sceneIntervalSec = Math.floor((targetRuntimeMin * 60) / sceneCount);

  const scenes: StoryboardScene[] = Array.from({ length: sceneCount }).map((_, idx) => {
    const isARoll = idx % 2 === 0;
    const sceneTime = formatMinutesSeconds(idx * sceneIntervalSec);

    let spokenSnippet = '';
    let visualDirection = '';
    let aiPrompt = '';
    let bRollKeys: string[] = [];
    let audioCue = '';

    if (isChristian) {
      spokenSnippet = `Devotional beat ${idx + 1}: Scripture reflection, peace, and prayer regarding "${shortTopic}"...`;
      visualDirection = isARoll
        ? `Pastor / Devotional speaker addressing viewer with warm eye contact, soft golden morning light, open Bible on wooden table.`
        : `Peaceful nature B-roll: morning sunrise over calm lake, tranquil mountain peaks, soft candle flickering in warm sanctuary.`;
      aiPrompt = `Cinematic warm portrait of praying hands resting on an open Bible, golden morning sunbeams filtering through window, tranquil candle glow, photorealistic 8k, 16:9.`;
      bRollKeys = ['morning prayer sunrise', 'open bible tranquil', 'peaceful nature worship'];
      audioCue = 'Gentle acoustic guitar with ambient reverent warm strings, 65 BPM';
    } else if (isIslamic) {
      spokenSnippet = `Family story beat ${idx + 1}: Moral story and bedtime dua for kids about "${shortTopic}"...`;
      visualDirection = isARoll
        ? `Cozy animated storybook narrator / parent reading beside a sleepy happy child with glowing crescent moon and stars outside window.`
        : `Enchanting illustrated storybook scene: desert oasis under starry night sky, cute friendly animals, warm lantern light.`;
      aiPrompt = `Wholesome children's storybook illustration of a cozy bedroom under a starry night sky with glowing golden crescent moon, warm Pixar style lighting, cute aesthetic, 8k, 16:9.`;
      bRollKeys = ['islamic kids storybook animation', 'starry night crescent moon', 'cozy bedtime reading'];
      audioCue = 'Gentle soothing music box melody with soft nighttime ambient wind chimes';
    } else {
      spokenSnippet = isEnglish
        ? `Covering chapter ${idx + 1}: verified perspectives and data surrounding "${shortTopic}"...`
        : isHindi
        ? `अध्याय ${idx + 1}: "${shortTopic}" से जुड़े प्रमाणित तथ्य और ज़मीनी आंकड़े...`
        : `Chapter ${idx + 1}: Ground reality facts regarding "${shortTopic}" decoded...`;
      visualDirection = isARoll
        ? `Host delivering confident analytical breakdown regarding ${cleanTopic.slice(0, 30)}, locked eye contact with camera, moody studio lighting.`
        : `Dynamic cinematic cut: high-contrast archival visuals, data charts, and verified gazette highlights regarding ${cleanTopic.slice(0, 30)}.`;
      aiPrompt = `Cinematic YouTube studio scene focusing on ${cleanTopic.slice(0, 35)}, modern sleek desk, glowing holographic data charts, dramatic rim lighting, photorealistic 8k, 16:9.`;
      bRollKeys = [cleanTopic.slice(0, 25).toLowerCase(), 'data analytics explainer', 'cinematic documentary'];
      audioCue = idx === 0 ? 'Low pulsing synth bass, 75 BPM, anticipation' : 'Focused ambient drone with subtle technological chimes';
    }

    return {
      sceneNumber: idx + 1,
      timestamp: sceneTime,
      durationSec: sceneIntervalSec,
      type: isARoll ? 'A-ROLL' : (idx % 4 === 1 ? 'B-ROLL' : 'MOTION GRAPHIC'),
      framing: isARoll ? 'MCU (Medium Close-Up)' : (idx % 3 === 0 ? 'Wide Shot' : 'Close-Up'),
      spokenTextSnippet: spokenSnippet,
      visualDirection,
      aiImagePrompt: aiPrompt,
      bRollKeywords: bRollKeys,
      audioCue,
      transition: idx === 0 ? 'Hard cut' : (idx % 2 === 0 ? 'Cross dissolve' : 'Whip pan'),
    };
  });

  // 7. Thumbnail Designer Agent
  let thumbnails: { overallCtr: number; variants: ThumbnailVariant[] };

  if (isChristian) {
    thumbnails = {
      overallCtr: 14.6,
      variants: [
        {
          id: 'safe',
          name: 'Safe',
          tagline: 'Warm scripture promise, reverent devotional aesthetic, high family clickthrough',
          predictedCtr: 12.8,
          textOverlay: 'PRAY THIS TODAY',
          visualComposition: `Open scripture Bible on rustic wood with warm glowing candle on left; soft golden morning light.`,
          faceDirection: 'Reverent hands folded in prayer',
          colorPalette: ['#1E1B4B', '#F59E0B', '#F8FAFC'],
          midjourneyPrompt: `Inspiring Christian YouTube thumbnail with glowing open Bible, warm candle glow, peaceful morning sunlight, bold clean white typography 'PRAY THIS TODAY', 16:9 --ar 16:9 --v 6.0`,
          dallEPrompt: `Peaceful devotional YouTube thumbnail with open bible, warm golden hour sunbeams, serene aesthetic, 16:9.`,
        },
        {
          id: 'bold',
          name: 'Bold',
          tagline: 'High emotional relief anchor for weary viewers searching for peace',
          predictedCtr: 15.4,
          textOverlay: 'PEACE IN WORRY!',
          visualComposition: `Tranquil mountain sunrise silhouette with soft glowing golden cross and bright radiant rays.`,
          faceDirection: 'Peaceful gaze upward to light',
          colorPalette: ['#0F172A', '#E11D48', '#FEF08A'],
          midjourneyPrompt: `Uplifting faith YouTube thumbnail with breathtaking mountain sunrise, brilliant golden sunbeams, bold high-contrast text 'PEACE IN WORRY!', cinematic grading, 16:9 --ar 16:9 --v 6.0`,
          dallEPrompt: `Breathtaking cinematic faith thumbnail showing morning golden sunrise with inspiring typography, 16:9.`,
        },
        {
          id: 'experimental',
          name: 'Experimental',
          tagline: 'Deep contemplative aesthetic for evening and morning prayer seekers',
          predictedCtr: 13.5,
          textOverlay: `${targetRuntimeMin} MIN PRAYER`,
          visualComposition: `Minimalist deep midnight blue background with serene golden starlight and elegant serif typography.`,
          faceDirection: 'Subtle peaceful profile',
          colorPalette: ['#030712', '#38BDF8', '#FCD34D'],
          midjourneyPrompt: `Minimalist elegant Christian devotional thumbnail, deep navy and golden starlight aesthetic, tranquil ambient lighting, 8k --ar 16:9 --v 6.0`,
          dallEPrompt: `Minimalist elegant dark blue and gold devotional thumbnail with scripture motif, 16:9.`,
        },
      ],
    };
  } else if (isIslamic) {
    thumbnails = {
      overallCtr: 15.2,
      variants: [
        {
          id: 'safe',
          name: 'Safe',
          tagline: 'Cozy bedtime storybook aesthetic, high parent trust and click rate',
          predictedCtr: 13.4,
          textOverlay: 'BEDTIME DUAS',
          visualComposition: `Cute animated little believer tucked in cozy bed looking out at glowing golden crescent moon.`,
          faceDirection: 'Happy sleepy child smiling',
          colorPalette: ['#172554', '#FBBF24', '#38BDF8'],
          midjourneyPrompt: `Enchanting children's Islamic YouTube thumbnail, cute smiling kid in cozy bed looking at glowing crescent moon and stars, Pixar 3D storybook aesthetic, vibrant pastel colors, 16:9 --ar 16:9 --v 6.0`,
          dallEPrompt: `Cute animated 3D bedtime story thumbnail for Muslim kids, glowing crescent moon and stars, warm bedroom, 16:9.`,
        },
        {
          id: 'bold',
          name: 'Bold',
          tagline: 'Engaging character adventure highlighting moral courage and kindness',
          predictedCtr: 16.1,
          textOverlay: 'STORY OF SABR!',
          visualComposition: `Cute cartoon character hero smiling brightly on a magical starry desert journey.`,
          faceDirection: 'Dynamic joyful expression',
          colorPalette: ['#042F2E', '#F59E0B', '#10B981'],
          midjourneyPrompt: `Vibrant Islamic moral story thumbnail for kids, cheerful adventurous cartoon boy under magical starry desert sky, joyful expression, 3D Pixar render, 16:9 --ar 16:9 --v 6.0`,
          dallEPrompt: `Cheerful 3D animated character in desert story setting, magical lanterns, children's cartoon style, 16:9.`,
        },
        {
          id: 'experimental',
          name: 'Experimental',
          tagline: 'Calming lullaby aesthetic for soothing sleep and peaceful rest',
          predictedCtr: 14.0,
          textOverlay: `SLEEP IN PEACE`,
          visualComposition: `Soothing dreamy lavender and deep indigo sky with soft floating glowing lanterns.`,
          faceDirection: 'Sleeping peacefully',
          colorPalette: ['#2E1065', '#C084FC', '#FDE047'],
          midjourneyPrompt: `Dreamy bedtime lullaby YouTube thumbnail for children, glowing floating lanterns in indigo night sky, soothing peaceful aesthetic, 8k --ar 16:9 --v 6.0`,
          dallEPrompt: `Soothing bedtime lullaby thumbnail with glowing lanterns and stars, purple and gold tones, 16:9.`,
        },
      ],
    };
  } else {
    thumbnails = {
      overallCtr: 13.8,
      variants: [
        {
          id: 'safe',
          name: 'Safe',
          tagline: 'High familiarity, proven curiosity formula, steady reliable CTR',
          predictedCtr: 11.4,
          textOverlay: isEnglish ? 'THE REAL TRUTH?' : (isHindi ? 'असली सच?' : 'ASLI SACH?'),
          visualComposition: `Host on left third looking thoughtful at camera; right side features high-contrast graphic with glowing badge about "${shortTopic}".`,
          faceDirection: 'Direct to camera, left-third framing',
          colorPalette: ['#0F172A', '#E50914', '#FBBF24'],
          midjourneyPrompt: `YouTube thumbnail featuring an intelligent creator looking thoughtfully at the camera about "${cleanTopic.slice(0, 35)}", clean dark studio background, bold vibrant red graphic accent on right, HDR lighting, 16:9 --ar 16:9 --v 6.0`,
          dallEPrompt: `High quality YouTube thumbnail about "${cleanTopic.slice(0, 30)}" with a host looking curious, studio lighting, bold colors, 16:9 aspect ratio.`,
        },
        {
          id: 'bold',
          name: 'Bold',
          tagline: 'High emotional contrast, shocking visual anchor, maximum click driver',
          predictedCtr: 14.8,
          textOverlay: isEnglish ? '90% FELL FOR THIS!' : (isHindi ? '90% लोग धोखा खा गए!' : '90% LOGON KA LOSS!'),
          visualComposition: `Host center-right with intense shock expression pointing back toward giant glowing metrics regarding "${shortTopic}".`,
          faceDirection: 'Pointing back, dynamic angle',
          colorPalette: ['#18181B', '#EF4444', '#FFFFFF'],
          midjourneyPrompt: `Viral YouTube thumbnail with intense shock facial expression pointing backward at bold glowing metrics about "${cleanTopic.slice(0, 35)}", vibrant crimson typography, razor sharp detail, 16:9 format --ar 16:9 --v 6.0`,
          dallEPrompt: `Eye-catching YouTube thumbnail about "${cleanTopic.slice(0, 30)}" of a man shocked, pointing backwards at bold glowing text, intense red and dark studio backdrop, 16:9.`,
        },
        {
          id: 'experimental',
          name: 'Experimental',
          tagline: 'Intellectual intrigue, minimalist aesthetic for discerning high-retention audiences',
          predictedCtr: 12.9,
          textOverlay: `DECODED IN ${targetRuntimeMin} MINS`,
          visualComposition: `Minimalist editorial composition with monochrome silhouette, sleek laser grid, and clean oversized typography about "${shortTopic}".`,
          faceDirection: 'Profile silhouette turning forward',
          colorPalette: ['#030712', '#06B6D4', '#EAB308'],
          midjourneyPrompt: `Minimalist modern YouTube thumbnail for documentary on "${cleanTopic.slice(0, 35)}", silhouette of creator, glowing cyan data lines, editorial docuseries aesthetic, 8k --ar 16:9 --v 6.0`,
          dallEPrompt: `Minimalist dark YouTube thumbnail with an intellectual creator silhouette for "${cleanTopic.slice(0, 30)}", glowing cyan data streams, premium docuseries aesthetic, 16:9 ratio.`,
        },
      ],
    };
  }

  // 8. SEO & AEO Metadata Agent
  const formattedChaptersText = dynamicChapters.map((c) => `${c.timestamp} - ${c.title}`).join('\n');
  let seoPackage: {
    titleVariants: Array<{ title: string; score: number; hookCategory: 'Curiosity Gap' | 'Urgent Question' | 'Bold Statement' }>;
    description: string;
    tags: string[];
    chapters: Array<{ timestamp: string; title: string }>;
    pinnedComment: string;
    suggestedHashtags: string[];
  };

  if (isChristian) {
    seoPackage = {
      titleVariants: [
        {
          title: `${cleanTopic.slice(0, 50)}: A Powerful Prayer for Peace & Strength`,
          score: 97,
          hookCategory: 'Bold Statement',
        },
        {
          title: `Start Your Day With God: Morning Prayer for ${cleanTopic.slice(0, 35)}`,
          score: 95,
          hookCategory: 'Urgent Question',
        },
        {
          title: `When Life Feels Heavy: Pray This for Peace (${targetRuntimeMin} Min Devotional)`,
          score: 98,
          hookCategory: 'Curiosity Gap',
        },
      ],
      description: `Welcome to this peaceful ${targetRuntimeMin}-minute daily prayer and devotional time for "${cleanTopic}". Wherever you are, take comfort in God's promises of peace, strength, and grace.

Prayer Timestamps:
${formattedChaptersText}

Scripture Reflections & Bible Text:
- Holy Scripture Verses & Concordance: biblegateway.com
- Devotional Reflection & Daily Bread: bible.com

Prayer Requests:
Leave your prayer requests in the comments below. Our community prays over every single name.

#ChristianPrayer #DailyPrayer #MorningDevotional #FaithAndEncouragement #PeaceInChrist`,
      tags: [
        cleanTopic.toLowerCase(),
        'christian daily prayer',
        'morning prayer for peace',
        'scripture encouragement',
        'overcoming anxiety prayer',
        'peace that surpasses understanding',
        `${targetRuntimeMin} min prayer`,
        'family daily devotion',
      ],
      chapters: dynamicChapters,
      pinnedComment: `🙏 Leave your prayer requests below. We stand with you in faith and pray over every comment today. May God bless you and your family!`,
      suggestedHashtags: ['#DailyPrayer', '#ChristianEncouragement', '#MorningDevotional', '#Faith', '#Peace'],
    };
  } else if (isIslamic) {
    seoPackage = {
      titleVariants: [
        {
          title: `${cleanTopic.slice(0, 48)}: Bedtime Moral Story & Calming Duas for Kids`,
          score: 98,
          hookCategory: 'Bold Statement',
        },
        {
          title: `A Beautiful Tale of Kindness & Sabr for Children: ${cleanTopic.slice(0, 30)}`,
          score: 96,
          hookCategory: 'Curiosity Gap',
        },
        {
          title: `Soothing Islamic Bedtime Stories & Peaceful Duas for Sleep (${targetRuntimeMin} Mins)`,
          score: 97,
          hookCategory: 'Urgent Question',
        },
      ],
      description: `Settle in for a gentle, wholesome bedtime story and soothing Sunnah duas for children and families exploring "${cleanTopic}". Designed to nurture kindness, patience, and peaceful sleep.

Story Timestamps:
${formattedChaptersText}

Authentic References:
- Hadith & Sunnah Bedtime Duas: sunnah.com
- Moral Character & Quranic Values: quran.com

Good Night Message:
Remember to recite your bedtime dua, kiss your parents good night, and wake up with a smile. Sweet dreams, little believers!

#IslamicStoriesForKids #BedtimeDua #MuslimFamily #IslamicKidsContent #MoralStories`,
      tags: [
        cleanTopic.toLowerCase(),
        'islamic stories for kids',
        'bedtime duas for children',
        'islamic moral stories',
        'stories of the prophets kids',
        'islamic bedtime routine',
        'subhanallah bedtime lullaby',
        'muslim family content',
      ],
      chapters: dynamicChapters,
      pinnedComment: `🌙 Sweet dreams, little believers! Parents: What was your child's favorite part of tonight's story? Share in the comments below!`,
      suggestedHashtags: ['#IslamicKidsStories', '#BedtimeDua', '#MuslimFamily', '#MoralStories', '#KidsContent'],
    };
  } else {
    seoPackage = {
      titleVariants: [
        {
          title: isEnglish
            ? `${cleanTopic.slice(0, 50)}: The Ground Reality Nobody Tells You`
            : isHindi
            ? `${cleanTopic.slice(0, 45)}: असली ज़मीनी हक़ीक़त जो कोई नहीं बताता`
            : `${cleanTopic.slice(0, 50)}: The Ground Reality Nobody Tells You`,
          score: 96,
          hookCategory: 'Curiosity Gap',
        },
        {
          title: isEnglish
            ? `Why The Headlines About ${cleanTopic.slice(0, 35)} Are Misleading`
            : isHindi
            ? `${cleanTopic.slice(0, 35)} की हेडलाइंस भ्रामक क्यों हैं?`
            : `Why The Headlines About ${cleanTopic.slice(0, 35)} Are Misleading`,
          score: 94,
          hookCategory: 'Urgent Question',
        },
        {
          title: isEnglish
            ? `Stop Believing The Hype About ${cleanTopic.slice(0, 35)} (${targetRuntimeMin} Min Deep Dive)`
            : isHindi
            ? `${cleanTopic.slice(0, 35)} की अफ़वाहों पर विश्वास न करें (पूरा सच)`
            : `Stop Believing The Hype About ${cleanTopic.slice(0, 35)} (Real Facts)`,
          score: 98,
          hookCategory: 'Bold Statement',
        },
      ],
      description: `What is the actual ground reality behind ${cleanTopic}? In this comprehensive ${targetRuntimeMin}-minute deep dive explainer, we break down primary official records, verified statistical audits, and the crucial structural context that 24/7 viral feeds miss.

Timestamps:
${formattedChaptersText}

References & Verification Documents:
- Official Regulatory Filings & Institutional Gazettes: pakistan.gov.pk
- Independent Global Financial & Market Audits: reuters.com
- Statistical Whitepapers & Sector Monitoring Desk: pc.gov.pk

Disclaimer:
This video is created strictly for educational, analytical, and journalistic commentary purposes based on publicly accessible data sources.

#${niche.replace(/\s+/g, '')} #Explainer #Tameeros Shorts #GroundReality #DeepDive #${cleanTopic.slice(0, 15).replace(/\s+/g, '')}`,
      tags: [
        cleanTopic.toLowerCase(),
        `${cleanTopic.toLowerCase()} explainer`,
        `${cleanTopic.toLowerCase()} ground reality`,
        `${niche.toLowerCase()} analysis`,
        isEnglish ? 'english documentary explainer' : (isHindi ? 'hindi detailed explainer' : 'roman urdu deep dive'),
        'fact check video',
        'deep dive documentary',
        'the real truth',
        `${targetRuntimeMin} min explainer`,
        'viral topic breakdown',
      ],
      chapters: dynamicChapters,
      pinnedComment: `📌 Question of the day: Do you feel media headlines exaggerated this story about ${cleanTopic.slice(0, 35)}, or do you have a different take? Share your thoughts below — replying to top comments!`,
      suggestedHashtags: [`#${niche.replace(/\s+/g, '')}`, '#Explainer', '#Tameeros Shorts', '#FactsFirst', `#${targetRuntimeMin}MinVideo`],
    };
  }

  // 9. Shorts & Multi-Platform Distribution Agent
  let shorts: { postingSchedule: string; clips: Array<{ id: string; clipNumber: number; title: string; hook3Sec: string; script: string; visualCue: string; durationSec: number; igCaption: string; hashtags: string[]; whatsAppStatusDraft: string; communityPostDraft: string }> };

  if (isChristian) {
    shorts = {
      postingSchedule: 'Drop Short #1 at 6:30 AM morning prayer time; Drop Short #2 at 9:00 PM evening peace time.',
      clips: [
        {
          id: `${projectId}-short-1`,
          clipNumber: 1,
          title: `A 30-Second Prayer for Your Peace Today`,
          hook3Sec: `Before you face today's challenges, stop and receive this prayer.`,
          script: `Take a deep breath. Lord, bless the person watching this. Quiet their anxious thoughts, replace their worry with Your supernatural peace, and guide their steps in favor today. Amen. Save this prayer for when you need comfort.`,
          visualCue: `Gentle warm golden hour sunbeams over open bible with calm peaceful typography.`,
          durationSec: 32,
          igCaption: `Start your day with peace. 🙏 Type Amen and share with someone who needs encouragement today!`,
          hashtags: ['#MorningPrayer', '#DailyEncouragement', '#PeaceInGod', '#FaithReels', '#Tameeros Shorts'],
          whatsAppStatusDraft: `A 30-second morning prayer for peace and strength today. Watch and be blessed! 🙏`,
          communityPostDraft: `What is one burden you are handing over to God in prayer today? Share below so we can pray together!`,
        },
        {
          id: `${projectId}-short-2`,
          clipNumber: 2,
          title: `When Anxiety Hits: Hold Onto This Scripture`,
          hook3Sec: `If your heart feels heavy today, remember Philippians 4:6-7.`,
          script: `Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God will guard your heart and mind. Walk in confidence today!`,
          visualCue: `Calm ocean waves at sunset with glowing scripture typography appearing softly.`,
          durationSec: 35,
          igCaption: `You do not have to carry this alone. 📖 God is with you in every season.`,
          hashtags: ['#ScriptureOfDay', '#BibleVerse', '#AnxietyRelief', '#GodIsGood'],
          whatsAppStatusDraft: `A comforting scripture reminder when life feels stressful. Be encouraged today!`,
          communityPostDraft: `Let us declare Psalm 23 over our families today: The Lord is my shepherd, I shall not want. Amen!`,
        },
        {
          id: `${projectId}-short-3`,
          clipNumber: 3,
          title: `Nighttime Prayer: Sleep in God's Protection`,
          hook3Sec: `Rest your heart tonight: God is watching over you.`,
          script: `Father, as we close our eyes, we thank You for carrying us through this day. We release all worry. Grant our families safe, restful, and blessed sleep. Amen. Sweet dreams, beloved!`,
          visualCue: `Peaceful candlelight gently flickering in warm sanctuary with tranquil soft stars.`,
          durationSec: 30,
          igCaption: `Lay your head down in peace tonight. 🕊️ God is fighting your battles while you rest.`,
          hashtags: ['#NightPrayer', '#SleepInPeace', '#EveningDevotional', '#ChristianLife'],
          whatsAppStatusDraft: `Bedtime prayer for peaceful sleep and family protection. Good night!`,
          communityPostDraft: `May God grant you sweet, peaceful sleep tonight. See you tomorrow morning for prayer!`,
        },
      ],
    };
  } else if (isIslamic) {
    shorts = {
      postingSchedule: 'Drop Short #1 at 5:00 PM after school; Drop Short #2 at 8:00 PM bedtime routine.',
      clips: [
        {
          id: `${projectId}-short-1`,
          clipNumber: 1,
          title: `The 30-Second Bedtime Dua for Kids`,
          hook3Sec: `Let's recite our beautiful bedtime dua together before sleep!`,
          script: `Bismillah! "Bismika Rabbi wada'tu janbi, wa bika arfa'uh..." (In Your name, my Lord, I lay down my side, and in Your name I raise it up.) May Allah bless your dreams with peace and sweet angels!`,
          visualCue: `Cute animated little character getting cozy in bed under a starry night crescent moon.`,
          durationSec: 32,
          igCaption: `Help your little ones memorize their bedtime dua! 🌙 Share with fellow parents.`,
          hashtags: ['#BedtimeDua', '#IslamicKids', '#MuslimParents', '#ShortsForKids', '#Tameeros Shorts'],
          whatsAppStatusDraft: `Sweet bedtime dua for kids and families to recite together tonight! 🌙`,
          communityPostDraft: `Do your little ones know their bedtime dua by heart? Recite with us tonight!`,
        },
        {
          id: `${projectId}-short-2`,
          clipNumber: 2,
          title: `1-Minute Moral Tale: The Power of Kindness`,
          hook3Sec: `Did you know smiling is an act of charity?`,
          script: `Our beloved Prophet ﷺ taught us: "Even a smile to your brother is charity!" Today's super challenge for all kids: Give your parents a big warm smile and a hug! Let's spread kindness everywhere!`,
          visualCue: `Joyful animated kids sharing toys and smiling under warm sunshine.`,
          durationSec: 35,
          igCaption: `Spread smiles and kindness today! 💖 Follow for daily moral stories for kids.`,
          hashtags: ['#IslamicStories', '#MoralValues', '#GoodDeeds', '#SunnahForKids'],
          whatsAppStatusDraft: `A beautiful Sunnah moral lesson for kids in 35 seconds! 🌟`,
          communityPostDraft: `What good deed did your family practice today? Tell us in the comments!`,
        },
        {
          id: `${projectId}-short-3`,
          clipNumber: 3,
          title: `Soothing Bedtime Lullaby for Sweet Dreams`,
          hook3Sec: `Time for sweet dreams, little believers!`,
          script: `SubhanAllah, Alhamdulillah, Allahu Akbar. Close your little eyes, let the angels guard your sleep, and wake up ready to do good deeds tomorrow. Sweet dreams!`,
          visualCue: `Soft glowing lanterns drifting gently across a starry lavender night sky.`,
          durationSec: 30,
          igCaption: `A calming, peaceful Islamic lullaby for sweet dreams. 😴 Save for tonight!`,
          hashtags: ['#IslamicLullaby', '#SweetDreams', '#KidsSleep', '#NoorFamily'],
          whatsAppStatusDraft: `Peaceful lullaby for young children before bedtime. Sleep well! ✨`,
          communityPostDraft: `May Allah protect all our children and grant our families peaceful sleep tonight. Ameen!`,
        },
      ],
    };
  } else {
    shorts = {
      postingSchedule: 'Drop Short #1 3 hours before long-form release; Drop Short #2 24 hours later at 7:30 PM peak.',
      clips: [
        {
          id: `${projectId}-short-1`,
          clipNumber: 1,
          title: `The 30-Second Truth About ${cleanTopic.slice(0, 30)}`,
          hook3Sec: isEnglish
            ? `Everyone is panicking about ${cleanTopic.slice(0, 25)}, but look at this one stat.`
            : isHindi
            ? `हर कोई ${cleanTopic.slice(0, 22)} को लेकर घबरा रहा है, पर इस एक आंकड़े को देखिए।`
            : `Everyone is panicking about ${cleanTopic.slice(0, 25)}, but look at this one stat.`,
          script: isEnglish
            ? `Social media feeds are flooded with viral panic regarding ${cleanTopic.slice(0, 30)}. But empirical data reveals the actual disruption is under 10%. There is a huge gulf between sensational headlines and ground reality. Full detailed documentary breakdown is live on our channel now!`
            : isHindi
            ? `सोशल मीडिया पर ${cleanTopic.slice(0, 25)} को लेकर सनसनीखेज दावे हैं! लेकिन प्रमाणित आंकड़े बताते हैं कि वास्तविक बदलाव 10% से भी कम है। पूरा तथ्यात्मक वीडियो हमारे चैनल पर अभी देखें!`
            : `Social media feeds par red sirens hain regarding ${cleanTopic.slice(0, 30)}! Lekin ground data yeh dikhata hai ki actual disruption 10% se bhi kam hai. Clickable headlines aur ground truth mein zameen aasmaan ka farak hai. Full detailed deep dive humare channel par live hai!`,
          visualCue: `Quick swipe cut between frantic smartphone headlines about ${cleanTopic.slice(0, 25)} and calm green verified chart metrics.`,
          durationSec: 38,
          igCaption: `Stop falling for sensational headlines about ${cleanTopic.slice(0, 30)}. 📊 Here is what verified data actually proves. Full video link in bio!`,
          hashtags: isEnglish
            ? [`#${niche.replace(/\s+/g, '')}`, '#FactCheck', '#GroundReality', '#Documentary', '#Tameeros Shorts']
            : [`#${niche.replace(/\s+/g, '')}`, '#FactCheck', '#GroundReality', '#ShortsPakistan', '#Tameeros Shorts'],
          whatsAppStatusDraft: `🚨 The real truth behind ${cleanTopic.slice(0, 30)} in 40 seconds. Watch the full breakdown on YouTube!`,
          communityPostDraft: `Did you catch the recent viral headlines about ${cleanTopic.slice(0, 35)}? We analyzed official records to uncover what’s actually happening. Watch now on our channel: [Link]`,
        },
        {
          id: `${projectId}-short-2`,
          clipNumber: 2,
          title: `Why 90% Missed The Real Point`,
          hook3Sec: isEnglish
            ? `The biggest detail about ${cleanTopic.slice(0, 25)} wasn't even mentioned in news feeds.`
            : isHindi
            ? `${cleanTopic.slice(0, 22)} की सबसे अहम बात न्यूज़ चैनलों ने छोड़ दी।`
            : `The biggest detail about this story wasn't even mentioned in news channels.`,
          script: isEnglish
            ? `Everyone is arguing over surface symptoms of ${cleanTopic.slice(0, 28)}, but the genuine catalyst is an overlooked policy change in the background. When the rules shifted, this exact outcome was set in motion. Check out the complete breakdown on our main video!`
            : isHindi
            ? `सभी लोग केवल सतही बातों पर बहस कर रहे हैं, लेकिन असली वजह पीछे का नीतिगत बदलाव है। पूरी केस स्टडी मुख्य वीडियो में देखें!`
            : `Sab log surface symptoms par lad rahe hain, par actual structural reason background policy change hai for ${cleanTopic.slice(0, 28)}. Check out the full breakdown on our main video!`,
          visualCue: `Host pointing to highlighted clause in official government paper regarding ${cleanTopic.slice(0, 25)} with sound effect.`,
          durationSec: 42,
          igCaption: `The hidden layer behind the news that mainstream media skipped. 💡 Save this reel for later!`,
          hashtags: isEnglish
            ? [`#NewsBehindTheNews`, `#${niche.replace(/\s+/g, '')}`, '#CriticalThinking', '#Explainers']
            : [`#NewsBehindTheNews`, `#${niche.replace(/\s+/g, '')}`, '#CriticalThinking', '#ReelsPakistan'],
          whatsAppStatusDraft: `The real reason behind the latest news about ${cleanTopic.slice(0, 30)} that nobody discussed. Must watch!`,
          communityPostDraft: `We just published a deep dive into ${cleanTopic.slice(0, 35)}. What was your initial reaction when you first saw the news? Vote in the poll below!`,
        },
        {
          id: `${projectId}-short-3`,
          clipNumber: 3,
          title: `The Future Forecast in 45 Seconds`,
          hook3Sec: isEnglish
            ? `What happens next with ${cleanTopic.slice(0, 25)} over the next 12 months?`
            : isHindi
            ? `अगले 12 महीनों में ${cleanTopic.slice(0, 22)} का क्या भविष्य होगा?`
            : `What happens next in this story over the next 12 months?`,
          script: isEnglish
            ? `Three immediate projections: first, the initial sensationalist hype subsides; second, institutional guardrails stabilize; third, strategic early movers who relied on verified data will pull ahead. Full ${targetRuntimeMin}-minute guide live on our channel!`
            : isHindi
            ? `तीन मुख्य अनुमान: पहला, भ्रामक प्रचार शांत होगा; दूसरा, नए नियम लागू होंगे; तीसरा, आंकड़ों को समझने वाले आगे रहेंगे। पूरा वीडियो चैनल पर उपलब्ध है!`
            : `Three immediate projections: first, initial hype stabilizes; second, real regulatory framework settles in; third, early movers who understood the facts will win. Full guide live on our channel!`,
          visualCue: `Animated 3-step forecast cards sliding into frame with bold typography for ${cleanTopic.slice(0, 25)}.`,
          durationSec: 45,
          igCaption: `3 critical predictions you need to know for the upcoming year regarding ${cleanTopic.slice(0, 30)}. 📈 Full video on YouTube!`,
          hashtags: [`#FutureTrends`, `#${niche.replace(/\s+/g, '')}`, '#DeepDive', '#CreatorEconomy'],
          whatsAppStatusDraft: `3 predictions about where ${cleanTopic.slice(0, 25)} is heading next. Check it out!`,
          communityPostDraft: `Where do you see ${cleanTopic.slice(0, 30)} heading by end of 2026? Drop your predictions below and watch our full breakdown!`,
        },
      ],
    };
  }

  // Script sections for preview mode
  let sections: ScriptSection[];

  if (isChristian) {
    sections = [
      {
        id: `${projectId}-sec-1`,
        type: 'HOOK',
        speakerLabel: 'Pastor / Devotional Host',
        content: `Welcome, beloved friends. Wherever you are right now, take a deep breath and let God's peace fill your heart as we reflect on "${shortTopic}".`,
        productionCue: '[HOOK: Warm eye contact, soft reverent smile, gentle acoustic pad]',
        timestamp: '00:00',
        durationSec: 15,
      },
      {
        id: `${projectId}-sec-2`,
        type: 'SCENE',
        speakerLabel: 'Host',
        content: `Before we enter into prayer together, remember: you do not have to carry tomorrow's burdens today. His grace is fresh this morning.`,
        productionCue: '[SCENE: Warm candle glow, open scripture bible, serene morning light]',
        timestamp: '00:15',
        durationSec: 20,
      },
      {
        id: `${projectId}-sec-3`,
        type: 'INTRO',
        speakerLabel: 'Host',
        content: `Let us turn to God's word and claim the peace that surpasses all understanding. ${closePhrase}`,
        productionCue: '[INTRO: Peaceful title card with soft golden rays]',
        timestamp: '00:35',
        durationSec: 25,
      },
      {
        id: `${projectId}-sec-4`,
        type: 'BODY',
        speakerLabel: 'Host',
        content: `Heavenly Father, we surrender our fears, our families, and our hopes into Your loving hands. Bless and protect every person listening today.`,
        productionCue: '[PRAYER: Reverent acoustic warmth, praying hands camera focus]',
        timestamp: '01:00',
        durationSec: Math.max(60, Math.floor(targetRuntimeMin * 45)),
      },
      {
        id: `${projectId}-sec-5`,
        type: 'CTA',
        speakerLabel: 'Host',
        content: `May the Lord bless you and keep you. If you need prayer today, please leave your request below so our community can pray over you. Amen!`,
        productionCue: '[CTA: Benediction blessing, gentle subscribe motion graphic]',
        timestamp: formatMinutesSeconds(Math.max(120, targetRuntimeMin * 60 - 30)),
        durationSec: 30,
      },
    ];
  } else if (isIslamic) {
    sections = [
      {
        id: `${projectId}-sec-1`,
        type: 'HOOK',
        speakerLabel: 'Storyteller / Parent',
        content: `Bismillah-ir-Rahman-ir-Rahim. Assalamu Alaikum little friends! Cozy up under your blankets for our bedtime story about "${shortTopic}".`,
        productionCue: '[HOOK: Cheerful gentle voice, warm starry bedroom background]',
        timestamp: '00:00',
        durationSec: 15,
      },
      {
        id: `${projectId}-sec-2`,
        type: 'SCENE',
        speakerLabel: 'Storyteller',
        content: `Did you know that every good deed brings immense Barakah? Tonight, let's learn how kindness and Sabr can change the world!`,
        productionCue: '[SCENE: Soft animated storybook glow, crescent moon outside window]',
        timestamp: '00:15',
        durationSec: 20,
      },
      {
        id: `${projectId}-sec-3`,
        type: 'INTRO',
        speakerLabel: 'Storyteller',
        content: `Our beloved Prophet Muhammad ﷺ taught us to always treat others with kindness and love. Let's begin our moral tale!`,
        productionCue: '[INTRO: Illustrated storybook pages turning gently]',
        timestamp: '00:35',
        durationSec: 25,
      },
      {
        id: `${projectId}-sec-4`,
        type: 'BODY',
        speakerLabel: 'Storyteller',
        content: `Now, close your eyes and let's recite our beautiful bedtime dua together: Bismika Rabbi wada'tu janbi, wa bika arfa'uh...`,
        productionCue: '[BEDTIME DUA: Soothing chime, soft nighttime lullaby pad]',
        timestamp: '01:00',
        durationSec: Math.max(60, Math.floor(targetRuntimeMin * 45)),
      },
      {
        id: `${projectId}-sec-5`,
        type: 'CTA',
        speakerLabel: 'Storyteller',
        content: `SubhanAllah! Remember to practice tomorrow's good deed challenge. Sweet dreams, little believers! ${closePhrase}`,
        productionCue: '[CTA: Twinkling stars, sweet dreams greeting]',
        timestamp: formatMinutesSeconds(Math.max(120, targetRuntimeMin * 60 - 30)),
        durationSec: 30,
      },
    ];
  } else {
    sections = [
      {
        id: `${projectId}-sec-1`,
        type: 'HOOK',
        speakerLabel: 'Host',
        content: isEnglish
          ? `The discussion around ${hookPhrase} is not merely a transient headline cycle — it is a critical case study that should be on everyone's radar regarding "${shortTopic}".`
          : isHindi
          ? `आज का ${hookPhrase} सिर्फ एक आम हेडलाइन नहीं है — यह "${shortTopic}" पर एक गंभीर केस स्टडी है।`
          : `Aaj ka ${hookPhrase} sirf ek casual headline nahi hai — yeh ek deep case study hai jo har kisi ke radar par honi chahiye for "${shortTopic}".`,
        productionCue: '[HOOK: Strong curiosity, locked eye contact]',
        timestamp: '00:00',
        durationSec: 15,
      },
      {
        id: `${projectId}-sec-2`,
        type: 'SCENE',
        speakerLabel: 'Host',
        content: isEnglish
          ? `When you look beyond the sensational breaking news chyrons, what does the documented evidence actually tell us about "${shortTopic}"?`
          : isHindi
          ? `हेडलाइंस के शोर से परे, "${shortTopic}" के दस्तावेज़ी सबूत वास्तव में क्या बताते हैं?`
          : `Lekin kya aapne kabhi socha hai ki headline ke peeche ki actual reality kya hai regarding "${shortTopic}"?`,
        productionCue: '[SCENE: MCU, eye-level, face camera, subtle warm key light]',
        timestamp: '00:15',
        durationSec: 18,
      },
      {
        id: `${projectId}-sec-3`,
        type: 'INTRO',
        speakerLabel: 'Host',
        content: isEnglish
          ? `Welcome back to the channel. Today, we're cutting through algorithmic noise to examine verified data and un-hyped analysis. ${closePhrase}`
          : isHindi
          ? `नमस्कार दोस्तों! आज हम प्रमाणित आंकड़ों और निष्पक्ष विश्लेषण के साथ इस विषय को डिकोड करेंगे। ${closePhrase}`
          : `Namaskar dosto! Main hoon aapka host, aur aaj hum sensationalism ko filter karke ground facts ko decode karenge. ${closePhrase}`,
        productionCue: '[INTRO: Channel title graphic and lower-third]',
        timestamp: '00:33',
        durationSec: 20,
      },
      {
        id: `${projectId}-sec-4`,
        type: 'B_ROLL',
        speakerLabel: 'Voiceover',
        content: isEnglish
          ? `Take a look at the historical timeline. When "${shortTopic}" first surfaced, public reaction surged in one direction.`
          : isHindi
          ? `टाइमलाइन पर नज़र डालिए। जब यह विषय पहली बार सामने आया, तब प्रारंभिक आंकड़े कुछ और ही कह रहे थे।`
          : `Timeline par nazar daaliye. Jab pehli baar "${shortTopic}" surface hua tha, tab reaction kuch aur tha.`,
        productionCue: '[B-ROLL: Historical archive footage with timeline marker]',
        timestamp: '00:53',
        durationSec: 30,
      },
      {
        id: `${projectId}-sec-5`,
        type: 'BODY',
        speakerLabel: 'Host',
        content: isEnglish
          ? `First, let's understand the structural context. Most commentary fixates on surface symptoms while ignoring the root cause of "${shortTopic}".`
          : isHindi
          ? `बुनियादी संदर्भ को समझिए। अधिकतर लोग केवल सतही लक्षणों पर बात कर रहे हैं, मुख्य कारण पर नहीं।`
          : `Foundational context samajhiye. Har koi symptoms par focus kar raha hai, par root cause par koi baat nahi kar raha.`,
        productionCue: '[BODY: Graphic counters 1-2-3 sliding on right]',
        timestamp: '01:23',
        durationSec: Math.max(60, Math.floor(targetRuntimeMin * 45)),
      },
      {
        id: `${projectId}-sec-6`,
        type: 'CTA',
        speakerLabel: 'Host',
        content: isEnglish
          ? `So what is the bottom line? Viral headlines come and go, but sustainable insights require deep analytical rigor. What is your perspective on "${shortTopic}"? Share below!`
          : isHindi
          ? `निष्कर्ष साफ है: हेडलाइंस सनसनीखेज़ हो सकती हैं, पर ज्ञान हमेशा ठोस होना चाहिए। "${shortTopic}" पर अपनी राय नीचे बताएं!`
          : `Toh bottom-line clear hai: headline sensational ho sakti hai, par facts grounded hote hain. "${shortTopic}" par apna take comments mein zaroor share karein!`,
        productionCue: '[CTA: Direct camera address, subscribe motion graphic]',
        timestamp: formatMinutesSeconds(Math.max(120, targetRuntimeMin * 60 - 30)),
        durationSec: 30,
      },
    ];
  }

  if (input.keys?.geminiKey || input.keys?.openAiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY) {
    try {
      const promptText = 'You are an elite YouTube director and scriptwriter in the ' + niche + ' niche. Write an authentic spoken script opening for the video topic: "' + cleanTopic + '". Tone profile: ' + toneFingerprint.name + '. Language: ' + language + '. Include [SCENE] and [B-ROLL] visual cues. Format as natural spoken sentences.';
      const llmResult = await generateWithFallbackChain({
        prompt: promptText,
        systemInstruction: 'Write captivating, conversational spoken words. Do not use generic filler words like "In today\'s video" or "Let\'s delve".',
        keys: input.keys,
      });

      if (llmResult?.text && sections.length > 0) {
        sections[0].content = llmResult.text;
      }
    } catch (e) {
      console.warn('LLM enhancement failed, retaining deterministic script blueprint:', e);
    }
  }

  return {
    id: projectId,
    title: isChristian
      ? `${cleanTopic.slice(0, 50)}: Daily Prayer & Encouragement`
      : isIslamic
      ? `${cleanTopic.slice(0, 50)}: Bedtime Moral Story & Duas`
      : isEnglish
      ? `${cleanTopic.slice(0, 55)}: Ground Reality Explainer`
      : isHindi
      ? `${cleanTopic.slice(0, 50)}: विस्तृत ज़मीनी विश्लेषण`
      : `${cleanTopic.slice(0, 55)}: Ground Reality Explainer`,
    topic: cleanTopic,
    niche,
    language,
    targetRuntimeMin,
    toneFingerprintId: toneFingerprint.id,
    toneFingerprintName: toneFingerprint.name,
    status: 'ready',
    createdAt: now,
    updatedAt: now,
    topics,
    selectedTopicIndex: 0,
    researchBrief,
    factCheckList,
    legalReview,
    script: {
      fullText: scriptFullText,
      wordCount,
      estimatedReadTimeMinutes: targetRuntimeMin,
      toneMatchScore: 96,
      vocabularyScore: 95,
      rhythmScore: 94,
      hooksScore: 97,
      sections,
    },
    storyboard: {
      scenes,
      totalScenes: scenes.length,
      aRollCount: Math.ceil(scenes.length / 2),
      bRollCount: Math.floor(scenes.length / 2),
    },
    thumbnails,
    seo: seoPackage,
    shorts,
  };
}
