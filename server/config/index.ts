import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '..', '.env') })

export const mongoUser: string = process.env.MONGO_USER as string
export const emailName: string = process.env.FROM_NAME as string
export const fromEmail: string = process.env.FROM_EMAIL as string
export const mongoPwd: string = process.env.MONGO_PASSWORD as string
export const dbName: string = process.env.DB_NAME as string
export const authSecret: string = process.env.JWT_SECRET as string
export const mongoUri: string = process.env.MONGO_URI as string
export const port: number | string = process.env.PORT ?? 5000
export const nodeEnv: 'dev' | 'prod' = process.env.NODE_ENV as 'dev' | 'prod' ?? 'dev'
export const frontendUrl: string = process.env.FRONTEND_URL as string
