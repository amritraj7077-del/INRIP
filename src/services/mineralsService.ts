import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Mineral } from '../types/minerals';

/**
 * Validates if a mineral record has valid coordinates
 */
const isValidCoordinates = (mineral: Mineral): boolean => {
  const { latitude, longitude } = mineral;
  
  console.log(`Validating coordinates for ${mineral.mine_name}:`, {
    latitude,
    longitude,
    latitudeType: typeof latitude,
    longitudeType: typeof longitude
  });
  
  const isValid = (
    latitude !== null &&
    longitude !== null &&
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
  
  if (!isValid) {
    console.warn(`Invalid coordinates for ${mineral.mine_name}:`, { latitude, longitude });
  }
  
  return isValid;
};

/**
 * Fetches all minerals from Supabase and validates coordinates
 */
export const fetchMinerals = async (): Promise<Mineral[]> => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  try {
    console.log('=== FETCHING MINERALS DEBUG ===');
    console.log('supabase client:', supabase);
    console.log('Table name: minerals');
    
    const query = supabase!
      .from('minerals')
      .select('*')
      .order('mine_name', { ascending: true });
    
    console.log('Query object:', query);
    
    const { data, error } = await query;

    console.log('Supabase response received');
    console.log('Error:', error);
    console.log('Error details:', JSON.stringify(error, null, 2));
    console.log('Data:', data);
    console.log('Data length:', data?.length);

    if (error) {
      console.error('=== SUPABASE ERROR DETAILS ===');
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error hint:', error.hint);
      console.error('Error details:', error.details);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw new Error(`Failed to fetch minerals: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log('⚠ No minerals found in database');
      console.log('This could be due to:');
      console.log('1. Empty table');
      console.log('2. RLS (Row Level Security) blocking SELECT');
      console.log('3. Incorrect table name');
      console.log('4. Invalid API key');
      return [];
    }

    console.log(`Raw data received: ${data.length} records`);
    console.log('Sample record:', data[0]);
    console.log('All records:', data);

    // Filter out records with invalid coordinates
    const validMinerals = data.filter(isValidCoordinates);
    const invalidCount = data.length - validMinerals.length;

    console.log(`Valid minerals: ${validMinerals.length}, Invalid: ${invalidCount}`);

    if (invalidCount > 0) {
      console.warn(`Filtered out ${invalidCount} records with invalid coordinates`);
    }

    console.log(`✓ Loaded ${validMinerals.length} valid minerals from Supabase`);
    return validMinerals;
  } catch (error) {
    console.error('=== FETCH ERROR DETAILS ===');
    console.error('Error:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('Full error object:', JSON.stringify(error, null, 2));
    throw error;
  }
};

/**
 * Fetches minerals with pagination for large datasets
 */
export const fetchMineralsPaginated = async (
  page: number = 1,
  pageSize: number = 100
): Promise<{ data: Mineral[]; count: number }> => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase!
      .from('minerals')
      .select('*', { count: 'exact' })
      .order('mine_name', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch minerals: ${error.message}`);
    }

    const validMinerals = (data || []).filter(isValidCoordinates);
    
    return {
      data: validMinerals,
      count: count || 0
    };
  } catch (error) {
    console.error('Error fetching paginated minerals:', error);
    throw error;
  }
};
