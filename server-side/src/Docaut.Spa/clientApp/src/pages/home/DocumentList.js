import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

const mockValues = {
  documents: [
    {
      name: 'Volkswagen Passat',
      template: {
        name: 'Seeling Car',
        templateId: 'guid-id-1',
      },
      id: 'guid-doc-id_1',
    },
    {
      name: 'Opel Astra',
      template: {
        name: 'Seeling Car',
        templateId: 'guid-id-1',
      },
      id: 'guid-doc-id_2',
    },
    {
      name: 'BMW X5',
      template: {
        name: 'Seeling Car',
        templateId: 'guid-id-1',
      },
      id: 'guid-doc-id_3',
    },
  ],
};

const DocumentList = props => {
  const { t } = props;
  return (
    <div className="border py-3">
      <Table hover borderless size="sm" className="m-0">
        <tbody>
          {mockValues.documents.map((doc, key) => {
            return (
              <tr key={doc.id}>
                <td className="px-3 align-middle">
                  {`${++key} ${doc.name}`}
                  <span className="d-block border-top text-right text-muted font-italic">
                    {doc.template.name}
                  </span>
                </td>
                <td className="px-3 text-right align-middle">
                  <Button
                    onClick={() => props.onOpenClick(doc)}
                    variant="outline-primary"
                    size="sm"
                    className="px-3 mr-1"
                  >
                    {t('common:open')}
                  </Button>
                  <Button
                    onClick={() => props.onDeleteClick(doc)}
                    variant="outline-danger"
                    size="sm"
                    className="px-3 mr-1"
                  >
                    <b>×</b>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

DocumentList.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onOpenClick: PropTypes.func.isRequired,
};

export default withTranslation('common')(DocumentList);
