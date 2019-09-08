import _ from 'lodash';

const regexForParametersParrent = /(##)(\S+?)(##)/gi;

const detectHashInText = value => {
  var regexInstance = new RegExp(regexForParametersParrent);

  let matches;
  let fields = [];
  while ((matches = regexInstance.exec(value))) {
    fields.push(matches[2]);
  }

  fields = _.uniq(fields).sort();

  return fields;
};

export default detectHashInText;
