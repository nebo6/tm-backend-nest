import { Profile } from 'modules/profiles/entities/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

	@OneToOne(() => Profile, (profile) => profile.user, {
		cascade: true,
	})
	profile: Profile;
}
