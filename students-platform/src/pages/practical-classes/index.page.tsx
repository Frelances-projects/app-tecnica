import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import { parseCookies } from 'nookies';
import { useQuery } from '@tanstack/react-query'
import { getMessaging, getToken } from "firebase/messaging";
import { AxiosError } from "axios";

import { PracticalClassesList } from "@/components/PracticalClassesList";

import { server } from '@/lib/server'
import { firebaseApp } from '@/lib/firebase';
import type { Student } from '@/contexts/AuthContext';

export interface ScheduledClass {
  id: string
  schedulingDate?: string
  schedulingHour?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
  class: PracticalClassesData
}

export interface PracticalClassesData {
  id: string
  name: string
  code: number
  description: string
  category: "THEORETICAL" | "PRACTICAL"
  createdAt: string
  scheduledClass?: ScheduledClass
}

interface PracticalClassesProps {
  student: Student
}

export default function PracticalClasses({ student }: PracticalClassesProps) {
  const { data: practicalClassesData, isLoading } = useQuery<ScheduledClass[]>(['practical-classes'], async () => {
    try {
      const { data } = await server.get(`/scheduled-class/student/${student?.id}/category`, { params: { category: "PRACTICAL" } })

      return data.scheduledClasses
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ file: AuthContext.tsx:52 ~ const{data:practicalClassesData}=useQuery ~ error:", error.response?.data.message[0])
        window.alert(error.response?.data.message[0])
      }
    }
  })

  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    async function requestNotificationPermission() {
      try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });

          if (token) {
            console.log("🚀 ~ file: index.page.tsx:76 ~ requestNotificationPermission ~ token:", token)

            await server.put(`/student/${student?.id}`, {
              firebaseToken: token,
              name: student.name,
              email: student.email,
              schoolId: student.schoolId,
              driverLicenseCategoryId: student?.driverLicenseCategoryId,
              number: student.number
            })
          }
        } else {
          console.log('Permissão de notificação negada pelo usuário.');

          const permission = await Notification.requestPermission();

          if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });

            if (token) {
              console.log("🚀 ~ file: index.page.tsx:86 ~ requestNotificationPermission ~ token:", token)

              await server.put(`/student/${student?.id}`, {
                firebaseToken: token,
                name: student.name,
                email: student.email,
                schoolId: student.schoolId,
                driverLicenseCategoryId: student?.driverLicenseCategoryId,
                number: student.number
              })
            }
          }
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    };

    requestNotificationPermission();
  }, [student?.id]);


  return (
    <div className="flex flex-col gap-4 mt-4 items-start">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <div className='flex flex-col gap-4'>
        <div className="text-xl font-semibold">Bem-vindo(a), {student?.name}</div>
        <div className="font-regular text-sm">Aluno(a) N° {student?.number}</div>
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="font-regular">Já completou </h1>
        <p className="font-regular font-bold">
          {practicalClassesData?.filter(lesson => lesson?.status === 'COMPLETED').length ?? 0}
        </p>
        <p>aulas</p>
      </div>

      <PracticalClassesList practicalClassesData={practicalClassesData} isLoading={isLoading} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@studentsPlatform:student': student } = parseCookies({ req: ctx.req })

  if (!student) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      student: JSON.parse(student)
    },
  }
}