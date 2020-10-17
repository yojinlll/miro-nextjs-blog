import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1602918561545 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        { name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true },
        { name: 'userId', type: 'int'},
        { name: 'postId', type: 'int'},
        { name: 'content', type: 'text'},
        { name: 'createdAt', type: 'time', isNullable: false, default: 'now()' },
        { name: 'updatedAt', type: 'time', isNullable: false, default: 'now()' }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments')
  }
  
}
