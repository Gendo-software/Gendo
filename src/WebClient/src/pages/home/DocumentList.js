import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import ConfirmButton from '../../components/ConfirmButton';

function getTemplateName(templateId, templatesList) {
  const selectedTemplate = templatesList.find(
    template => template.id === templateId
  );
  if (selectedTemplate) {
    return selectedTemplate.name;
  } else {
    return '';
  }
}

const DocumentList = props => {
  const { t } = props;

  return (
    <div className="border py-3">
      <Table hover borderless size="sm" className="m-0">
        <tbody>
          {props.documents.map((doc, key) => {
            return (
              <tr key={doc.id}>
                <td className="px-3 align-middle" style={{ width: '70%' }}>
                  {`${++key} ${doc.name}`}
                  <span className="d-block border-top text-right text-muted font-italic">
                    {getTemplateName(doc.templateId, props.templates)}
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
                  <ConfirmButton
                    buttonLabel="x"
                    okAction={() => props.onDeleteClick(doc)}
                  />
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
