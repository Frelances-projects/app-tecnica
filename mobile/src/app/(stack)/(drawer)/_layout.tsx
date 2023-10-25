import { Drawer } from 'expo-router/drawer'

import { DrawerHeader } from '@/components/DrawerHeader'
import { CustomDrawerContent } from '@/components/CustomDrawerContent'

export default function DrawerLayout(props) {
  return (
    <Drawer
      screenOptions={{
        swipeEnabled: false,
        header: ({ options }) => <DrawerHeader title={options.title ?? ''} />,
        drawerStyle: {
          width: '100%',
          backgroundColor: '#F01E2C',
        },
        drawerPosition: 'right',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: 'Home' }} />
      <Drawer.Screen
        name="theoretical-classes"
        options={{ title: 'Aulas de Código' }}
      />
      <Drawer.Screen
        name="practical-classes"
        options={{ title: 'Aulas Práticas' }}
      />
    </Drawer>
  )
}
