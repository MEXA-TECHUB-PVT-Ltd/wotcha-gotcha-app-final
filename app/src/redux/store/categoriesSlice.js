import { createSlice } from '@reduxjs/toolkit';


import { CategoryActive, CategoryInactive, Cinematiceactive, Cinematics, EBC, Fans, FansActive, Ionicons, Kids, KidsActive, LetterIcon, MarketActive, MarketZoneInActive, News, ProfileActive, ProfileInActive, Puzzle, PuzzleActive, QafiIcon, Television, TVpromaxActive, VideoActive, VideoInactive } from '../../assets/svg';

// Initial state for categories
const initialState = {
  categories: [
  { key: 'one', name: 'Mass Apps', activeIcon: <CategoryActive width={23} height={23} />, inactiveIcon: <CategoryInactive width={23} height={23} />, dropped: false },
  { key: 'two', name: 'Video Mania', activeIcon: <VideoActive width={23} height={23} />, inactiveIcon: <VideoInactive width={23} height={23} />,  },
  // { key: 'three', name: 'DISC', activeIcon: <MailActive width={23} height={23} />, inactiveIcon: <MailInActive width={23} height={23} />,  },
  { key: 'four', name: 'Pic Tours', activeIcon: <ProfileActive width={23} height={23} />, inactiveIcon: <ProfileInActive width={23} height={23} />,  },
  { key: 'five', name: 'Mondo Market', activeIcon: <MarketActive width={23} height={23} />, inactiveIcon: <MarketZoneInActive width={23} height={23} />,  },
  { key: 'six', name: 'Cinematic', activeIcon: <Cinematiceactive width={23} height={23} />, inactiveIcon: <Cinematics width={23} height={23} />,  },
  { key: 'seven', name: 'Fans Stars Zone', activeIcon: <FansActive width={23} height={23} />, inactiveIcon: <Fans width={23} height={23} />,  },
  { key: 'eight', name: 'Kid-Vids', activeIcon: <KidsActive width={23} height={23} />, inactiveIcon: <Kids width={23} height={23} />,  },
  { key: 'nine', name: 'TV ProgMax', activeIcon: <TVpromaxActive width={23} height={23} />, inactiveIcon: <Television width={23} height={23} />,  },
  { key: 'ten', name: 'Learnings and Hobbies', activeIcon: <PuzzleActive width={23} height={23} />, inactiveIcon: <Puzzle width={23} height={23} />,  },
  { key: 'eleven', name: 'Sports & Sports', activeIcon: <Ionicons name="sports-handball" size={28} color="#FACA4E" />, inactiveIcon: <Ionicons name="sports-handball" size={28} color="#C5C5C5" />,  },
  { key: 'twelve', name: 'On-News', activeIcon: <News name="news" size={26} color="#FACA4E" />, inactiveIcon: <News name="news" size={26} color="#C5C5C5" />,  },
  { key: 'thirteen', name: 'Open Letters', activeIcon: <LetterIcon name="newsletter" size={26} color="#FACA4E" />, inactiveIcon: <LetterIcon name="newsletter" size={26} color="#C5C5C5" />,  },
  { key: 'fourteen', name: 'QAFI', activeIcon: <QafiIcon name="people-arrows" size={20} color="#FACA4E" />, inactiveIcon: <QafiIcon name="people-arrows" size={20} color="#C5C5C5" />,  },
  { key: 'fifteen', name: 'EBIC', activeIcon: <EBC name="sticker-emoji" size={28} color="#FACA4E" />, inactiveIcon: <EBC name="sticker-emoji" size={28} color="#C5C5C5" />,  },
  ],

};

// Create a slice for categories
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
  toggleCategory(state, action) {
    const category = state.categories.find(cat => cat.key === action.payload);
    if (category) {
      category.isActive = !category.isActive;
    }
  },
  resetDefault(state) {
    state.categories.forEach((cat, index) => {
      cat.isActive = index < 3; // Set first 3 categories as active
    });
  },
});

export const { setCategories,toggleCategory, resetDefault } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
