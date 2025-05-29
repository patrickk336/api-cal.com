import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("approvals")
export class Approvals {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    api_output: string

    @Column({ type: "varchar" })
    ai_output: string

    @Column({ type: "varchar" })
    score: string

    @Column({ type: "boolean"})
    approval_status: boolean    
}