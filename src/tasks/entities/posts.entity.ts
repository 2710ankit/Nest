import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// import { User } from './User';
// import { Comment } from './Comment';
// import { Category } from './Category';
// import { Tag } from './Tag';
import { Users } from './users.entity';
// import { Category } from './category.entity';
import { Tag } from './tags.entity';
import { Comment } from './comment.entity';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Users, (user) => user.posts, { onDelete: 'CASCADE' })
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];
}
