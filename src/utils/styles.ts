export const getDraggingBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return 'bg-red-100'
  }
  if (isDraggingFrom) {
    return 'bg-yellow-100'
  }
  return 'bg-white'
}
