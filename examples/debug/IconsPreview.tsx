import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  // Navigation & UI
  Home01Icon,
  Home02Icon,
  Search01Icon,
  Search02Icon,
  Menu01Icon,
  Menu02Icon,
  Settings01Icon,
  Settings02Icon,
  GridIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  DashboardSquare01Icon,

  // Actions
  Add01Icon,
  AddCircleIcon,
  Remove01Icon,
  RemoveCircleIcon,
  Edit01Icon,
  Edit02Icon,
  Delete01Icon,
  Delete02Icon,
  Copy01Icon,
  Copy02Icon,
  Share01Icon,
  Share02Icon,
  Download01Icon,
  Download02Icon,
  Upload01Icon,
  Upload02Icon,
  RefreshIcon,
  ReloadIcon,
  FilterIcon,
  SortingIcon,

  // Arrows
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  ArrowExpandIcon,
  UndoIcon,
  Undo02Icon,
  RedoIcon,
  Redo02Icon,

  // Status & Feedback
  CheckmarkCircle01Icon,
  CheckmarkCircle02Icon,
  Tick01Icon,
  Tick02Icon,
  Cancel01Icon,
  CancelCircleIcon,
  AlertCircleIcon,
  Alert01Icon,
  InformationCircleIcon,
  HelpCircleIcon,
  Loading01Icon,
  Loading02Icon,

  // Media
  PlayIcon,
  PlayCircleIcon,
  PauseIcon,
  StopIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMute01Icon,
  MusicNote01Icon,
  Image01Icon,
  Image02Icon,
  Camera01Icon,
  Camera02Icon,
  Video01Icon,
  Video02Icon,
  Mic01Icon,
  Mic02Icon,

  // Communication
  Mail01Icon,
  Mail02Icon,
  MailOpenIcon,
  InboxIcon,
  Notification01Icon,
  Notification02Icon,
  Chat01Icon,
  Chatting01Icon,
  Comment01Icon,
  Call02Icon,

  // User & People
  User02Icon,
  User03Icon,
  UserIcon,
  UserAddIcon,
  UserCircleIcon,
  UserMultipleIcon,

  // Theme & Display
  Sun01Icon,
  Sun02Icon,
  Moon01Icon,
  Moon02Icon,
  StarIcon,
  FavouriteIcon,

  // Files & Documents
  File01Icon,
  File02Icon,
  FileAddIcon,
  Folder01Icon,
  Folder02Icon,
  FolderAddIcon,

  // Shopping & Commerce
  ShoppingCart01Icon,
  ShoppingBag01Icon,
  Store01Icon,
  Tag01Icon,
  GiftIcon,

  // Location & Maps
  Location01Icon,
  Location02Icon,
  MapsIcon,
  NavigationIcon,
  CompassIcon,

  // Time & Calendar
  Calendar01Icon,
  Calendar02Icon,
  Clock01Icon,
  Clock02Icon,
  TimerIcon,

  // Security & Privacy
  LockIcon,
  SquareLockIcon,
  SquareUnlock01Icon,
  KeyIcon,
  ShieldIcon,
  EyeIcon,
  ViewIcon,
  ViewOffIcon,

  // Devices
  SmartPhone01Icon,
  LaptopIcon,
  ComputerIcon,
  TabletIcon,
  HeadphonesIcon,
  SmartWatch01Icon,

  // Connectivity
  WifiIcon,
  WifiOffIcon,
  BluetoothIcon,
  Link01Icon,
  Link02Icon,
  BatteryFullIcon,

  // Misc
  BookmarkIcon,
  Bookmark01Icon,
  FlagIcon,
  PinIcon,
  Pin02Icon,
  AttachmentIcon,
  IdeaIcon,
  BulbIcon,
} from '@hugeicons/core-free-icons';

type IconCategory = {
  name: string;
  icons: { icon: any; name: string }[];
};

const iconCategories: IconCategory[] = [
  {
    name: 'Navigation & UI',
    icons: [
      { icon: Home01Icon, name: 'Home01' },
      { icon: Home02Icon, name: 'Home02' },
      { icon: Search01Icon, name: 'Search01' },
      { icon: Search02Icon, name: 'Search02' },
      { icon: Menu01Icon, name: 'Menu01' },
      { icon: Menu02Icon, name: 'Menu02' },
      { icon: Settings01Icon, name: 'Settings01' },
      { icon: Settings02Icon, name: 'Settings02' },
      { icon: GridIcon, name: 'Grid' },
      { icon: MoreHorizontalIcon, name: 'MoreHorizontal' },
      { icon: MoreVerticalIcon, name: 'MoreVertical' },
      { icon: DashboardSquare01Icon, name: 'DashboardSquare01' },
    ],
  },
  {
    name: 'Actions',
    icons: [
      { icon: Add01Icon, name: 'Add01' },
      { icon: AddCircleIcon, name: 'AddCircle' },
      { icon: Remove01Icon, name: 'Remove01' },
      { icon: RemoveCircleIcon, name: 'RemoveCircle' },
      { icon: Edit01Icon, name: 'Edit01' },
      { icon: Edit02Icon, name: 'Edit02' },
      { icon: Delete01Icon, name: 'Delete01' },
      { icon: Delete02Icon, name: 'Delete02' },
      { icon: Copy01Icon, name: 'Copy01' },
      { icon: Copy02Icon, name: 'Copy02' },
      { icon: Share01Icon, name: 'Share01' },
      { icon: Share02Icon, name: 'Share02' },
      { icon: Download01Icon, name: 'Download01' },
      { icon: Download02Icon, name: 'Download02' },
      { icon: Upload01Icon, name: 'Upload01' },
      { icon: Upload02Icon, name: 'Upload02' },
      { icon: RefreshIcon, name: 'Refresh' },
      { icon: ReloadIcon, name: 'Reload' },
      { icon: FilterIcon, name: 'Filter' },
      { icon: SortingIcon, name: 'Sorting' },
    ],
  },
  {
    name: 'Arrows',
    icons: [
      { icon: ArrowLeft01Icon, name: 'ArrowLeft01' },
      { icon: ArrowRight01Icon, name: 'ArrowRight01' },
      { icon: ArrowUp01Icon, name: 'ArrowUp01' },
      { icon: ArrowDown01Icon, name: 'ArrowDown01' },
      { icon: ArrowLeftDoubleIcon, name: 'ArrowLeftDouble' },
      { icon: ArrowRightDoubleIcon, name: 'ArrowRightDouble' },
      { icon: ArrowExpandIcon, name: 'ArrowExpand' },
      { icon: UndoIcon, name: 'Undo' },
      { icon: Undo02Icon, name: 'Undo02' },
      { icon: RedoIcon, name: 'Redo' },
      { icon: Redo02Icon, name: 'Redo02' },
    ],
  },
  {
    name: 'Status & Feedback',
    icons: [
      { icon: CheckmarkCircle01Icon, name: 'CheckmarkCircle01' },
      { icon: CheckmarkCircle02Icon, name: 'CheckmarkCircle02' },
      { icon: Tick01Icon, name: 'Tick01' },
      { icon: Tick02Icon, name: 'Tick02' },
      { icon: Cancel01Icon, name: 'Cancel01' },
      { icon: CancelCircleIcon, name: 'CancelCircle' },
      { icon: AlertCircleIcon, name: 'AlertCircle' },
      { icon: Alert01Icon, name: 'Alert01' },
      { icon: InformationCircleIcon, name: 'InformationCircle' },
      { icon: HelpCircleIcon, name: 'HelpCircle' },
      { icon: Loading01Icon, name: 'Loading01' },
      { icon: Loading02Icon, name: 'Loading02' },
    ],
  },
  {
    name: 'Media',
    icons: [
      { icon: PlayIcon, name: 'Play' },
      { icon: PlayCircleIcon, name: 'PlayCircle' },
      { icon: PauseIcon, name: 'Pause' },
      { icon: StopIcon, name: 'Stop' },
      { icon: VolumeHighIcon, name: 'VolumeHigh' },
      { icon: VolumeLowIcon, name: 'VolumeLow' },
      { icon: VolumeMute01Icon, name: 'VolumeMute01' },
      { icon: MusicNote01Icon, name: 'MusicNote01' },
      { icon: Image01Icon, name: 'Image01' },
      { icon: Image02Icon, name: 'Image02' },
      { icon: Camera01Icon, name: 'Camera01' },
      { icon: Camera02Icon, name: 'Camera02' },
      { icon: Video01Icon, name: 'Video01' },
      { icon: Video02Icon, name: 'Video02' },
      { icon: Mic01Icon, name: 'Mic01' },
      { icon: Mic02Icon, name: 'Mic02' },
    ],
  },
  {
    name: 'Communication',
    icons: [
      { icon: Mail01Icon, name: 'Mail01' },
      { icon: Mail02Icon, name: 'Mail02' },
      { icon: MailOpenIcon, name: 'MailOpen' },
      { icon: InboxIcon, name: 'Inbox' },
      { icon: Notification01Icon, name: 'Notification01' },
      { icon: Notification02Icon, name: 'Notification02' },
      { icon: Chat01Icon, name: 'Chat01' },
      { icon: Chatting01Icon, name: 'Chatting01' },
      { icon: Comment01Icon, name: 'Comment01' },
      { icon: Call02Icon, name: 'Call02' },
    ],
  },
  {
    name: 'User & People',
    icons: [
      { icon: User02Icon, name: 'User02' },
      { icon: User03Icon, name: 'User03' },
      { icon: UserIcon, name: 'User' },
      { icon: UserAddIcon, name: 'UserAdd' },
      { icon: UserCircleIcon, name: 'UserCircle' },
      { icon: UserMultipleIcon, name: 'UserMultiple' },
    ],
  },
  {
    name: 'Theme & Display',
    icons: [
      { icon: Sun01Icon, name: 'Sun01' },
      { icon: Sun02Icon, name: 'Sun02' },
      { icon: Moon01Icon, name: 'Moon01' },
      { icon: Moon02Icon, name: 'Moon02' },
      { icon: StarIcon, name: 'Star' },
      { icon: FavouriteIcon, name: 'Favourite' },
    ],
  },
  {
    name: 'Files & Folders',
    icons: [
      { icon: File01Icon, name: 'File01' },
      { icon: File02Icon, name: 'File02' },
      { icon: FileAddIcon, name: 'FileAdd' },
      { icon: Folder01Icon, name: 'Folder01' },
      { icon: Folder02Icon, name: 'Folder02' },
      { icon: FolderAddIcon, name: 'FolderAdd' },
    ],
  },
  {
    name: 'Shopping',
    icons: [
      { icon: ShoppingCart01Icon, name: 'ShoppingCart01' },
      { icon: ShoppingBag01Icon, name: 'ShoppingBag01' },
      { icon: Store01Icon, name: 'Store01' },
      { icon: Tag01Icon, name: 'Tag01' },
      { icon: GiftIcon, name: 'Gift' },
    ],
  },
  {
    name: 'Location',
    icons: [
      { icon: Location01Icon, name: 'Location01' },
      { icon: Location02Icon, name: 'Location02' },
      { icon: MapsIcon, name: 'Maps' },
      { icon: NavigationIcon, name: 'Navigation' },
      { icon: CompassIcon, name: 'Compass' },
    ],
  },
  {
    name: 'Time & Calendar',
    icons: [
      { icon: Calendar01Icon, name: 'Calendar01' },
      { icon: Calendar02Icon, name: 'Calendar02' },
      { icon: Clock01Icon, name: 'Clock01' },
      { icon: Clock02Icon, name: 'Clock02' },
      { icon: TimerIcon, name: 'Timer' },
    ],
  },
  {
    name: 'Security',
    icons: [
      { icon: LockIcon, name: 'Lock' },
      { icon: SquareLockIcon, name: 'SquareLock' },
      { icon: SquareUnlock01Icon, name: 'SquareUnlock01' },
      { icon: KeyIcon, name: 'Key' },
      { icon: ShieldIcon, name: 'Shield' },
      { icon: EyeIcon, name: 'Eye' },
      { icon: ViewIcon, name: 'View' },
      { icon: ViewOffIcon, name: 'ViewOff' },
    ],
  },
  {
    name: 'Devices',
    icons: [
      { icon: SmartPhone01Icon, name: 'SmartPhone01' },
      { icon: LaptopIcon, name: 'Laptop' },
      { icon: ComputerIcon, name: 'Computer' },
      { icon: TabletIcon, name: 'Tablet' },
      { icon: HeadphonesIcon, name: 'Headphones' },
      { icon: SmartWatch01Icon, name: 'SmartWatch01' },
    ],
  },
  {
    name: 'Connectivity',
    icons: [
      { icon: WifiIcon, name: 'Wifi' },
      { icon: WifiOffIcon, name: 'WifiOff' },
      { icon: BluetoothIcon, name: 'Bluetooth' },
      { icon: Link01Icon, name: 'Link01' },
      { icon: Link02Icon, name: 'Link02' },
      { icon: BatteryFullIcon, name: 'BatteryFull' },
    ],
  },
  {
    name: 'Misc',
    icons: [
      { icon: BookmarkIcon, name: 'Bookmark' },
      { icon: Bookmark01Icon, name: 'Bookmark01' },
      { icon: FlagIcon, name: 'Flag' },
      { icon: PinIcon, name: 'Pin' },
      { icon: Pin02Icon, name: 'Pin02' },
      { icon: AttachmentIcon, name: 'Attachment' },
      { icon: IdeaIcon, name: 'Idea' },
      { icon: BulbIcon, name: 'Bulb' },
    ],
  },
];

function IconCategorySection({ category }: { category: IconCategory }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');

  return (
    <View style={styles.categorySection}>
      <ThemedText type="headlineSmall">{category.name}</ThemedText>
      <View style={[styles.iconsGrid, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
        {category.icons.map((item) => (
          <View key={item.name} style={styles.iconItem}>
            <View style={styles.iconContainer}>
              <HugeiconsIcon icon={item.icon} size={24} color={contentStrong} />
            </View>
            <ThemedText type="bodySmall" style={[styles.iconName, { color: contentNormal }]}>
              {item.name}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

export function IconsPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentStrong = useThemeColor({}, 'contentStrong');

  // Count total icons
  const totalIcons = iconCategories.reduce((sum, cat) => sum + cat.icons.length, 0);

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Icons</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Hugeicons - Showing {totalIcons} commonly used icons
      </ThemedText>

      {/* Usage Example */}
      <View style={styles.usageSection}>
        <ThemedText type="headlineSmall">Usage</ThemedText>
        <View style={[styles.codeBlock, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ fontFamily: 'monospace' }}>
            {`import { HugeiconsIcon } from '@hugeicons/react-native';
import { Home01Icon } from '@hugeicons/core-free-icons';

<HugeiconsIcon
  icon={Home01Icon}
  size={24}
  color="#000"
  strokeWidth={1.5}
/>`}
          </ThemedText>
        </View>
      </View>

      {/* Sizes */}
      <View style={styles.usageSection}>
        <ThemedText type="headlineSmall">Sizes</ThemedText>
        <View style={[styles.sizesContainer, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {[16, 20, 24, 32, 40].map((size) => (
            <View key={size} style={styles.sizeItem}>
              <HugeiconsIcon icon={Home01Icon} size={size} color={contentStrong} />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>{size}px</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Icon Categories */}
      {iconCategories.map((category) => (
        <IconCategorySection key={category.name} category={category} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  usageSection: {
    gap: 12,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  sizesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sizeItem: {
    alignItems: 'center',
    gap: 8,
  },
  categorySection: {
    gap: 12,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  iconItem: {
    width: 70,
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconName: {
    fontSize: 8,
    textAlign: 'center',
  },
});
