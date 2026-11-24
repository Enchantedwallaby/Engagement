export const INVITATION_DATA = {
  groom: {
    fullName: 'Gagan G Shetty',
    kannadaName: 'ಗಗನ್ ಜಿ ಶೆಟ್ಟಿ',
    title: 'Groom',
  },
  bride: {
    fullName: 'Sinchana Shetty',
    kannadaName: 'ಸಿಂಚನಾ ಶೆಟ್ಟಿ',
    title: 'Bride',
  },
  event: {
    type: 'Engagement Ceremony',
    kannadaType: 'ಶುಭ ನಿಶ್ಚಿತಾರ್ಥ',
    date: '2026-12-24',
    dateFormatted: '24 December 2026',
    timeFormatted: '11:30 AM',
    dayOfWeek: 'Thursday',
    venue: {
      name: 'Ocean Pearl',
      city: 'Ujire',
      state: 'Karnataka',
      kannadaLocation: 'ಓಷನ್ ಪರ್ಲ್, ಉಜಿರೆ',
    },
  },
  palette: {
    warmIvory: '#F8F5ED',
    softCream: '#EFE8DA',
    champagneGold: '#C5A46D',
    antiqueGold: '#A88B59',
    deepBrown: '#493B2D',
  },
} as const;
