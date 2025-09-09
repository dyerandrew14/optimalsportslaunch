import { type Athlete } from './athletes';

// Use same-origin by default; allow override via NEXT_PUBLIC_API_BASE
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '').trim();

// Athlete API functions
export async function fetchAthletes(): Promise<Athlete[]> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes`, {
      cache: 'no-store', // Always get fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching athletes:', error);
    // Return empty array on error - components should handle gracefully
    return [];
  }
}

export async function fetchAthlete(slug: string): Promise<Athlete | null> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes/${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching athlete:', error);
    return null;
  }
}

export async function createAthlete(athlete: Athlete): Promise<Athlete | null> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athlete),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating athlete:', error);
    return null;
  }
}

export async function updateAthlete(slug: string, athlete: Athlete): Promise<Athlete | null> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athlete),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating athlete:', error);
    return null;
  }
}

export async function deleteAthlete(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes/${slug}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting athlete:', error);
    return false;
  }
}

export async function updateAllAthletes(athletes: Athlete[]): Promise<Athlete[] | null> {
  try {
    const response = await fetch(`${API_BASE}/api/athletes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athletes),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating all athletes:', error);
    return null;
  }
}

