import { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Barcode, CaretDown, CaretUp } from 'phosphor-react-native'

import { Input } from '@/components/Input'
import { Checkbox } from '@/components/checkbox'

interface sectionAccordionProps {
  id: string
  title: string
  classes: { id: string; content: string; isChecked: boolean }[]
}

interface AccordionSectionProps {
  section: sectionAccordionProps
  isActiveSection: boolean
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  sectionIndex: number | null
}

export default function Classes() {
  const dataTeste = [
    {
      id: '1',
      title: 'Regras gerais',
      classes: [
        { id: '10', content: 'aula 01', isChecked: true },
        { id: '20', content: 'aula 01', isChecked: false },
        { id: '30', content: 'aula 01', isChecked: true },
        { id: '40', content: 'aula 01', isChecked: false },
      ],
    },
    {
      id: '2',
      title: 'Contraordenações',
      classes: [
        { id: '30', content: 'aula 01', isChecked: false },
        { id: '40', content: 'aula 01', isChecked: false },
      ],
    },
  ]

  const [data, setData] = useState(dataTeste)

  const [activeIndex, setActiveIndex] = useState(0)

  function AccordionSection({
    section,
    isActiveSection,
    setActiveIndex,
    sectionIndex,
  }: AccordionSectionProps) {
    const toggleSection = () => {
      const nextIndex = isActiveSection ? null : sectionIndex
      setActiveIndex(nextIndex)
    }

    const classesChecked = section.classes.filter((item) => {
      return item?.isChecked === true
    })

    return (
      <View className="mt-9 w-full">
        <TouchableOpacity
          onPress={toggleSection}
          className="flex w-full flex-row justify-between border-b border-[#EBEBEB]"
        >
          <Text className="font-bold">{section?.title}</Text>
          <View className="flex flex-row gap-2">
            <Text>
              {classesChecked.length} / {section?.classes?.length}
            </Text>
            {isActiveSection ? <CaretUp /> : <CaretDown />}
          </View>
        </TouchableOpacity>
        <View
          className={`flex flex-col transition-all duration-200 ease-in-out ${
            isActiveSection ? 'mt-4' : ''
          }`}
        >
          {isActiveSection &&
            section?.classes?.map((item) => {
              return (
                <Checkbox
                  key={item?.id}
                  id={item?.id}
                  placeholder={item?.content}
                  isChecked={item?.isChecked}
                  setData={setData}
                />
              )
            })}
        </View>
      </View>
    )
  }

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
      <View className="w-full">
        {data?.map((item, index) => {
          return (
            <AccordionSection
              key={index}
              section={item}
              isActiveSection={index === activeIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
            />
          )
        })}
      </View>
    </View>
  )
}
