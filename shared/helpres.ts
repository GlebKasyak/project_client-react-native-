
export const exhaustiveCheck = (_: never) => {};

export const getFileExtension = (uri: string) => {
    return uri.substring(uri.lastIndexOf(".")).split(".")[1]
}