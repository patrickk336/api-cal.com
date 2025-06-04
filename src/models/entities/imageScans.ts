import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("image_scans")
export class imageScans {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    scan_data_no_format: string

    @Column({ type: "varchar" })
    scan_data_formatted: string
}