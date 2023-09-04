import React, { forwardRef } from 'react'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface DrawerItemProps extends TouchableOpacityProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  isMenuOption?: boolean
}

export const DrawerItem = forwardRef<TouchableOpacity, DrawerItemProps>(
  ({ title, subtitle, icon: Icon, isMenuOption = false, ...rest }, ref) => {
    const classNameMenu = isMenuOption ? 'px-6' : 'pr-6 pl-2'

    return (
      <TouchableOpacity
        ref={ref}
        className={`grow ${classNameMenu} flex-row items-center py-7`}
        {...rest}
      >
        {Icon && Icon}

        <View className="ml-2 flex-1">
          <Text className="font-medium text-2xl text-white">
            {title}
          </Text>

          {subtitle && (
            <Text className="text-sm text-gray-300" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color={'#0000'} />
      </TouchableOpacity>
    )
  },
)

DrawerItem.displayName = 'DrawerItem'