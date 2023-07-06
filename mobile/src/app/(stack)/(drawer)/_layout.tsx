import { Drawer } from 'expo-router/drawer'

import { DrawerHeader } from '@/components/DrawerHeader'

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        swipeEnabled: false,
        header: ({ options }) => <DrawerHeader title={options.title ?? ''} />,
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Home' }} />
      <Drawer.Screen name="classes" options={{ title: 'Classes' }} />
    </Drawer>
  )
}
