import { isDevMode } from '@angular/core';

export const environment = {
  production: isDevMode() ? false : true,
  supabaseUrl: 'https://pubgbrqgobcotdvfzbrw.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1YmdicnFnb2Jjb3RkdmZ6YnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMjU5MzUsImV4cCI6MjAyNjkwMTkzNX0.CN7LMEnFUNdp7DP6kiwfjsaXfEWmvZmGCP1kHQ3nKC8',
};
