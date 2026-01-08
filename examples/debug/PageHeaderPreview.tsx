import { FavouriteIcon, Search01Icon, Setting07Icon, Share08Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/buttons';
import { PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function PageHeaderPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const [progressStep, setProgressStep] = useState(2);
  const totalSteps = 5;

  const handleNext = () => {
    setProgressStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setProgressStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Page Header</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Versatile header component for all app screens
      </ThemedText>

      {/* Default - Back Only */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Back Button Only</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            onLeftPress={() => console.log('Back pressed')}
          />
        </View>
      </View>

      {/* Default - With Title */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">With Title</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            title="Page Title"
            onLeftPress={() => console.log('Back pressed')}
          />
        </View>
      </View>

      {/* Default - Title + Right Icon */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Title + Right Action</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            title="Details"
            onLeftPress={() => console.log('Back pressed')}
            rightIcon={<HugeiconsIcon icon={FavouriteIcon} size={20} />}
            onRightPress={() => console.log('Favorite pressed')}
          />
        </View>
      </View>

      {/* Default - Multiple Right Icons Example */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Different Right Icons</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            title="Search"
            onLeftPress={() => console.log('Back pressed')}
            rightIcon={<HugeiconsIcon icon={Search01Icon} size={20} />}
            onRightPress={() => console.log('Search pressed')}
          />
        </View>
        <View style={[styles.headerContainer, { borderColor: alphaMedium, marginTop: 8 }]}>
          <PageHeader
            title="Settings"
            onLeftPress={() => console.log('Back pressed')}
            rightIcon={<HugeiconsIcon icon={Setting07Icon} size={20} />}
            onRightPress={() => console.log('Settings pressed')}
          />
        </View>
        <View style={[styles.headerContainer, { borderColor: alphaMedium, marginTop: 8 }]}>
          <PageHeader
            title="Share"
            onLeftPress={() => console.log('Back pressed')}
            rightIcon={<HugeiconsIcon icon={Share08Icon} size={20} />}
            onRightPress={() => console.log('Share pressed')}
          />
        </View>
      </View>

      {/* Logo Variant */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Logo Variant</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal, marginBottom: 8 }}>
          For onboarding screens - centered logo only
        </ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader variant="logo" />
        </View>
      </View>

      {/* Progress Variant */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Progress Variant</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal, marginBottom: 8 }}>
          Step {progressStep} of {totalSteps}
        </ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            variant="progress"
            currentStep={progressStep}
            totalSteps={totalSteps}
            onLeftPress={() => console.log('Back pressed')}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Previous"
            variant="secondary"
            size="sm"
            onPress={handlePrev}
            disabled={progressStep === 1}
          />
          <Button
            title="Next"
            variant="primary"
            size="sm"
            onPress={handleNext}
            disabled={progressStep === totalSteps}
          />
        </View>
      </View>

      {/* No Back Button */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">No Back Button</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <PageHeader
            title="Home"
            showLeftButton={false}
            rightIcon={<HugeiconsIcon icon={Setting07Icon} size={20} />}
            onRightPress={() => console.log('Settings pressed')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  headerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
});
