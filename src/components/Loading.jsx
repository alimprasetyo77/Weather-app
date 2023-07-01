
const Loading = () => {
  return (
    <div className="flex justify-center items-start h-full p-14">
      <div className="grid gap-2">
        <div className="flex items-center  justify-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading