import { Check } from 'phosphor-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

interface CheckBoxProps {
  placeholder: string
  isChecked: boolean
  setData: Dispatch<SetStateAction<any>>
  id: string
}

export function Checkbox({
  placeholder,
  isChecked,
  setData,
  id,
}: CheckBoxProps) {
  const handleCheck = (id: string) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.classes.some((cls) => cls.id === id)) {
          return {
            ...item,
            classes: item.classes.map((cls) => {
              if (cls.id === id) {
                return { ...cls, isChecked: !cls.isChecked }
              }
              return cls
            }),
          }
        }
        return item
      })
      
    })
  }

  return (
    <TouchableOpacity
      onPress={() => handleCheck(id)}
      className="mx-auto mb-2 flex w-[94%] flex-row items-center justify-between rounded-md border border-zinc-300 border-opacity-10 px-3 py-2 shadow"
    >
      <Text className="font-bold">{placeholder}</Text>
      <View
        className={`text-green-500 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
      >
        {<Check />}
      </View>
    </TouchableOpacity>
  )
}
