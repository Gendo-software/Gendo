import ApiClientBase from './ApiClientBase';
import {
  TemplatesRoutes,
  TemplatesRoutesParam,
} from '../routes/TemplatesRoutes';
import Config from '../../StaticConfig/config';

export default class TemplatesApiClient extends ApiClientBase {
  constructor() {
    super(Config.ApiTemplatesUrl);
  }
  getTemplates = () => {
    return this.get(TemplatesRoutes.templates);
  };

  getTemplate = templateId => {
    return this.get(TemplatesRoutesParam(templateId).templateById);
  };

  createTemplate = template => {
    return this.post(TemplatesRoutes.templates, template);
  };

  editTemplate = template => {
    return this.put(TemplatesRoutesParam(template.id).templateById, template);
  };

  deleteTemplate = templateId => {
    return this.delete(TemplatesRoutesParam(templateId).templateById);
  };
}
