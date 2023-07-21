import './index.css';
import { App } from './components/app/app';
import { ApiRequest } from './components/api/api';

const app = new App();
app.start();

const api = new ApiRequest();
api.test();
