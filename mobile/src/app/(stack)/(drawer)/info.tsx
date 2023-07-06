import { View, Text } from 'react-native'

export default function Info() {
  return (
    <View className="flex-1 items-start px-9">
      <Text className="mb-2 text-xl font-semibold">Bem-vindo(a), @Nome!</Text>
      <Text className="mb-12 font-regular text-sm">Aluno(a) N° 2342</Text>
      <View className="-ml-[1px] -mt-10 flex-row items-start">
        <Text className="font-regular text-sm">Já completou</Text>
        <Text className="font-regular text-sm font-bold"> 6</Text>
        <Text className="font-regular text-sm"> de </Text>
        <Text className="font-regular text-sm font-bold">32 </Text>
        <Text>aulas</Text>
      </View>

      <View className="mt-9 w-full">
        <Text className="mb-5 text-lg font-semibold">Informações</Text>

        <View>
          <Text className="text-sm font-bold">Exame de Código</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          <Text className="font-regular text-sm">
            Informação não encontrada...
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-bold">Exame de Condução</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          <Text className="font-regular text-sm">
            Informação não encontrada...
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-bold">Outras informações</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          <Text className="font-regular text-sm">
            A escola das caldas da rainha encontra-se encerrada até dia 10.
          </Text>
        </View>
      </View>
    </View>
  )
}
