import TemplatesApiClient from '../api/clients/TemplatesApiClient';
import DocumentsApiClient from '../api/clients/DocumentsApiClient';
import daycareTemplate from './data/T_POST_DAYCARE_CONTRACT';
import sellingCarTemplate from './data/T_POST_SELLING_A_CAR';

let _appContext;
class dataSeeder {
  constructor(appContext) {
    this.templatesApi = new TemplatesApiClient();
    this.documentApi = new DocumentsApiClient();
    _appContext = appContext;
  }

  async CleanAndSeedData() {
    try {
      await this.clearTemplates();
      await this.clearDocuments();

      await this.addTemplates();
      await this.addDocuments();
    } catch (error) {
      alert('error, during restore data');
    }
  }

  async clearTemplates() {
    const { data: templates } = await this.templatesApi.getTemplates();
    templates.forEach(async template => {
      await this.templatesApi.deleteTemplate(template.id);
    });
  }

  async addTemplates() {
    await this.templatesApi.createTemplate(daycareTemplate);
    await this.templatesApi.createTemplate(sellingCarTemplate);
  }

  async clearDocuments() {
    let { data: documents } = await this.documentApi.getDocuments(
      _appContext.userProfile.sub
    );

    await documents.forEach(async document => {
      await this.documentApi.deleteDocument(document.id);
    });
  }

  async addDocuments() {
    const { data: templates } = await this.templatesApi.getTemplates();

    const car1 = require('./data/D_POST_SELLING_CAR_1.json');
    const car2 = require('./data/D_POST_SELLING_CAR_2.json');
    const car3 = require('./data/D_POST_SELLING_CAR_3.json');
    const kid1 = require('./data/D_POST_DAYCARE_1.json');
    const kid2 = require('./data/D_POST_DAYCARE_2.json');
    const kid3 = require('./data/D_POST_DAYCARE_3.json');

    const kids = [kid1, kid2, kid3];
    const cars = [car1, car2, car3];

    await templates.forEach(async template => {
      if (template.name === daycareTemplate.name) {
        kids.forEach(async kid => {
          await this.createDocument(kid, template);
        });
      } else if (template.name === sellingCarTemplate.name) {
        cars.forEach(async car => {
          await this.createDocument(car, template);
        });
      }
    });
  }

  async createDocument(item, template) {
    let updatedItem = {
      ...item,
      templateVersionId: template.currentVersionId,
      templateId: template.id,
      userId: _appContext.userProfile.sub,
    };

    await this.documentApi.createDocuments(updatedItem);
  }
}

export default dataSeeder;
