import { Dispatch, SetStateAction } from 'react'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Check } from 'phosphor-react-native'

interface CheckBoxProps {
  placeholder: string
  isChecked: boolean
  onPress: (event: GestureResponderEvent) => void
  setData: Dispatch<SetStateAction<any>>
  id: string
}

export function Checkbox({
  placeholder,
  isChecked,
  setData,
  onPress,
  id,
}: CheckBoxProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-auto mb-2 flex w-[94%] flex-row items-center justify-between rounded-md border border-zinc-300 border-opacity-10 px-3 py-2 shadow"
    >
      <View className="flex-row items-center gap-x-1">
        <Text className="font-bold">{placeholder}</Text>
      </View>
      <View
        className={` text-green-500 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
      >
        {<Check />}
      </View>
    </TouchableOpacity>
  )
}
