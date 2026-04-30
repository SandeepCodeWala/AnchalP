import type { Lang } from "@/i18n/i18n";

const readingTypesBase = [
  { id: "love", icon: "♡" },
  { id: "career", icon: "✦" },
  { id: "money", icon: "⟡" },
  { id: "spiritual", icon: "☾" },
  { id: "clarity", icon: "✶" },
  { id: "shadow", icon: "⟠" }
] as const;

export type ReadingTypeId = (typeof readingTypesBase)[number]["id"];

export type ReadingType = {
  id: ReadingTypeId;
  icon: string;
  label: string;
  description: string;
};

const readingTypeCopy: Record<
  Lang,
  Record<ReadingTypeId, Pick<ReadingType, "label" | "description">>
> = {
  en: {
    love: {
      label: "Love",
      description: "Connection, devotion, and the truths you’re ready to feel."
    },
    career: {
      label: "Career",
      description: "Momentum, influence, and the next aligned step in your path."
    },
    money: {
      label: "Money",
      description: "Abundance, timing, and choices that protect your future."
    },
    spiritual: {
      label: "Spiritual",
      description: "Intuition, guidance, and the message beneath the noise."
    },
    clarity: {
      label: "Clarity",
      description: "Perspective, release, and the truth that sets you free."
    },
    shadow: {
      label: "Shadow",
      description: "Patterns, protection, and what transforms when acknowledged."
    }
  },
  hi: {
    love: {
      label: "प्रेम",
      description: "रिश्ता, समर्पण, और वे सच जिन्हें आप महसूस करने के लिए तैयार हैं।"
    },
    career: {
      label: "करियर",
      description: "गति, प्रभाव, और आपके मार्ग का अगला सही कदम।"
    },
    money: {
      label: "धन",
      description: "समृद्धि, सही समय, और ऐसी पसंद जो आपके भविष्य को सुरक्षित करे।"
    },
    spiritual: {
      label: "आध्यात्मिक",
      description: "अंतर्ज्ञान, मार्गदर्शन, और शोर के नीचे छुपा संदेश।"
    },
    clarity: {
      label: "स्पष्टता",
      description: "दृष्टि, मुक्त होना, और वह सच जो आपको हल्का करे।"
    },
    shadow: {
      label: "छाया",
      description: "पैटर्न, सुरक्षा, और वह परिवर्तन जो स्वीकार करने से शुरू होता है।"
    }
  }
};

export function getReadingTypes(lang: Lang): ReadingType[] {
  return readingTypesBase.map((r) => ({
    ...r,
    ...readingTypeCopy[lang][r.id]
  }));
}

export function getReadingType(lang: Lang, id: ReadingTypeId): ReadingType {
  const base = readingTypesBase.find((r) => r.id === id)!;
  return { ...base, ...readingTypeCopy[lang][id] };
}

export type ReadingStage = "idle" | "shuffling" | "drawing" | "ready" | "revealed";

const cardsBase = [
  { id: "the-high-priestess", glyph: "☾" },
  { id: "the-magician", glyph: "✦" },
  { id: "the-lovers", glyph: "♡" },
  { id: "the-chariot", glyph: "➵" },
  { id: "strength", glyph: "∞" },
  { id: "the-hermit", glyph: "⌁" },
  { id: "wheel-of-fortune", glyph: "⟡" },
  { id: "death", glyph: "✧" },
  { id: "the-star", glyph: "✶" },
  { id: "the-moon", glyph: "☾" },
  { id: "the-sun", glyph: "☉" },
  { id: "the-world", glyph: "⟠" },
  { id: "ace-of-cups", glyph: "❦" },
  { id: "three-of-swords", glyph: "✢" },
  { id: "six-of-pentacles", glyph: "⟠" },
  { id: "ten-of-cups", glyph: "☾" }
] as const;

export type TarotCardId = (typeof cardsBase)[number]["id"];

export type TarotCardData = {
  id: TarotCardId;
  name: string;
  subtitle: string;
  glyph: string;
  keywords: string[];
  meanings: Record<ReadingTypeId, string>;
};

export type DrawnCard = {
  card: TarotCardData;
};

const glyphById = cardsBase.reduce((acc, c) => {
  acc[c.id] = c.glyph;
  return acc;
}, {} as Record<TarotCardId, string>);

type CardCopy = Omit<TarotCardData, "id" | "glyph">;

const cardsCopy: Record<Lang, Record<TarotCardId, CardCopy>> = {
  en: {
    "the-high-priestess": {
      name: "The High Priestess",
      subtitle: "Sacred knowing",
      keywords: ["intuition", "mystery", "inner truth"],
      meanings: {
        love: "Let silence speak. The bond deepens when you trust what you already know.",
        career: "Hold your power quietly. Observe first — the right role reveals itself.",
        money: "Move with discretion. Save, study, and avoid impulsive promises.",
        spiritual: "Your intuition is the message. A dream or sign is already guiding you.",
        clarity: "Stop over-explaining. The truth arrives when you stop chasing it.",
        shadow: "The real fear is being seen. Protection doesn’t require hiding."
      }
    },
    "the-magician": {
      name: "The Magician",
      subtitle: "Aligned creation",
      keywords: ["focus", "skill", "manifestation"],
      meanings: {
        love: "Say what you mean. A clear intention becomes magnetic.",
        career: "You have the tools. Commit to one direction and execute with precision.",
        money: "Negotiate. A smart decision now compounds quickly.",
        spiritual: "Channel energy into a ritual — repetition turns desire into reality.",
        clarity: "Simplify. One bold decision cuts through the fog.",
        shadow: "You’re not stuck — you’re scattered. Choose, then follow through."
      }
    },
    "the-lovers": {
      name: "The Lovers",
      subtitle: "Devotion & choice",
      keywords: ["union", "values", "choice"],
      meanings: {
        love: "Choose each other again — not out of habit, but out of truth.",
        career: "A values-based decision leads to the best long-term outcome.",
        money: "Spend in alignment. Every purchase is a vote for your future self.",
        spiritual: "Union begins within. Heal the split between desire and devotion.",
        clarity: "Two paths are calling. Your body already knows which is yours.",
        shadow: "Stop outsourcing the decision. Integrity is the real romance."
      }
    },
    "the-chariot": {
      name: "The Chariot",
      subtitle: "Directed momentum",
      keywords: ["will", "movement", "victory"],
      meanings: {
        love: "Lead with courage. The relationship evolves when you set the pace.",
        career: "Push forward. Focus beats talent when the stakes rise.",
        money: "Momentum is on your side. Take measured action — and track it.",
        spiritual: "Discipline is devotion. Your path strengthens through practice.",
        clarity: "Decide, then move. Overthinking is the only obstacle left.",
        shadow: "Control isn’t safety. Allow support without losing your direction."
      }
    },
    strength: {
      name: "Strength",
      subtitle: "Soft power",
      keywords: ["courage", "patience", "gentleness"],
      meanings: {
        love: "Tenderness wins. Choose compassion over proving a point.",
        career: "Steady leadership. Your calm becomes the room’s center of gravity.",
        money: "Build consistency. Small disciplined choices outshine big swings.",
        spiritual: "Your heart is your altar. Meet yourself with kindness first.",
        clarity: "Breathe. The answer isn’t loud — it’s steady.",
        shadow: "You don’t need to harden to be safe. Boundaries can be soft."
      }
    },
    "the-hermit": {
      name: "The Hermit",
      subtitle: "Inner lantern",
      keywords: ["solitude", "wisdom", "reflection"],
      meanings: {
        love: "Space clarifies desire. Don’t rush — let truth mature.",
        career: "Deep work season. Refine your craft before you step back into the spotlight.",
        money: "Audit and simplify. Trim what drains you and keep what sustains you.",
        spiritual: "Meditation and journaling reveal the lesson you’ve been circling.",
        clarity: "Pause the noise. The next step is obvious when you’re honest.",
        shadow: "Isolation isn’t protection if it becomes punishment. Let someone in."
      }
    },
    "wheel-of-fortune": {
      name: "Wheel of Fortune",
      subtitle: "Timing & cycles",
      keywords: ["fate", "turning point", "luck"],
      meanings: {
        love: "A shift arrives unexpectedly. Stay open; don’t cling to old outcomes.",
        career: "Opportunity turns in your favor. Be ready to say yes quickly.",
        money: "Cycles change. Diversify and keep a small cushion for surprise.",
        spiritual: "You’re in a sacred loop. Notice patterns — they’re your teachers.",
        clarity: "This is a turning point. Let the old chapter close cleanly.",
        shadow: "Stop trying to control timing. Your job is alignment, not force."
      }
    },
    death: {
      name: "Death",
      subtitle: "Beautiful ending",
      keywords: ["release", "rebirth", "transformation"],
      meanings: {
        love: "Let the old dynamic end. A new intimacy can be born from truth.",
        career: "An era closes. Make room for the version of you who has evolved.",
        money: "Cut the leak. End the habit or expense that quietly drains you.",
        spiritual: "Shed a skin. Your next initiation begins with surrender.",
        clarity: "Stop resurrecting what’s over. Choose what’s alive now.",
        shadow: "Grief is honest. Don’t skip it — it’s the doorway."
      }
    },
    "the-star": {
      name: "The Star",
      subtitle: "Hope returns",
      keywords: ["healing", "faith", "renewal"],
      meanings: {
        love: "Trust is rebuilding. Love feels safe when you let it be gentle.",
        career: "Your work has purpose. Share it — your audience is closer than you think.",
        money: "Stability grows. Keep the long view and invest in what heals stress.",
        spiritual: "You’re guided. A wish you whispered is being answered softly.",
        clarity: "Relief is coming. Don’t abandon yourself in the final stretch.",
        shadow: "Hope isn’t naive — it’s brave. Let yourself believe again."
      }
    },
    "the-moon": {
      name: "The Moon",
      subtitle: "The unseen speaks",
      keywords: ["illusion", "intuition", "dreams"],
      meanings: {
        love: "Don’t assume — ask. What’s unspoken holds the real story.",
        career: "Read the room. Politics and perception matter more than facts right now.",
        money: "Avoid risky bets. If it’s unclear, it’s a no for the moment.",
        spiritual: "Dreamwork is powerful now. Trust symbols more than logic.",
        clarity: "Confusion is temporary. Get curious instead of reactive.",
        shadow: "Fear is loud when you’re tired. Rest before you decide."
      }
    },
    "the-sun": {
      name: "The Sun",
      subtitle: "Radiant truth",
      keywords: ["joy", "success", "clarity"],
      meanings: {
        love: "Warmth returns. Let yourself be seen without armor.",
        career: "Recognition arrives. Your work shines when you stop shrinking it.",
        money: "Good news. A clean, confident choice boosts your security.",
        spiritual: "Light is the lesson. Gratitude multiplies the miracle.",
        clarity: "The truth is simple. Act on it and feel the relief.",
        shadow: "You’re allowed to be happy. Don’t sabotage ease."
      }
    },
    "the-world": {
      name: "The World",
      subtitle: "Completion",
      keywords: ["wholeness", "integration", "arrival"],
      meanings: {
        love: "A chapter completes. Commitment feels natural, not forced.",
        career: "A milestone lands. Celebrate — then set a bigger horizon.",
        money: "You’re stabilizing. Align your finances with your next identity.",
        spiritual: "Integration is your magic. You’re becoming whole.",
        clarity: "You’ve learned enough. Move forward with confidence.",
        shadow: "Stop waiting for perfection. You’re already ready."
      }
    },
    "ace-of-cups": {
      name: "Ace of Cups",
      subtitle: "Open heart",
      keywords: ["new love", "emotion", "renewal"],
      meanings: {
        love: "A fresh beginning. Receive without suspicion — let it be sweet.",
        career: "Work feels meaningful again. Follow what moves you emotionally.",
        money: "Say yes to support. Collaboration increases your flow.",
        spiritual: "Your heart is expanding. Ritual: water, music, and honest prayer.",
        clarity: "Choose what feels nourishing. Your body is a compass.",
        shadow: "Stop withholding to feel safe. Vulnerability is strength."
      }
    },
    "three-of-swords": {
      name: "Three of Swords",
      subtitle: "Truth cuts clean",
      keywords: ["heartbreak", "clarity", "release"],
      meanings: {
        love: "Be honest. Healing begins the moment denial ends.",
        career: "A disappointment redirects you. Learn fast and re-aim.",
        money: "Tighten your boundaries. Protect yourself from emotional spending.",
        spiritual: "This is a clearing. Grief is a sacred teacher.",
        clarity: "You’re seeing it clearly. Don’t romanticize what hurt you.",
        shadow: "Stop replaying. Closure is a choice you can make."
      }
    },
    "six-of-pentacles": {
      name: "Six of Pentacles",
      subtitle: "Sacred exchange",
      keywords: ["balance", "giving", "receiving"],
      meanings: {
        love: "Mutual effort matters. Let it be a two-way devotion.",
        career: "Ask for compensation that matches your value.",
        money: "Stability grows through balance: save, spend, and share with intention.",
        spiritual: "Generosity opens doors. Give without self-abandoning.",
        clarity: "Notice reciprocity. Your time is a currency.",
        shadow: "Don’t confuse giving with earning love. Receive freely."
      }
    },
    "ten-of-cups": {
      name: "Ten of Cups",
      subtitle: "Emotional home",
      keywords: ["harmony", "fulfillment", "belonging"],
      meanings: {
        love: "This is what alignment feels like. Let joy be the standard.",
        career: "Your work supports your life — not the other way around.",
        money: "Contentment increases when spending matches your values.",
        spiritual: "Gratitude is your portal. Keep a ritual of appreciation.",
        clarity: "The answer is the one that brings peace to your nervous system.",
        shadow: "You deserve ease. Stop bracing for the fall."
      }
    }
  },
  hi: {
    "the-high-priestess": {
      name: "हाई प्रीस्टेस",
      subtitle: "पवित्र ज्ञान",
      keywords: ["अंतर्ज्ञान", "रहस्य", "अंदर की सच्चाई"],
      meanings: {
        love: "खामोशी को बोलने दें। जो आप पहले से जानते हैं उस पर भरोसा करेंगे तो रिश्ता गहराएगा।",
        career: "अपनी शक्ति शांत रखकर संभालें। पहले निरीक्षण करें—सही भूमिका खुद सामने आएगी।",
        money: "सावधानी से आगे बढ़ें। बचत करें, सीखें, और जल्दबाज़ी के वादों से बचें।",
        spiritual: "आपका अंतर्ज्ञान ही संदेश है। कोई सपना या संकेत पहले से आपको दिशा दे रहा है।",
        clarity: "हर बात समझाने की जरूरत नहीं। जब आप सच के पीछे भागना बंद करेंगे, सच आ जाएगा।",
        shadow: "असल डर दिख जाने का है। सुरक्षा के लिए छिपना जरूरी नहीं।"
      }
    },
    "the-magician": {
      name: "द मैजिशियन",
      subtitle: "संतुलित सृजन",
      keywords: ["एकाग्रता", "कौशल", "साकार करना"],
      meanings: {
        love: "जो कहना है, साफ कहें। स्पष्ट इरादा आपको चुंबकीय बनाता है।",
        career: "आपके पास साधन हैं। एक दिशा चुनें और सटीकता से कार्रवाई करें।",
        money: "बातचीत करें। एक स्मार्ट फैसला जल्दी फायदा देगा।",
        spiritual: "ऊर्जा को रिचुअल में लगाएं—दोहराव से इच्छा वास्तविकता बनती है।",
        clarity: "सरल करें। एक साहसी निर्णय धुंध को काट देता है।",
        shadow: "आप अटके नहीं हैं—आप बिखरे हुए हैं। चुनें, फिर पूरा करें।"
      }
    },
    "the-lovers": {
      name: "द लवर्स",
      subtitle: "समर्पण और चुनाव",
      keywords: ["एकता", "मूल्य", "चयन"],
      meanings: {
        love: "एक-दूसरे को फिर चुनें—आदत से नहीं, सच से।",
        career: "मूल्यों पर आधारित निर्णय लंबे समय में सबसे अच्छा परिणाम देता है।",
        money: "alignment के साथ खर्च करें। हर खरीद आपका भविष्य चुनती है।",
        spiritual: "एकता भीतर से शुरू होती है। इच्छा और समर्पण के बीच का विभाजन भरें।",
        clarity: "दो रास्ते बुला रहे हैं। आपका शरीर पहले से जानता है कौन सा आपका है।",
        shadow: "निर्णय बाहर मत खोजें। integrity ही असली romance है।"
      }
    },
    "the-chariot": {
      name: "द चैरियट",
      subtitle: "दिशित गति",
      keywords: ["इच्छाशक्ति", "आगे बढ़ना", "विजय"],
      meanings: {
        love: "साहस के साथ नेतृत्व करें। जब आप रफ्तार तय करते हैं, रिश्ता आगे बढ़ता है।",
        career: "आगे बढ़ें। बड़े दांव पर फोकस, टैलेंट से भी ज़्यादा काम करता है।",
        money: "गति आपके पक्ष में है। नपी-तुली कार्रवाई करें—और उसे ट्रैक करें।",
        spiritual: "अनुशासन भी समर्पण है। अभ्यास से आपका मार्ग मजबूत होता है।",
        clarity: "निर्णय लें, फिर आगे बढ़ें। अब बाधा सिर्फ overthinking है।",
        shadow: "control ही सुरक्षा नहीं। दिशा बनाए रखते हुए सहायता स्वीकार करें।"
      }
    },
    strength: {
      name: "शक्ति",
      subtitle: "नरम ताकत",
      keywords: ["साहस", "धैर्य", "कोमलता"],
      meanings: {
        love: "कोमलता जीतती है। सही साबित होने से ज़्यादा, करुणा चुनें।",
        career: "स्थिर नेतृत्व। आपकी शांति कमरे की ताकत बन जाती है।",
        money: "निरंतरता बनाएं। छोटे अनुशासित फैसले बड़े जोखिमों से बेहतर हैं।",
        spiritual: "आपका हृदय ही आपका मंदिर है। पहले खुद को दयालुता दें।",
        clarity: "सांस लें। उत्तर तेज़ नहीं—स्थिर होता है।",
        shadow: "सुरक्षित होने के लिए कठोर बनना जरूरी नहीं। boundaries नरम भी हो सकती हैं।"
      }
    },
    "the-hermit": {
      name: "द हर्मिट",
      subtitle: "अंदर का दीपक",
      keywords: ["एकांत", "ज्ञान", "आत्मचिंतन"],
      meanings: {
        love: "थोड़ा स्पेस इच्छा को साफ करता है। जल्दी न करें—सच को परिपक्व होने दें।",
        career: "deep work का समय। spotlight में लौटने से पहले अपनी कला निखारें।",
        money: "audit और simplify करें। जो drain करता है उसे घटाएं, जो sustain करता है उसे रखें।",
        spiritual: "ध्यान और journaling से वही पाठ दिखेगा जिसके चक्कर में आप थे।",
        clarity: "शोर रोकें। ईमानदारी के साथ देखें—अगला कदम साफ है।",
        shadow: "अगर एकांत सज़ा बन जाए तो वह सुरक्षा नहीं। किसी को भीतर आने दें।"
      }
    },
    "wheel-of-fortune": {
      name: "भाग्यचक्र",
      subtitle: "समय और चक्र",
      keywords: ["भाग्य", "मोड़", "सौभाग्य"],
      meanings: {
        love: "एक बदलाव अचानक आता है। खुला रहें; पुराने नतीजों से चिपकें नहीं।",
        career: "मौका आपके पक्ष में घूम रहा है। जल्दी 'हाँ' कहने के लिए तैयार रहें।",
        money: "चक्र बदलते हैं। diversify करें और surprise के लिए छोटा cushion रखें।",
        spiritual: "आप एक पवित्र चक्र में हैं। पैटर्न देखें—वे ही आपके गुरु हैं।",
        clarity: "यह turning point है। पुराने अध्याय को साफ़ तरीके से बंद होने दें।",
        shadow: "टाइमिंग कंट्रोल मत करें। आपका काम alignment है, जोर लगाना नहीं।"
      }
    },
    death: {
      name: "डेथ",
      subtitle: "सुंदर अंत",
      keywords: ["मुक्ति", "पुनर्जन्म", "परिवर्तन"],
      meanings: {
        love: "पुराना डायनेमिक खत्म होने दें। सच से नई intimacy जन्म ले सकती है।",
        career: "एक दौर बंद होता है। आपके विकसित संस्करण के लिए जगह बनाएं।",
        money: "लीक बंद करें। वह आदत/खर्च खत्म करें जो चुपचाप आपको कमज़ोर करता है।",
        spiritual: "एक त्वचा उतरती है। अगला initiation surrender से शुरू होता है।",
        clarity: "जो खत्म हो गया उसे वापस मत जीवित करें। जो अभी जीवित है, उसे चुनें।",
        shadow: "दुख ईमानदार है। उसे छोड़ें नहीं—यही दरवाज़ा है।"
      }
    },
    "the-star": {
      name: "द स्टार",
      subtitle: "आशा लौटती है",
      keywords: ["उपचार", "विश्वास", "नवीनीकरण"],
      meanings: {
        love: "भरोसा फिर बन रहा है। कोमलता को जगह देंगे तो प्रेम सुरक्षित लगेगा।",
        career: "आपके काम में अर्थ है। share करें—आपका audience पास ही है।",
        money: "स्थिरता बढ़ती है। long view रखें और जो तनाव घटाए उसमें निवेश करें।",
        spiritual: "आप guided हैं। जो इच्छा आपने फुसफुसाई थी, उसका उत्तर धीरे-धीरे आ रहा है।",
        clarity: "राहत आएगी। आख़िरी चरण में खुद को मत छोड़ें।",
        shadow: "आशा भोली नहीं—बहादुर है। खुद को फिर विश्वास करने दें।"
      }
    },
    "the-moon": {
      name: "द मून",
      subtitle: "अदृश्य बोलता है",
      keywords: ["माया", "अंतर्ज्ञान", "सपने"],
      meanings: {
        love: "अनुमान न लगाएं—पूछें। जो अनकहा है, वही असली कहानी है।",
        career: "रूम पढ़ें। अभी तथ्य से ज़्यादा perception और politics काम करते हैं।",
        money: "जोखिम भरे दांव से बचें। अगर स्पष्ट नहीं है, तो अभी 'न' है।",
        spiritual: "dreamwork अभी शक्तिशाली है। logic से ज्यादा symbols पर भरोसा करें।",
        clarity: "भ्रम अस्थायी है। reactive होने के बजाय curious रहें।",
        shadow: "थकान में डर तेज़ हो जाता है। फैसला करने से पहले आराम करें।"
      }
    },
    "the-sun": {
      name: "द सन",
      subtitle: "दीप्त सच",
      keywords: ["आनंद", "सफलता", "स्पष्टता"],
      meanings: {
        love: "गर्मी लौटती है। बिना कवच के खुद को दिखने दें।",
        career: "मान्यता मिलेगी। जब आप अपने काम को छोटा नहीं करते, वह चमकता है।",
        money: "अच्छी खबर। साफ और confident फैसला आपकी सुरक्षा बढ़ाता है।",
        spiritual: "प्रकाश ही पाठ है। कृतज्ञता चमत्कार बढ़ाती है।",
        clarity: "सच सरल है। उस पर कार्रवाई करें और राहत महसूस करें।",
        shadow: "आप खुश रह सकते हैं। ease को sabotage मत करें।"
      }
    },
    "the-world": {
      name: "द वर्ल्ड",
      subtitle: "पूर्णता",
      keywords: ["समग्रता", "एकीकरण", "आगमन"],
      meanings: {
        love: "एक अध्याय पूरा होता है। commitment स्वाभाविक लगेगा, मजबूरी नहीं।",
        career: "एक milestone आता है। celebrate करें—फिर बड़ा horizon तय करें।",
        money: "आप स्थिर हो रहे हैं। अपनी वित्तीय आदतों को अपने अगले identity के साथ align करें।",
        spiritual: "एकीकरण आपका जादू है। आप पूर्ण हो रहे हैं।",
        clarity: "आपने पर्याप्त सीख लिया है। विश्वास के साथ आगे बढ़ें।",
        shadow: "परफेक्शन का इंतजार छोड़ें। आप पहले से तैयार हैं।"
      }
    },
    "ace-of-cups": {
      name: "कप्स का ऐस",
      subtitle: "खुला हृदय",
      keywords: ["नया प्रेम", "भावना", "नवीनीकरण"],
      meanings: {
        love: "एक नई शुरुआत। शंका बिना स्वीकार करें—इसे मीठा रहने दें।",
        career: "काम फिर meaningful लगता है। जो आपको भावनात्मक रूप से हिलाता है, उसे फॉलो करें।",
        money: "सहयोग के लिए 'हाँ' कहें। collaboration से flow बढ़ता है।",
        spiritual: "आपका हृदय फैल रहा है। रिचुअल: पानी, संगीत और सच्ची प्रार्थना।",
        clarity: "जो nourishing लगे, उसे चुनें। आपका शरीर कम्पास है।",
        shadow: "सुरक्षित महसूस करने के लिए withholding बंद करें। vulnerability ही strength है।"
      }
    },
    "three-of-swords": {
      name: "स्वॉर्ड्स का थ्री",
      subtitle: "सच साफ़ काटता है",
      keywords: ["दिल का दर्द", "स्पष्टता", "मुक्ति"],
      meanings: {
        love: "ईमानदार रहें। denial खत्म होते ही healing शुरू होती है।",
        career: "एक निराशा आपको redirect करती है। जल्दी सीखें और फिर से aim करें।",
        money: "boundaries कड़ी करें। emotional spending से खुद को बचाएं।",
        spiritual: "यह एक clearing है। grief एक पवित्र शिक्षक है।",
        clarity: "आप इसे साफ देख रहे हैं। जिसने चोट दी, उसे romanticize मत करें।",
        shadow: "replay बंद करें। closure आप चुन सकते हैं।"
      }
    },
    "six-of-pentacles": {
      name: "पेंटाकल्स का सिक्स",
      subtitle: "पवित्र लेन-देन",
      keywords: ["संतुलन", "देना", "पाना"],
      meanings: {
        love: "दोनों का प्रयास जरूरी है। समर्पण को two-way बनाएं।",
        career: "अपनी value के अनुसार compensation मांगें।",
        money: "संतुलन से स्थिरता बढ़ती है: बचत, खर्च और साझा करना—इरादे से।",
        spiritual: "उदारता दरवाज़े खोलती है। बिना self-abandonment के दें।",
        clarity: "reciprocity देखें। आपका समय भी currency है।",
        shadow: "देना = प्यार कमाना नहीं। सहजता से receive करें।"
      }
    },
    "ten-of-cups": {
      name: "कप्स का टेन",
      subtitle: "भावनात्मक घर",
      keywords: ["सामंजस्य", "तृप्ति", "अपनापन"],
      meanings: {
        love: "alignment ऐसा लगता है। आनंद को standard बनने दें।",
        career: "आपका काम आपकी ज़िंदगी को support करे—उल्टा नहीं।",
        money: "जब खर्च आपके values के साथ हो, contentment बढ़ता है।",
        spiritual: "कृतज्ञता आपका portal है। appreciation का रिचुअल रखें।",
        clarity: "सही उत्तर वही है जो आपके nervous system को शांति दे।",
        shadow: "आप ease के हकदार हैं। गिरने के लिए brace करना बंद करें।"
      }
    }
  }
};

export function getCard(lang: Lang, id: TarotCardId): TarotCardData {
  return {
    id,
    glyph: glyphById[id],
    ...cardsCopy[lang][id]
  };
}

export function createDeckIds(): TarotCardId[] {
  return cardsBase.map((c) => c.id);
}

