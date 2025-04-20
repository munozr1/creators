

export default function Bento() {
  return (
    <div className="py24 sm:py32">
      <div className=" mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 ">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 ">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.pinimg.com/736x/ad/7f/6d/ad7f6d9c3730c537293d853f21383408.jpg"
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  identify trends
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  gravida justo et nulla efficitur, maximus egestas sem
                  pellentesque.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.pinimg.com/736x/58/ec/b4/58ecb4d4e0b0e3f599d21b473b131056.jpg"
                className="h-80 object-cover object-left lg:object-right"
              />
              <div className="p-10 pt-4">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  compare metrics
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus
                  massa, laoreet dapibus ex elit vitae odio.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
