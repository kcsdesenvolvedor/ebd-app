import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qrajwvaoiobklkasfdcp.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYWp3dmFvaW9ia2xrYXNmZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODM5NzQsImV4cCI6MjA2NzI1OTk3NH0.zSUHcuUVrlwY7YdVMKt3nda0vXnhbe4D0AjYHhKN4p8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 