import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_PROJECT_API_KEY_SERVICE_ROLE!;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);