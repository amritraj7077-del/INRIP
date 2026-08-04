# Supabase Integration Setup

## Files Created

1. **src/lib/supabase.ts** - Supabase client configuration
   - Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from environment variables
   - Exports a reusable supabase client instance

2. **src/types/minerals.ts** - TypeScript interface for mineral data
   - Defines the Mineral interface matching your Supabase table structure
   - Includes: id, mine_name, mineral, state, district, owner, status, latitude, longitude

3. **src/services/mineralsService.ts** - Service for fetching minerals
   - Contains fetchMinerals() function to query the minerals table
   - Handles Supabase errors and converts data to Mineral type
   - Returns an array of Mineral objects

4. **src/components/MineMarkers.tsx** - React component for rendering mine markers
   - Takes map instance and minerals array as props
   - Creates MapLibre markers for each mineral using latitude/longitude
   - Adds popups with mine details (name, mineral, state, district, owner, status)
   - Handles marker cleanup on unmount

5. **src/components/MineMarkers.css** - Styling for mine markers and popups
   - Custom popup styling with clean, modern design
   - MapLibre popup overrides for consistent theming

## Files Modified

1. **src/components/Map.tsx** - Main map component
   - Added state for minerals data, loading, and errors
   - Added useEffect to fetch minerals when map is ready
   - Replaced CenterMarker with MineMarkers component
   - Added loading and error indicators for minerals data
   - Maintained all existing map functionality

2. **src/components/Map.css** - Map styling
   - Added styles for minerals loading indicator
   - Added styles for minerals error indicator
   - Added responsive adjustments for mobile

3. **src/vite-env.d.ts** - TypeScript environment variable definitions
   - Added VITE_SUPABASE_URL type definition
   - Added VITE_SUPABASE_ANON_KEY type definition

4. **.env.example** - Environment variable template
   - Added Supabase configuration variables
   - Updated with examples for both MapTiler and Supabase

5. **package.json** - Dependencies
   - Added @supabase/supabase-js package

## Environment Variables Setup

### Where to Place Environment Variables

Create a `.env` file in the **root directory** of your project (same level as package.json):

```
/Applications/Setapp/map/.env
```

### Required Environment Variables

Add the following to your `.env` file:

```env
# MapTiler API Key
VITE_MAPTILER_API_KEY=your_actual_maptiler_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to Get Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to Settings → API
4. Copy the **Project URL** → paste as VITE_SUPABASE_URL
5. Copy the **anon / public** key → paste as VITE_SUPABASE_ANON_KEY

### Example .env File

```env
VITE_MAPTILER_API_KEY=get_your_actual_key_from_cloud_maptiler_com_account
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Requirements

Your Supabase `minerals` table should have the following columns:

- `id` (integer, primary key)
- `mine_name` (text)
- `mineral` (text)
- `state` (text)
- `district` (text)
- `owner` (text)
- `status` (text)
- `latitude` (numeric)
- `longitude` (numeric)
- `created_at` (timestamp, optional)
- `updated_at` (timestamp, optional)

## How It Works

1. **Map Initialization**: Map loads as before with MapTiler/OSM
2. **Data Fetching**: When map is ready, fetchMinerals() is called
3. **Supabase Query**: Queries all records from the minerals table
4. **Marker Creation**: MineMarkers component creates a marker for each record
5. **Popup Display**: Clicking a marker shows mine details in a popup
6. **Error Handling**: If Supabase connection fails, an error indicator is shown

## Testing

1. Add your Supabase credentials to `.env`
2. Restart the dev server: `npm run dev`
3. Open http://localhost:3000
4. Check browser console for:
   - "Fetching minerals from Supabase..."
   - "✓ Loaded X minerals from Supabase"
5. Verify red markers appear at mine locations
6. Click a marker to see the popup with mine details

## Next Steps

After verifying the markers work correctly, you can:
- Add clustering for large datasets
- Implement filters by mineral type, state, or status
- Add heatmaps for mineral density
- Implement custom SVG markers for different mineral types
- Add animations and transitions
