import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("grades")
export class Grades {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    student_id: string

    @Column({ type: "varchar" })
    title: string

    @Column({ type: "int" })
    grade: number
}