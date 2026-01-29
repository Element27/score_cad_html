// supabase setup



// sb_publishable_MfkTLrFKJ1hYCW7w8mg8vw_gPvVOXZ3



import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabaseUrl = 'https://yfxxzlbzdakzrnbtxqem.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmeHh6bGJ6ZGFrenJuYnR4cWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MzksImV4cCI6MjA4NTI3NjczOX0.oSQ23r0pi8jfSCDY8WvLtCKy-Xn6rEhGa0jSzOFjSfQ'
// const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export { supabase };