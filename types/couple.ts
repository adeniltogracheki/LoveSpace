export interface Couple {
  id: string;
  user1_id: string;
  user2_id: string;
  invite_code: string;
  status: 'pending' | 'active' | 'ended';
  relationship_start: string | null;
  created_at: string;
  updated_at: string;
}

export interface Avatar {
  id: string;
  user_id: string;
  avatar_data: {
    hair: string;
    clothes: string;
    accessories: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: string;
  couple_id: string;
  name: string;
  type: 'dog' | 'cat' | 'bunny';
  level: number;
  happiness: number;
  hunger: number;
  items: string[];
  created_at: string;
  updated_at: string;
}

export interface VirtualSpace {
  id: string;
  couple_id: string;
  theme: string;
  furniture: string[];
  decorations: string[];
  created_at: string;
  updated_at: string;
}

export interface UserCurrency {
  id: string;
  user_id: string;
  hearts: number;
  last_daily_bonus: string | null;
  created_at: string;
  updated_at: string;
}

export interface Memory {
  id: string;
  couple_id: string;
  title: string;
  description: string | null;
  type: 'wishlist' | 'completed' | 'milestone';
  completed: boolean;
  completed_date: string | null;
  photos: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  couple_id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: 'anniversary' | 'birthday' | 'milestone' | 'custom';
  recurring: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  couple_id: string;
  mood: 'happy' | 'sad' | 'tired' | 'excited' | 'stressed' | 'calm';
  note: string | null;
  entry_date: string;
  created_at: string;
}

export interface PartnerInfo {
  id: string;
  username: string;
  email: string;
  avatar?: Avatar;
}