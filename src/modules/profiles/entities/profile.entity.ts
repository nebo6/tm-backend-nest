import { User } from 'modules/users/enteties/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	fullName: string;

	@Column({
		default:
			'https://tse3.mm.bing.net/th?id=OIP.wU-18EN3JZEVEkj6S07isAHaHa&w=474&h=474&c=7',
	})
	avatarUrl: string;

	@OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
	user: User;
}
