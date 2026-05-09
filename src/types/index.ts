export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_from: number | null;
  category: string;
  image_url: string;
  active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  google_event_id: string;
  created_at: string;
  updated_at: string;
  service?: Service;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_photo: string;
  content: string;
  rating: number;
  service: string;
  active: boolean;
  created_at: string;
}
