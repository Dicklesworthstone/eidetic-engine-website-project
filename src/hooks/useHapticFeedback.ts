import useVibration, { VibrationPatterns } from '@luxonauta/use-vibration';
import { useHapticContext } from '../contexts/HapticContext';

/**
 * A custom hook that provides haptic feedback functionality across the site
 * Using the @luxonauta/use-vibration library for consistent and expressive vibration patterns
 * Respects user preference for haptic feedback
 */
export default function useHapticFeedback() {
  const [{ isSupported, isVibrating }, { vibrate, stop }] = useVibration();
  const { isHapticEnabled } = useHapticContext();

  // Only trigger vibration if haptic feedback is both supported and enabled
  const shouldVibrate = isSupported && isHapticEnabled;

  /**
   * Navigation feedback - light haptic for navigation elements
   */
  const navigationFeedback = () => {
    if (shouldVibrate) {
      vibrate(VibrationPatterns.LIGHT_TAP);
    }
  };

  /**
   * Selection feedback - standard haptic for selections and button presses
   */
  const selectionFeedback = () => {
    if (shouldVibrate) {
      vibrate(VibrationPatterns.STANDARD);
    }
  };

  /**
   * Success feedback - pattern for successful operations
   */
  const successFeedback = () => {
    if (shouldVibrate) {
      vibrate(VibrationPatterns.SUCCESS);
    }
  };

  /**
   * Error feedback - strong pattern for errors
   */
  const errorFeedback = () => {
    if (shouldVibrate) {
      vibrate(VibrationPatterns.ERROR);
    }
  };

  /**
   * Notification feedback - distinct pattern for notifications
   */
  const notificationFeedback = () => {
    if (shouldVibrate) {
      vibrate(VibrationPatterns.NOTIFICATION);
    }
  };

  return {
    isSupported,
    isVibrating,
    isEnabled: isHapticEnabled,
    navigationFeedback,
    selectionFeedback,
    successFeedback,
    errorFeedback,
    notificationFeedback,
    stop,
  };
} 