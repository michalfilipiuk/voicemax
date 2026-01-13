import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

type MetricStatus = 'excellent' | 'good' | 'normal' | 'high' | 'low';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  status: MetricStatus;
  description?: string;
  tooltip?: string; // Info tooltip text
}

const STATUS_LABELS: Record<MetricStatus, string> = {
  excellent: 'Excellent',
  good: 'Good',
  normal: 'Normal',
  high: 'High',
  low: 'Low',
};

export function MetricCard({
  label,
  value,
  unit,
  status,
  description,
  tooltip,
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const successContent = useThemeColor({}, 'successContent');
  const alertContent = useThemeColor({}, 'alertContent');
  const errorContent = useThemeColor({}, 'errorContent');
  const brandContent = useThemeColor({}, 'brandContent');

  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
      case 'good':
        return successContent;
      case 'normal':
        return brandContent;
      case 'high':
      case 'low':
        return status === 'high' ? alertContent : errorContent;
      default:
        return contentNormal;
    }
  };

  const statusColor = getStatusColor();
  const bgMain = useThemeColor({}, 'bgMain');

  return (
    <Card variant="filled" style={styles.container}>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <View style={styles.labelRow}>
            <ThemedText type="bodyRegularMedium">{label}</ThemedText>
            {tooltip && (
              <TouchableOpacity
                onPress={() => setShowTooltip(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="information-circle-outline" size={16} color={contentSubtle} />
              </TouchableOpacity>
            )}
          </View>
          {description && (
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              {description}
            </ThemedText>
          )}
        </View>

        <View style={styles.valueContainer}>
          <ThemedText type="bodyRegularMedium" style={{ color: contentNormal }}>
            {typeof value === 'number' ? value.toFixed(2) : value} {unit}
          </ThemedText>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <ThemedText type="bodySmall" style={{ color: statusColor }}>
            {STATUS_LABELS[status]}
          </ThemedText>
        </View>
      </View>

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
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    gap: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  valueContainer: {
    paddingHorizontal: Spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
