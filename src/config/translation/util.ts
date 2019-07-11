import vn from '../vn'

// enum Lang {
//   VN = 0,
//   EN = 1,
// }

export const T = (id: string) => {
  const rs = (vn as Record<string, string>)[id]
  return rs ? rs : id
}