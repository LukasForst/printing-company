import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from '../../../utils/dateFormatter';

export default class Headline extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
  };

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div className="employee-report-headline">
        <div className="cadek-name">Pavel Čadek</div>
        <div className="cadek-address">Cihlářská 649, 344 01 Domažlice</div>
        <div className="cadek-ico">IČO 72218088, DIČ CZ7102021773</div>
        <div className="report-dates">
          Od: {format(startDate)} Do: {format(endDate)}
        </div>
      </div>
    );
  }
}
