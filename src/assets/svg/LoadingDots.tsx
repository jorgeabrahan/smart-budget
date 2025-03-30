export default function LoadingDots() {
  return (
    <div className='flex justify-center items-center h-20'>
      <div className='flex space-x-2'>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <div
              className={`w-3 h-3 bg-ghost-white rounded-full animate-bounce ${
                i === 1 && 'delay-200'
              } ${i === 2 && 'delay-400'}`}
              key={i}
            ></div>
          ))}
      </div>
    </div>
  );
}
