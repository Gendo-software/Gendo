import React from 'react'
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const exampleValues = {
  documents: [
    {
      name: 'Seeling Car',
      id: 'guid-id-1'
    },
    {
      name: 'Selling a flat',
      id: 'guid-id-2'
    },
    {
      name: 'Company starting',
      id: 'guid-id-3'
    }
  ]
}

const TemplateList = props => {
  return (
    <Table hover borderless size="sm">
      <tbody>
        {exampleValues.documents.map((template, key) => {
          return <tr key={template.id}>
            <td>{`${++key}. ${template.name}`}</td>
            <td className="text-right">
              <Button variant="outline-primary" size="sm" className="px-3" onClick={() => props.onCreateClick(template.id)}>
                Create
              </Button>
            </td>
          </tr>
        })}
      </tbody>
    </Table>
  )
};

TemplateList.propTypes = {
  onCreateClick: PropTypes.func.isRequired
}

export default TemplateList;