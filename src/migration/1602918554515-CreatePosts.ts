import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePosts1602918554515 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        { name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true },
        { name: 'title', type: 'varchar'},
        { name: 'content', type: 'varchar'},
        { name: 'authorId', type: 'int'},
        { name: 'createdAt', type: 'time', isNullable: false, default: 'now()' },
        { name: 'updatedAt', type: 'time', isNullable: false, default: 'now()' }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts')
  }

}
