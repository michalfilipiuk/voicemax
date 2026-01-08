import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { TextStyles } from '@/styles/typography';

export type TextType =
  // Headlines
  | 'headlineDisplay'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  // Body Large
  | 'bodyLarge'
  | 'bodyLargeLong'
  | 'bodyLargeMedium'
  // Body Regular
  | 'bodyRegular'
  | 'bodyRegularLong'
  | 'bodyRegularMedium'
  // Body Small
  | 'bodySmall'
  | 'bodySmallMedium'
  // Legacy types (for backwards compatibility)
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'link';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TextType;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'bodyRegular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'contentStrong');

  const getTextStyle = () => {
    switch (type) {
      // New typography system
      case 'headlineDisplay':
        return TextStyles.headlineDisplay;
      case 'headlineLarge':
        return TextStyles.headlineLarge;
      case 'headlineMedium':
        return TextStyles.headlineMedium;
      case 'headlineSmall':
        return TextStyles.headlineSmall;
      case 'bodyLarge':
        return TextStyles.bodyLarge;
      case 'bodyLargeLong':
        return TextStyles.bodyLargeLong;
      case 'bodyLargeMedium':
        return TextStyles.bodyLargeMedium;
      case 'bodyRegular':
      case 'default':
        return TextStyles.bodyRegular;
      case 'bodyRegularLong':
        return TextStyles.bodyRegularLong;
      case 'bodyRegularMedium':
      case 'defaultSemiBold':
        return TextStyles.bodyRegularMedium;
      case 'bodySmall':
        return TextStyles.bodySmall;
      case 'bodySmallMedium':
        return TextStyles.bodySmallMedium;
      // Legacy mappings
      case 'title':
        return TextStyles.headlineDisplay;
      case 'subtitle':
        return TextStyles.headlineMedium;
      case 'link':
        return {
          ...TextStyles.bodyLarge,
          textDecorationLine: 'underline' as const,
        };
      default:
        return TextStyles.bodyRegular;
    }
  };

  return (
    <Text
      style={[
        { color },
        getTextStyle(),
        style,
      ]}
      {...rest}
    />
  );
}
