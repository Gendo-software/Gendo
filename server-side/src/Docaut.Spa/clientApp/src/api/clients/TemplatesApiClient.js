import ApiClientBase from './ApiClientBase';
import {
  TemplatesRoutes,
  TemplatesRoutesParam,
} from '../routes/TemplatesRoutes';

export default class TemplatesApiClient extends ApiClientBase {
  getTemplates = () => {
    return this.get(TemplatesRoutes.templates);
  };

  getTemplate = templateName => {
    return this.get(TemplatesRoutesParam(templateName).templateById);
  };

  saveTemplate = template => {
    console.log('save template');
    console.dir(template);
    return this.post(TemplatesRoutes.templates, template);
  };
}
