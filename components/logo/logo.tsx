import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useThemeColor } from '@/hooks/use-theme-color';

export type LogoVariant = 'symbol' | 'logomark';
export type LogoSize = 'small' | 'medium' | 'large';

export type LogoProps = {
  /** Logo variant: 'symbol' for icon only, 'logomark' for full logo */
  variant?: LogoVariant;
  /** Size of the logo */
  size?: LogoSize;
  /** Optional color override (defaults to contentStrong) */
  color?: string;
};

// =============================================================================
// LOGO CONFIGURATION
// To swap the logo, replace the SVG components below with your own.
// Keep the same viewBox dimensions or adjust the sizes accordingly.
// =============================================================================

const SYMBOL_VIEWBOX = '0 0 32 32';
const LOGOMARK_VIEWBOX = '0 0 120 32';

// Size configurations
const sizes = {
  small: {
    symbol: { width: 24, height: 24 },
    logomark: { width: 90, height: 24 },
  },
  medium: {
    symbol: { width: 32, height: 32 },
    logomark: { width: 120, height: 32 },
  },
  large: {
    symbol: { width: 48, height: 48 },
    logomark: { width: 180, height: 48 },
  },
};

// =============================================================================
// PLACEHOLDER SYMBOL SVG
// Replace this component with your actual logo symbol
// =============================================================================
function SymbolSvg({ color, innerColor }: { color: string; innerColor: string }) {
  return (
    <>
      {/* Placeholder: Abstract shape - Replace with your logo symbol */}
      <Rect x="4" y="4" width="24" height="24" rx="6" fill={color} />
      <Path
        d="M16 10L20 16L16 22L12 16L16 10Z"
        fill={innerColor}
      />
    </>
  );
}

// =============================================================================
// PLACEHOLDER LOGOMARK SVG
// Replace this component with your actual full logo (symbol + wordmark)
// =============================================================================
function LogomarkSvg({ color, innerColor }: { color: string; innerColor: string }) {
  return (
    <>
      {/* Symbol part */}
      <Rect x="4" y="4" width="24" height="24" rx="6" fill={color} />
      <Path
        d="M16 10L20 16L16 22L12 16L16 10Z"
        fill={innerColor}
      />
      {/* Wordmark placeholder: "LOGO" text as paths */}
      <Path
        d="M40 10H44V22H52V10H56V26H40V10Z"
        fill={color}
      />
      <Path
        d="M60 10H72C75.3137 10 78 12.6863 78 16V20C78 23.3137 75.3137 26 72 26H60V10ZM64 14V22H72C73.1046 22 74 21.1046 74 20V16C74 14.8954 73.1046 14 72 14H64Z"
        fill={color}
      />
      <Path
        d="M82 10H98C101.314 10 104 12.6863 104 16V20C104 23.3137 101.314 26 98 26H82V10ZM86 14V22H98C99.1046 22 100 21.1046 100 20V16C100 14.8954 99.1046 14 98 14H86Z"
        fill={color}
      />
    </>
  );
}

export function Logo({ variant = 'symbol', size = 'medium', color }: LogoProps) {
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentOnBrand = useThemeColor({}, 'contentOnBrand');
  const logoColor = color ?? contentStrong;

  const dimensions = sizes[size][variant];
  const viewBox = variant === 'symbol' ? SYMBOL_VIEWBOX : LOGOMARK_VIEWBOX;

  return (
    <View style={styles.container}>
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={viewBox}
      >
        {variant === 'symbol' ? (
          <SymbolSvg color={logoColor} innerColor={contentOnBrand} />
        ) : (
          <LogomarkSvg color={logoColor} innerColor={contentOnBrand} />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
