import { Profile } from 'modules/profiles/entities/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin',
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	isActive: boolean;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: UserRole;

	@OneToOne(() => Profile, (profile) => profile.user, {
		cascade: true,
	})
	profile: Profile;
}
