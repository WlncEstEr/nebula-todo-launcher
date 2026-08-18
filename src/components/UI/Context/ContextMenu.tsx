interface IContextMenu {
  click: () => void
}

export function ContextMenu({ click }: IContextMenu) {
  return (
    <div className="bg-[#333336] rounded-lg p-1">
      <h2
        className="text-text text-[15px] font-normal px-2 hover:bg-[#57575e] hover:rounded-lg cursor-pointer"
        onClick={click}
      >
        Перейти на страницу в магазине
      </h2>
      <div className="w-full h-px bg-[#919191] my-2" />
      <h2 className="text-text text-[15px] font-normal px-2 hover:bg-[#57575e] hover:rounded-lg cursor-pointer">
        Добавить в избранное
      </h2>
    </div>
  )
}
