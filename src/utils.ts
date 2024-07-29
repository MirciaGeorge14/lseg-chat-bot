import { Theme } from '@mui/material/styles'
import { SxProps, SystemStyleObject } from '@mui/system'

export type StylesRecord = Record<string, SystemStyleObject<Theme> | ((...args: any) => SxProps<Theme>)>

export const createSx = <T extends StylesRecord>(t: T) => t