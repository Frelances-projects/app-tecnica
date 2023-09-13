import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from 'expo-router/src/useNavigation'
import { useRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { List } from 'phosphor-react-native'

import Logo from '@/assets/Logo'

import { theme } from '../theme'

type StackHeaderProps = {
  title: string
}

export function DrawerHeader({ title }: StackHeaderProps) {
  const navigation = useNavigation()
  const router = useRoute()

  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-row items-center gap-4 bg-transparent px-5 pb-6"
      style={{ paddingTop: insets.top, marginTop: 10, marginLeft: 36 }}
    >
      <View className="ml-14 mt-10 flex-1 flex-row items-center justify-center">
        <Logo width={190} height={83} />
      </View>

      {router.name !== 'index' ? (
        <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <List size={36} color={theme.colors.dark[500]} />
        </TouchableOpacity>
      ) : <TouchableOpacity className='mr-9'>
      </TouchableOpacity>}
    </View>
  )
}
