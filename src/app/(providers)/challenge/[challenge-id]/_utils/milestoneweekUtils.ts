export const numberToWeek = (index: number) => {
  switch (index) {
    case 0:
      return "월"
    case 1:
      return "화"
    case 2:
      return "수"
    case 3:
      return "목"
    case 4:
      return "금"
    case 5:
      return "토"
    case 6:
      return "일"
  }
}