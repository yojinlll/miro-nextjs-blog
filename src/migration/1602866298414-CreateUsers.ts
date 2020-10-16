import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1602866298414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          { name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true },
          { name: 'username', type: 'varchar'},
          { name: 'password_digest', type: 'varchar'},
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.dropTable('users')
    }

}
