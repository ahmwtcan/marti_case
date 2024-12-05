import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Locations (e2e)', () => {
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

  it('should log a location if it matches an area', () => {
    return request(app.getHttpServer())
      .post('/locations')
      .send({
        userId: 1,
        lat: 40.912,
        lng: 29.1234,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });

  it('should return an empty response if no area matches', () => {
    return request(app.getHttpServer())
      .post('/locations')
      .send({
        userId: 1,
        lat: 40.0,
        lng: 30.0,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });
});
