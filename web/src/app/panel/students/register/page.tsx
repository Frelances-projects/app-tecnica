import { RegisterStudentSection } from "./components/RegisterStudentSection";

export default function RegisterStudent() {
  return(
    <main className="w-full max-w-[810px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <RegisterStudentSection />
    </main>
  )
}