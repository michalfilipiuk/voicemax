import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface QualityGaugeProps {
  label: string;
  value: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  tooltip?: string; // Info tooltip text
}

export function QualityGauge({ label, value, size = 'medium', tooltip }: QualityGaugeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const successContent = useThemeColor({}, 'successContent');
  const alertContent = useThemeColor({}, 'alertContent');
  const errorContent = useThemeColor({}, 'errorContent');
  const brandContent = useThemeColor({}, 'brandContent');

  const getValueColor = () => {
    if (value >= 81) return successContent;
    if (value >= 61) return brandContent;
    if (value >= 41) return alertContent;
    return errorContent;
  };

  const getStatusLabel = () => {
    if (value >= 81) return 'Excellent';
    if (value >= 61) return 'Good';
    if (value >= 41) return 'Average';
    return 'Needs Work';
  };

  const valueColor = getValueColor();
  const clampedValue = Math.max(0, Math.min(100, value));

  const dimensions = {
    small: { width: 80, height: 60, barHeight: 6 },
    medium: { width: 100, height: 80, barHeight: 8 },
    large: { width: 120, height: 100, barHeight: 10 },
  }[size];

  const bgMain = useThemeColor({}, 'bgMain');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={[styles.container, { width: dimensions.width }]}>
      <View style={styles.labelRow}>
        <ThemedText type="bodySmall" style={[styles.label, { color: contentSubtle }]}>
          {label}
        </ThemedText>
        {tooltip && (
          <TouchableOpacity
            onPress={() => setShowTooltip(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="information-circle-outline" size={14} color={contentSubtle} />
          </TouchableOpacity>
        )}
      </View>

      <ThemedText type="headlineMedium" style={{ color: valueColor }}>
        {Math.round(value)}
      </ThemedText>

      {/* Progress bar */}
      <View
        style={[
          styles.barBackground,
          {
            backgroundColor: bgSecondary,
            height: dimensions.barHeight,
          },
        ]}
      >
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: valueColor,
              width: `${clampedValue}%`,
              height: dimensions.barHeight,
            },
          ]}
        />
      </View>

      <ThemedText type="bodySmall" style={{ color: valueColor }}>
        {getStatusLabel()}
      </ThemedText>

      {/* Tooltip Modal */}
      {tooltip && (
        <Modal
          visible={showTooltip}
          transparent
          animationType="fade"
          onRequestClose={() => setShowTooltip(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowTooltip(false)}>
            <View style={[styles.tooltipContainer, { backgroundColor: bgMain }]}>
              <ThemedText type="bodyRegularMedium" style={{ marginBottom: Spacing.xs }}>
                {label}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>
                {tooltip}
              </ThemedText>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    textAlign: 'center',
  },
  barBackground: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: BorderRadius.full,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  tooltipContainer: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
