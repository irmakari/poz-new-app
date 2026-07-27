export interface MockSongItem {
  id: string;
  title: string;
  artist: string;
  color: string;
}

export interface MoodOptionItem {
  id: string;
  label: string;
  color: string;
}

export const MOCK_SONGS: MockSongItem[] = [
  { id: 's1', title: 'a canım', artist: 'mabel matiz', color: '#FFD7EC' },
  { id: 's2', title: 'seni dert etmeler', artist: 'madrigal', color: '#CBEBFC' },
  { id: 's3', title: 'bir derdim var', artist: 'mor ve ötesi', color: '#FFF1B0' },
  { id: 's4', title: 'seni kendime sakladım', artist: 'duman', color: '#E3D7FF' },
  { id: 's5', title: 'aşk kırıntıları', artist: 'teoman', color: '#C6F6D5' },
];

export const MOOD_OPTIONS: MoodOptionItem[] = [
  { id: 'm1', label: 'huzurlu', color: '#C6F6D5' },
  { id: 'm2', label: 'mutlu', color: '#FFF1B0' },
  { id: 'm3', label: 'heyecanlı', color: '#FFD7EC' },
  { id: 'm4', label: 'yorgun', color: '#CBEBFC' },
  { id: 'm5', label: 'özlemli', color: '#E3D7FF' },
  { id: 'm6', label: 'karışık', color: '#E8E1F0' },
];

export const LOCATION_OPTIONS: string[] = [
  'bostancı',
  'kadıköy',
  'moda',
  'ev',
  'başka bir yer',
];
