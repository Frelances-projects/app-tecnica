import { View, TouchableOpacity } from 'react-native'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/routers'
import {
  SignOut,
  X,
BookOpen,
Car,
Calendar,
Info,
} from 'phosphor-react-native'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router/src/useNavigation'

import { DrawerItem } from './DrawerItem'

import { useAuth } from '@/hooks/useAuth'

export function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { logout } = useAuth()

  return (
    <View className="flex-1">
      <View className="mt-4 ml-auto flex-row items-end justify-between px-8">
        <TouchableOpacity
          style={{ paddingTop: insets.top + 8, marginBottom: 6 }}
          activeOpacity={0.7}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        >
          <X size={26} weight="bold" color="white" />
        </TouchableOpacity>
      </View>

      <DrawerContentScrollView {...props}>
        <Link href="/(stack)/(drawer)/theoretical-classes" asChild>
          <DrawerItem
            icon={<BookOpen color="white" size={32} />}
            title="Aulas de Código"
            isMenuOption
            {...props}
          />
        </Link>

        <Link href="/(stack)/(drawer)/practical-classes" asChild>
          <DrawerItem
            icon={<Car color="white" size={32} />}
            title="Aulas Práticas"
            isMenuOption
            {...props}
          />
        </Link>

        {/* <Link href="/(stack)/(drawer)/class-calendar" asChild> */}
        <Link href="/" asChild>
          <DrawerItem
            icon={<Calendar color="white" size={32} />}
            title="Calendário de Aulas"
            isMenuOption
            {...props}
          />
        </Link>

        <Link href="/(stack)/(drawer)/info" asChild>
          <DrawerItem
            icon={<Info color="white" size={32} />}
            title="Informações"
            isMenuOption
            {...props}
          />
        </Link>

        
        <DrawerItem
          className="ml-[3px]"
          icon={<SignOut color="white" size={32} />}
          title="Sair"
          isMenuOption
          onPress={() => logout()}
          {...props}
        />
      </DrawerContentScrollView>
    </View>
  )
}