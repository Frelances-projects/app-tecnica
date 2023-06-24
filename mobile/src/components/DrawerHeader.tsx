import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from 'expo-router/src/useNavigation'
import { DrawerActions } from '@react-navigation/routers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { List, User } from 'phosphor-react-native'

import Logo from '@/assets/Logo'

import { theme } from '../theme'

type StackHeaderProps = {
  title: string
}

export function DrawerHeader({ title }: StackHeaderProps) {
  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-row items-center justify-between gap-4 bg-transparent px-5 pb-6"
      style={{ paddingTop: insets.top, marginTop: 10 }}
    >
      <TouchableOpacity onPress={navigation.goBack}>
        <User size={30} weight="bold" color={theme.colors.dark[500]} />
      </TouchableOpacity>

      <View className="mt-10 flex-1 flex-row items-center justify-center">
        <Logo width={190} height={83} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <List size={36} color={theme.colors.dark[500]} />
      </TouchableOpacity>
    </View>
  )
}
