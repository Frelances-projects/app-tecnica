import { useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import { getMessaging, getToken } from "firebase/messaging";

import { server } from '@/lib/server'
import { firebaseApp } from '@/lib/firebase';

import type { Student } from '@/contexts/AuthContext'
import { NavigationButton } from '@/components/buttons/NavigationButton'

interface MenuProps {
  student: Student
}

export default function Menu({ student }: MenuProps) {
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    async function requestNotificationPermission() {
      try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });

          if (token) {
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
    <main className="flex flex-col gap-4 items-center mt-6">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <div className='flex flex-col items-center justify-center'>
        <h1 className="text-xl font-semibold">Bem-vindo(a), {student?.name}</h1>
        <span className="mb-12 font-regular text-sm">Aluno(a) N° {student?.number}</span>
      </div>

      <div className='flex flex-col gap-y-7 -mt-8'>
        <NavigationButton href='/theoretical-classes' title='Aulas de Código' />
        <NavigationButton href='/practical-classes' title='Aulas Práticas' />
        <NavigationButton href='/calendar' title='Calendário de Aulas' />
        <NavigationButton href='/info' title='Informações' />
        <NavigationButton title='Sair' />
      </div>
    </main>
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