#!/usr/bin/env node

/**
 * Setup script for the React Native boilerplate.
 *
 * This script:
 * 1. Prompts for app name
 * 2. Updates package.json and app.json with the new name
 * 3. Moves demo content (debug menu, templates) to /examples/ for reference
 * 4. Creates a clean starter home screen
 *
 * Run with: npm run setup
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = process.cwd();

// Content for clean starter files
const cleanHomeScreen = `import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="headlineLarge">Welcome</ThemedText>
        <ThemedText type="bodyRegular">
          Edit app/(tabs)/index.tsx to get started.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
`;

const cleanTabLayout = `import { Tabs } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const bgMain = useThemeColor({}, 'bgMain');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: bgMain,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  );
}
`;

// Helper functions
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function toScheme(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function printHeader() {
  console.log('');
  console.log('┌─────────────────────────────────────────┐');
  console.log('│  🚀 React Native Boilerplate Setup      │');
  console.log('└─────────────────────────────────────────┘');
  console.log('');
}

function printSuccess(message) {
  console.log(`  ✓ ${message}`);
}

function printError(message) {
  console.log(`  ✗ ${message}`);
}

async function moveDirectory(from, to) {
  const fromPath = path.join(root, from);
  const toPath = path.join(root, to);

  if (!fs.existsSync(fromPath)) {
    return false;
  }

  // Ensure parent directory exists
  const parentDir = path.dirname(toPath);
  if (!fs.existsSync(parentDir)) {
    await fs.promises.mkdir(parentDir, { recursive: true });
  }

  await fs.promises.rename(fromPath, toPath);
  return true;
}

async function updatePackageJson(appName) {
  const packagePath = path.join(root, 'package.json');
  const packageJson = JSON.parse(await fs.promises.readFile(packagePath, 'utf8'));

  packageJson.name = toSlug(appName);

  await fs.promises.writeFile(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
}

async function updateAppJson(appName) {
  const appJsonPath = path.join(root, 'app.json');
  const appJson = JSON.parse(await fs.promises.readFile(appJsonPath, 'utf8'));

  appJson.expo.name = appName;
  appJson.expo.slug = toSlug(appName);
  appJson.expo.scheme = toScheme(appName);

  await fs.promises.writeFile(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
}

async function createCleanScreens() {
  const homeScreenPath = path.join(root, 'app/(tabs)/index.tsx');
  const tabLayoutPath = path.join(root, 'app/(tabs)/_layout.tsx');

  await fs.promises.writeFile(homeScreenPath, cleanHomeScreen);
  await fs.promises.writeFile(tabLayoutPath, cleanTabLayout);
}

async function runSetup(appName) {
  console.log('');
  console.log('Configuring project...');
  console.log('');

  try {
    // Update config files
    await updatePackageJson(appName);
    printSuccess(`Updated package.json (name: "${toSlug(appName)}")`);

    await updateAppJson(appName);
    printSuccess(`Updated app.json (name: "${appName}", slug: "${toSlug(appName)}", scheme: "${toScheme(appName)}")`);

    // Move demo content to examples
    const movedDebug = await moveDirectory('components/debug', 'examples/debug');
    if (movedDebug) {
      printSuccess('Moved /components/debug/ → /examples/debug/');
    }

    const movedTemplates = await moveDirectory('components/templates', 'examples/templates');
    if (movedTemplates) {
      printSuccess('Moved /components/templates/ → /examples/templates/');
    }

    // Create clean starter screens
    await createCleanScreens();
    printSuccess('Created clean home screen');
    printSuccess('Updated tab layout');

    // Success message
    console.log('');
    console.log('✅ Setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Run `npx expo start` to start development');
    console.log('  2. Edit app/(tabs)/index.tsx for your home screen');
    console.log('  3. Reference /examples/ for component usage patterns');
    console.log('  4. Delete /examples/ when no longer needed');
    console.log('');

  } catch (error) {
    console.log('');
    printError(`Error during setup: ${error.message}`);
    process.exit(1);
  }
}

// Main
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printHeader();

rl.question('? What is your app name? ', (answer) => {
  const appName = answer.trim();

  if (!appName) {
    console.log('');
    printError('App name cannot be empty.');
    rl.close();
    process.exit(1);
  }

  runSetup(appName).finally(() => rl.close());
});
