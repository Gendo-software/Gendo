import ApiClientBase from './ApiClientBase';
import {
  TemplatesRoutes,
  TemplatesRoutesParam,
} from '../routes/TemplatesRoutes';

export default class TemplatesApiClient extends ApiClientBase {
  getTemplates = () => {
    return this.get(TemplatesRoutes.templates);
  };

  getTemplate = templateId => {
    return this.get(TemplatesRoutesParam(templateId).templateById);
  };

  createTemplate = template => {
    console.log('save template');
    console.dir(template);
    return this.post(TemplatesRoutes.templates, template);
  };

  editTemplate = template => {
    return this.put(TemplatesRoutesParam(template.id).templateById, template);
  };

  deleteTemplate = templateId => {
    return this.delete(TemplatesRoutesParam(templateId).templateById);
  };
}
