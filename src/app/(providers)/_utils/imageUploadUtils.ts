import { createClient } from "@/supabase/client"

const { v4: uuidv4 } = require("uuid")

export const PROFILE = "profiles"

/**
 * 이미지 파일을 서버로 업로드하는 함수
 *
 * @param bucket - 이미지가 존재하는 bucket 명
 * @param file - 업로드할 이미지 파일
 * @param path - 경로
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (
  bucket: string,
  file: File,
  path: string = ""
): Promise<string> => {
  const supabase = createClient()

  const newFileName = uuidv4().replaceAll("-", "")
  const filePath = path ? `${path}/${newFileName}` : newFileName
  // 새로운 이미지 업로드
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    upsert: true,
  })

  if (error) {
    throw new Error(error.message)
  }

  return supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl
}

/**
 * 이미지 파일을 서버에서 삭제하는 함수
 *
 * @param profileImageUrl - 삭제할 파일 URL
 * @param bucket - 이미지가 존재하는 bucket 명
 * @param path - 경로
 * @returns 성공 여부
 */
export const deleteImage = async (
  profileImageUrl: string | null,
  bucket: string,
  path: string = ""
): Promise<boolean> => {
  const supabase = createClient()

  try {
    if (profileImageUrl) {
      const fileName = profileImageUrl.split("/").pop()
      if (fileName) {
        const filePath = path ? `${path}/${fileName}` : fileName
        await supabase.storage.from(bucket).remove([filePath])
      }
    }
  } catch (error: any) {
    console.error(error.message)
    return false
  }

  return true
}

/**
 * 이미지 파일의 유효성을 검사하는 함수
 *
 * @param file - 검사할 이미지 파일
 * @param maxSizeMB - 허용되는 최대 파일 크기 (MB)
 * @returns 파일이 유효한지 여부
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 5
): boolean => {
  if (!file) {
    return false
  }

  const validTypes = ["image/jpeg", "image/png", "image/gif"]
  const isValidType = validTypes.includes(file.type)
  const isValidSize = file.size <= maxSizeMB * 1024 * 1024

  return isValidType && isValidSize
}
