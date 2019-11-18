import ApiClientBase from './ApiClientBase';
import {
  DocumentsRoutes,
  DocumentsRoutesParam,
} from '../routes/DocumentsRoutes';
import Config from '../../staticConfig/config';

export default class DocumentsApiClient extends ApiClientBase {
  constructor() {
    super(Config.ApiDocumentsUrl);
  }

  getDocuments = userId => {
    return this.get(DocumentsRoutes.documents, { userId: userId });
  };

  getDocument = documentId => {
    return this.get(DocumentsRoutesParam(documentId).documentById);
  };

  createDocuments = document => {
    return this.post(DocumentsRoutes.documents, document);
  };

  editDocument = document => {
    return this.put(DocumentsRoutesParam(document.id).documentById, document);
  };

  deleteDocument = documentId => {
    return this.delete(DocumentsRoutesParam(documentId).documentById);
  };
}
