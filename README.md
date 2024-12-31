Here's the documentation in markdown format:

# Spotify Clone Documentation

## Project Overview

A full-stack Spotify clone built with Next.js 13+, featuring real-time music playback, user authentication, and library management.

## Technical Stack

- **Framework**: Next.js 13+ (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Audio**: use-sound
- **TypeScript**: For type safety

## Core Components

### Player System

```typescript
// components/PlayerContent.tsx
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
```

Handles:

- Music playback controls
- Volume management
- Track navigation
- Real-time song updates

### Media Components

```typescript
// components/MediaItem.tsx
interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}
```

- Displays song information
- Handles song selection
- Image loading optimization

### Custom Hooks

#### usePlayer

```typescript
// hooks/usePlayer.ts
interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}
```

Manages global player state

#### useLoadSongUrl

```typescript
// hooks/useLoadSongUrl.ts
const useLoadSongUrl = (song: Song | undefined) => {
  // Returns song URL from Supabase storage
};
```

Handles song URL loading

#### useGetSongById

```typescript
// hooks/useGetSongById.ts
const useGetSongById = (id?: string) => {
  // Returns song data and loading state
};
```

Fetches individual song data

## Data Types

### Song Type

```typescript
// types.ts
interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}
```

### User Details

```typescript
interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod;
}
```

## Key Features

### Music Player

- Play/Pause functionality
- Volume control with slider
- Next/Previous track navigation
- Continuous playback
- Real-time progress tracking

### Library Management

- Like/Unlike songs
- Personal library view
- Song metadata display
- Image thumbnails

### UI Components

#### Slider

```typescript
// components/Slider.tsx
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  step?: number;
}
```

Custom volume slider component

#### ListItem

```typescript
// components/ListItem.tsx
interface ListItemProps {
  image: string;
  name: string;
  href: string;
  data?: Song;
}
```

Reusable list item component

## Setup Instructions

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Installation

```bash
npm install
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication providers
3. Create storage buckets for:
   - songs
   - images
4. Configure database tables

## Project Structure

```
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Player/
│   ├── Slider.tsx
│   ├── MediaItem.tsx
│   └── LikeButton.tsx
├── hooks/
│   ├── usePlayer.ts
│   ├── useLoadSongUrl.ts
│   └── useGetSongById.ts
└── types/
    └── index.ts
```

## API Actions

### getSongs

```typescript
// actions/getSongs.ts
const getSongs = async (): Promise<Song[]> => {
  // Fetches songs from Supabase
};
```

## Dependencies

- @supabase/auth-helpers-nextjs
- @radix-ui/react-slider
- use-sound
- zustand
- tailwind-merge
- react-hot-toast
- react-icons

## Best Practices

1. TypeScript for type safety
2. Server-side rendering optimization
3. Error handling
4. Loading states
5. Responsive design
6. Audio lifecycle management
7. State management patterns

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License
