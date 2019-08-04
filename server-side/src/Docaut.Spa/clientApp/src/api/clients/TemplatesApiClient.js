import ApiClientBase from './ApiClientBase';
import { TemplatesRoutes } from '../routes/TemplatesRoutes';

export default class TemplatesApiClient extends ApiClientBase {
  getTemplates = () => {
    return this.get(TemplatesRoutes.templates);
  };
}
