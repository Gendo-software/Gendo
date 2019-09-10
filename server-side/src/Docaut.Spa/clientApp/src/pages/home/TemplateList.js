import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TemplateList = props => {
  const { templates } = props;
  return (
    <div className="border">
      <Table hover borderless size="sm" className="m-0">
        <tbody>
          {templates.map((template, key) => {
            return (
              <tr key={template.id}>
                <td className="px-3 align-middle">{`${++key}. ${
                  template.name
                }`}</td>
                <td className="text-right px-3">
                  <Link to={`Document/Create/${template.id}`}>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="px-3"
                    >
                      Create
                    </Button>
                  </Link>{' '}
                  <Link to={`Template/Edit/${template.id}`}>
                    <Button variant="outline-info" size="sm" className="px-3">
                      Edit
                    </Button>
                  </Link>{' '}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="px-3"
                    onClick={() => props.onDeleteClick(template.id)}
                  >
                    X
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

TemplateList.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
};

export default TemplateList;
