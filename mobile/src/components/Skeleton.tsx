import { MotiView } from 'moti'
import { Skeleton as MotiSkeleton } from 'moti/skeleton'

export function Skeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      className="mb-3 w-full"
      animate={{ backgroundColor: 'transparent', }}
    >
      <MotiSkeleton colorMode="light" width={'100%'} height={40} />
    </MotiView>
  )
}