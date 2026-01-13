import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface FormantCardProps {
  f1: number;
  f2: number;
  f3: number;
  vocalTractLength: number;
}

// Get VTL rating based on male/female ranges
function getVtlRating(vtl: number): { label: string; color: 'success' | 'brand' | 'alert' } {
  if (vtl >= 17) return { label: 'Deep', color: 'success' };
  if (vtl >= 15) return { label: 'Average', color: 'brand' };
  return { label: 'Higher', color: 'alert' };
}

export function FormantCard({ f1, f2, f3, vocalTractLength }: FormantCardProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const bgMain = useThemeColor({}, 'bgMain');
  const successContent = useThemeColor({}, 'successContent');
  const alertContent = useThemeColor({}, 'alertContent');

  const vtlRating = getVtlRating(vocalTractLength);
  const vtlColor = vtlRating.color === 'success' ? successContent :
                   vtlRating.color === 'brand' ? brandContent : alertContent;

  const tooltips = {
    formants: 'Formant frequencies are resonances created by your throat and mouth shape. Lower formants generally indicate a larger vocal tract and more masculine voice quality.',
    vtl: 'Vocal tract length estimates the size of your throat and mouth. Men typically have 15-18cm, women 13-15cm. A longer vocal tract produces a deeper, more resonant voice.',
  };

  return (
    <Card variant="filled" style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="bodyRegularMedium">Formant Frequencies</ThemedText>
        <TouchableOpacity
          onPress={() => setShowTooltip('formants')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="information-circle-outline" size={18} color={contentSubtle} />
        </TouchableOpacity>
      </View>

      <View style={styles.formantRow}>
        <View style={styles.formantItem}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            F1
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {f1} Hz
          </ThemedText>
        </View>

        <View style={styles.formantItem}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            F2
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {f2} Hz
          </ThemedText>
        </View>

        <View style={styles.formantItem}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            F3
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {f3} Hz
          </ThemedText>
        </View>
      </View>

      <View style={styles.vocalTractContainer}>
        <View style={styles.vtlHeaderRow}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            Vocal Tract Length
          </ThemedText>
          <TouchableOpacity
            onPress={() => setShowTooltip('vtl')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="information-circle-outline" size={14} color={contentSubtle} />
          </TouchableOpacity>
        </View>
        <View style={styles.vtlValueRow}>
          <ThemedText type="bodyRegularMedium" style={{ color: contentNormal }}>
            {vocalTractLength} cm
          </ThemedText>
          <ThemedText type="bodySmall" style={{ color: vtlColor }}>
            {vtlRating.label}
          </ThemedText>
        </View>
      </View>

      {/* Tooltip Modal */}
      <Modal
        visible={showTooltip !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTooltip(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowTooltip(null)}>
          <View style={[styles.tooltipContainer, { backgroundColor: bgMain }]}>
            <ThemedText type="bodyRegularMedium" style={{ marginBottom: Spacing.xs }}>
              {showTooltip === 'formants' ? 'Formant Frequencies' : 'Vocal Tract Length'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              {showTooltip === 'formants' ? tooltips.formants : tooltips.vtl}
            </ThemedText>
          </View>
        </Pressable>
      </Modal>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formantRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formantItem: {
    alignItems: 'center',
    gap: 2,
  },
  vocalTractContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  vtlHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vtlValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
