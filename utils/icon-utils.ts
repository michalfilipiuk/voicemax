import React from 'react';

export type IconCloneProps = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

/**
 * Clone a React icon element with specified props
 * Works with HugeIcons and other icon libraries that accept color/size props
 */
export function cloneIconWithProps(
  icon: React.ReactNode,
  props: IconCloneProps
): React.ReactNode {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    const cloneProps: Record<string, unknown> = {};

    if (props.color !== undefined) {
      cloneProps.color = props.color;
    }
    if (props.size !== undefined) {
      cloneProps.size = props.size;
    }
    if (props.strokeWidth !== undefined) {
      cloneProps.strokeWidth = props.strokeWidth;
    }

    return React.cloneElement(icon as React.ReactElement<any>, cloneProps);
  }

  return icon;
}
