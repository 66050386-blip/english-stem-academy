// Realtime cross-tab and in-page event bus
// Ensures that whenever an admin grants gifts, adjusts economy, or resets cooldowns,
// all open tabs and pages (Dashboard, Navbar, Admin, Wardrobe) update immediately without pressing F5.

type RealtimeEventType = 
  | 'USER_STATS_UPDATED'
  | 'GIFT_GRANTED'
  | 'COOLDOWN_RESET'
  | 'WARDROBE_UPDATED'
  | 'LESSON_PROGRESS_UPDATED';

interface RealtimeMessage {
  type: RealtimeEventType;
  payload?: any;
  timestamp: number;
}

const CHANNEL_NAME = 'english_stem_realtime_sync_channel';

// 1. BroadcastChannel for cross-tab instant messaging
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  console.warn('BroadcastChannel not supported in this environment', e);
}

// 2. Broadcast an update to ALL tabs and local window
export const broadcastAppUpdate = (type: RealtimeEventType, payload?: any) => {
  const message: RealtimeMessage = {
    type,
    payload,
    timestamp: Date.now(),
  };

  // Broadcast to other tabs via BroadcastChannel
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(message);
    } catch {}
  }

  // Fallback / secondary cross-tab via localStorage storage event
  try {
    localStorage.setItem('realtime_sync_trigger', JSON.stringify(message));
  } catch {}

  // Dispatch local CustomEvent for current tab components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app-realtime-update', { detail: message }));
  }
};

// 3. Subscribe to updates in any component (with automatic cleanup)
export const subscribeToRealtimeUpdates = (
  callback: (message: RealtimeMessage) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  // Handler for BroadcastChannel
  const handleBroadcast = (event: MessageEvent) => {
    if (event.data && event.data.type) {
      callback(event.data);
    }
  };

  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }

  // Handler for local CustomEvent
  const handleCustomEvent = (event: Event) => {
    const custom = event as CustomEvent<RealtimeMessage>;
    if (custom.detail) {
      callback(custom.detail);
    }
  };
  window.addEventListener('app-realtime-update', handleCustomEvent);

  // Handler for cross-tab localStorage event
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === 'realtime_sync_trigger' && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        callback(parsed);
      } catch {}
    }
  };
  window.addEventListener('storage', handleStorageEvent);

  // Return cleanup function
  return () => {
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('app-realtime-update', handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
};
