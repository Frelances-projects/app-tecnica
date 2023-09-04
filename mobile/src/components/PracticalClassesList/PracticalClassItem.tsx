import { Text, View } from "react-native";
import { CheckCircle, XCircle } from "phosphor-react-native";

interface PracticalClassItemProps {
  date: string
  title: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

export function PracticalClassItem({ title, date, status }: PracticalClassItemProps) {
  return (
    <View className="mb-3 flex-row gap-x-5 text-black items-center font-regular text-sm">
      <Text>{date}</Text>
      <Text>{title}</Text>
      {
        status === 'COMPLETED' ? 
          <CheckCircle size={24} color="#00A300" weight="fill" /> 
          : 
          <XCircle size={24} color="#CC0000" weight="fill" />
        }
    </View>
  )
}