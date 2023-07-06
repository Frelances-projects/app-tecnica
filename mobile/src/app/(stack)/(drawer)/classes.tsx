import { View, Text } from 'react-native'
import { Barcode } from 'phosphor-react-native'
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native'

import { Input } from '@/components/Input'

export default function Classes() {
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

      <View className="mt-9">
        <Text className="mb-7 text-lg font-semibold">
          Listagem de Aulas de código
        </Text>
        <Input
          placeholder="Código da aula"
          padding="px-[13px] py-[10px]"
          Icon={<Barcode size={32} weight="fill" />}
        />
      </View>

      {/* <View className="mt-9">
        <Collapse>
          <CollapseHeader>
            <Text>Regras gerais</Text>
            <CollapseBody>
              <Text>Aula 1</Text>
              <Text>Aula 2</Text>
            </CollapseBody>
          </CollapseHeader>

          <CollapseHeader>
            <Text>Teste</Text>
            <CollapseBody>
              <Text>Aula 1</Text>
              <Text>Aula 2</Text>
            </CollapseBody>
          </CollapseHeader>
        </Collapse>
      </View> */}
    </View>
  )
}
