import { Separator } from "@/components/ui/separator"

import { useEffect, useRef } from "react"



export default function PlaygroundPage() {
  const refCanvas = useRef<HTMLCanvasElement|null>(null)

  useEffect(() => {

    console.log(refCanvas.current) 
  }, [])
  return (
    <>
      <div className="h-full flex-col flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            {/*<PresetSelector presets={presets} />
            <PresetSave />*/}
            <div className="hidden space-x-2 md:flex">
              {/*<CodeViewer />
              <PresetShare />*/}
            </div>
            {/** 
            <PresetActions />
             */}
          </div>
        </div>
        <Separator />
        <div className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                sadas
              </div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <canvas ref={refCanvas} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}