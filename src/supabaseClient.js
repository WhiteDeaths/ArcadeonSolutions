import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stkfhbalhkhkftqdbnqd.supabase.co'; // e.g. https://xyzcompany.supabase.co
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a2ZoYmFsaGtoa2Z0cWRibnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMTUzMjgsImV4cCI6MjA3MDg5MTMyOH0.2m8k5aUVryRVtSteZvHonilhq9Q234ZCYr5_BQdkT_I'; // starts with 'eyJ...'

export const supabase = createClient(supabaseUrl, supabaseKey);
