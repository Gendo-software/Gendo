import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Dropdown } from 'react-bootstrap';
import i18n from '../../locales/i18n';

const languages = [
  {
    name: 'Polish',
    code: 'pl',
    flag: 'pl',
  },
  {
    name: 'English',
    code: 'en',
    flag: 'us',
  },
];

class LangSwitch extends Component {
  handleSelectedLang(eventKey) {
    i18n.changeLanguage(eventKey);
  }

  DropDownLangItem = props => {
    return (
      <Dropdown.Item eventKey={props.code}>
        <ReactCountryFlag code={props.flag} svg /> {props.name}
      </Dropdown.Item>
    );
  };

  LangComponent(lang) {
    return (
      <>
        <ReactCountryFlag code={lang.flag} svg /> {lang.name}
      </>
    );
  }
  render() {
    const currentLang = languages.find(x => x.code === i18n.language);

    return (
      <div>
        <Dropdown onSelect={this.handleSelectedLang}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size={'sm'}>
            <this.LangComponent
              flag={currentLang.flag}
              name={currentLang.name}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map(lang => {
              return <this.DropDownLangItem {...lang} key={lang.code} />;
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default LangSwitch;
