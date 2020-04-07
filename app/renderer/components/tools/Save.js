import React, { Component } from 'react';
import { loadState, saveState } from '../../utils/stateSaving';
import PropTypes from 'prop-types';
import BackButton from './BackButton';
import { remote } from 'electron';
import * as storage from 'electron-json-storage';
import { Button, Icon, TextInput } from 'react-materialize';
import 'materialize-css';

export default class Save extends Component {

  static propTypes = {
    state: PropTypes.any.isRequired,
    changeState: PropTypes.func.isRequired,
  };

  state = {
    path: storage.getDefaultDataPath(),
  };

  setPath() {
    const { dialog } = remote;
    dialog.showOpenDialog({ properties: ['openDirectory'] },
      (dirs) => {
        if (dirs[0]) this.setState({ path: dirs[0] });
      });
  }

  render() {
    const { state, changeState } = this.props;
    const { path } = this.state;

    return (
      <div>
        <BackButton/>
        <div id="save-page">
          <div id="stored-path">
            <TextInput
              disabled
              icon={<Icon>folder</Icon>}
              value={path}
            />
          </div>

          <div id="path-buttons">
            <Button
              className="red"
              node="button"
              waves="light"
              onClick={() => saveState(state, path)}
            >
              Save state
            </Button>

            <Button
              className="red"
              node="button"
              waves="light"
              onClick={() => loadState(changeState, path)}
            >
              Load state
            </Button>

            <Button
              className="red"
              node="button"
              waves="light"
              onClick={() => this.setPath()}
            >
              Open
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
