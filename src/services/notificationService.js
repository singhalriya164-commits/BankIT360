// Real OS Native Desktop Push Notification Service for BankIT360

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('Desktop OS notifications not supported by browser.');
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return 'denied';
  }
}

export function sendDesktopNotification(title, options = {}) {
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    try {
      const n = new Notification(title, {
        body: options.body || 'BankIT360 Alert System Notification',
        icon: options.icon || '/favicon.ico',
        tag: options.tag || `bit360-${Date.now()}`,
        requireInteraction: options.requireInteraction || false
      });

      if (options.onClick) {
        n.onclick = options.onClick;
      }
      return true;
    } catch (err) {
      console.error('Failed to dispatch desktop notification:', err);
      return false;
    }
  } else {
    console.warn('Notification permission not granted.');
    return false;
  }
}
