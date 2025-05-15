import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "int", nullable: true })
    otp: number

    @Column({ type: "boolean", default: false })
    isVerified: boolean
}