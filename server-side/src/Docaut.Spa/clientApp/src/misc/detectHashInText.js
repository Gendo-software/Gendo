import _ from 'lodash';

const regexForParametersParrent = /(##)(\S+?)(##)/gi

const detectHashInText = (value) => {
    var regexInstance = new RegExp(regexForParametersParrent);

    let matches;
    let fields = []
    while ((matches = regexInstance.exec(value))) {
      fields.push(matches[2])
    }

    fields = _.uniq(fields).sort()
    
    return fields;

    if (!_.isEqual(this.state.fieldsCollection, fields)) {
      console.log(`setState new fields collection: ${fields}`)
      
      //is changed
      //this.setState({ fieldsCollection: output }
    }
  }

  export default detectHashInText;

