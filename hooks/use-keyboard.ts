import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

export type KeyboardState = {
  /** Whether the keyboard is currently visible */
  isVisible: boolean;
  /** The height of the keyboard (0 when hidden) */
  height: number;
};

/**
 * Listen to keyboard show/hide events
 * Returns the keyboard visibility state and height
 *
 * @example
 * const { isVisible, height } = useKeyboard();
 *
 * return (
 *   <View style={{ paddingBottom: isVisible ? height : 0 }}>
 *     <TextInput />
 *   </View>
 * );
 */
export function useKeyboard(): KeyboardState {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    // iOS uses 'keyboardWillShow/Hide' for smoother animations
    // Android uses 'keyboardDidShow/Hide'
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const handleKeyboardShow = (event: KeyboardEvent) => {
      setKeyboardState({
        isVisible: true,
        height: event.endCoordinates.height,
      });
    };

    const handleKeyboardHide = () => {
      setKeyboardState({
        isVisible: false,
        height: 0,
      });
    };

    const showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
    const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardState;
}
