import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Areas (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new area', () => {
    return request(app.getHttpServer())
      .post('/areas')
      .send({
        name: 'Test Area',
        boundary:
          'SRID=4326;POLYGON((29.07628 40.93413, 29.15594 40.93413, 29.15594 40.90272, 29.07628 40.90272, 29.07628 40.93413))',
      })
      .expect(201);
  });

  it('should retrieve all areas', () => {
    return request(app.getHttpServer())
      .get('/areas?pageSize=10')
      .expect(200)
      .expect((res) => {
        expect(res.body.areas).toBeInstanceOf(Array);
      });
  });
});
