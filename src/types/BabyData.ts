export interface BabyData {
    user_uuid: string;
    baby_name: string;
    baby_birthdate: string | null; // Armazenado como string ISO no Supabase
    baby_weight: string;
    baby_height: string;
  }
  