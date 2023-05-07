import { DataSource } from 'typeorm';
import config from './TypeOrm.config';

export default new DataSource(config);
